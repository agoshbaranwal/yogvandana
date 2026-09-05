import { picture } from "@/lib/media";
import { FrameIcon } from "./Icons";
import { Tx } from "./Tx";

/* Either a real photograph, or a frame the exact size that photograph will be,
   saying what belongs in it. No stock pictures, ever.

   Two rules, both of which the site was breaking somewhere:

   THE BOX DOES NOT MOVE. A placeholder reserves the same aspect ratio the real
   picture will be cropped to, so the day a photograph is uploaded nothing on
   the page shifts. `ratio` is therefore required — scripts/type-check.mjs
   fails a <Photo> without one, because a frame with no ratio collapses to
   whatever its content happens to be and then jumps when filled.

   IT SAYS WHAT GOES IN IT. Every frame carries its own caption. A frame big
   enough holds the words inside it; one too small — a 52px avatar, a 104px
   logo — carries them underneath instead, because a label that does not fit is
   a label nobody reads. */

export function Photo({
  src,
  alt,
  label,
  ratio,
  className = "",
  sizes = "100vw",
  priority = false,
  rounded = "rounded-[var(--radius-card)]",
  compact = false,
}: {
  src: string;
  alt: string;
  label?: string;
  /* what shape the real photograph will be cropped to — required, so the
     placeholder and the picture occupy identical space */
  ratio: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  /* too small to hold words: shows the icon alone, never a caption outside */
  compact?: boolean;
}) {
  const pic = picture(src);
  const style = { aspectRatio: ratio };

  /* The width and height attributes describe THE BOX, not the file.

     They used to carry the picture's own pixel dimensions, which gave the
     browser a second, competing aspect ratio — and the About portrait grew
     from 425px tall to 460px the moment a photograph was dropped in, because
     the file was 9:16 and the frame is 4:5. The frame decides the shape; the
     photograph is cropped into it. Parsing the ratio here keeps the two from
     disagreeing, and still gives the browser a size to reserve before the
     image loads. */
  /* Tailwind picks between two width utilities by their order in the built
     stylesheet, not their order in this string, so a hardcoded `w-full` here
     quietly beat a caller's `w-[112px]`. Nothing showed it while every frame
     was a placeholder; the day a real photograph arrived, her thumbnail on
     the home page rendered at 328px inside a 320px row and burst it. The
     image fills its box only when the caller has not said how wide the box
     is. Credibility rule 25 fails the build if the two ever collide again. */
  const setsWidth = /(?:^|\s)(?:[a-z]{2,6}:)?(?:w|max-w)-/.test(className);
  const [rw, rh] = ratio.split("/").map((n) => Number(n.trim()));
  const box =
    Number.isFinite(rw) && Number.isFinite(rh) && rh > 0
      ? { width: Math.round(rw * 100), height: Math.round(rh * 100) }
      : {};

  if (pic) {
    const img = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={pic.src}
        srcSet={pic.srcSet || undefined}
        sizes={pic.srcSet ? sizes : undefined}
        width={box.width}
        height={box.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        /* No h-full: the ratio decides the height, exactly as it does for the
           empty frame. With h-full a photograph stretched to fill a parent
           that had a min-height — the About portrait went 425px → 460px the
           moment a picture arrived, while the placeholder beside it stayed at
           425. The two must behave identically or the box moves. */
        className={`${rounded} block ${setsWidth ? "" : "w-full"} object-cover ${compact ? "" : className}`}
        style={style}
      />
    );
    return compact ? <span className={`block ${className}`}>{img}</span> : img;
  }

  const frame = (
    <span
      className={`ph block ${rounded} ${className}`}
      style={style}
      role="img"
      aria-label={label || alt || ""}
    >
      <span className="ph-inner">
        <FrameIcon size={compact ? 16 : 22} />
        {label && !compact ? (
          <span className="ph-label">
            <Tx>{label}</Tx>
          </span>
        ) : null}
      </span>
    </span>
  );

  return frame;
}
