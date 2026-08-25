// Estrutura de dados do portfólio.
// Para adicionar um novo projeto, inclua um objeto no array abaixo.
// O carrossel da seção Portfólio se adapta automaticamente.

export type ProjectCategory = "Landing Pages" | "Institucional" | "Sistemas" | "E-commerce";

export type Project = {
  nome: string;
  categoria: ProjectCategory;
  /** Rótulo curto exibido no card (ex: "Landing Page", "Sistema Web") */
  rotulo: string;
  /** Captura alta do site em /public, usada no card e no efeito de scroll ao passar o mouse */
  imagem: string;
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
    imagem: "/portfolio/asc-action-full.jpg",
    preview: "/portfolio-sites/asc-action.html",
    descricao: "Página de vendas para tênis de performance, com foco em conversão direta.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
  },
  {
    nome: "Cerrado",
    categoria: "Landing Pages",
    rotulo: "Landing Page",
    imagem: "/portfolio/cerrado-full.jpg",
    preview: "/portfolio-sites/cerrado.html",
    descricao:
      "Página de vendas de uma proteína vegetal de castanha de baru, do argumento à oferta.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
  },
  {
    nome: "Cafeteria Âncora",
    categoria: "Institucional",
    rotulo: "Site Institucional",
    imagem: "/portfolio/cafeteria-ancora-full.jpg",
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
