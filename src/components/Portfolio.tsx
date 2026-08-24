"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, FolderSearch, Play, X } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { PORTFOLIO_FILTERS, PROJECTS, type Project } from "@/data/portfolio";

function ProjectCard({ projeto, onOpen }: { projeto: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-[82%] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors duration-300 hover:border-accent/60 sm:w-[46%] lg:w-[31%]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <div
          style={{ backgroundImage: `url(${projeto.imagemLonga})` }}
          className="absolute inset-0 origin-top bg-[length:100%_auto] bg-top transition-[background-position,transform] duration-[6000ms] ease-out group-hover:bg-bottom group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-accent text-accent-fg opacity-0 shadow-[0_8px_24px_rgba(198,255,61,0.4)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {projeto.rotulo}
          </span>
          <h3 className="mt-1 font-display text-lg font-semibold text-fg">{projeto.nome}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {projeto.tecnologias.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-bg/60 px-2 py-0.5 text-[11px] text-fg-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function PreviewModal({ projeto, onClose }: { projeto: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex aspect-video w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-bg-alt shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-10 flex-shrink-0 items-center justify-between border-b border-border bg-surface px-4">
          <span className="truncate text-sm font-medium text-fg-muted">{projeto.nome}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar prévia"
            className="flex h-7 w-7 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg hover:text-fg"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
        <iframe
          src={projeto.preview}
          title={`Site real: ${projeto.nome}`}
          className="h-full w-full flex-1 border-0 bg-white"
        />
      </div>
    </div>
  );
}

export function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof PORTFOLIO_FILTERS)[number]>("Todos");
  const [aberto, setAberto] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const projetos = useMemo(
    () => (filtro === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.categoria === filtro)),
    [filtro]
  );

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("button");
    const amount = card ? card.clientWidth + 24 : 320;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>Projetos entregues</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Resultado antes de promessa.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFiltro(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  filtro === cat
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {projetos.length > 0 ? (
          <Reveal delay={0.1} className="mt-14">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-fg-muted">
                Passe o mouse para ver mais da página. Clique para navegar de verdade.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Anterior"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Próximo"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {projetos.map((projeto) => (
                <ProjectCard key={projeto.nome} projeto={projeto} onOpen={() => setAberto(projeto)} />
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
            <FolderSearch className="h-9 w-9 text-fg-muted" strokeWidth={1.5} />
            <p className="mt-4 text-base font-medium text-fg-muted">
              Ainda não temos projetos publicados nessa categoria.
            </p>
            <p className="mt-1 text-sm text-fg-muted">
              Que tal ser o primeiro? Fale com a gente.
            </p>
          </div>
        )}
      </div>

      {aberto && <PreviewModal projeto={aberto} onClose={() => setAberto(null)} />}
    </section>
  );
}
