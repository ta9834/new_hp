// ── FAQ Chatbot (rule-based, no server) ─────────────────

const BOT_FLOWS = {
  start: {
    msg: "こんにちは！PAS企画のアシスタントです。\nどのようなことでお手伝いできますか？",
    opts: [
      { t: "サービスについて知りたい", next: "services" },
      { t: "ご相談の流れを知りたい", next: "flow" },
      { t: "費用・料金について", next: "fee" },
      { t: "会社について知りたい", next: "about" },
      { t: "お問い合わせしたい", goto: "contact" },
    ],
  },
  services: {
    msg: "PAS企画には5つのサービス領域があります。\nご興味のある分野をお選びください。",
    opts: [
      { t: "資産形成・資産運用", next: "svc_asset" },
      { t: "税務対策支援", next: "svc_tax" },
      { t: "不動産総合活用", next: "svc_estate" },
      { t: "経営サポート", next: "svc_biz" },
      { t: "AI導入支援", next: "svc_ai" },
      { t: "最初に戻る", next: "start" },
    ],
  },
  svc_asset: {
    msg: "【資産形成・資産運用】\nライフプランニングから投資信託・保険・年金まで、幅広い金融商品を活用したポートフォリオをご提案します。独立系FPとして特定の金融機関に偏らない中立的なアドバイスが強みです。",
    opts: [
      { t: "詳しく見る", goto: "services" },
      { t: "無料相談を申し込む", goto: "contact" },
      { t: "他のサービスを見る", next: "services" },
    ],
  },
  svc_tax: {
    msg: "【税務対策支援】\n個人・法人の節税対策、確定申告サポート、事業承継・相続対策まで、税理士と連携しながら総合的な税務戦略をご提案します。",
    opts: [
      { t: "詳しく見る", goto: "services" },
      { t: "無料相談を申し込む", goto: "contact" },
      { t: "他のサービスを見る", next: "services" },
    ],
  },
  svc_estate: {
    msg: "【不動産総合活用】\n不動産の取得・売却・運用・相続対策まで、資産としての不動産を最大限に活用するためのご提案をいたします。",
    opts: [
      { t: "詳しく見る", goto: "services" },
      { t: "無料相談を申し込む", goto: "contact" },
      { t: "他のサービスを見る", next: "services" },
    ],
  },
  svc_biz: {
    msg: "【経営サポート】\n中小企業・個人事業主の経営課題を、財務・資金調達・事業計画・補助金活用など多角的にサポートします。",
    opts: [
      { t: "詳しく見る", goto: "services" },
      { t: "無料相談を申し込む", goto: "contact" },
      { t: "他のサービスを見る", next: "services" },
    ],
  },
  svc_ai: {
    msg: "【AI導入支援】\n業務効率化・自動化・データ活用など、中小企業でも実践できるAI活用をご提案。導入計画から運用まで一貫してサポートします。",
    opts: [
      { t: "詳しく見る", goto: "services" },
      { t: "無料相談を申し込む", goto: "contact" },
      { t: "他のサービスを見る", next: "services" },
    ],
  },
  flow: {
    msg: "ご相談の流れはこちらです。\n\n① お問い合わせ（フォーム）\n② 初回無料相談（Web会議 or 対面）\n③ 課題の整理・ご提案\n④ ご契約・サポート開始\n\nまずはお気軽にご連絡ください！",
    opts: [
      { t: "お問い合わせする", goto: "contact" },
      { t: "最初に戻る", next: "start" },
    ],
  },
  fee: {
    msg: "初回のご相談は無料です。\n詳細な費用はサービス内容・契約形態によって異なりますので、まずはお気軽にご相談ください。",
    opts: [
      { t: "無料相談を申し込む", goto: "contact" },
      { t: "最初に戻る", next: "start" },
    ],
  },
  about: {
    msg: "PAS企画は茨城県つくば市を拠点とする独立系コングロマリット型アドバイザリーです。\n資産形成・税務・不動産・経営・AI導入の5領域を横断的に支援し、お客様の「一番の相談窓口」を目指しています。",
    opts: [
      { t: "会社概要を見る", goto: "about" },
      { t: "お問い合わせする", goto: "contact" },
      { t: "最初に戻る", next: "start" },
    ],
  },
};

