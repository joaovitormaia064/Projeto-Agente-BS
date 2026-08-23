import type { SVGProps } from "react";
import { Mail, MessageCircle } from "lucide-react";
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "@/data/site";

const whatsappDisplay = `+${WHATSAPP_NUMBER.slice(0, 2)} (${WHATSAPP_NUMBER.slice(2, 4)}) ${WHATSAPP_NUMBER.slice(4, 9)}-${WHATSAPP_NUMBER.slice(9)}`;

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contato" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-semibold tracking-tight">
              {BRAND_NAME}
              <span className="text-accent">.</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              {BRAND_SLOGAN}. Sites, landing pages e sistemas web sob medida
              para negócios que querem crescer com tecnologia de verdade.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
              Contato
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  {whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
              Redes sociais
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-6 text-xs text-fg-muted">
          © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
