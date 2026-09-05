#!/usr/bin/env python3
"""Build the site's font files.

Two families, one per script. Devanagari is Anek Devanagari; everything in
Latin letters — the English site, and the digits and loanwords inside Hindi —
is Montserrat, which Agosh chose on 5 Sep 2026.

Google serves both as variable fonts carrying every weight there is. This site
sets text in exactly two, so each is instanced at 400 and 700 and subsetted to
its own script, and a page never downloads outlines it will not draw.

Run after changing a weight in globals.css:  python3 scripts/fonts.py
Needs: pip install fonttools brotli
"""
import os, subprocess, urllib.request, re, tempfile

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "fonts")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120 Safari/537.36")
# the two weights globals.css actually sets: reading, and emphasis
WEIGHTS = (400, 700)
# Why the whole Devanagari block, and not just the letters the site uses today
# -------------------------------------------------------------------------
# Subsetting to the site's own text was measured: 75.5 KB against 88.4 KB, so
# 26 KB across the two weights. It saves little because Devanagari conjuncts
# close over each other — 862 glyphs survive out of 967 either way.
#
# What it drops is worse than what it saves. The 68 unused code points include
# the nukta letters ड़ ढ़ क़ ज़ फ़, which are ordinary Hindi: जोड़ों का दर्द,
# पहाड़. The day someone writes one into content/, the character vanishes from
# the page with no error anywhere. 26 KB is not worth a font that breaks when
# the copy changes. Ship the block.

# script -> (key, Google family, weight axis, the cut Google names in its CSS)
FAMILIES = (
    ("dev", "Anek+Devanagari", "100..800", "devanagari"),
    ("lat", "Montserrat", "100..900", "latin"),
)
PREFIX = {"dev": "anek", "lat": "mont"}

RANGES = {
    "dev": "U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+25CC,U+A830-A839,U+A8E0-A8FF",
    "lat": "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215",
}

def main():
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for key, family, axis, subset in FAMILIES:
            css = urllib.request.urlopen(urllib.request.Request(
                f"https://fonts.googleapis.com/css2?family={family}:wght@{axis}&display=swap",
                headers={"User-Agent": UA})).read().decode()
            src = dict(re.findall(
                r'/\*\s*([\w\-]+)\s*\*/\s*@font-face\s*\{[^}]*src:\s*url\((https://[^)]+\.woff2)\)', css))
            if subset not in src:
                raise SystemExit(f"fonts: Google served no {subset} cut of {family}")
            raw = os.path.join(tmp, f"{key}.woff2")
            urllib.request.urlretrieve(src[subset], raw)
            for w in WEIGHTS:
                f = TTFont(raw)
                instancer.instantiateVariableFont(f, {"wght": w}, inplace=True, updateFontNames=False)
                cut = os.path.join(tmp, f"{key}-{w}.ttf"); f.flavor = None; f.save(cut)
                out = os.path.join(OUT, f"{PREFIX[key]}-{key}-{w}.woff2")
                subprocess.run(["pyftsubset", cut, f"--output-file={out}", "--flavor=woff2",
                                "--layout-features=*", "--no-hinting", "--desubroutinize",
                                f"--unicodes={RANGES[key]}"], check=True)
                print(f"  {os.path.basename(out):<22} {os.path.getsize(out)/1024:6.1f} KB")

if __name__ == "__main__":
    main()
