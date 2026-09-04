"""Refuse to measure a stale build.

Every browser-driven check in this folder reads out/. If a build failed and
nobody noticed — a piped-away error, an invalid bit of JSX — out/ still holds
the previous run, and every measurement taken against it is a statement about
code that is not the code. That happened: a broken ternary made the build fail
silently, and three rounds of "all green" were measured against a directory
that was hours old.

Import this and call it first.
"""
import os, sys, time


def require_fresh(root="."):
    out = os.path.join(root, "out")
    if not os.path.isdir(out):
        sys.exit("out/ does not exist — run `npm run build` first.")
    newest_out = max(
        (os.path.getmtime(os.path.join(d, f)) for d, _, fs in os.walk(out) for f in fs),
        default=0,
    )
    watched, newest_src, culprit = ("app", "components", "views", "lib", "content"), 0, ""
    for w in watched:
        for d, _, fs in os.walk(os.path.join(root, w)):
            for f in fs:
                p = os.path.join(d, f)
                m = os.path.getmtime(p)
                if m > newest_src:
                    newest_src, culprit = m, p
    if newest_src > newest_out:
        age = int(newest_src - newest_out)
        sys.exit(
            f"STALE BUILD — {culprit} is {age}s newer than anything in out/.\n"
            "Whatever this would have measured is not what the code says. "
            "Run `npm run build` and read its output before measuring."
        )
