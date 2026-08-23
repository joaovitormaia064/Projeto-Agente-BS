import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Hayaki no WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_8px_24px_rgba(198,255,61,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:h-16 md:w-16"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" aria-hidden />
      <MessageCircle className="relative h-7 w-7" strokeWidth={2.2} aria-hidden />
    </a>
  );
}
