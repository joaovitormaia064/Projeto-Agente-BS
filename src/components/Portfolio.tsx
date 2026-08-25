"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, FolderSearch, X } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { PORTFOLIO_FILTERS, PROJECTS, type Project } from "@/data/portfolio";

/** Quanto o card se inclina seguindo o ponteiro, e o quanto ele avança. */
const GIRO_Y = 9; // graus no eixo vertical
const GIRO_X = 7; // graus no eixo horizontal
const AVANCO = 38; // pixels na direção de quem olha
const PERSPECTIVA = 1000;
const SUAVE = "cubic-bezier(0.22, 1, 0.36, 1)";

type CardProps = {
  projeto: Project;
  indice: number;
  ativo: boolean;
  algumAtivo: boolean;
  onOpen: () => void;
  onEnter: () => void;
  onLeave: () => void;
};

function ProjectCard({ projeto, indice, ativo, algumAtivo, onOpen, onEnter, onLeave }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  // nx e ny vão de -1 a 1 e dizem onde o ponteiro está dentro do card.
  const [ponteiro, setPonteiro] = useState({ x: 0, y: 0, nx: 0, ny: 0, on: false });

  const seguirPonteiro = (e: React.MouseEvent) => {
    const box = cardRef.current?.getBoundingClientRect();
    if (!box) return;
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    setPonteiro({
      x,
      y,
      nx: (x / box.width) * 2 - 1,
      ny: (y / box.height) * 2 - 1,
      on: true,
    });
  };

  // O card levanta e gira na direção do ponteiro, como uma carta sendo escolhida.
  const inclinacao =
    ativo && ponteiro.on && !semMovimento
      ? `perspective(${PERSPECTIVA}px) rotateY(${(ponteiro.nx * GIRO_Y).toFixed(2)}deg) rotateX(${(-ponteiro.ny * GIRO_X).toFixed(2)}deg) translateZ(${AVANCO}px)`
      : undefined;

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      data-card={indice}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      onMouseEnter={onEnter}
      onMouseMove={seguirPonteiro}
      onMouseLeave={() => {
        setPonteiro((p) => ({ ...p, on: false }));
        onLeave();
      }}
      style={{
        transform: inclinacao,
        transitionTimingFunction: SUAVE,
        // Sem isto o navegador recalcula o card inteiro a cada grau de giro.
        willChange: ativo ? "transform" : undefined,
        backfaceVisibility: "hidden",
      }}
      className={`group relative aspect-[3/4] w-[78vw] flex-none cursor-pointer select-none overflow-hidden rounded-[15px] transition-[transform,opacity,filter,box-shadow] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-[46%] lg:w-[32%] ${
        ativo
          ? "z-10 shadow-[0_36px_70px_-24px_rgba(0,0,0,0.85)]"
          : algumAtivo
            ? "opacity-45 md:blur-[1.5px]"
            : ""
      }`}
    >
      <div
        style={{ backgroundImage: `url(${projeto.imagem})` }}
        className="absolute inset-0 origin-top bg-[length:100%_auto] bg-top transition-[background-position] duration-[9000ms] ease-linear group-hover:bg-bottom"
      />

      {/* O véu escurece só o pé do card enquanto ninguém escolheu; quando o
          ponteiro chega, ele recua e a captura aparece limpa. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-bg)_0%,rgba(13,14,16,0.95)_42%,rgba(13,14,16,0.55)_66%,transparent_100%)] transition-all duration-500 [@media(hover:hover)]:bg-[linear-gradient(to_top,rgba(13,14,16,0.6)_0%,rgba(13,14,16,0.15)_40%,transparent_100%)] [@media(hover:hover)]:group-hover:bg-[linear-gradient(to_top,var(--color-bg)_0%,rgba(13,14,16,0.75)_38%,rgba(13,14,16,0.25)_62%,transparent_100%)]" />

      {/* Brilho que corre pela superfície acompanhando o ponteiro. É o que dá a
          impressão de que o card tem volume e está inclinando de verdade. */}
      {!semMovimento && (
        <div
          aria-hidden
          style={{
            background: `radial-gradient(200px circle at ${ponteiro.x}px ${ponteiro.y}px, rgba(255,255,255,0.14), transparent 70%)`,
          }}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            ponteiro.on ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div
        aria-hidden
        style={{ transform: `translate(${ponteiro.x}px, ${ponteiro.y}px) translate(-50%, -50%)` }}
        className={`pointer-events-none absolute left-0 top-0 h-14 w-14 rounded-full border-2 border-fg/90 transition-opacity duration-300 ${
          ponteiro.on ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* No celular não existe ponteiro, então a identificação fica sempre à
          mostra. Onde existe, ela sobe junto com o card ao ser escolhido. */}
      <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 sm:p-6 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
        <h3 className="font-display text-2xl font-semibold leading-[1.15] tracking-tight text-fg">
          {projeto.nome}
        </h3>
        <p className="mt-1.5 text-xs text-fg-muted">{projeto.rotulo}</p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-fg/70 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          Ver projeto
        </span>
      </div>
    </div>
  );
}

function PreviewModal({ projeto, onClose }: { projeto: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      {/* No celular o quadro fica estreito e alto, então o site embutido responde
          com o próprio layout mobile; no desktop volta a ser paisagem. */}
      <div
        className="relative flex h-[78vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-bg-alt shadow-2xl sm:aspect-video sm:h-auto sm:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-10 flex-shrink-0 items-center justify-between border-b border-border bg-surface px-4">
          <span className="truncate text-sm font-medium text-fg-muted">{projeto.nome}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar prévia"
            className="flex h-7 w-7 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg hover:text-fg"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
        <iframe
          src={projeto.preview}
          title={`Site real: ${projeto.nome}`}
          className="h-full w-full flex-1 border-0 bg-white"
        />
      </div>
    </div>
  );
}

export function Portfolio() {
  const [filtro, setFiltro] = useState<(typeof PORTFOLIO_FILTERS)[number]>("Todos");
  const [aberto, setAberto] = useState<Project | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [blur, setBlur] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0, alvo: -1 });

  const projetos = useMemo(
    () => (filtro === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.categoria === filtro)),
    [filtro]
  );

  // Desfoque de movimento: acompanha a velocidade real do scroll do carrossel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = track.scrollLeft;
    let raf = 0;
    const tick = () => {
      const now = track.scrollLeft;
      const v = Math.abs(now - last);
      last = now;
      setBlur((b) => {
        const alvo = Math.min(6, v * 0.22);
        const proximo = alvo > b ? alvo : b * 0.82;
        return proximo < 0.15 ? 0 : proximo;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [projetos.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
      alvo: card ? Number(card.dataset.card) : -1,
    };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    track.scrollLeft = drag.current.startScroll - dx;
  };

  // O ponteiro fica capturado pelo track durante o arrasto, então o clique do
  // card nunca dispara: a abertura acontece aqui, se não houve arrasto.
  const onPointerUp = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const { active, moved, alvo } = drag.current;
    drag.current.active = false;
    track?.releasePointerCapture(e.pointerId);
    if (active && moved <= 8 && alvo >= 0 && projetos[alvo]) setAberto(projetos[alvo]);
  };

  return (
    <section id="portfolio" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>Projetos entregues</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Resultado antes de promessa.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFiltro(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  filtro === cat
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {projetos.length > 0 ? (
        <Reveal delay={0.1}>
          {/* O trilho atravessa a tela inteira: o primeiro card nasce alinhado
              com o título e os demais saem pelas bordas, sem ficarem presos
              dentro de uma caixa. A folga vertical dá espaço para o card
              levantar sem ser cortado. */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ filter: blur ? `blur(${blur.toFixed(2)}px)` : undefined }}
            className="mt-12 flex cursor-grab gap-5 overflow-x-auto overflow-y-hidden px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] py-12 [transform-style:preserve-3d] active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projetos.map((projeto, i) => (
              <ProjectCard
                key={projeto.nome}
                projeto={projeto}
                indice={i}
                ativo={hover === i}
                algumAtivo={hover !== null}
                onOpen={() => setAberto(projeto)}
                onEnter={() => setHover(i)}
                onLeave={() => setHover(null)}
              />
            ))}
          </div>
        </Reveal>
      ) : (
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <FolderSearch className="h-9 w-9 text-fg-muted" strokeWidth={1.5} />
          <p className="mt-4 text-base font-medium text-fg-muted">
            Ainda não temos projetos publicados nessa categoria.
          </p>
          <p className="mt-1 text-sm text-fg-muted">Que tal ser o primeiro? Fale com a gente.</p>
        </div>
      )}

      {aberto && <PreviewModal projeto={aberto} onClose={() => setAberto(null)} />}
    </section>
  );
}
