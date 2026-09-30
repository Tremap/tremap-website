import Image from "next/image";
import type { MediaItem } from "@/lib/media";

/** CSS phone frame around an app screenshot. */
export function Phone({ shot, alt, className = "" }: { shot: MediaItem; alt: string; className?: string }) {
  return (
    <div className={`relative rounded-[2.4rem] bg-ink p-2 shadow-[0_40px_80px_-30px_rgba(18,36,26,0.55)] ring-1 ring-black/40 ${className}`}>
      <div className="absolute left-1/2 top-3.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
      <Image
        src={shot.src}
        alt={alt}
        width={shot.w}
        height={shot.h}
        sizes="280px"
        className="h-auto w-full rounded-[1.9rem]"
      />
    </div>
  );
}

/** CSS desktop monitor frame around a portal screenshot. */
export function Monitor({ shot, alt }: { shot: MediaItem; alt: string }) {
  return (
    <div className="relative">
      <div className="rounded-[1.4rem] bg-ink p-3 shadow-[0_40px_90px_-30px_rgba(18,36,26,0.5)] sm:p-4">
        <Image src={shot.src} alt={alt} width={shot.w} height={shot.h} sizes="(min-width: 1024px) 55vw, 100vw" className="h-auto w-full rounded-lg" />
      </div>
      <div className="mx-auto h-10 w-24 bg-gradient-to-b from-[#c9ccd2] to-[#a9adb4] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)] sm:h-14 sm:w-32" />
      <div className="mx-auto h-2.5 w-44 rounded-full bg-[#b9bdc3] sm:w-56" />
    </div>
  );
}
