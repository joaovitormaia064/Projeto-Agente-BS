"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fio de progresso no topo da página: mostra o quanto ainda falta para o fim. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const largura = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: largura }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      aria-hidden
    />
  );
}
