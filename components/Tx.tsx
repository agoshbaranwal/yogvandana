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
          /* A chip marks a short missing value inside a real sentence — a
             date, a number, a name. A whole missing sentence in a chip wraps
             into broken grey rectangles and takes over the page, so past a
             few words it is simply set in the muted ink instead. */
          <span className={part.length > 26 ? "todo-long" : "todo"} key={i}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
