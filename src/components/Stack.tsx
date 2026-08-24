import type { CSSProperties } from "react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

/** Medidas da peça, em unidades do viewBox. */
const L = 124; // largura
const A = 78; // altura
const R = 10; // raio do encaixe
const M = R + 3; // folga no SVG para o encaixe não ser cortado

type Encaixe = -1 | 0 | 1;

/**
 * Peças soltas: cada uma tem o seu próprio recorte e a sua própria deriva.
 * As fases e durações são diferentes de propósito, para o conjunto nunca
 * pulsar em bloco e o movimento parecer natural.
 */
const PECAS: {
  nome: string;
  lados: [Encaixe, Encaixe, Encaixe, Encaixe]; // cima, direita, baixo, esquerda
  desloca: number; // desalinhamento vertical em repouso
  sobe: number; // amplitude da flutuação
  gira: [number, number]; // rotação de partida e de chegada
  duracao: number;
  atraso: number;
}[] = [
  { nome: "React", lados: [0, 1, -1, 0], desloca: 6, sobe: 9, gira: [-3, -1], duracao: 6.5, atraso: 0 },
  { nome: "Next.js", lados: [-1, 0, 1, 1], desloca: -10, sobe: 7, gira: [2, 4], duracao: 7.8, atraso: 0.9 },
  { nome: "TypeScript", lados: [1, -1, 0, 0], desloca: 12, sobe: 11, gira: [-1, -4], duracao: 5.9, atraso: 1.7 },
  { nome: "Node.js", lados: [0, 1, 1, -1], desloca: -6, sobe: 8, gira: [3, 1], duracao: 8.4, atraso: 0.4 },
  { nome: "Tailwind", lados: [-1, 0, 0, 1], desloca: 9, sobe: 10, gira: [-2, -5], duracao: 6.9, atraso: 2.3 },
  { nome: "PostgreSQL", lados: [1, -1, -1, 0], desloca: -12, sobe: 7, gira: [4, 2], duracao: 7.3, atraso: 1.2 },
];

/**
 * Desenha uma peça de quebra-cabeça. Cada lado pode ser reto (0), ter uma
 * saliência (1) ou uma reentrância (-1). O caminho é percorrido no sentido
 * horário, começando no canto superior esquerdo.
 */
function caminhoDaPeca(cima: Encaixe, direita: Encaixe, baixo: Encaixe, esquerda: Encaixe) {
  const d: string[] = ["M 0 0"];

  if (cima === 0) d.push(`L ${L} 0`);
  else {
    d.push(`L ${L / 2 - R} 0`);
    d.push(`A ${R} ${R} 0 1 ${cima === 1 ? 0 : 1} ${L / 2 + R} 0`);
    d.push(`L ${L} 0`);
  }

  if (direita === 0) d.push(`L ${L} ${A}`);
  else {
    d.push(`L ${L} ${A / 2 - R}`);
    d.push(`A ${R} ${R} 0 1 ${direita === 1 ? 0 : 1} ${L} ${A / 2 + R}`);
    d.push(`L ${L} ${A}`);
  }

  if (baixo === 0) d.push(`L 0 ${A}`);
  else {
    d.push(`L ${L / 2 + R} ${A}`);
    d.push(`A ${R} ${R} 0 1 ${baixo === 1 ? 0 : 1} ${L / 2 - R} ${A}`);
    d.push(`L 0 ${A}`);
  }

  if (esquerda === 0) d.push("L 0 0");
  else {
    d.push(`L 0 ${A / 2 + R}`);
    d.push(`A ${R} ${R} 0 1 ${esquerda === 1 ? 0 : 1} 0 ${A / 2 - R}`);
    d.push("L 0 0");
  }

  d.push("Z");
  return d.join(" ");
}

export function Stack() {
  return (
    <section id="stack" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Stack tecnológica</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            As peças certas para cada projeto.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-8 sm:justify-start">
            {PECAS.map((peca) => (
              <div
                key={peca.nome}
                style={
                  {
                    width: L,
                    height: A,
                    "--y0": `${peca.desloca}px`,
                    "--y1": `${peca.desloca - peca.sobe}px`,
                    "--r0": `${peca.gira[0]}deg`,
                    "--r1": `${peca.gira[1]}deg`,
                    animationDuration: `${peca.duracao}s`,
                    animationDelay: `-${peca.atraso}s`,
                  } as CSSProperties
                }
                className="group relative animate-flutuar hover:[animation-play-state:paused]"
              >
                <svg
                  viewBox={`${-M} ${-M} ${L + M * 2} ${A + M * 2}`}
                  className="absolute overflow-visible transition-transform duration-300 group-hover:scale-110"
                  style={{ left: -M, top: -M, width: L + M * 2, height: A + M * 2 }}
                  aria-hidden
                >
                  <path
                    d={caminhoDaPeca(...peca.lados)}
                    className="fill-surface stroke-border transition-colors duration-300 group-hover:fill-accent/10 group-hover:stroke-accent"
                    strokeWidth={1.5}
                  />
                </svg>

                <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center font-display text-[13px] font-medium text-fg-muted transition-colors duration-300 group-hover:text-accent">
                  {peca.nome}
                </span>
              </div>
            ))}

            {/* A peça que falta: sugere que a estante não termina aqui. */}
            <div style={{ width: L, height: A }} className="relative">
              <svg
                viewBox={`${-M} ${-M} ${L + M * 2} ${A + M * 2}`}
                className="absolute overflow-visible"
                style={{ left: -M, top: -M, width: L + M * 2, height: A + M * 2 }}
                aria-hidden
              >
                <path
                  d={caminhoDaPeca(0, 0, 1, -1)}
                  className="fill-none stroke-border"
                  strokeWidth={1.5}
                  strokeDasharray="5 6"
                />
              </svg>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center font-display text-[13px] font-medium text-fg-muted/70">
                e muito mais
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
