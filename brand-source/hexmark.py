"""
Synk Innovations — "Digital Aperture", faceted construction.

A hexagonal ribbon that folds into an S. Five flat facets; the dimensional
look comes from a per-facet gradient applied on top, never from the geometry.

HOW IT IS BUILT
    Two concentric pointy-top hexagons, outer and inner. The ring between
    them is cut into trapezoid facets, one per hexagon edge. Four of the six
    are kept — two across the top, two across the bottom — and a parallelogram
    bar crosses the middle, joining the top run's left end to the bottom run's
    right end.

    Read it as a stroke and it is an S: in at the top right, left across the
    top, down the diagonal, left across the bottom. The two empty edges are
    the aperture.

    EVERY corner is computed directly from the two hexagons. Nothing is
    derived by offsetting a polyline — an earlier revision did exactly that
    and the outline self-intersected at the S's knees, which the nonzero fill
    rule renders as a solid blob. Explicit vertices make that impossible.

    Symmetry is 180-degree rotational: the bottom run is the top run turned
    half a turn, and the bar maps onto itself. That is what an S requires,
    and it carries none of the chirality problems a four-fold pinwheel of
    bent arms does.

FLAT FIRST
    The geometry is flat and monochrome-safe — that is what prints, engraves
    and survives at 16px. Gradients are decoration, never load-bearing.
"""

import math

SIZE = 1000.0
C = SIZE / 2

R_OUT = 400.0      # outer hexagon circumradius
R_IN = 250.0       # inner hexagon circumradius -> 130 perpendicular ribbon
BAR_HALF = 65.0    # half-width of the crossing bar == half the ring width,
                   # so the whole mark reads as one constant-width ribbon
BAR_OVER = 34.0    # how far the bar runs past the inner hexagon, to knit in
CHANNEL = 16.0     # dark gap between adjacent facets (each inset by half)

rnd = lambda v: round(v, 2)


def _hex(r):
    """Pointy-top hexagon about the origin, y down. Index 0 is the top vertex."""
    return [
        (r * math.sin(math.radians(60 * i)), -r * math.cos(math.radians(60 * i)))
        for i in range(6)
    ]


def _centroid(poly):
    n = len(poly)
    return (sum(p[0] for p in poly) / n, sum(p[1] for p in poly) / n)


def inset(poly, d):
    """Shrink a CONVEX polygon by `d` on every edge.

    Each edge is pushed toward the centroid and consecutive edges re-
    intersected. Safe here because every facet is a convex quad and `d` is
    small relative to it.
    """
    if d <= 0:
        return poly
    cx, cy = _centroid(poly)
    lines = []
    n = len(poly)
    for i in range(n):
        a, b = poly[i], poly[(i + 1) % n]
        ex, ey = b[0] - a[0], b[1] - a[1]
        m = math.hypot(ex, ey) or 1.0
        nx, ny = -ey / m, ex / m
        # Point the normal at the centroid.
        if (cx - a[0]) * nx + (cy - a[1]) * ny < 0:
            nx, ny = -nx, -ny
        lines.append(((a[0] + nx * d, a[1] + ny * d), (ex / m, ey / m)))

    out = []
    for i in range(n):
        (p0, d0) = lines[i - 1]
        (p1, d1) = lines[i]
        den = d0[0] * d1[1] - d0[1] * d1[0]
        if abs(den) < 1e-9:
            out.append(p1)
            continue
        t = ((p1[0] - p0[0]) * d1[1] - (p1[1] - p0[1]) * d1[0]) / den
        out.append((p0[0] + d0[0] * t, p0[1] + d0[1] * t))
    return out


def facets():
    """The five flat facets about the origin, in paint order."""
    V = _hex(R_OUT)
    W = _hex(R_IN)

    def ring(i):
        """Trapezoid over outer edge i -> i+1, closed on the inner hexagon."""
        j = (i + 1) % 6
        return [V[i], V[j], W[j], W[i]]

    # Crossing bar: inner vertex 5 (upper left) to inner vertex 2 (lower right).
    a, b = W[5], W[2]
    ex, ey = b[0] - a[0], b[1] - a[1]
    m = math.hypot(ex, ey) or 1.0
    ux, uy = ex / m, ey / m
    nx, ny = -uy, ux
    a = (a[0] - ux * BAR_OVER, a[1] - uy * BAR_OVER)
    b = (b[0] + ux * BAR_OVER, b[1] + uy * BAR_OVER)
    bar = [
        (a[0] + nx * BAR_HALF, a[1] + ny * BAR_HALF),
        (b[0] + nx * BAR_HALF, b[1] + ny * BAR_HALF),
        (b[0] - nx * BAR_HALF, b[1] - ny * BAR_HALF),
        (a[0] - nx * BAR_HALF, a[1] - ny * BAR_HALF),
    ]

    raw = {
        "top-left": ring(5),      # upper-left edge
        "top-right": ring(0),     # upper-right edge
        "cross": bar,
        "bottom-right": ring(2),  # 180 deg of top-left
        "bottom-left": ring(3),   # 180 deg of top-right
    }
    return {k: inset(v, CHANNEL / 2) for k, v in raw.items()}


def to_canvas(poly):
    return [(C + x, C + y) for x, y in poly]


def points(poly):
    return " ".join(f"{rnd(x)},{rnd(y)}" for x, y in poly)


def symbol_polygons():
    return {k: to_canvas(v) for k, v in facets().items()}


def extent():
    return max(
        max(abs(x - C), abs(y - C)) for p in symbol_polygons().values() for x, y in p
    )


#: Half-extent of the artwork, MEASURED from the built facets rather than
#: assumed — the hexagon's corners are inset by the channel, so it is not R_OUT.
EXTENT = extent()


# Per-facet gradient ramp. Light reads from the upper left; each facet is a
# plane catching it differently. Decoration only — every asset is legible with
# these collapsed to one flat colour.
RAMP = {
    "top-left":     ("#EDE9FE", "#A78BFA", (0, 0, 1, 1)),
    "top-right":    ("#C4B5FD", "#7C3AED", (0, 0, 1, 1)),
    "cross":        ("#DDD6FE", "#8B5CF6", (0, 1, 1, 0)),
    "bottom-right": ("#8B5CF6", "#5B21B6", (1, 0, 0, 1)),
    "bottom-left":  ("#7C3AED", "#4C1D95", (1, 0, 0, 1)),
}


def symbol_markup(indent="  ", color=None, uid=""):
    """Facet polygons. `color` flat, or None for the gradient treatment.
    `uid` namespaces gradient ids so several logos can inline on one page."""
    polys = symbol_polygons()
    if color:
        return "\n".join(
            f'{indent}<polygon points="{points(p)}"/>' for p in polys.values()
        )
    defs, body = [], []
    for key, poly in polys.items():
        a, b, (x1, y1, x2, y2) = RAMP[key]
        gid = f"{uid}{key}"
        defs.append(
            f'{indent}  <linearGradient id="{gid}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">'
            f'<stop offset="0" stop-color="{a}"/>'
            f'<stop offset="1" stop-color="{b}"/></linearGradient>'
        )
        body.append(f'{indent}<polygon points="{points(poly)}" fill="url(#{gid})"/>')
    return f"{indent}<defs>\n" + "\n".join(defs) + f"\n{indent}</defs>\n" + "\n".join(body)
