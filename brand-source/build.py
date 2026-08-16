"""
Synk Innovations — asset build.

Generates every file in public/brand/ from the master geometry in
aperture.py and the logotype in wordmark.py. Run:

    python3 brand-source/build.py
    node  brand-source/qc.js          # validates what was written

Symbol-only files use the master 1000x1000 canvas so every variant is
optically identical. Lockups get a tight viewBox with a fixed margin,
measured from the artwork by qc.js rather than assumed.
"""

import math
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import aperture as ap
import wordmark as wm

OUT = pathlib.Path(__file__).parent.parent / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)

# ------------------------------------------------------------------ colour
WHITE = "#FFFFFF"
BLACK = "#000000"
VIOLET = "#8B5CF6"
PITCH = "#050505"

# ------------------------------------------------------------ logotype metrics
CAP = 24.0            # SYNK cap height
WSTROKE = 2.6
TRACK = 5.4
DESC_CAP = 7.0        # INNOVATIONS — significantly smaller, tracked out
DESC_STROKE = 1.0
DESC_GAP = 6.4

SYNK, SYNK_W = wm.word("SYNK", CAP, WSTROKE, tracking=TRACK)
DESC, DESC_W = wm.word("INNOVATIONS", DESC_CAP, DESC_STROKE, target=SYNK_W)

# ------------------------------------------------------------ lockup metrics
MARK_SIZE = 44.0                       # symbol height inside a lockup
MARK_SCALE = MARK_SIZE / (2 * ap.EXTENT)
GAP = 15.0                             # symbol -> logotype
STACK_GAP = 15.0                       # symbol -> logotype, stacked
PAD = 4.0                              # lockup viewBox margin

R = lambda v: round(v, 3)


def head(viewbox):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}">'


def mark_group(color, scale=1.0, cx=0.0, cy=0.0):
    """Master symbol, scaled about its own centre and placed at (cx, cy)."""
    return (
        f'<g fill="{color}" fill-rule="nonzero" '
        f'transform="translate({R(cx)} {R(cy)}) scale({R(scale)}) '
        f'translate({-ap.C} {-ap.C})">\n{ap.symbol_markup("    ")}\n  </g>'
    )


def type_group(paths, color, stroke, x, y):
    d = "".join(f'<path d="{p}"/>' for p in paths)
    return (
        f'<g transform="translate({R(x)} {R(y)})" fill="none" stroke="{color}" '
        f'stroke-width="{stroke}" stroke-linecap="round" stroke-linejoin="round">'
        f"{d}</g>"
    )


# ---------------------------------------------------------------- builders

def symbol_only(color):
    """Master canvas, transparent ground — the symbol at its authored size."""
    return (
        f"{head(f'0 0 {int(ap.SIZE)} {int(ap.SIZE)}')}\n"
        f'  <g fill="{color}" fill-rule="nonzero">\n{ap.symbol_markup("    ")}\n  </g>\n'
        "</svg>\n"
    )


def horizontal(color, descriptor):
    block = CAP + (DESC_GAP + DESC_CAP if descriptor else 0.0)
    top = (MARK_SIZE - block) / 2
    wx = MARK_SIZE + GAP
    parts = [mark_group(color, MARK_SCALE, MARK_SIZE / 2, MARK_SIZE / 2),
             type_group(SYNK, color, WSTROKE, wx, top)]
    if descriptor:
        parts.append(type_group(DESC, color, DESC_STROKE, wx, top + CAP + DESC_GAP))
    w = wx + SYNK_W
    vb = f"{-PAD} {-PAD} {R(w + 2 * PAD)} {R(MARK_SIZE + 2 * PAD)}"
    return head(vb) + "\n  " + "\n  ".join(parts) + "\n</svg>\n"


def stacked(color):
    width = max(MARK_SIZE, SYNK_W)
    cx = width / 2
    y1 = MARK_SIZE + STACK_GAP
    y2 = y1 + CAP + DESC_GAP
    parts = [
        mark_group(color, MARK_SCALE, cx, MARK_SIZE / 2),
        type_group(SYNK, color, WSTROKE, cx - SYNK_W / 2, y1),
        type_group(DESC, color, DESC_STROKE, cx - DESC_W / 2, y2),
    ]
    vb = f"{-PAD} {-PAD} {R(width + 2 * PAD)} {R(y2 + DESC_CAP + 2 * PAD)}"
    return head(vb) + "\n  " + "\n  ".join(parts) + "\n</svg>\n"


def favicon():
    """64x64, violet symbol on pitch black. Square, no rounded outer corners,
    and the mark is inset so it never touches an edge."""
    box = 64.0
    scale = box / ap.SIZE
    return (
        f"{head('0 0 64 64')}\n"
        f'  <rect width="64" height="64" fill="{PITCH}"/>\n'
        f'  <g fill="{VIOLET}" fill-rule="nonzero" transform="scale({R(scale)})">\n'
        f'{ap.symbol_markup("    ")}\n  </g>\n</svg>\n'
    )


