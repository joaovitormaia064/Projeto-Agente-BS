import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ContatoRapido } from "./ContatoRapido";
import { whatsappLink } from "@/data/site";

export function CTAFinal() {
  return (
    <section className="px-6 py-24 md:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-14 text-center text-accent-fg sm:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(50% 60% at 20% 0%, rgba(13,14,16,0.18) 0%, transparent 60%), radial-gradient(50% 60% at 100% 100%, rgba(13,14,16,0.18) 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Pronto para colocar seu projeto no ar?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base font-medium text-accent-fg/80 md:text-lg">
            Fale agora com a Hayaki e receba uma proposta personalizada em até 24h.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-9 inline-flex items-center gap-2 rounded-full bg-accent-fg px-8 py-4 text-base font-semibold text-accent transition-transform hover:scale-105"
          >
            Falar no WhatsApp agora
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
          </a>

          <ContatoRapido />
        </div>
      </Reveal>
    </section>
  );
}
