"use client";

import { PrintIcon } from "./Icons";

/* The slip now tells people to stick it on the fridge, so it has to be
   printable. The stylesheet hides everything except the slip while the print
   dialog is open, and the flag comes off as soon as it closes. */

export default function PrintSlip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="tap cap no-print font-bold"
      style={{ color: "var(--color-deep)" }}
      data-ev="slip_print"
      onClick={() => {
        const body = document.body;
        body.dataset.print = "slip";
        const done = () => {
          delete body.dataset.print;
          window.removeEventListener("afterprint", done);
        };
        window.addEventListener("afterprint", done);
        window.print();
        // Safari on iOS does not always fire afterprint
        window.setTimeout(done, 3000);
      }}
    >
      <PrintIcon size={16} />
      <span className="ms-1.5">{label}</span>
    </button>
  );
}