def letterhead():
    """A4. Brand identity only — no invented contact details of any kind."""
    W, H, M = 210.0, 297.0, 22.0
    logo_w = 46.0
    # Height of the full horizontal lockup, in its own units.
    lock_h = MARK_SIZE + 2 * PAD
    lock_w = MARK_SIZE + GAP + SYNK_W + 2 * PAD
    logo_h = R(logo_w * lock_h / lock_w)
    rule_y = R(M + logo_h + 9)

    lock_scale = logo_w / lock_w
    lock = horizontal(BLACK, True)
    inner = lock[lock.index(">") + 1: lock.rindex("</svg>")].strip()

    foot_size = 7.0
    foot_scale = foot_size / (2 * ap.EXTENT)

    return f"""{head(f'0 0 {int(W)} {int(H)}')}
  <rect width="{int(W)}" height="{int(H)}" fill="#FFFFFF"/>

  <!-- Header: the full lockup, placed on the master geometry via a nested
       svg so its stroke weights scale exactly with the artwork. -->
  <svg x="{M}" y="{M}" width="{logo_w}" height="{logo_h}"
       viewBox="{-PAD} {-PAD} {R(lock_w)} {R(lock_h)}" overflow="visible">
    {inner}
  </svg>

  <!-- One accent, exactly the width of the logo above it. -->
  <line x1="{M}" y1="{rule_y}" x2="{W - M}" y2="{rule_y}" stroke="#E4E4E7" stroke-width="0.25"/>
  <line x1="{M}" y1="{rule_y}" x2="{R(M + logo_w)}" y2="{rule_y}" stroke="{VIOLET}" stroke-width="0.8"/>

  <!-- Correspondence sits between y={R(rule_y + 14)} and y=262, left edge x={M}. -->

  <!-- Sign-off: the symbol alone. -->
  <svg x="{M}" y="{R(H - M - foot_size)}" width="{foot_size}" height="{foot_size}"
       viewBox="0 0 {int(ap.SIZE)} {int(ap.SIZE)}" overflow="visible">
    <g fill="#D4D4D8" fill-rule="nonzero">
{ap.symbol_markup("      ")}
    </g>
  </svg>
</svg>
"""


FILES = {
    "synk-favicon.svg": favicon(),
    "synk-letterhead-a4.svg": letterhead(),
    "synk-logo-dark.svg": symbol_only(WHITE),
    "synk-logo-light.svg": symbol_only(BLACK),
    "synk-logo-violet.svg": symbol_only(VIOLET),
    "synk-logo-full-dark.svg": horizontal(WHITE, True),
    "synk-logo-full-light.svg": horizontal(BLACK, True),
    "synk-logo-stacked-dark.svg": stacked(WHITE),
    "synk-logo-stacked-light.svg": stacked(BLACK),
    "synk-mark-dark.svg": symbol_only(WHITE),
    "synk-mark-light.svg": symbol_only(BLACK),
    "synk-mark-violet.svg": symbol_only(VIOLET),
}


def emit_site_geometry():
    """Write json/site/logo.ts so the website renders the master geometry
    itself rather than a second, drifting copy of it."""
    root = pathlib.Path(__file__).parent.parent
    polys = ",\n".join(
        f'    "{ap.polygon_points(p)}"' for p in ap.symbol_polygons()
    )
    words = ",\n".join(f'    "{p}"' for p in SYNK)
    src = f'''/**
 * Synk Innovations — logo geometry. GENERATED, do not hand-edit.
 *
 * Source: brand-source/aperture.py (symbol) and brand-source/wordmark.py
 * (logotype). Regenerate with `python3 brand-source/build.py`, which also
 * rewrites every SVG in public/brand/ from these same coordinates — so the
 * site, the favicon and the letterhead can never drift apart.
 *
 * The symbol is the "Digital Aperture": two concentric frames of four
 * L-brackets, the inner one rotated 45 degrees, converging on a central
 * negative-space opening. Two systems, offset, sharing one centre.
 */

/** Master symbol on its authored {int(ap.SIZE)}x{int(ap.SIZE)} canvas. */
export const MARK = {{
  viewBox: "0 0 {int(ap.SIZE)} {int(ap.SIZE)}",
  /** Half-extent of the artwork from centre, in master units. */
  extent: {ap.EXTENT},
  polygons: [
{polys}
  ]
}} as const;

/** SYNK, stroked geometric capitals on a {CAP:g}-unit cap height. */
export const WORDMARK = {{
  cap: {CAP:g},
  width: {SYNK_W},
  strokeWidth: {WSTROKE},
  paths: [
{words}
  ]
}} as const;

/** Horizontal lockup metrics, in logotype units. */
export const LOCKUP = {{
  markSize: {MARK_SIZE:g},
  gap: {GAP:g}
}} as const;
'''
    (root / "json" / "site" / "logo.ts").write_text(src)
    print(f"  wrote json/site/logo.ts             {len(src):>6d} bytes")


if __name__ == "__main__":
    for name, content in FILES.items():
        (OUT / name).write_text(content)
        print(f"  wrote {name:32s} {len(content):>6d} bytes")
    emit_site_geometry()
    print(f"\n{len(FILES)} files -> {OUT}")
