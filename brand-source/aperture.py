"""
Synk Innovations — MASTER BRAND GEOMETRY.

One canonical symbol. Every file in public/brand/ is derived from the
functions below; nothing is redrawn per asset. Across all variants the
geometry, proportions, spacing, aperture, segment count, angles, negative
space and optical balance are byte-identical. Only colour, background, lockup
orientation and the presence of the wordmark change.

THE SYMBOL — "Digital Aperture"

    Two concentric frames closing on a central negative-space opening. Each
    frame is four L-brackets holding the corners of a square, their arms
    stopping short of the edge midpoints so the frame reads as four separate
    elements sharing one centre. The inner frame is rotated 45 degrees, so
    the two systems interlock — offset, but converging on the same aperture.

        MULTIPLE SYSTEMS -> SYNCHRONISATION -> ONE DIGITAL SYSTEM

WHY BRACKETS AND NOT A PINWHEEL
    The obvious "aperture" construction — four bent bars rotated 90 degrees
    around a square centre — produces a hate symbol. That resemblance is
    structural to a four-fold pinwheel of bent arms and cannot be tuned away.
    Every bracket here is instead mirror-symmetric about its own diagonal, so
    each frame is D4 (four mirror lines). The mark converges without
    rotating, and has no chirality to misread.

CONSTRUCTION SYSTEM
    A single module U = 10 on a 1000x1000 master canvas. Every dimension is a
    whole multiple of U, so the mark holds a true grid at any size. The only
    angles are 90 and 45 degrees; the 45-degree chamfer on each outer corner
    is the same angle the inner frame is rotated by.
"""

import math

# Master canvas — authored once, only ever scaled.
SIZE = 1000.0
C = SIZE / 2

# ------------------------------------------------------- construction grid
U = 10.0                    # base module

THICK = 9 * U               # bracket thickness                      (90)
H_OUTER = 38 * U            # outer frame half-size                 (380)
H_INNER = 22 * U            # inner frame half-size                 (220)
GAP_OUTER = 15 * U          # break at the outer edge midpoints     (150)
GAP_INNER = 12 * U          # break at the inner edge midpoints     (120)
CHAMFER_OUTER = 5 * U       # 45-degree cut, outer corners           (50)
CHAMFER_INNER = 4 * U       # 45-degree cut, inner corners           (40)
TWIST_INNER = 45.0          # inner frame rotation, degrees

# Artwork half-extent. The outer bracket corners sit exactly at H_OUTER, so
# the mark occupies +/-380 of the +/-500 canvas: a 12% margin on every side.
EXTENT = H_OUTER


def _rot(p, deg):
    a = math.radians(deg)
    c, s = math.cos(a), math.sin(a)
    return (p[0] * c - p[1] * s, p[0] * s + p[1] * c)


def _bracket(half, thick, gap, chamfer, deg):
    """One L-bracket over a corner of a square of half-size `half`.

    Both arms run inward from the corner and stop `gap`/2 short of the edge
    midpoints. The outer corner is chamfered at 45 degrees. The shape is
    symmetric about its own diagonal.
    """
    pts = [
        (-half + chamfer, -half),   # top edge, after the chamfer
        (-gap / 2, -half),          # ...to the break
        (-gap / 2, -half + thick),  # down to the inner edge
        (-half + thick, -half + thick),   # inner corner
        (-half + thick, -gap / 2),  # out along the other arm
        (-half, -gap / 2),          # to that arm's break
        (-half, -half + chamfer),   # up into the chamfer
    ]
    return [_rot(p, deg) for p in pts]


def symbol_polygons():
    """The master symbol as polygons in 0..SIZE coordinates."""
    frames = [
        (H_OUTER, THICK, GAP_OUTER, CHAMFER_OUTER, 0.0),
        (H_INNER, THICK, GAP_INNER, CHAMFER_INNER, TWIST_INNER),
    ]
    out = []
    for half, thick, gap, chamfer, twist in frames:
        for k in range(4):
            out.append(_bracket(half, thick, gap, chamfer, twist + 90.0 * k))
    return [[(C + x, C + y) for x, y in poly] for poly in out]


def polygon_points(poly, nd=2):
    return " ".join(f"{round(x, nd)},{round(y, nd)}" for x, y in poly)


def symbol_markup(indent="  "):
    """The symbol's <polygon> elements. Fill is inherited from the parent."""
    return "\n".join(
        f'{indent}<polygon points="{polygon_points(p)}"/>'
        for p in symbol_polygons()
    )


def measured_extent():
    """Half-extent read back from the geometry — never assumed."""
    return max(
        max(abs(x - C), abs(y - C))
        for poly in symbol_polygons()
        for x, y in poly
    )
