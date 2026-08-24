"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";

/**
 * Endereço do webhook do n8n.
 * Em produção, troque por:
 * "https://memoken.com/webhook/artificial-intelligence/completion"
 */
const WEBHOOK_URL = "http://localhost:5678/webhook/artificial-intelligence/completion";

/** Tempo máximo de espera pela resposta do webhook. */
const TEMPO_LIMITE_MS = 20000;

/** Chave do localStorage onde fica o identificador do visitante. */
const CHAVE_CHAT_ID = "hayaki:chat-id";

const SAUDACAO = "Oi! Sou o assistente da Hayaki. Me conta o que você precisa criar.";
const ERRO_GENERICO = "Não consegui responder agora, tente novamente.";

type Mensagem = { autor: "pessoa" | "ia"; texto: string };

function idAleatorio() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Um id por visitante, criado uma vez e reaproveitado nas próximas visitas. */
function obterChatId() {
  try {
    const salvo = localStorage.getItem(CHAVE_CHAT_ID);
    if (salvo) return salvo;
    // randomUUID só existe em contexto seguro (https ou localhost).
    const novo = crypto.randomUUID?.() ?? idAleatorio();
    localStorage.setItem(CHAVE_CHAT_ID, novo);
    return novo;
  } catch {
    // localStorage indisponível (aba anônima, cookies bloqueados): vale só para esta sessão.
    return idAleatorio();
  }
}

export function ChatWidget() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([{ autor: "ia", texto: SAUDACAO }]);
  const [rascunho, setRascunho] = useState("");
  const [digitando, setDigitando] = useState(false);

  const fimDaListaRef = useRef<HTMLDivElement>(null);
  const campoRef = useRef<HTMLTextAreaElement>(null);

  // Mantém a conversa rolada para a mensagem mais recente.
  useEffect(() => {
    fimDaListaRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [mensagens, digitando]);

  useEffect(() => {
    if (aberto) campoRef.current?.focus();
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  async function enviar() {
    const texto = rascunho.trim();
    if (!texto || digitando) return;

    setMensagens((atuais) => [...atuais, { autor: "pessoa", texto }]);
    setRascunho("");
    setDigitando(true);

    const controle = new AbortController();
    const relogio = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);

    try {
      const resposta = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: obterChatId(), human_message: texto }),
        signal: controle.signal,
      });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

      const dados = await resposta.json();
      const reply = typeof dados?.reply === "string" ? dados.reply.trim() : "";
      setMensagens((atuais) => [...atuais, { autor: "ia", texto: reply || ERRO_GENERICO }]);
    } catch {
      setMensagens((atuais) => [...atuais, { autor: "ia", texto: ERRO_GENERICO }]);
    } finally {
      clearTimeout(relogio);
      setDigitando(false);
      campoRef.current?.focus();
    }
  }

  return (
    <>
      {aberto && (
        <div
          role="dialog"
          aria-label="Conversa com o assistente da Hayaki"
          className="fixed bottom-24 right-6 z-50 flex h-[min(70vh,520px)] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)]"
        >
          <header className="flex flex-shrink-0 items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-display text-base font-semibold text-fg">Fale comigo</h2>
              <p className="mt-0.5 text-xs text-fg-muted">Respondo em segundos</p>
            </div>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar conversa"
              className="flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-alt hover:text-fg"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-5 py-4 [scrollbar-width:thin]"
          >
            {mensagens.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.autor === "pessoa" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.autor === "pessoa"
                      ? "rounded-br-sm bg-accent font-medium text-accent-fg"
                      : "rounded-bl-sm bg-bg-alt text-fg"
                  }`}
                >
                  {m.texto}
                </p>
              </div>
            ))}

            {digitando && (
              <div className="flex justify-start">
                <p className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-bg-alt px-4 py-3">
                  <span className="sr-only">Digitando</span>
                  <span className="h-1.5 w-1.5 animate-chat-dot rounded-full bg-fg-muted" />
                  <span className="h-1.5 w-1.5 animate-chat-dot rounded-full bg-fg-muted [animation-delay:0.16s]" />
                  <span className="h-1.5 w-1.5 animate-chat-dot rounded-full bg-fg-muted [animation-delay:0.32s]" />
                </p>
              </div>
            )}

            <div ref={fimDaListaRef} />
          </div>

          <div className="flex flex-shrink-0 items-end gap-2 border-t border-border px-4 py-3">
            <textarea
              ref={campoRef}
              rows={1}
              value={rascunho}
              onChange={(e) => setRascunho(e.target.value)}
              onKeyDown={(e) => {
                // Enter envia; Shift+Enter quebra linha.
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  enviar();
                }
              }}
              placeholder="Escreva sua mensagem"
              className="max-h-28 flex-1 resize-none bg-transparent py-2 text-sm text-fg outline-none placeholder:text-fg-muted"
            />
            <button
              type="button"
              onClick={enviar}
              disabled={!rascunho.trim() || digitando}
              aria-label="Enviar mensagem"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-label={aberto ? "Fechar conversa" : "Abrir conversa com a Hayaki"}
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_8px_24px_rgba(198,255,61,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:h-16 md:w-16"
      >
        {!aberto && (
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring"
            aria-hidden
          />
        )}
        {aberto ? (
          <X className="relative h-6 w-6" strokeWidth={2.5} aria-hidden />
        ) : (
          <MessageCircle className="relative h-7 w-7" strokeWidth={2.2} aria-hidden />
        )}
      </button>
    </>
  );
}
