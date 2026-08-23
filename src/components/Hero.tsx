"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gauge, Code2, TrendingUp } from "lucide-react";
import { whatsappLink } from "@/data/site";

const badges = [
  { label: "Performance", icon: Gauge },
  { label: "Código sob medida", icon: Code2 },
  { label: "Escalabilidade", icon: TrendingUp },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-28 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.span
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted"
        >
          Tecnologia para negócios em evolução
        </motion.span>

        <motion.h1
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Sites e sistemas que
          <br />
          fazem seu negócio <span className="text-accent">crescer</span>.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-balance text-lg text-fg-muted md:text-xl"
        >
          A Hayaki projeta e desenvolve sites, landing pages e sistemas web sob
          encomenda — com design que impressiona e código que aguenta escala.
        </motion.p>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-fg transition-all hover:shadow-[0_0_0_6px_rgba(198,255,61,0.18)]"
          >
            Criar meu site
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:border-fg-muted"
          >
            Ver soluções
          </a>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-fg-muted"
            >
              <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
