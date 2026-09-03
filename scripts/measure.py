#!/usr/bin/env python3
"""The phase gate: what a page actually renders on the audience's phone.

Run after every phase of the rebuild, at 390 and at the slow-phone profile,
and compare against the numbers in docs/DESIGN-AUDIT.md Part 3. This is the
tool that produced those numbers, kept in the repo so the comparison is
like-for-like.

    python3 scripts/measure.py                 # every route at 390
    python3 scripts/measure.py --width 360     # a budget Android
    python3 scripts/measure.py --route /rog/sugar/

It drives a real Chrome over CDP through ~/Game/Climate Change/tools/cdp.py,
which opens no tab and cannot leak, and it needs `npm run serve` on 4411.
"""
import argparse
import json
import sys
import time

sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome  # noqa: E402

ROUTES = [
    ("home", "/"), ("conditions", "/rog/"), ("sugar", "/rog/sugar/"), ("batches", "/batch/"),
    ("stories", "/kahaniyan/"), ("about", "/parichay/"), ("contact", "/sampark/"),
    ("students", "/vidyarthi/"), ("privacy", "/privacy/"), ("404", "/nahin-mila/"),
]

JS = r"""
const lum=c=>{const m=c.match(/\d+(\.\d+)?/g);if(!m)return null;const [r,g,b]=m.slice(0,3).map(Number);const a=m[3]!==undefined?Number(m[3]):1;
 const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return {L:0.2126*f(r)+0.7152*f(g)+0.0722*f(b),a}};
const bgOf=el=>{let e=el;while(e){const c=getComputedStyle(e).backgroundColor;const l=lum(c);if(l&&l.a>0.9)return c;e=e.parentElement;}return 'rgb(251,248,241)'};
const ratio=(a,b)=>{const x=lum(a).L,y=lum(b).L;const [hi,lo]=x>y?[x,y]:[y,x];return (hi+0.05)/(lo+0.05)};
const vis=el=>{const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'};
const out={};
const sizes={};const small=[];const lowContrast=[];let textNodes=0;
document.querySelectorAll('main *, header *, footer *').forEach(el=>{
  if(!vis(el))return;
  const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1);
  if(!own)return;
  textNodes++;
  const cs=getComputedStyle(el);const fs=parseFloat(cs.fontSize);sizes[fs]=(sizes[fs]||0)+1;
  const txt=el.textContent.trim().slice(0,40);
  if(fs<16)small.push(fs+'px '+txt);
  const r=ratio(cs.color,bgOf(el));
  const big=fs>=24||(fs>=18.66&&parseInt(cs.fontWeight)>=700);
  if(r<(big?3:4.5))lowContrast.push(r.toFixed(2)+' '+fs+'px "'+txt+'" on '+bgOf(el));
});
out.textNodes=textNodes;out.sizes=sizes;out.under16=small.length;out.under16Sample=small.slice(0,8);out.lowContrast=lowContrast;
const taps=[];document.querySelectorAll('a,button,input,select,textarea,summary,[role=button]').forEach(el=>{
  if(!vis(el))return;const r=el.getBoundingClientRect();
  if(r.height<44||r.width<24){const inline=el.tagName==='A'&&el.parentElement&&/^(P|LI|SPAN|DD|TD)$/.test(el.parentElement.tagName)&&el.parentElement.textContent.trim().length>el.textContent.trim().length+8;
   if(!inline)taps.push(Math.round(r.width)+'x'+Math.round(r.height)+' '+el.tagName+' "'+(el.getAttribute('aria-label')||el.textContent||'').trim().slice(0,24)+'"');}
});
out.tapsUnderSize=taps;
out.headings=[...document.querySelectorAll('h1,h2,h3')].filter(vis).map(h=>h.tagName.toLowerCase()+' '+h.textContent.trim().slice(0,30));
const ctas=[...document.querySelectorAll('a.btn, button.btn')].filter(vis);
out.ctaCount=ctas.length; out.ctaLabels=[...new Set(ctas.map(a=>a.textContent.trim()))];
out.height=document.documentElement.scrollHeight;
out.placeholders=document.querySelectorAll('.ph').length;
const fields=[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(vis);
out.fields=fields.length;out.unlabelled=fields.filter(f=>!f.id||!document.querySelector('label[for="'+f.id+'"]')).length;
return JSON.stringify(out);
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--width", type=int, default=390)
    ap.add_argument("--height", type=int, default=800)
    ap.add_argument("--route", default=None)
    ap.add_argument("--base", default="http://127.0.0.1:4411")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    routes = [r for r in ROUTES if not a.route or r[1] == a.route]
    results = {}
    for name, path in routes:
        c = Chrome(width=a.width, height=a.height)
        try:
            c.goto(a.base + path, settle=1.6)
            c.eval("window.scrollTo(0,document.body.scrollHeight);return 1")
            time.sleep(0.8)
            c.eval("window.scrollTo(0,0);return 1")
            time.sleep(0.3)
            results[name] = json.loads(c.eval(JS))
        finally:
            c.close()
    if a.json:
        print(json.dumps(results, ensure_ascii=False, indent=1))
        return
    worst = 0
    for name, v in results.items():
        share = round(100 * v["under16"] / max(1, v["textNodes"]))
        worst = max(worst, share)
        print(f"{name:11} h={v['height']:5} text nodes={v['textNodes']:4} under 16px={v['under16']:3} ({share}%) "
              f"low-contrast={len(v['lowContrast']):2} taps<size={len(v['tapsUnderSize']):2} ctas={v['ctaCount']} labels={len(v['ctaLabels'])}")
        for l in v["lowContrast"][:6]:
            print("    !! contrast", l)
        for t in v["tapsUnderSize"][:6]:
            print("    !! tap", t)
    print(f"\nworst page: {worst}% of text under 16px · the audit's starting point was 55% on home")


if __name__ == "__main__":
    main()
