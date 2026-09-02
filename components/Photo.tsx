import { picture } from "@/lib/media";
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
}: {
  src: string;
  alt: string;
  label?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  const pic = picture(src);
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (!pic) {
    return (
      <div
        className={`ph ${rounded} ${className}`}
        style={style}
        role="img"
        aria-label={alt || label || ""}
      >
        {label ? (
          <span className="ph-label">
            <Tx>{label}</Tx>
          </span>
        ) : null}
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
