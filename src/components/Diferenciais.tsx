import { SectionLabel } from "./SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const categorias = [
  "Landing Pages",
  "Sistemas Web",
  "Dashboards",
  "Automações",
  "Portais",
];

const blocos = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    descricao: "Entendemos seu negócio, seu público e o que o site precisa entregar.",
  },
  {
    numero: "02",
    titulo: "Design autoral",
    descricao: "Layout exclusivo, pensado para conversão e identidade da sua marca.",
  },
  {
    numero: "03",
    titulo: "Desenvolvimento",
    descricao: "Código limpo, rápido e preparado para crescer junto com você.",
  },
  {
    numero: "04",
    titulo: "Evolução contínua",
    descricao: "Suporte e melhorias depois do lançamento, sem deixar o projeto parado.",
  },
];

export function Diferenciais() {
  return (
    <section className="border-t border-border py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Soluções sob medida</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Cada projeto é construído do zero para resolver um problema real.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          {categorias.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg-muted"
            >
              {cat}
            </span>
          ))}
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {blocos.map((bloco) => (
            <StaggerItem key={bloco.numero}>
              <div className="border-t border-border pt-6">
                <span className="font-display text-3xl font-semibold text-accent">
                  {bloco.numero}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{bloco.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{bloco.descricao}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
