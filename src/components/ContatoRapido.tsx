"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { EMAIL } from "@/data/site";

/**
 * Endereço do webhook do n8n que recebe o formulário e dispara o e-mail.
 * Em produção, troque por:
 * "https://memoken.com/webhook/hayaki/contato"
 *
 * Se o webhook não responder, o formulário não se perde: abre o cliente de
 * e-mail do visitante já com tudo preenchido (ver `abrirMailto`).
 */
const FORM_WEBHOOK_URL = "http://localhost:5678/webhook/hayaki/contato";

const TEMPO_LIMITE_MS = 15000;

type Estado = "parado" | "enviando" | "ok" | "porEmail" | "erro";

const CAMPOS = [
  { nome: "nome", rotulo: "Nome", tipo: "text", flex: "sm:flex-1" },
  { nome: "email", rotulo: "E-mail", tipo: "email", flex: "sm:flex-1" },
  { nome: "mensagem", rotulo: "Como posso ajudar?", tipo: "text", flex: "sm:flex-[1.4]" },
] as const;

export function ContatoRapido() {
  const [estado, setEstado] = useState<Estado>("parado");

  function abrirMailto(dados: Record<string, string>) {
    const assunto = `Contato pelo site — ${dados.nome}`;
    const corpo = `Nome: ${dados.nome}\nE-mail: ${dados.email}\n\n${dados.mensagem}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(corpo)}`;
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado === "enviando") return;

    const form = evento.currentTarget;
    const dados = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setEstado("enviando");

    const controle = new AbortController();
    const relogio = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);

    try {
      const resposta = await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
        signal: controle.signal,
      });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      setEstado("ok");
      form.reset();
    } catch (erro) {
      // Ajuda a descobrir a causa (CORS, 404, conexão recusada) no DevTools.
      console.error("[contato] falha ao enviar pelo webhook:", erro);
      setEstado("porEmail");
      abrirMailto(dados);
    } finally {
      clearTimeout(relogio);
    }
  }

  return (
    <div className="relative mx-auto mt-12 max-w-3xl">
      <div className="flex items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-accent-fg/20" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg/60">
          ou
        </span>
        <span className="h-px flex-1 bg-accent-fg/20" />
      </div>

      <p className="mt-5 text-sm font-medium text-accent-fg/80">
        Prefere e-mail? Preencha abaixo que eu respondo.
      </p>

      <form onSubmit={enviar} className="mt-4 flex flex-col gap-2 sm:flex-row">
        {CAMPOS.map((campo) => (
          <input
            key={campo.nome}
            name={campo.nome}
            type={campo.tipo}
            required
            aria-label={campo.rotulo}
            placeholder={campo.rotulo}
            className={`w-full rounded-xl border border-accent-fg/25 bg-accent-fg/5 px-4 py-3 text-sm text-accent-fg outline-none transition-colors placeholder:text-accent-fg/50 focus:border-accent-fg/60 ${campo.flex}`}
          />
        ))}
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="flex flex-none items-center justify-center gap-2 rounded-xl bg-accent-fg px-5 py-3 text-sm font-semibold text-accent transition-opacity disabled:opacity-60 sm:w-12 sm:px-0"
        >
          <span className="sm:hidden">{estado === "enviando" ? "Enviando…" : "Enviar"}</span>
          <ArrowRight className="hidden h-4 w-4 sm:block" strokeWidth={2.5} />
        </button>
      </form>

      <p aria-live="polite" className="mt-3 min-h-5 text-xs font-medium text-accent-fg/75">
        {estado === "ok" && "Recebido! Retorno em breve no e-mail que você deixou."}
        {estado === "porEmail" && "Abri seu programa de e-mail com a mensagem pronta, é só enviar."}
      </p>
    </div>
  );
}
