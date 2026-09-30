import Image from "next/image";
import { m } from "@/lib/media";

export const LOGOS: { id: string; name: string }[] = [
  { id: "058f91_aa629660f1aa46c797a29c90c942ab15~mv2.jpeg", name: "UK Space Agency" },
  { id: "943aed_82580ee1d4b54124a24293aff66d69b2~mv2.png", name: "Smithsonian" },
  { id: "943aed_d9a80356d66d480e8abfe5dc5d754434~mv2.png", name: "PlantNetwork" },
  { id: "943aed_7c52f974c98942f28082e1715e10270c~mv2.jpg", name: "Eden Project" },
  { id: "943aed_dc2ba62fa2fd4c099d13fef98b52881b~mv2.png", name: "Heathrow" },
  { id: "943aed_ded7fd48f9c14b3d8deec13c04952488~mv2.jpeg", name: "Ordnance Survey" },
  { id: "943aed_43f9485cdd4f401592300be710556b74~mv2.png", name: "The Nare" },
  { id: "943aed_96979bed58f54b34b78b66b1ea28eaee~mv2.jpeg", name: "University of Exeter" },
  { id: "943aed_a0ace141c4df4df9aa644a2c0903594a~mv2.jpeg", name: "AgriHub" },
  { id: "943aed_d7dd8cb04e694fa5b8ab41fab26de4b8~mv2.png", name: "BSI" },
  { id: "7ca40b_c0c447ad2acd4d65b327996d559a6b17~mv2.jpg", name: "Chaos Group" },
  { id: "943aed_91af6fa1eb9742228c220f7efc70e6a3~mv2.png", name: "Agri-TechE" },
  { id: "943aed_da3816a440fb458aaed76f754b4659f6~mv2.jpeg", name: "Duchy College Rural Business School" },
  { id: "943aed_8d5d02b13841405b96fed18611124fde~mv2.jpeg", name: "Forest Research" },
  { id: "943aed_8eb8bac5c1a14f2ca497e40cf723d215~mv2.png", name: "Agritech Cornwall" },
  { id: "7ca40b_8e263b7e96484dd3ad139f841d54ee7a~mv2.webp", name: "GB News" },
  { id: "943aed_f924ce06cc4c4c4999de17604f45efac~mv2.jpeg", name: "BioCoS" },
  { id: "943aed_43f51f1e1a7c44918008a9c97585f3f2~mv2.jpeg", name: "Business Cornwall" },
  { id: "943aed_7b08767545e14952b1822ec58b770e37~mv2.jpeg", name: "Source FM" },
  { id: "943aed_dbb17e911a51423fb7c7d4cec781cbb9~mv2.png", name: "BBC" },
  { id: "943aed_2a6837c5702f4d35a83fca8886f5c9e0~mv2.png", name: "R3GIS" },
  { id: "058f91_4f36864e9af94f3cb3356352610d2397~mv2.png", name: "Cornwall Garden Society" },
  { id: "7ca40b_d0f4dc188eff4e1cb0d0bb6a6e9d5080~mv2.jpg", name: "GREAT Britain & Northern Ireland" },
  { id: "943aed_26b4fc7d494d40c3ab725f4ae5ad103b~mv2.png", name: "Falmouth Town Council" },
  { id: "943aed_6873ee892b4a41baa9a7458703ba7672~mv2.jpeg", name: "Vancouver Master Gardeners" },
];

function Tile({ id, name }: { id: string; name: string }) {
  const item = m(id);
  return (
    <div className="grid h-24 w-40 shrink-0 place-items-center rounded-2xl bg-white px-5 shadow-[0_1px_0_rgba(18,36,26,0.04)] ring-1 ring-forest/5 transition-transform duration-500 hover:-translate-y-1 sm:h-28 sm:w-48">
      <Image
        src={item.src}
        alt={name}
        title={name}
        width={item.w}
        height={item.h}
        sizes="160px"
        className="max-h-16 w-auto max-w-full object-contain grayscale transition duration-500 hover:grayscale-0 sm:max-h-20"
      />
    </div>
  );
}

/** Two rows of partner logos drifting in opposite directions. */
export function LogoWall() {
  const half = Math.ceil(LOGOS.length / 2);
  const rows = [LOGOS.slice(0, half), LOGOS.slice(half)];
  return (
    <div className="space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      {rows.map((row, r) => (
        <div key={r} className="overflow-hidden">
          <div
            className={`flex w-max gap-4 pr-4 hover:[animation-play-state:paused] ${
              r === 0 ? "animate-marquee" : "animate-marquee [animation-direction:reverse]"
            }`}
          >
            {[...row, ...row].map((logo, i) => (
              <div key={i} aria-hidden={i >= row.length}>
                <Tile {...logo} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