function ChatBotMsg({ flowKey, active, onPick }) {
  const flow = BOT_FLOWS[flowKey];
  const lines = flow.msg.split("\n");
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0, marginTop: 2,
        background: "linear-gradient(135deg, var(--pur-3), #7b6cc4)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800,
      }}>P</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: "var(--bg-2)", borderRadius: "0 12px 12px 12px",
          padding: "10px 14px", fontSize: 13, lineHeight: 1.85, color: "var(--ink)",
        }}>
          {lines.map((l, i) => (
            <React.Fragment key={i}>{l}{i < lines.length - 1 && <br />}</React.Fragment>
          ))}
        </div>
        {active && (
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {flow.opts.map((opt) => (
              <button key={opt.t} onClick={() => onPick(opt)}
                className="chat-opt-btn"
                style={{
                  fontSize: 12, padding: "6px 12px",
                  border: "1px solid var(--pur-3)", borderRadius: 999,
                  color: "var(--pur-3)", background: "#fff",
                  cursor: "pointer", lineHeight: 1.4,
                  transition: "background .15s, color .15s",
                }}>
                {opt.t}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatUserMsg({ text }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{
        background: "var(--pur-3)", color: "#fff",
        borderRadius: "12px 0 12px 12px",
        padding: "8px 14px", fontSize: 13, maxWidth: "80%", lineHeight: 1.6,
      }}>
        {text}
      </div>
    </div>
  );
}

function ChatTyping() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, var(--pur-3), #7b6cc4)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800,
      }}>P</div>
      <div style={{
        background: "var(--bg-2)", borderRadius: "0 12px 12px 12px",
        padding: "13px 16px", display: "flex", gap: 4, alignItems: "center",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--pur-3)",
            animation: `chatDot 1.2s ${i * 0.2}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

function ChatBot() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const [activeFlow, setActiveFlow] = React.useState(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (open && msgs.length === 0) showBot("start");
  }, [open]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, typing]);

  const showBot = (key) => {
    setTyping(true);
    setActiveFlow(null);
    setTimeout(() => {
      setTyping(false);
      setMsgs((prev) => [...prev, { side: "bot", key }]);
      setActiveFlow(key);
    }, 700);
  };

  const pick = (opt) => {
    setMsgs((prev) => [...prev, { side: "user", text: opt.t }]);
    setActiveFlow(null);
    if (opt.goto) {
      setTimeout(() => { window.__setRoute?.(opt.goto); setOpen(false); }, 400);
      return;
    }
    if (opt.next) showBot(opt.next);
  };

  const reset = () => {
    setMsgs([]);
    setActiveFlow(null);
    setTyping(false);
    setTimeout(() => showBot("start"), 50);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="チャットで問い合わせ"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 200,
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--pur-3) 0%, #7b6cc4 100%)",
          color: "#fff", border: "none",
          boxShadow: "0 4px 20px rgba(100,70,180,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "transform .2s, box-shadow .2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(100,70,180,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(100,70,180,0.45)";
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M2 2L16 16M16 2L2 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="white"/>
            <circle cx="8" cy="10" r="1.2" fill="rgba(255,255,255,0.7)"/>
            <circle cx="12" cy="10" r="1.2" fill="rgba(255,255,255,0.7)"/>
            <circle cx="16" cy="10" r="1.2" fill="rgba(255,255,255,0.7)"/>
          </svg>
        )}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, zIndex: 199,
          width: 360, maxWidth: "calc(100vw - 32px)",
          height: 520, maxHeight: "calc(100vh - 120px)",
          background: "#fff", borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "chatOpen .25s cubic-bezier(.22,.61,.36,1)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, var(--pur-3) 0%, #7b6cc4 100%)",
            color: "#fff", padding: "14px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800,
              }}>P</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>PAS企画アシスタント</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>ご案内・サービス紹介</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "#fff", opacity: 0.8, padding: 4, cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M2 2L14 14M14 2L2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div ref={scrollRef} style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {msgs.map((m, i) =>
              m.side === "bot" ? (
                <ChatBotMsg key={i} flowKey={m.key}
                  active={activeFlow === m.key && i === msgs.length - 1}
                  onPick={pick} />
              ) : (
                <ChatUserMsg key={i} text={m.text} />
              )
            )}
            {typing && <ChatTyping />}
          </div>

          <div style={{
            padding: "8px 16px 12px",
            borderTop: "1px solid var(--line-2)",
            flexShrink: 0, textAlign: "center",
          }}>
            <button onClick={reset} style={{
              fontSize: 11, color: "var(--pur-3)", textDecoration: "underline", cursor: "pointer",
            }}>最初からやり直す</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatOpen {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes chatDot {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
        .chat-opt-btn:hover {
          background: var(--pur-3) !important;
          color: #fff !important;
        }
      `}</style>
    </>
  );
}

Object.assign(window, { ChatBot });
