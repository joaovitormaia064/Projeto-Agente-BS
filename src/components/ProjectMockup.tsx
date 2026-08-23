export function ProjectMockup({ nome, cor }: { nome: string; cor: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-bg-alt">
      <div className="flex h-7 items-center gap-1.5 border-b border-border bg-surface px-3">
        <span className="h-2 w-2 rounded-full bg-fg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-fg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-fg-muted/40" />
      </div>
      <div
        className="relative h-[calc(100%-1.75rem)] w-full p-4 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        style={{
          background: `radial-gradient(120% 100% at 0% 0%, ${cor}33 0%, transparent 55%), linear-gradient(160deg, ${cor}22 0%, transparent 60%)`,
        }}
      >
        <div
          className="h-3 w-2/5 rounded-full"
          style={{ backgroundColor: `${cor}cc` }}
        />
        <div className="mt-3 h-2 w-4/5 rounded-full bg-fg-muted/20" />
        <div className="mt-2 h-2 w-3/5 rounded-full bg-fg-muted/20" />
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="h-14 rounded-lg border border-border bg-surface/60" />
          <div className="h-14 rounded-lg border border-border bg-surface/60" />
          <div className="h-14 rounded-lg border border-border bg-surface/60" />
        </div>
        <span
          aria-hidden
          className="absolute bottom-3 right-4 font-display text-xs font-semibold uppercase tracking-widest opacity-40"
        >
          {nome}
        </span>
      </div>
    </div>
  );
}
