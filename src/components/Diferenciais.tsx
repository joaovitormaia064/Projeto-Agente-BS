import { SectionLabel } from "./SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

/**
 * Os nomes sozinhos não dizem muita coisa para quem não é da área, então cada
 * um vem com uma linha em português claro explicando para que serve.
 */
const categorias = [
  {
    nome: "Landing Pages",
    explica: "Uma página só, feita para convencer o visitante e gerar contato.",
  },
  {
    nome: "Sistemas Web",
    explica: "Um programa que roda no navegador, sem precisar instalar nada.",
  },
  {
    nome: "Dashboards",
    explica: "Painéis que mostram os números do seu negócio em tempo real.",
  },
  {
    nome: "Automações",
    explica: "Tarefas repetitivas que passam a acontecer sozinhas.",
  },
  {
    nome: "Portais",
    explica: "Área com login, onde cada cliente vê apenas o que é dele.",
  },
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
    <section className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Soluções sob medida</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Cada projeto é construído do zero para resolver um problema real.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
          {categorias.map(({ nome, explica }) => (
            <StaggerItem key={nome}>
              <div className="group border-l border-border pl-4 transition-colors duration-300 hover:border-accent">
                <h3 className="font-display text-sm font-semibold transition-colors duration-300 group-hover:text-accent">
                  {nome}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{explica}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

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
