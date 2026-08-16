"""
Synk Innovations — geometric logotype.

One construction underlies everything: two identical elliptical arcs, tangent,
sweeping in opposite directions. In the mark they close to 300 degrees and
overlap (two systems locked in phase). In the logotype the same construction
opens to 270 degrees so it reads as a letter.

Every glyph is emitted as stroked paths, so the assets carry no font
dependency and print exactly as drawn.
"""

import math

R = lambda v: round(v, 3)


def s_paths(x0, y0, w, h, i, span=270):
    """Two tangent bowls. `span` is how far each ring closes."""
    xm = x0 + w / 2
    rx = (w - 2 * i) / 2
    ry = (h - 2 * i) / 4
    cyT = y0 + i + ry
    cyB = cyT + 2 * ry

    def p(cy, deg):
        a = math.radians(deg)
        return f"{R(xm + rx * math.cos(a))} {R(cy + ry * math.sin(a))}"

    return [
        f"M {p(cyT, 90 + span)} A {R(rx)} {R(ry)} 0 1 0 {p(cyT, 90)}",
        f"M {p(cyB, 270)} A {R(rx)} {R(ry)} 0 1 1 {p(cyB, 270 + span)}",
    ]


def glyph(ch, x0, y0, w, h, i):
    """Monoline geometric capital on a cap-height grid."""
    xl, xr = R(x0 + i), R(x0 + w - i)
    yt, yb = R(y0 + i), R(y0 + h - i)
    xm, ym = R(x0 + w / 2), R(y0 + h / 2)
    rx, ry = (w - 2 * i) / 2, (h - 2 * i) / 2

    if ch == "S":
        return s_paths(x0, y0, w, h, i, 270)
    if ch == "Y":
        return [f"M {xl} {yt} L {xm} {ym} L {xr} {yt}", f"M {xm} {ym} L {xm} {yb}"]
    if ch == "N":
        return [f"M {xl} {yb} L {xl} {yt} L {xr} {yb} L {xr} {yt}"]
    if ch == "K":
        # Arm meets the stem at 61% height; the leg springs from the arm.
        joint = R(y0 + i + 0.61 * (h - 2 * i))
        legx = R(x0 + i + 0.34 * (w - 2 * i))
        legy = R(y0 + i + 0.40 * (h - 2 * i))
        return [
            f"M {xl} {yt} L {xl} {yb}",
            f"M {xr} {yt} L {xl} {joint}",
            f"M {legx} {legy} L {xr} {yb}",
        ]
    if ch == "I":
        return [f"M {xm} {yt} L {xm} {yb}"]
    if ch == "O":
        return [
            f"M {xl} {ym} A {R(rx)} {R(ry)} 0 1 1 {xr} {ym} "
            f"A {R(rx)} {R(ry)} 0 1 1 {xl} {ym}"
        ]
    if ch == "V":
        return [f"M {xl} {yt} L {xm} {yb} L {xr} {yt}"]
    if ch == "A":
        bary = R(y0 + i + 0.66 * (h - 2 * i))
        bx0 = R(x0 + i + 0.17 * (w - 2 * i))
        bx1 = R(x0 + w - i - 0.17 * (w - 2 * i))
        return [f"M {xl} {yb} L {xm} {yt} L {xr} {yb}", f"M {bx0} {bary} L {bx1} {bary}"]
    if ch == "T":
        return [f"M {xl} {yt} L {xr} {yt}", f"M {xm} {yt} L {xm} {yb}"]
    raise ValueError(f"no construction for {ch!r}")


def word(text, x, y, cap, stroke, tracking, width_ratio=0.67):
    """Set a word; returns (paths, total advance width)."""
    w = cap * width_ratio
    i = stroke / 2
    narrow = {"I": 0.28}
    paths, cursor = [], x
    for ch in text:
        gw = cap * narrow.get(ch, width_ratio)
        paths += glyph(ch, cursor, y, gw, cap, i)
        cursor += gw + tracking
    return paths, R(cursor - tracking - x)



def word(text, cap, stroke, tracking=None, target=None, ratio=0.67):
    """Set a word as stroked geometric capitals. Returns (paths, width).
    `target` tracks the word out to an exact width instead of a fixed value."""
    narrow = {"I": 0.28}
    widths = [cap * narrow.get(c, ratio) for c in text]
    if target is not None:
        tracking = (target - sum(widths)) / (len(text) - 1)
    paths, x = [], 0.0
    for c, gw in zip(text, widths):
        paths += glyph(c, x, 0, gw, cap, stroke / 2)
        x += gw + tracking
    return paths, R(x - tracking)
