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
          <span className="todo" key={i}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
