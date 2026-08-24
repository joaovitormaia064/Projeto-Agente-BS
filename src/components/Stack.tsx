"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const tecnologias = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Framer Motion",
  "Figma",
  "AWS",
  "Vercel",
  "Docker",
  "GraphQL",
];

const linha = [...tecnologias, ...tecnologias];

export function Stack() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const xPercent = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const transform = useMotionTemplate`translateX(${xPercent}%)`;

  return (
    <section id="stack" ref={sectionRef} className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Stack tecnológica</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            As ferramentas certas para cada tipo de projeto.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            style={reduceMotion ? undefined : { transform }}
            className="flex w-max gap-4"
          >
            {linha.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex-shrink-0 rounded-full border border-border bg-surface px-6 py-3 font-display text-sm font-medium text-fg-muted"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
