import { Fragment } from "react";

/* A fact that is still to be filled in is written as [like this]. Marking it
   up keeps a half-finished page honest: the reader sees a blank waiting for a
   number, not a broken sentence. */

export function Tx({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          /* the chip itself says "not filled in yet", so the brackets that
             mark it in the content file are not repeated on screen */
          <span className="todo" key={i}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
