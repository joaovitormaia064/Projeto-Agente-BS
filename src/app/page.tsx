import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
import { Servicos } from "@/components/Servicos";
import { Stack } from "@/components/Stack";
import { Processo } from "@/components/Processo";
import { Portfolio } from "@/components/Portfolio";
import { CTAFinal } from "@/components/CTAFinal";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Diferenciais />
        <Servicos />
        <Stack />
        <Processo />
        <Portfolio />
        <CTAFinal />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
