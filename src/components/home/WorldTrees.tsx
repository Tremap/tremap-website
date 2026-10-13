"use client";

import { useEffect, useRef } from "react";
import world from "@/content/world-trees.json";

// Dotted world map with the real Tremap tree clusters lighting up on it.
// `world.trees` is a snapshot of the cluster API ([lng, lat, trees]) and
// `world.land` is a 2 degree grid of land cells ([lng, lat]).
const LAND = world.land as [number, number][];
const TREES = world.trees as [number, number, number][];

const LNG_MIN = -168;
const LNG_SPAN = 348;
const LAT_MAX = 74;
const LAT_SPAN = 130;

const LAND_FADE = 1.4;
const TREES_START = 0.7;
const TREES_SWEEP = 2.2;

type Dot = { x: number; y: number; r: number; hot: boolean; delay: number; count: number };

function easeOutBack(t: number) {
  const c = 1.9;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}

export function WorldTrees({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let land: { x: number; y: number; delay: number }[] = [];
    let trees: Dot[] = [];
    let landR = 1;
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999 };
    const pulses: { dot: Dot; born: number }[] = [];
    let lastPulse = 0;

    function layout() {
      const rect = host!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Wide screens fit the whole world; narrow ones crop to Europe and the Atlantic.
      const wide = width >= 900;
      const scale = wide ? Math.min((width * 0.94) / LNG_SPAN, (height * 0.8) / LAT_SPAN) : (height * 0.5) / LAT_SPAN;
      const centreLng = wide ? LNG_MIN + LNG_SPAN / 2 : -18;
      const ox = width / 2 - (centreLng - LNG_MIN) * scale;
      const oy = wide ? Math.max(70, (height - LAT_SPAN * scale) * 0.3) : height * 0.1;
      const project = (lng: number, lat: number) => ({ x: ox + (lng - LNG_MIN) * scale, y: oy + (LAT_MAX - lat) * scale });

      landR = Math.max(0.9, scale * 0.3);
      const cx = width / 2;
      const cy = oy + (LAT_SPAN * scale) / 2;
      const far = Math.hypot(width, height) / 2;
      land = LAND.map(([lng, lat]) => {
        const p = project(lng, lat);
        return { ...p, delay: (Math.hypot(p.x - cx, p.y - cy) / far) * 0.9 };
      }).filter((p) => p.x > -10 && p.x < width + 10 && p.y < height + 10);

      trees = TREES.map(([lng, lat, count], i) => {
        const p = project(lng, lat);
        return {
          ...p,
          count,
          hot: count >= 100_000,
          r: (1.1 + Math.log10(count + 1) * 0.62) * Math.max(0.8, Math.min(1.5, scale / 3.6)),
          // West-to-east sweep with a little scatter so it does not look like a scanner.
          delay: TREES_START + ((lng - LNG_MIN) / LNG_SPAN) * TREES_SWEEP + ((i * 37) % 100) / 260,
        };
      }).filter((p) => p.x > -20 && p.x < width + 20 && p.y < height + 20);
    }

    function draw(now: number) {
      const t = reduce ? 99 : (now - start) / 1000;
      ctx!.clearRect(0, 0, width, height);

      // Land dots: one path for the calm ones, brighter ones near the pointer.
      ctx!.fillStyle = "rgba(223,231,214,0.3)";
      ctx!.beginPath();
      const near: { x: number; y: number; k: number }[] = [];
      for (const p of land) {
        const a = Math.min(1, Math.max(0, (t - p.delay) / LAND_FADE));
        if (a <= 0) continue;
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (d < 130) near.push({ x: p.x, y: p.y, k: 1 - d / 130 });
        const r = landR * (0.4 + 0.6 * a);
        ctx!.moveTo(p.x + r, p.y);
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      ctx!.fill();
      for (const p of near) {
        ctx!.fillStyle = `rgba(223,231,214,${0.1 + p.k * 0.55})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, landR * (1 + p.k * 0.9), 0, Math.PI * 2);
        ctx!.fill();
      }

      // Tree clusters
      let hovered: Dot | null = null;
      let hoveredDist = 26;
      for (const dot of trees) {
        const k = Math.min(1, Math.max(0, (t - dot.delay) / 0.7));
        if (k <= 0) continue;
        const s = easeOutBack(k);
        const twinkle = reduce ? 1 : 0.86 + 0.14 * Math.sin(t * 1.6 + dot.x * 0.05 + dot.y * 0.03);
        const rgb = dot.hot ? "243,154,100" : "143,209,138";
        const r = dot.r * s;

        // One ring as the cluster lands
        if (k < 1) {
          ctx!.strokeStyle = `rgba(${rgb},${0.5 * (1 - k)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(dot.x, dot.y, r + k * 16, 0, Math.PI * 2);
          ctx!.stroke();
        }
        ctx!.fillStyle = `rgba(${rgb},${0.13 * twinkle})`;
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, r * 2.7, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${rgb},${0.95 * twinkle})`;
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx!.fill();

        const d = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
        if (k === 1 && d < hoveredDist) {
          hovered = dot;
          hoveredDist = d;
        }
      }

      // Slow pulses on random clusters once everything has landed
      if (!reduce && t > TREES_START + TREES_SWEEP + 1 && trees.length) {
        if (now - lastPulse > 420) {
          lastPulse = now;
          pulses.push({ dot: trees[Math.floor(Math.random() * trees.length)], born: now });
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const age = (now - pulses[i].born) / 1800;
          if (age >= 1) {
            pulses.splice(i, 1);
            continue;
          }
          const { dot } = pulses[i];
          ctx!.strokeStyle = `rgba(${dot.hot ? "243,154,100" : "143,209,138"},${0.45 * (1 - age)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(dot.x, dot.y, dot.r + age * 22, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      // Tree count for the cluster under the pointer
      if (hovered) {
        const label = `${hovered.count.toLocaleString("en-GB")} trees`;
        ctx!.font = "600 12px system-ui, sans-serif";
        const w = ctx!.measureText(label).width + 20;
        const x = Math.min(width - w - 8, Math.max(8, hovered.x - w / 2));
        const y = hovered.y - hovered.r - 34;
        ctx!.strokeStyle = "rgba(255,255,255,0.9)";
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(hovered.x, hovered.y, hovered.r + 4, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.fillStyle = "rgba(255,255,255,0.96)";
        ctx!.beginPath();
        ctx!.roundRect(x, y, w, 24, 12);
        ctx!.fill();
        ctx!.fillStyle = "#12241a";
        ctx!.textBaseline = "middle";
        ctx!.fillText(label, x + 10, y + 12.5);
      }

      if (!reduce && visible) frame = requestAnimationFrame(draw);
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    layout();
    frame = requestAnimationFrame(draw);

    const resize = new ResizeObserver(() => {
      layout();
      if (reduce) draw(performance.now());
    });
    resize.observe(host);
    const seen = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) frame = requestAnimationFrame(draw);
    });
    seen.observe(host);
    // Listen on the whole hero so the text above the canvas does not block it.
    const area = host.closest("section") ?? host;
    area.addEventListener("pointermove", onPointer as EventListener);
    area.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      area.removeEventListener("pointermove", onPointer as EventListener);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block size-full ${className}`} />;
}
