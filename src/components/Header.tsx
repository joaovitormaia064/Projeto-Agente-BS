"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND_NAME, NAV_LINKS, whatsappLink } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative z-40 transition-all duration-300 md:fixed md:inset-x-0 md:top-0 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 md:h-20">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight md:text-xl">
          {BRAND_NAME}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-all hover:shadow-[0_0_0_4px_rgba(198,255,61,0.18)]"
          >
            Falar no WhatsApp
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-fg md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg"
            >
              Falar no WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
