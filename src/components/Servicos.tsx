import {
  LayoutTemplate,
  Cpu,
  Workflow,
  BarChart3,
  ShoppingCart,
  Server,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const servicos = [
  {
    icon: LayoutTemplate,
    titulo: "Sites e Landing Pages",
    descricao: "Páginas rápidas e persuasivas, construídas para converter visitantes em clientes.",
  },
  {
    icon: Cpu,
    titulo: "Sistemas Personalizados",
    descricao: "Ferramentas web sob medida para automatizar processos específicos do seu negócio.",
  },
  {
    icon: Workflow,
    titulo: "Integrações e Automações",
    descricao: "Conectamos suas ferramentas para eliminar trabalho manual e retrabalho.",
  },
  {
    icon: BarChart3,
    titulo: "Dashboards e Gestão",
    descricao: "Painéis claros para acompanhar métricas e tomar decisões com dados reais.",
  },
  {
    icon: ShoppingCart,
    titulo: "E-commerce e Portais",
    descricao: "Lojas e portais completos, do catálogo ao checkout, prontos para vender.",
  },
  {
    icon: Server,
    titulo: "Deploy e Infraestrutura",
    descricao: "Publicação segura, monitorada e preparada para picos de acesso.",
  },
];

export function Servicos() {
  return (
    <section id="servicos" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>O que fazemos</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Serviços pensados para cada etapa do seu produto digital.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map(({ icon: Icon, titulo, descricao }) => (
            <StaggerItem key={titulo}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_16px_40px_-16px_rgba(198,255,61,0.25)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-alt text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{descricao}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
