"use client";

import { useEffect, useState } from "react";

/**
 * Convite de scroll no rodapé do hero. Só chama atenção enquanto a pessoa está
 * parada no topo: ao primeiro rolar, some de vez e não volta.
 */
export function ScrollCue() {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const aoRolar = () => {
      if (window.scrollY > 80) {
        setVisivel(false);
        window.removeEventListener("scroll", aoRolar);
      }
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href="#servicos"
      aria-label="Rolar para as soluções"
      className={`absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-3 transition-opacity duration-500 ${
        visivel ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-fg-muted">
        Role
      </span>
      <span className="relative h-12 w-px overflow-hidden bg-border">
        <span className="absolute inset-x-0 top-0 h-4 animate-scroll-cue bg-accent" />
      </span>
    </a>
  );
}
