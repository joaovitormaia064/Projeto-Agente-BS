// Estrutura de dados do portfólio.
// Para adicionar um novo projeto, basta incluir um novo objeto no array abaixo —
// o layout da seção de Portfólio se adapta automaticamente.

export type ProjectCategory =
  | "Landing Pages"
  | "Sistemas"
  | "E-commerce";

export type Project = {
  nome: string;
  categoria: ProjectCategory;
  /** Rótulo curto exibido no card (ex: "Landing Page", "Sistema Web") */
  rotulo: string;
  /** Cor de acento usada no mockup do card (hex) */
  corMockup: string;
  descricao: string;
  tecnologias: string[];
  url?: string;
};

export const PROJECTS: Project[] = [
  {
    nome: "Órbita Contábil",
    categoria: "Landing Pages",
    rotulo: "Landing Page",
    corMockup: "#C6FF3D",
    descricao: "Página de captação que dobrou os leads qualificados em 60 dias.",
    tecnologias: ["Next.js", "Tailwind", "Framer Motion"],
    url: "#",
  },
  {
    nome: "Nortis Imóveis",
    categoria: "Landing Pages",
    rotulo: "Landing Page",
    corMockup: "#7CE0FF",
    descricao: "Vitrine de imóveis com filtros rápidos e integração ao WhatsApp.",
    tecnologias: ["React", "Tailwind", "CMS Headless"],
    url: "#",
  },
  {
    nome: "Fluxo Clínicas",
    categoria: "Sistemas",
    rotulo: "Sistema Web",
    corMockup: "#FFB84D",
    descricao: "Agenda e prontuário eletrônico para redes de clínicas médicas.",
    tecnologias: ["Next.js", "PostgreSQL", "Node.js"],
    url: "#",
  },
  {
    nome: "Painel Cargo360",
    categoria: "Sistemas",
    rotulo: "Dashboard",
    corMockup: "#C6FF3D",
    descricao: "Dashboard de rastreamento de frotas em tempo real.",
    tecnologias: ["React", "WebSockets", "Node.js"],
    url: "#",
  },
  {
    nome: "Verde Mercado",
    categoria: "E-commerce",
    rotulo: "E-commerce",
    corMockup: "#FF7A59",
    descricao: "Loja virtual de hortifruti com checkout em 2 passos.",
    tecnologias: ["Next.js", "Stripe", "Tailwind"],
    url: "#",
  },
  {
    nome: "Studio Kaya",
    categoria: "E-commerce",
    rotulo: "E-commerce",
    corMockup: "#7CE0FF",
    descricao: "Catálogo de moda autoral com gestão de estoque integrada.",
    tecnologias: ["Shopify", "React", "Tailwind"],
    url: "#",
  },
];

export const PORTFOLIO_FILTERS: ("Todos" | ProjectCategory)[] = [
  "Todos",
  "Landing Pages",
  "Sistemas",
  "E-commerce",
];
