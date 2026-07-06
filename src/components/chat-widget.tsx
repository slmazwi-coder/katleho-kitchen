import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, UtensilsCrossed, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import logo from "@/assets/kk-logo.png.asset.json";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STORAGE_KEY = "kk-chat-messages-v1";
const CHAT_ID = "kk-catering-concierge";
const EMAIL = "katleholepota411@gmail.com";
const WA = "https://wa.me/27836847541?text=Hi%20Katleho%27s%20Kitchen%2C%20I%27d%20like%20to%20request%20a%20quote";

function loadStoredMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

const SUGGESTIONS = [
  "Do you cater weddings in Kokstad?",
  "What's included in the buffet service?",
  "Tell me about the Safari Apparel pop-up",
  "How do I request a quote?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [initialMessages] = useState<UIMessage[]>(() => loadStoredMessages());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);

  const { messages, sendMessage, status, setMessages, error } = useChat({
    id: CHAT_ID,
    messages: initialMessages,
    transport,
  });

  // Persist to localStorage when messages settle.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "streaming" || status === "submitted") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore quota errors */
    }
  }, [messages, status]);

  // Focus textarea when panel opens or when a reply finishes.
  useEffect(() => {
    if (open && status === "ready") {
      textareaRef.current?.focus();
    }
  }, [open, status]);

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  const handleSubmit = async (message: PromptInputMessage) => {
    await submit(message.text);
  };

  const busy = status === "submitted" || status === "streaming";

  const clearChat = () => {
    setMessages([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Chat with Katleho's Kitchen"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-charcoal shadow-lg shadow-black/25 ring-1 ring-black/10 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-3 z-50 flex w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl shadow-black/25 sm:right-5 sm:w-[24rem]"
          style={{ height: "min(600px, calc(100vh - 8rem))" }}
          role="dialog"
          aria-label="Katleho's Kitchen concierge"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-charcoal px-4 py-3 text-cream">
            <img
              src={logo.url}
              alt=""
              className="h-9 w-9 rounded-full bg-cream/10 object-contain p-1"
            />
            <div className="flex-1 min-w-0">
              <div className="font-display text-base leading-tight">Katleho's Kitchen</div>
              <div className="text-[0.7rem] uppercase tracking-widest text-gold-soft/80">
                Catering concierge
              </div>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="text-[0.65rem] uppercase tracking-widest text-cream/60 hover:text-gold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Conversation */}
          <Conversation className="flex-1 bg-background">
            <ConversationContent className="px-4 py-4">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  className="border-none"
                  icon={<UtensilsCrossed className="h-8 w-8 text-gold" />}
                  title="How can we help?"
                  description="Ask about our catering, service area, or request a quote. You can also WhatsApp us or email katleholepota411@gmail.com"
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return message.role === "assistant" ? (
                            <MessageResponse key={i}>{part.text}</MessageResponse>
                          ) : (
                            <span key={i} className="whitespace-pre-wrap">
                              {part.text}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}

              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>Thinking…</Shimmer>
                  </MessageContent>
                </Message>
              )}

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  Sorry — something went wrong. Please contact us directly at{" "}
                  <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a> or{" "}
                  <a href={WA} target="_blank" rel="noreferrer" className="underline">WhatsApp</a>.
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 border-t border-border/60 px-3 py-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  disabled={busy}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-foreground disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <div className="border-t border-border/60 bg-background p-3">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about catering…"
                disabled={busy}
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={busy || !input.trim()} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}
    </>
  );
}