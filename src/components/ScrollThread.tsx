"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/data/site";

type No = { href: string; label: string; fracao: number };

/**
 * Fio condutor vertical na lateral esquerda. A linha atravessa a tela inteira e
 * sempre sai pela borda de baixo, o que por si só sinaliza que a página continua.
 * Um ponto luminoso desce por ela conforme o scroll, e cada seção vira um nó
 * clicável no caminho.
 */
export function ScrollThread() {
  const [nos, setNos] = useState<No[]>([]);
  const [progresso, setProgresso] = useState(0);
  const trilhoRef = useRef<HTMLDivElement>(null);

  // Mapeia cada seção para a fração do documento em que ela começa.
  useEffect(() => {
    const medir = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setNos(
        NAV_LINKS.map(({ href, label }) => {
          const alvo = document.querySelector<HTMLElement>(href);
          const topo = alvo ? alvo.getBoundingClientRect().top + window.scrollY : 0;
          return { href, label, fracao: Math.min(1, Math.max(0, topo / total)) };
        })
      );
    };

    medir();
    window.addEventListener("resize", medir);
    // As imagens e fontes mudam a altura da página depois do primeiro render.
    const t = setTimeout(medir, 800);
    return () => {
      window.removeEventListener("resize", medir);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const aoRolar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgresso(total > 0 ? Math.min(1, window.scrollY / total) : 0);
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (nos.length === 0) return null;

  return (
    <div
      ref={trilhoRef}
      aria-hidden
      className="pointer-events-none fixed left-4 top-1/2 z-30 hidden h-[62vh] -translate-y-1/2 lg:block xl:left-8"
    >
      {/* Trilho: some nas pontas, para não terminar num corte seco. */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Trecho já percorrido */}
      <div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-accent/50"
        style={{ height: `${progresso * 100}%` }}
      />

      {nos.map((no) => {
        const passou = progresso >= no.fracao - 0.01;
        return (
          <a
            key={no.href}
            href={no.href}
            style={{ top: `${no.fracao * 100}%` }}
            className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
          >
            <span
              className={`block h-1.5 w-1.5 rounded-full ring-4 ring-bg transition-all duration-300 ${
                passou ? "scale-110 bg-accent" : "bg-border group-hover:bg-fg-muted"
              }`}
            />
            <span className="pointer-events-none absolute left-4 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em] text-fg-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {no.label}
            </span>
          </a>
        );
      })}

      {/* Ponto luminoso que acompanha a leitura */}
      <span
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(198,255,61,0.55)] transition-[top] duration-150 ease-out"
        style={{ top: `${progresso * 100}%` }}
      />
    </div>
  );
}
