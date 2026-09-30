"use client";

import Image from "next/image";
import { useState } from "react";

export type Video = {
  vimeoId: string;
  title: string;
  description: string;
  duration: string;
  thumb: string;
};

/** Vimeo player that only loads the iframe once someone presses play. */
export function VideoGallery({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const v = videos[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-forest-deep">
          {playing ? (
            <iframe
              src={`https://player.vimeo.com/video/${v.vimeoId}?autoplay=1&dnt=1`}
              title={v.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${v.title}`}>
              <Image src={v.thumb} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              <span className="absolute inset-0 bg-forest-deep/25 transition-colors group-hover:bg-forest-deep/10" />
              <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-xl backdrop-blur transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              </span>
            </button>
          )}
        </div>
        <h3 className="mt-6 font-display text-2xl text-forest">{v.title}</h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-stone">{v.description}</p>
      </div>

      <ul className="space-y-3">
        {videos.map((item, i) => (
          <li key={item.vimeoId}>
            <button
              type="button"
              onClick={() => {
                setActive(i);
                setPlaying(true);
              }}
              className={`flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-colors ${
                i === active ? "bg-white ring-1 ring-forest/10" : "hover:bg-white/60"
              }`}
            >
              <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl">
                <Image src={item.thumb} alt="" fill sizes="128px" className="object-cover" />
              </span>
              <span>
                <span className="block font-semibold leading-snug text-forest">{item.title}</span>
                <span className="mt-1 block text-sm text-stone">{item.duration}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
