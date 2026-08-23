import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const tecnologias = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Framer Motion",
  "Figma",
  "AWS",
  "Vercel",
  "Docker",
  "GraphQL",
];

const linha = [...tecnologias, ...tecnologias];

export function Stack() {
  return (
    <section id="stack" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Stack tecnológica</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            As ferramentas certas para cada tipo de projeto.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <div className="marquee-group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {linha.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex-shrink-0 rounded-full border border-border bg-surface px-6 py-3 font-display text-sm font-medium text-fg-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
