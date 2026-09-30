"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  genus: string;
  species: string;
  lat: number;
  lng: number;
  zoom: number;
  label: string;
  poster: string;
};

/** Live Tremap embed map filtered to one species; loads on demand. */
export function SpeciesMap({ genus, species, lat, lng, zoom, label, poster }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://portal.tremap.com/embedmap?zoom=${zoom}&lat=${lat}&lng=${lng}&genus=${encodeURIComponent(genus)}&species=${encodeURIComponent(species)}`;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-forest-deep ring-1 ring-forest/10 sm:aspect-[16/9]">
      {loaded ? (
        <iframe src={src} title={`Live map of ${label}`} loading="lazy" className="absolute inset-0 size-full border-0" allow="geolocation" />
      ) : (
        <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 text-left">
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-75" />
          <span className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
            <span>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                <span className="relative block size-2">
                  <span className="absolute inset-0 animate-ping-soft rounded-full bg-[#8fd18a]" />
                  <span className="absolute inset-0 rounded-full bg-[#8fd18a]" />
                </span>
                Live map
              </span>
              <span className="mt-2 block font-display text-3xl font-light text-white sm:text-4xl">
                Every mapped <em className="text-ember-soft">{label}</em>
              </span>
            </span>
            <span className="rounded-full bg-white px-6 py-3 font-semibold text-forest transition-colors group-hover:bg-sage">Load the map</span>
          </span>
        </button>
      )}
    </div>
  );
}
