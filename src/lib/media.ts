import media from "@/content/media.json";

export type MediaItem = { src: string; w: number; h: number };

const MEDIA = media as Record<string, MediaItem>;

/** Looks up an image migrated from the Wix site by its original media id. */
export function m(id: string): MediaItem {
  const item = MEDIA[id];
  if (!item) throw new Error(`Unknown media id: ${id}`);
  return item;
}
