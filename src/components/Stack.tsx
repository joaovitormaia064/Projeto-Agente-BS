"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const TECNOLOGIAS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Framer Motion",
  "Figma",
  "AWS",
  "Vercel",
  "Docker",
  "GraphQL",
];

/** Medidas da peça, em unidades do viewBox. */
const L = 200; // largura
const A = 118; // altura
const R = 13; // raio do encaixe
const M = R + 3; // folga no SVG para o encaixe não ser cortado

type Encaixe = -1 | 0 | 1;

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

/** Uma saliência de um lado exige a reentrância correspondente no vizinho. */
function ladosDaPeca(col: number, linha: number, colunas: number, linhas: number) {
  const vertical = (c: number, l: number): Encaixe => ((c + l) % 2 === 0 ? 1 : -1);
  const horizontal = (c: number, l: number): Encaixe => ((c + l) % 2 === 0 ? -1 : 1);

  return {
    cima: linha === 0 ? (0 as Encaixe) : ((-horizontal(col, linha - 1)) as Encaixe),
    direita: col === colunas - 1 ? (0 as Encaixe) : vertical(col, linha),
    baixo: linha === linhas - 1 ? (0 as Encaixe) : horizontal(col, linha),
    esquerda: col === 0 ? (0 as Encaixe) : ((-vertical(col - 1, linha)) as Encaixe),
  };
}

/** Mede o espaço disponível para escolher o número de colunas e o tamanho da peça. */
function useMedidas() {
  const ref = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entrada]) => setLargura(entrada.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const colunas = largura < 560 ? 2 : largura < 900 ? 3 : 4;
  // As peças encolhem juntas, então os encaixes continuam batendo.
  const escala = largura > 0 ? Math.min(1, largura / (colunas * L)) : 1;

  return { ref, largura, colunas, escala };
}

export function Stack() {
  const reduzirMovimento = useReducedMotion();
  const { ref, largura, colunas, escala } = useMedidas();
  const linhas = Math.ceil(TECNOLOGIAS.length / colunas);
  const l = L * escala;
  const a = A * escala;
  const m = M * escala;

  return (
    <section id="stack" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Stack tecnológica</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            As peças certas para cada tipo de projeto.
          </h2>
          <p className="mt-4 max-w-xl text-base text-fg-muted">
            Nada de template pronto: escolhemos e encaixamos a tecnologia conforme o que o
            seu projeto precisa.
          </p>
        </Reveal>

        <div ref={ref} className="mt-14">
        {largura > 0 && (
        <motion.div
          initial="fora"
          whileInView="encaixada"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.06 }}
          className="mx-auto grid w-fit"
          style={{ gridTemplateColumns: `repeat(${colunas}, ${l}px)` }}
        >
          {TECNOLOGIAS.map((tech, i) => {
            const col = i % colunas;
            const linha = Math.floor(i / colunas);
            const lados = ladosDaPeca(col, linha, colunas, linhas);

            // As peças chegam de fora, cada uma do seu lado, e assentam no lugar.
            const dx = (col - (colunas - 1) / 2) * 26;
            const dy = (linha - (linhas - 1) / 2) * 18;

            return (
              <motion.div
                key={tech}
                variants={
                  reduzirMovimento
                    ? undefined
                    : {
                        fora: { opacity: 0, x: dx, y: dy, scale: 0.94, rotate: dx > 0 ? 2 : -2 },
                        encaixada: {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                        },
                      }
                }
                className="group relative"
                style={{ width: l, height: a }}
              >
                <svg
                  viewBox={`${-M} ${-M} ${L + M * 2} ${A + M * 2}`}
                  className="absolute overflow-visible"
                  style={{ left: -m, top: -m, width: l + m * 2, height: a + m * 2 }}
                  aria-hidden
                >
                  <path
                    d={caminhoDaPeca(lados.cima, lados.direita, lados.baixo, lados.esquerda)}
                    className="fill-surface stroke-border transition-colors duration-300 group-hover:fill-accent/10 group-hover:stroke-accent"
                    strokeWidth={1.5}
                  />
                </svg>

                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-display font-medium text-fg-muted transition-colors duration-300 group-hover:text-accent"
                  style={{ fontSize: Math.max(11, 14 * escala) }}
                >
                  {tech}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
