// Estrutura de dados do portfólio.
// Para adicionar um novo projeto, inclua um objeto no array abaixo.
// O carrossel da seção Portfólio se adapta automaticamente.

export type ProjectCategory = "Landing Pages" | "Institucional" | "Sistemas" | "E-commerce";

export type Project = {
  nome: string;
  categoria: ProjectCategory;
  /** Rótulo curto exibido no card (ex: "Landing Page", "Sistema Web") */
  rotulo: string;
  /** Caminho da imagem em /public usada como screenshot do projeto */
  imagem: string;
  descricao: string;
  tecnologias: string[];
  url?: string;
};

export const PROJECTS: Project[] = [
  {
    nome: "ASC Action",
    categoria: "Landing Pages",
    rotulo: "Landing Page",
    imagem: "/portfolio/asc-action.jpg",
    descricao: "Página de vendas para tênis de performance, com foco em conversão direta.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
  },
  {
    nome: "Cafeteria Âncora",
    categoria: "Institucional",
    rotulo: "Site Institucional",
    imagem: "/portfolio/cafeteria-ancora.jpg",
    descricao: "Site de apresentação e cardápio para uma cafeteria de bairro.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
  },
];

export const PORTFOLIO_FILTERS: ("Todos" | ProjectCategory)[] = [
  "Todos",
  "Landing Pages",
  "Institucional",
  "Sistemas",
  "E-commerce",
];
