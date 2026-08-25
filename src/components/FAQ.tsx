"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const perguntas = [
  {
    pergunta: "Qual a diferença entre um site e uma landing page?",
    resposta:
      "O site tem várias páginas (início, sobre, soluções, contato) e funciona como o endereço fixo do seu negócio na internet, para quem quer conhecer você por inteiro. A landing page é uma página única, com um objetivo só: levar quem chegou ali a tomar uma ação, como pedir um orçamento ou comprar. Ela costuma ser o destino de um anúncio ou de um post, quando a pessoa já foi atraída e só precisa decidir. Na prática, muita gente usa os dois: o site institucional sempre no ar e uma landing page para cada campanha.",
  },
  {
    pergunta: "Quanto tempo leva para o site ficar pronto?",
    resposta:
      "Landing pages costumam ficar prontas em 1 a 2 semanas. Sistemas e portais mais completos variam de 3 a 8 semanas, dependendo do escopo definido no briefing.",
  },
  {
    pergunta: "O site funciona bem no celular?",
    resposta:
      "Sim. Todo projeto é desenvolvido mobile-first e testado em diferentes tamanhos de tela antes da entrega.",
  },
  {
    pergunta: "Vocês oferecem manutenção depois da entrega?",
    resposta:
      "Sim. Oferecemos planos de manutenção mensal para atualizações, novas páginas e ajustes de performance sempre que precisar.",
  },
  {
    pergunta: "Eu consigo editar o conteúdo do site sozinho?",
    resposta:
      "Depende do projeto. Para sites institucionais, entregamos um painel simples de edição. Para sistemas sob medida, definimos juntos quais áreas devem ser editáveis.",
  },
  {
    pergunta: "Onde o site fica hospedado?",
    resposta:
      "Trabalhamos com hospedagem em nuvem de alta performance (Vercel, AWS). Você pode usar seu próprio domínio ou contratarmos um para você.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta:
      "Normalmente dividimos em duas etapas: 50% no início do projeto e 50% na entrega. Para projetos maiores, parcelamos conforme as fases do desenvolvimento.",
  },
];

export function FAQ() {
  // Todas fechadas ao abrir a página: quem chega decide o que quer ler.
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <SectionLabel>Dúvidas</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 divide-y divide-border border-t border-b border-border">
          {perguntas.map((item, index) => {
            const isOpen = aberto === index;
            return (
              <div key={item.pergunta}>
                <button
                  type="button"
                  onClick={() => setAberto(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold sm:text-lg">
                    {item.pergunta}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-accent"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-fg-muted sm:text-base">
                        {item.resposta}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
