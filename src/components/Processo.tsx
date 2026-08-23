import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { whatsappLink } from "@/data/site";

const etapas = [
  {
    numero: "01",
    titulo: "Briefing",
    descricao: "Conversamos sobre objetivos, prazo e orçamento — sem enrolação.",
  },
  {
    numero: "02",
    titulo: "Protótipo",
    descricao: "Você aprova o layout antes de qualquer linha de código ser escrita.",
  },
  {
    numero: "03",
    titulo: "Construção",
    descricao: "Desenvolvemos com atualizações periódicas até o resultado final.",
  },
  {
    numero: "04",
    titulo: "Lançamento",
    descricao: "Publicamos, testamos e entregamos com suporte para os primeiros ajustes.",
  },
];

export function Processo() {
  return (
    <section id="processo" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Como funciona</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Um processo simples, do primeiro contato ao site no ar.
          </h2>
        </Reveal>

        <StaggerGroup className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          <div
            className="absolute left-[18px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[18px] md:h-px md:w-auto md:bottom-auto"
            aria-hidden
          />
          {etapas.map((etapa) => (
            <StaggerItem key={etapa.numero} className="relative pl-12 md:pl-0 md:pt-12">
              <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-accent bg-bg font-display text-sm font-semibold text-accent md:left-0 md:top-0">
                {etapa.numero}
              </div>
              <h3 className="font-display text-lg font-semibold">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{etapa.descricao}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-16 flex justify-center">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-fg transition-all hover:border-accent hover:text-accent"
          >
            Começar meu projeto
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
