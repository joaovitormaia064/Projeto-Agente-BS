"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FolderSearch } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { ProjectMockup } from "./ProjectMockup";
import { PORTFOLIO_FILTERS, PROJECTS } from "@/data/portfolio";

export function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof PORTFOLIO_FILTERS)[number]>("Todos");

  const projetos = useMemo(
    () => (filtro === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.categoria === filtro)),
    [filtro]
  );

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

        <AnimatePresence mode="wait">
          {projetos.length > 0 ? (
            <StaggerGroup
              key={filtro}
              className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projetos.map((projeto) => (
                <StaggerItem key={projeto.nome}>
                  <article className="group h-full rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_16px_40px_-16px_rgba(198,255,61,0.25)]">
                    <div className="overflow-hidden rounded-xl">
                      <ProjectMockup nome={projeto.nome} cor={projeto.corMockup} />
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold">{projeto.nome}</h3>
                        <span className="whitespace-nowrap rounded-full bg-bg-alt px-3 py-1 text-xs font-medium text-fg-muted">
                          {projeto.rotulo}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {projeto.descricao}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
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
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                        >
                          Ver site
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                        </a>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"
            >
              <FolderSearch className="h-9 w-9 text-fg-muted" strokeWidth={1.5} />
              <p className="mt-4 text-base font-medium text-fg-muted">
                Ainda não temos projetos publicados nessa categoria.
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Que tal ser o primeiro? Fale com a gente.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
