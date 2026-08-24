"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, FolderSearch } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { PORTFOLIO_FILTERS, PROJECTS, type Project } from "@/data/portfolio";

function PeekFrame({ projeto, side }: { projeto: Project; side: "left" | "right" }) {
  return (
    <div
      className={`relative hidden aspect-[3/4] w-[13%] flex-none overflow-hidden rounded-2xl border border-border opacity-70 sm:block`}
    >
      <Image src={projeto.imagem} alt="" fill sizes="10vw" className="object-cover object-top" />
      <div
        className={`absolute inset-0 ${
          side === "left"
            ? "bg-gradient-to-r from-bg/10 via-bg/50 to-bg/85"
            : "bg-gradient-to-l from-bg/10 via-bg/50 to-bg/85"
        }`}
      />
    </div>
  );
}

export function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof PORTFOLIO_FILTERS)[number]>("Todos");
  const [index, setIndex] = useState(0);

  const projetos = useMemo(
    () => (filtro === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.categoria === filtro)),
    [filtro]
  );

  const n = projetos.length;
  const safeIndex = n ? index % n : 0;
  const atual = projetos[safeIndex];
  const anterior = n > 2 ? projetos[(safeIndex - 1 + n) % n] : undefined;
  const proximo = n > 2 ? projetos[(safeIndex + 1) % n] : undefined;

  const goTo = (i: number) => setIndex((i + n) % n);

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
                onClick={() => {
                  setFiltro(cat);
                  setIndex(0);
                }}
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

        {n > 0 && atual ? (
          <Reveal delay={0.1} className="mt-14">
            <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-b from-bg-alt to-bg px-4 py-8 sm:px-8 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-dotfield opacity-30 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]" />

              <div className="relative flex items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {atual.categoria} · {String(safeIndex + 1).padStart(2, "0")} de {String(n).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-sm font-medium text-fg-muted">{atual.nome}</p>
                </div>
                <span className="hidden rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-fg-muted sm:inline-flex">
                  {atual.rotulo}
                </span>
              </div>

              <div className="relative mt-6 flex items-center justify-center gap-3 sm:gap-5">
                {anterior && <PeekFrame projeto={anterior} side="left" />}

                <div className="group relative aspect-video flex-1 overflow-hidden rounded-[20px] border border-border bg-bg-alt shadow-[0_30px_60px_-18px_rgba(0,0,0,0.5)]">
                  <div className="flex h-7 items-center gap-1.5 border-b border-border bg-surface px-3">
                    <span className="h-2 w-2 rounded-full bg-fg-muted/40" />
                    <span className="h-2 w-2 rounded-full bg-fg-muted/40" />
                    <span className="h-2 w-2 rounded-full bg-fg-muted/40" />
                    <span className="ml-2 truncate text-[11px] text-fg-muted">{atual.preview}</span>
                  </div>
                  <iframe
                    key={atual.preview}
                    src={atual.preview}
                    title={`Site real: ${atual.nome}`}
                    loading="lazy"
                    className="h-[calc(100%-28px)] w-full border-0 bg-white"
                  />

                  {n > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => goTo(safeIndex - 1)}
                        aria-label="Projeto anterior"
                        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:border-accent hover:text-accent"
                      >
                        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(safeIndex + 1)}
                        aria-label="Próximo projeto"
                        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:border-accent hover:text-accent"
                      >
                        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                </div>

                {proximo && <PeekFrame projeto={proximo} side="right" />}
              </div>

              {n > 1 && (
                <>
                  <div className="relative mx-auto mt-6 h-1 w-full max-w-xs overflow-hidden rounded-full bg-border sm:max-w-sm">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${((safeIndex + 1) / n) * 100}%` }}
                    />
                  </div>

                  <div className="relative mt-4 flex items-center justify-center gap-2">
                    {projetos.map((p, i) => (
                      <button
                        key={p.nome}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ir para o projeto ${p.nome}`}
                        className={`h-2 rounded-full transition-all ${
                          i === safeIndex ? "w-6 bg-accent" : "w-2 bg-border hover:bg-fg-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="relative mt-7 flex justify-center gap-3">
                    {projetos.map((p, i) => (
                      <button
                        key={p.nome}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ver ${p.nome}`}
                        className={`relative aspect-[16/10] overflow-hidden rounded-lg border border-border transition-all ${
                          i === safeIndex
                            ? "w-20 opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-bg sm:w-24"
                            : "w-16 opacity-50 hover:opacity-80 sm:w-20"
                        }`}
                      >
                        <Image src={p.imagem} alt={p.nome} fill sizes="120px" className="object-cover object-top" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <p className="max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">
                {atual.descricao}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {atual.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={atual.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Abrir site completo
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
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
    </section>
  );
}
