// Estrutura de dados do portfólio.
// Para adicionar um novo projeto, inclua um objeto no array abaixo.
// O carrossel da seção Portfólio se adapta automaticamente.

export type ProjectCategory = "Landing Pages" | "Institucional" | "Sistemas" | "E-commerce";

export type Project = {
  nome: string;
  categoria: ProjectCategory;
  /** Rótulo curto exibido no card (ex: "Landing Page", "Sistema Web") */
  rotulo: string;
  /** Caminho da imagem curta (thumbnail padrão) em /public */
  imagem: string;
  /** Caminho de uma captura mais alta em /public, usada no efeito de scroll ao passar o mouse */
  imagemLonga: string;
  /** Caminho do site real em /public, aberto ao vivo dentro de um iframe ao clicar no card */
  preview: string;
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
    imagemLonga: "/portfolio/asc-action-full.jpg",
    preview: "/portfolio-sites/asc-action.html",
    descricao: "Página de vendas para tênis de performance, com foco em conversão direta.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
  },
  {
    nome: "Cafeteria Âncora",
    categoria: "Institucional",
    rotulo: "Site Institucional",
    imagem: "/portfolio/cafeteria-ancora.jpg",
    imagemLonga: "/portfolio/cafeteria-ancora-full.jpg",
    preview: "/portfolio-sites/cafeteria-ancora.html",
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
