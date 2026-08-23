import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://hayaki.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hayaki | Pode criar",
  description:
    "A Hayaki desenvolve sites, landing pages e sistemas web sob medida para negócios que querem crescer com tecnologia de verdade. Peça seu orçamento pelo WhatsApp.",
  keywords: [
    "desenvolvimento de sites",
    "landing page",
    "sistema web sob medida",
    "criação de sites",
    "Hayaki",
  ],
  authors: [{ name: "Hayaki" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Hayaki | Pode criar",
    description:
      "Sites, landing pages e sistemas web sob medida. Tecnologia e design a serviço do seu negócio.",
    url: siteUrl,
    siteName: "Hayaki",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayaki | Pode criar",
    description:
      "Sites, landing pages e sistemas web sob medida. Tecnologia e design a serviço do seu negócio.",
  },
};

export const viewport = {
  themeColor: "#0d0e10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
