"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fio de progresso no topo da página: mostra o quanto ainda falta para o
 * fim. Só no desktop — no celular ele fica parado enquanto o menu está
 * aberto (a rolagem trava), e aí parece um traço quebrado em vez de um
 * indicador de progresso.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const largura = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: largura }}
      className="fixed inset-x-0 top-0 z-50 hidden h-0.5 origin-left bg-accent md:block"
      aria-hidden
    />
  );
}
