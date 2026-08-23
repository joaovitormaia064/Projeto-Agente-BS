// Constantes centrais da marca. Edite aqui para atualizar o site inteiro.

export const BRAND_NAME = "Hayaki";
export const BRAND_SLOGAN = "Pode criar";

export const WHATSAPP_NUMBER = "5531999999999"; // formato internacional, apenas dígitos
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Hayaki e quero criar meu site.";

export const EMAIL = "contato@hayaki.dev"; // TODO: substituir pelo e-mail definitivo
export const INSTAGRAM_HANDLE = "@hayaki.dv";
export const INSTAGRAM_URL = "https://instagram.com/hayaki.dv";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Stack", href: "#stack" },
  { label: "Processo", href: "#processo" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];
