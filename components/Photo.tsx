import { picture } from "@/lib/media";
import { FrameIcon } from "./Icons";
import { Tx } from "./Tx";

/* Either a real photograph or a labelled block that says what belongs there.
   No stock pictures, ever. */

export function Photo({
  src,
  alt,
  label,
  ratio,
  className = "",
  sizes = "100vw",
  priority = false,
  rounded = "rounded-[12px]",
  compact = false,
}: {
  src: string;
  alt: string;
  label?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  /* a small frame — an avatar, a logo — where a label would not fit */
  compact?: boolean;
}) {
  const pic = picture(src);
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (!pic) {
    /* A frame with nothing in it and no words is indistinguishable from a
       broken page. Every one of these says what photograph belongs here, so
       an unfinished site reads as unfinished rather than as faulty. */
    return (
      <div
        className={`ph ${rounded} ${className}`}
        style={style}
        role="img"
        aria-label={label || alt || ""}
      >
        <span className="ph-inner">
          <FrameIcon size={compact ? 18 : 22} />
          {label && !compact ? (
            <span className="ph-label">
              <Tx>{label}</Tx>
            </span>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={pic.src}
      srcSet={pic.srcSet || undefined}
      sizes={pic.srcSet ? sizes : undefined}
      width={pic.width || undefined}
      height={pic.height || undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`${rounded} ${className} block h-full w-full object-cover`}
      style={style}
    />
  );
}
