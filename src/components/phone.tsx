import clsx from "clsx";

/**
 * Light, silver iPhone-style frame around a real CreatorPay screen.
 * `src` should be a top-fold screen (aspect ≈ 0.46) unless `scroll` is used.
 */
export function Phone({
  src,
  alt,
  className,
  notch = true,
  priority,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  notch?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "relative aspect-[0.485] rounded-[13%/6.2%] bg-gradient-to-b from-[#f3f5f8] to-[#dfe4ea] p-[3.2%] shadow-[0_40px_80px_-30px_rgba(17,2,2,0.35),inset_0_0_0_1.5px_#c3ccd6]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full select-none" draggable={false} loading={priority ? "eager" : "lazy"} />
        {children}
      </div>
      {notch && <div className="absolute left-1/2 top-[4.4%] h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden />}
    </div>
  );
}
