"""Are these mockups actually different, or one design wearing hats?

Run it on a set of option boards BEFORE showing them to anyone. It compares
each pair on two axes:

  layout   the DOM skeleton — tag plus first class, in order, content stripped.
           Two pages that differ only in CSS score near 100%.
  words    the Devanagari vocabulary they share. Two pages saying the same
           thing in a different order score near 100%.

History, measured after Agosh asked why every set looked the same:

    r10 (story card)   69% layout   68% words
    r11 (concepts)     41% layout   98% words   ← same copy, reordered
    r12 (languages)     7% layout   40% words   ← the only genuinely different set
    r13 (versions)    100% layout  100% words   ← one build() and a CSS class

Anything over the ceiling below is one option, not several.

    python3 scripts/variety.py public/r14/*.html
"""
import sys, re, itertools, pathlib, difflib

CEIL_LAYOUT = 45
CEIL_WORDS = 55

def _clean(p):
    h = pathlib.Path(p).read_text(encoding="utf-8")
    return re.sub(r"<(script|style)[^>]*>.*?</\1>", "", h, flags=re.S)

def shape(p):
    body = _clean(p)
    cut = re.split(r"ON A PHONE|on a phone", body)
    body = cut[-1] if len(cut) > 1 else body
    return [f"{t}.{(c or '').split()[0] if c else ''}"
            for t, c in re.findall(r'<(\w+)[^>]*?(?:class="([^"]*)")?[^>]*>', body)]

def words(p):
    return set(re.findall(r"[ऀ-ॿ]{3,}", _clean(p)))

files = sys.argv[1:]
if len(files) < 2:
    sys.exit("give it two or more option files")

worst = 0
print(f"  ceiling: {CEIL_LAYOUT}% layout, {CEIL_WORDS}% shared words\n")
for a, b in itertools.combinations(files, 2):
    lay = difflib.SequenceMatcher(None, shape(a), shape(b)).ratio() * 100
    A, B = words(a), words(b)
    wor = len(A & B) / max(1, len(A | B)) * 100
    bad = lay > CEIL_LAYOUT or wor > CEIL_WORDS
    worst = max(worst, lay - CEIL_LAYOUT, wor - CEIL_WORDS)
    print(f"  {'FAIL' if bad else '    '}  {pathlib.Path(a).name} vs {pathlib.Path(b).name}"
          f"   layout {lay:5.0f}%   words {wor:5.0f}%")

print("\n  " + ("these are variations of one design — build them separately, from scratch"
                if worst > 0 else "these are genuinely different designs"))
sys.exit(1 if worst > 0 else 0)
