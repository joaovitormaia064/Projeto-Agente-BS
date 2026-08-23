"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, FolderSearch } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { PORTFOLIO_FILTERS, PROJECTS } from "@/data/portfolio";

export function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof PORTFOLIO_FILTERS)[number]>("Todos");
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const projetos = useMemo(
    () => (filtro === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.categoria === filtro)),
    [filtro]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [index]);

  const goTo = (i: number) => setIndex((i + projetos.length) % projetos.length);

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

        {projetos.length > 0 ? (
          <Reveal delay={0.1} className="mt-14">
            <div className="relative">
              <div
                ref={trackRef}
                className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {projetos.map((projeto) => (
                  <article
                    key={projeto.nome}
                    className="group w-full flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-surface md:grid md:grid-cols-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                      <Image
                        src={projeto.imagem}
                        alt={`Screenshot do projeto ${projeto.nome}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-10">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-2xl font-semibold">{projeto.nome}</h3>
                        <span className="whitespace-nowrap rounded-full bg-bg-alt px-3 py-1 text-xs font-medium text-fg-muted">
                          {projeto.rotulo}
                        </span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-fg-muted">
                        {projeto.descricao}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {projeto.tecnologias.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {projeto.url && (
                        <a
                          href={projeto.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent"
                        >
                          Ver site
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {projetos.length > 1 && (
                <div className="mt-8 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    aria-label="Projeto anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                  </button>

                  <div className="flex items-center gap-2">
                    {projetos.map((projeto, i) => (
                      <button
                        key={projeto.nome}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ir para o projeto ${projeto.nome}`}
                        className={`h-2 rounded-full transition-all ${
                          i === index ? "w-6 bg-accent" : "w-2 bg-border"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label="Próximo projeto"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              )}
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
