/** Circular "30+ years" seal with slowly rotating text around the edge. */
export default function RotatingBadge() {
  return (
    <div className="relative flex size-32 items-center justify-center rounded-full bg-clay text-night shadow-[0_20px_60px_-20px_rgba(200,114,63,0.6)] sm:size-36">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
        </defs>
        <text className="fill-current text-[7.6px] font-semibold tracking-[0.2em] uppercase">
          <textPath href="#badge-circle">Quality • Integrity • Transparency •</textPath>
        </text>
      </svg>
      <span className="text-center leading-none">
        <span className="block font-display text-4xl">30+</span>
        <span className="text-[0.55rem] font-semibold tracking-[0.2em] uppercase">Years</span>
      </span>
    </div>
  );
}
