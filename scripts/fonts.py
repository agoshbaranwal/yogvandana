#!/usr/bin/env python3
"""Build the site's font files.

Google serves Anek Devanagari as a variable font carrying every weight from
100 to 800. The Devanagari cut of that is 252 KB, and this site sets text in
exactly two weights. Cutting two static instances and subsetting each to the
Devanagari block takes the pair to 176 KB, and the Latin pair to 37 KB.

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

RANGES = {
    "dev": "U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+25CC,U+A830-A839,U+A8E0-A8FF",
    "lat": "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215",
}

def main():
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    css = urllib.request.urlopen(urllib.request.Request(
        "https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@100..800&display=swap",
        headers={"User-Agent": UA})).read().decode()
    src = dict(re.findall(r'/\*\s*([\w\-]+)\s*\*/\s*@font-face\s*\{[^}]*src:\s*url\((https://[^)]+\.woff2)\)', css))
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for key, subset in (("dev", "devanagari"), ("lat", "latin")):
            raw = os.path.join(tmp, subset + ".woff2")
            urllib.request.urlretrieve(src[subset], raw)
            for w in WEIGHTS:
                f = TTFont(raw)
                instancer.instantiateVariableFont(f, {"wght": w}, inplace=True, updateFontNames=False)
                cut = os.path.join(tmp, f"{key}-{w}.ttf"); f.flavor = None; f.save(cut)
                out = os.path.join(OUT, f"anek-{key}-{w}.woff2")
                subprocess.run(["pyftsubset", cut, f"--output-file={out}", "--flavor=woff2",
                                "--layout-features=*", "--no-hinting", "--desubroutinize",
                                f"--unicodes={RANGES[key]}"], check=True)
                print(f"  anek-{key}-{w}.woff2  {os.path.getsize(out)/1024:6.1f} KB")

if __name__ == "__main__":
    main()
