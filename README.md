# Hayaki — site institucional

Site one-page da Hayaki (desenvolvimento de sites, landing pages e sistemas
web sob encomenda), construído com Next.js, Tailwind CSS e Framer Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/app/page.tsx` — monta as seções da página na ordem final.
- `src/components/` — um componente por seção (Header, Hero, Servicos,
  Stack, Processo, Portfolio, CTAFinal, FAQ, Footer, WhatsAppButton) mais
  helpers de animação (`Reveal.tsx`) e o rótulo de seção (`SectionLabel.tsx`).
- `src/data/site.ts` — constantes da marca: nome, slogan, WhatsApp, e-mail,
  Instagram. **Edite este arquivo para atualizar os dados de contato em todo
  o site.**
- `src/data/portfolio.ts` — array de projetos do portfólio. Para adicionar um
  projeto novo, basta incluir um objeto no array `PROJECTS` (nome, categoria,
  descrição, tecnologias, url); o grid e os filtros se atualizam sozinhos.

## Identidade visual

**Paleta (grafite + verde-limão, alto contraste):**

| Token | Hex | Uso |
|---|---|---|
| `--color-bg` | `#0d0e10` | Fundo principal |
| `--color-bg-alt` | `#16181b` | Fundo alternativo (ícones, mockups) |
| `--color-surface` | `#1b1d21` | Cards, superfícies elevadas |
| `--color-border` | `#2a2d31` | Bordas e divisores |
| `--color-fg` | `#edf0ee` | Texto principal |
| `--color-fg-muted` | `#9aa0a6` | Texto secundário |
| `--color-accent` | `#c6ff3d` | Cor de destaque (CTAs, ícones, hovers) |
| `--color-accent-2` | `#8fe637` | Variação do accent para gradientes |
| `--color-accent-fg` | `#0d0e10` | Texto sobre fundo accent |

**Tipografia:** Space Grotesk (display, títulos) + Inter (corpo de texto),
ambas via Google Fonts com `font-display: swap`. Combinação alternativa
avaliada: Sora (display) + Manrope (corpo).

## Tecnologias

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion ·
lucide-react
