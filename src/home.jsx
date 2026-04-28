// Homepage (home)
// ヒーローは「上部ゾーン / セーフエリア（メインコピー）/ 下部ゾーン」の3層 Flex構造。
// サブコピー（HERO_PHRASES）は各ゾーン内でのみ position:absolute で配置されるため、
// メインコピー（BE THE BEST PARTNER）と構造的に絶対重ならない。

// 1文字ずつフェードイン+下からスライドする見出し
function HeroAnimText({ text, fontSize, baseDelay = 0 }) {
  // 2層構造：
  //  外側 .hero-letter-wrap … PrismaticTitle と同じスライドアニメ（heroLetter）
  //  内側 .hero-anim-letter … グラデーションを background-position アニメで
  //                            時間方向に動かす（PrismaticTitle の prismaShift と同等の挙動）
  return (
    <span className="hero-anim-text" style={{ fontSize }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="hero-letter-wrap"
          style={{ animationDelay: `${80 + baseDelay + i * 50}ms` }}
        >
          <span className="prismatic prismatic-animated">
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

function Hero() {
  const topPhrases = HERO_PHRASES.filter(p => p.zone === "top");
  const bottomPhrases = HERO_PHRASES.filter(p => p.zone === "bottom");

  const renderPhrase = (p, i) => (
    <div
      key={p.t}
      className={`hero-phrase ${p.accent ? "hero-phrase-accent" : ""}`}
      data-idx={i}
      style={{
        position: "absolute",
        left: p.x, top: p.y,
        fontSize: p.size,
        color: p.color || "var(--ink-4)",
        fontWeight: 500,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        opacity: 0,
        animation: `phraseFloat 1.6s cubic-bezier(.22,.61,.36,1) ${(p.delay || 0) + 600}ms forwards`,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >{p.t}</div>
  );

  return (
    <section className="hero-v3" style={{ position: "relative", overflow: "hidden", paddingTop: 120, paddingBottom: 0 }}>
      <SubtleDots />

      {/* 上部ゾーン（セーフエリア外） */}
      <div className="hero-zone hero-zone-top">
        {topPhrases.map(renderPhrase)}
      </div>

      {/* メインコピー（セーフエリア） */}
      <div className="hero-zone-main">
        <div className="hero-lead">すべてのお客様の、ベストパートナーに</div>
        <div className="hero-title-stack">
          <h1 className="hero-anim-line">
            <HeroAnimText text="BE THE BEST" />
          </h1>
          <h1 className="hero-anim-line">
            <HeroAnimText text="PARTNER" baseDelay={11 * 50} />
          </h1>
        </div>
      </div>

      {/* 下部ゾーン（セーフエリア外） */}
      <div className="hero-zone hero-zone-bottom">
        {bottomPhrases.map(renderPhrase)}
      </div>

      {/* ロゴ＋本文（通常フロー） */}
      <div style={{ position: "relative", padding: "30px 0 100px" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal><div className="gentle-float" style={{ display: "inline-block" }}><Logo size={56} /></div></Reveal>
          <Reveal delay={1}><h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 36, lineHeight: 1.6 }}>
            お客様を取り巻く、あらゆる課題に。<br/>
            領域の垣根を越えて、お客様の「いま」と「これから」を共に創ります。
          </h2></Reveal>
          <Reveal delay={2}><p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 32, lineHeight: 2.1, maxWidth: 820, margin: "32px auto 0" }}>
            株式会社PAS企画は、特定の金融機関・業界に属さない独立系のアドバイザリー集団です。<br/>
            資産形成・税務・不動産・経営サポート・AI活用DX推進——5つの専門領域を一つの窓口で横断的にご提案し、<br/>
            個人・法人・業種を問わず、お客様本位の視点で最適解を追求します。
          </p></Reveal>
        </div>
      </div>

      <style>{`
        .hero-v3 .hero-zone {
          position: relative;
          width: 100%;
          max-width: 1340px;
          margin: 0 auto;
        }
        .hero-v3 .hero-zone-top { height: 110px; }
        .hero-v3 .hero-zone-bottom { height: 170px; }

        .hero-v3 .hero-zone-main {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          margin: 0 auto;
          padding: 40px 40px 12px;     /* PARTNER直下を詰める（top:40 / bottom:12） */
          text-align: left;
        }
        .hero-v3 .hero-lead {
          font-size: 18px;
          font-weight: 600;
          color: var(--ink-2);
          margin-bottom: 16px;
          opacity: 0;
          animation: phraseFloat 1s ease-out .2s forwards;
        }
        .hero-v3 .hero-title-stack { display: inline-block; }
        .hero-v3 .hero-anim-line {
          margin: 0;
          line-height: 0.95;
          letter-spacing: 0.01em;
          font-weight: 800;
        }
        .hero-v3 .hero-anim-text {
          font-size: clamp(40px, 8vw, 96px);
          font-weight: 800;
          line-height: 0.95;
          white-space: nowrap;
          display: inline-block;
        }
        /* 外側 .hero-letter-wrap と内側 .prismatic / .prismatic-animated は
           すべて index.html で定義済み。BEST PARTNER と完全に同じ虹色グラデーション +
           prismaShift（8s ease-in-out infinite alternate）アニメが効く。 */

        /* タブレット（〜1024px）：サブコピー縮小、セーフエリア維持 */
        @media (max-width: 1024px) {
          .hero-v3 .hero-zone-top { height: 90px; }
          .hero-v3 .hero-zone-bottom { height: 120px; }
          .hero-v3 .hero-zone-main { padding: 32px 32px 10px; }
          .hero-v3 .hero-phrase { font-size: clamp(16px, 2.4vw, 26px) !important; }
          .hero-v3 .hero-phrase-accent {
            font-size: clamp(24px, 4.2vw, 42px) !important;
            left: 50% !important;
            animation-name: phraseFloatCenter !important;
          }
          /* 上部ゾーン：独立系 / 一つの窓口で の行間を広げる（タブレット） */
          .hero-v3 .hero-zone-top .hero-phrase[data-idx="0"] { top: 5% !important; }
          .hero-v3 .hero-zone-top .hero-phrase[data-idx="1"] { top: 55% !important; }
        }
        /* スマホ（〜640px）：セーフエリア広め、サブコピー 12〜14px、低優先は非表示 */
        @media (max-width: 640px) {
          .hero-v3 .hero-zone-top { height: 70px; }
          .hero-v3 .hero-zone-bottom { height: 90px; }
          .hero-v3 .hero-zone-main { padding: 24px 20px 8px; text-align: center; }
          .hero-v3 .hero-title-stack { display: block; }
          .hero-v3 .hero-phrase { font-size: clamp(13px, 3.4vw, 16px) !important; }
          .hero-v3 .hero-phrase-accent {
            font-size: clamp(18px, 5.4vw, 24px) !important;
            left: 50% !important;
            animation-name: phraseFloatCenter !important;
          }
          /* 上部ゾーン：独立系 / 一つの窓口で の行間を広げる（スマホ） */
          .hero-v3 .hero-zone-top .hero-phrase[data-idx="0"] { top: 0% !important; }
          .hero-v3 .hero-zone-top .hero-phrase[data-idx="1"] { top: 60% !important; }
        }
        /* アクセント文字は中央寄せ＋下からスライドのアニメ専用 keyframes */
        @keyframes phraseFloatCenter {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 1024px) {
          .hero-v3 .hero-phrase-accent { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function PictureLinks() {
  const cards = [
    { ja: "代表メッセージ", en: "MESSAGE FROM CEO", hue: 220, id: "about", img: "assets/CEO.png", scroll: "section-message" },
    { ja: "経営理念・方針", en: "PHILOSOPHY",       hue: 40,  id: "about", img: "assets/Philosophy.jpg", scroll: "section-values" },
    { ja: "会社概要",       en: "ABOUT US",          hue: 340, id: "about", img: "assets/Aboutus.png", scroll: "section-company" },
  ];
  return (
    <section style={{ padding: "0 0 120px" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }} className="pic-grid">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i + 1}>
              <a href={`#${c.id}`} onClick={(e) => {
                   e.preventDefault();
                   if (c.scroll) {
                     const el = document.getElementById(c.scroll);
                     if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
                     window.__pendingScroll = c.scroll;
                   }
                   window.__setRoute?.(c.id);
                 }}
                 style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", display: "block" }}
                 onMouseEnter={(e) => e.currentTarget.querySelector("[data-img]").style.transform = "scale(1.08)"}
                 onMouseLeave={(e) => e.currentTarget.querySelector("[data-img]").style.transform = "none"}>
                {c.img ? (
                  <img data-img src={c.img} alt={c.ja} loading="lazy" decoding="async" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center top", transition: "transform .6s",
                  }}/>
                ) : (
                  <div data-img style={{
                    position: "absolute", inset: 0, transition: "transform .6s",
                    background: `linear-gradient(135deg, oklch(0.35 0.05 ${c.hue}) 0%, oklch(0.55 0.08 ${c.hue}) 50%, oklch(0.72 0.08 ${c.hue + 30}) 100%)`,
                  }}>
                    <svg width="100%" height="100%" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
                      <defs><linearGradient id={`fig-${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.7"/><stop offset="1" stopColor="#fff" stopOpacity="0.1"/></linearGradient></defs>
                      {[50, 100, 150, 200, 250].map((x, k) => (
                        <g key={k} fill={`url(#fig-${i})`}><circle cx={x} cy={120} r={14 + (k % 2) * 2}/><rect x={x - 20} y={130} width={40} height={70} rx={6}/></g>
                      ))}
                    </svg>
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65))" }}/>
                <div style={{ position: "absolute", left: 28, bottom: 22, color: "#fff" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: "0.04em" }}>{c.ja}</div>
                  <div className="en" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.85 }}>{c.en}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:820px){.pic-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

function StrengthsCircles() {
  return (
    <section style={{ position: "relative", padding: "120px 0 160px", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <Reveal><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>すべてのお客様に</div></Reveal>
        <Reveal delay={1}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <span className="en" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 11, letterSpacing: "0.4em", color: "var(--pur-3)" }}>ベストパートナー</span>
            <PrismaticTitle tag="h2" text="BEST PARTNER" style={{ fontSize: "clamp(38px, 7vw, 96px)", fontWeight: 800, letterSpacing: "0.01em", lineHeight: 1 }} />
          </div>
        </Reveal>
        <Reveal delay={2}><div style={{ fontSize: 22, fontWeight: 700, marginTop: 12 }}>と呼んでいただける存在となるために</div></Reveal>

        <Reveal delay={3}><p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 56, lineHeight: 2.1, maxWidth: 760, margin: "56px auto 0" }}>
          創業以来、私たちはお客様一人ひとりに寄り添い、<br/>
          「資産・事業・未来のあらゆる迷いを、信頼できる相談相手と共に解きほぐしていく」——その想いで歩んでまいりました。
        </p></Reveal>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: 72, position: "relative" }} className="circles-row">
          {STRENGTHS.map((s, i) => {
            const [ref, shown] = useReveal();
            return (
              <div key={i} ref={ref} className={shown ? "circle-expand" : ""} style={{
                width: 220, height: 220, borderRadius: 999, border: "1px solid var(--pur-2)",
                margin: "0 18px 24px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: 20, background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(6px)",
                opacity: shown ? 1 : 0,
                animationDelay: `${i * 150}ms`,
                transition: "transform .3s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = ""}>
                <div className="circle-body-pc" style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 8, lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.body}</div>
                <div className="circle-body-sp" style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 8, lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.bodySp || s.body}</div>
                <div className="circle-title-pc circle-title" style={{ fontWeight: 700, lineHeight: 1.3 }}>{s.n}{s.ja}</div>
                <div className="circle-title-sp circle-title" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                  <div>{s.n}</div><div>{s.ja}</div>
                </div>
              </div>
            );
          })}
        </div>
        <style>{`
          .circle-title { font-size: 20px; }
          .circle-title-sp { display: none; }
          .circle-body-sp { display: none; }
          @media(max-width:900px){.circles-row > div{margin-left:0 !important;}}
          @media(max-width:600px){
            .circles-row{display:grid !important; grid-template-columns:1fr 1fr; gap:16px; justify-items:center;}
            .circles-row > div{width:100% !important; height:auto !important; aspect-ratio:1; margin:0 !important; max-width:180px;}
            .circle-title { font-size: 18px; }
            .circle-title-pc { display: none; }
            .circle-title-sp { display: block; }
            .circle-body-pc { display: none; }
            .circle-body-sp { display: block; }
          }
        `}</style>

        <Reveal delay={4}><div style={{ marginTop: 72 }}>
          <a href="#best-partner" onClick={(e) => { e.preventDefault(); window.__setRoute?.("best-partner"); }} className="circle-btn" />
        </div></Reveal>
      </div>
    </section>
  );
}

function ServicesOverlap() {
  const iconFor = (label) => {
    switch (label) {
      case "資産形成・資産運用": return <svg width="36" height="36" viewBox="0 0 28 28"><path d="M4 22 L10 14 L14 18 L22 6" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M16 6 H22 V12" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>;
      case "税務対策支援": return <svg width="36" height="36" viewBox="0 0 28 28"><rect x="5" y="5" width="18" height="18" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M9 12h10M9 16h10M9 20h6" stroke="currentColor" strokeWidth="1.2"/></svg>;
      case "不動産総合活用": return <svg width="36" height="36" viewBox="0 0 28 28"><path d="M4 13 L14 5 L24 13 V23 H4 Z" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="12" y="17" width="4" height="6" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>;
      case "経営サポート": return <svg width="36" height="36" viewBox="0 0 28 28"><rect x="5" y="8" width="8" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="15" y="4" width="8" height="20" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>;
      case "AI活用・DX推進": return <svg width="36" height="36" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v4"/><circle cx="14" cy="1.5" r="1.5"/><rect x="3" y="6" width="22" height="16" rx="2.5"/><rect x="8" y="11" width="3.5" height="3.5" rx="0.8" fill="currentColor" stroke="none"/><rect x="16.5" y="11" width="3.5" height="3.5" rx="0.8" fill="currentColor" stroke="none"/><path d="M10 18.5 Q14 21 18 18.5"/><path d="M3 14H1M25 14h2"/></svg>;
      default: return null;
    }
  };
  return (
    <section style={{ position: "relative", padding: "120px 0 160px", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "0.05em" }}>事業内容</div>
          <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--ink-3)", marginTop: 6 }}>OUR SERVICES</div>
        </div></Reveal>
        <Reveal delay={1}><p style={{ textAlign: "center", fontSize: 14, color: "var(--ink-2)", lineHeight: 2.1, maxWidth: 760, margin: "0 auto 64px" }}>
          個人の資産形成から企業の経営課題、AIを駆使したDX推進まで。<br/>
          5つの領域を横断的に掛け合わせることで、単独の専門家では届かない「最適解」へ導きます。
        </p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18, alignItems: "stretch" }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={Math.min(i + 1, 4)} style={{ height: "100%" }}>
              <a href="#services" onClick={(e) => { e.preventDefault(); window.__pendingScroll = `section-service-${s.no}`; window.__setRoute?.("services"); }} style={{
                display: "flex", flexDirection: "column", justifyContent: "flex-start",
                height: "100%", padding: "32px 20px 28px", border: "1px solid var(--line)",
                background: "rgba(255,255,255,0.85)", borderRadius: 4, boxSizing: "border-box",
                transition: "transform .3s, box-shadow .3s, border-color .3s",
                textAlign: "center", color: "var(--ink)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px -12px rgba(120,100,180,0.22)"; e.currentTarget.style.borderColor = "var(--pur-3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = ""; }}>
                <div className="en" style={{ fontSize: 10, letterSpacing: "0.26em", color: "var(--pur-3)", marginBottom: 14 }}>{s.no}</div>
                <div style={{ color: "var(--ink-2)", marginBottom: 14, display: "flex", justifyContent: "center" }}>{iconFor(s.ja)}</div>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.5, marginBottom: 8 }}>{s.ja}</div>
                <div className="en" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-3)", lineHeight: 1.5 }}>{s.en}</div>
              </a>
            </Reveal>
          ))}
        </div>
        <style>{`
          @media(max-width:1080px){.svc-grid{grid-template-columns:repeat(3,1fr) !important;}}
          @media(max-width:640px){.svc-grid{grid-template-columns:repeat(2,1fr) !important;}}
        `}</style>
      </div>
    </section>
  );
}

function NewsBlock() {
  return (
    <section style={{ padding: "100px 0", background: "#fff" }}>
      <div className="wrap news-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 64, alignItems: "start" }}>
        <Reveal>
          <div>
            <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--ink-3)", marginBottom: 6 }}>NEWS</div>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 40 }}>お知らせ</div>
            <a href="#news" onClick={(e) => { e.preventDefault(); window.__setRoute?.("news"); }} className="circle-btn" />
          </div>
        </Reveal>
        <ul style={{ listStyle: "none" }}>
          {NEWS.slice(0, 5).map((n, i) => (
            <Reveal key={i} delay={Math.min(i + 1, 4)} as="li">
              <a href={`#news/${n.id}`} onClick={(e) => { e.preventDefault(); window.__setRoute?.(`news/${n.id}`); }} className="news-item" style={{
                display: "grid", gridTemplateColumns: "130px 100px 1fr", gap: 20, alignItems: "center",
                padding: "22px 0", borderTop: "1px solid var(--line)",
                borderBottom: i === 4 ? "1px solid var(--line)" : "none",
              }}>
                <span className="en" style={{ fontSize: 13, color: "var(--ink-2)", fontWeight: 600 }}>{n.date}</span>
                <span style={{ fontSize: 11, padding: "4px 14px", background: "var(--bg-2)", borderRadius: 999, justifySelf: "start" }}>{n.cat}</span>
                <span style={{ fontSize: 14, textDecoration: "underline", textDecorationColor: "var(--line)", textUnderlineOffset: 4 }}>{n.title}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
      <style>{`
        @media(max-width:820px){.news-grid{grid-template-columns:1fr !important;gap:32px !important;}}
        @media(max-width:640px){
          .news-item{grid-template-columns:110px 1fr !important;grid-template-rows:auto auto !important;align-items:start !important;column-gap:16px !important;}
          .news-item span:nth-child(1){grid-column:1;grid-row:1;}
          .news-item span:nth-child(2){grid-column:1;grid-row:2;margin-top:6px;}
          .news-item span:nth-child(3){grid-column:2;grid-row:1/3;align-self:center;}
        }
      `}</style>
    </section>
  );
}

function StaffPreview() {
  return (
    <section style={{ position: "relative", padding: "80px 0 120px", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", maxWidth: 1440 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="rec-grid">
          <Reveal>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <img src="assets/staff.png" alt="スタッフ紹介" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transform: "scale(1.12) translateY(-4%)" }} />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div>
              <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--ink-3)", marginBottom: 8 }}>STAFF</div>
              <h3 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 28 }}>スタッフ紹介</h3>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 20 }}>
                資産運用、税務、不動産、経営、そしてテクノロジー——<br/>それぞれの分野で実務経験を重ねたメンバーが、お客様のベストパートナーとして並走します。
              </p>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 32 }}>
                「顔の見える関係」を大切に、一人ひとりが責任を持ってご担当します。お客様の窓口に立つのはどんなメンバーか、ぜひご覧ください。
              </p>
              <a href="#staff" onClick={(e) => { e.preventDefault(); window.__setRoute?.("staff"); }} className="circle-btn" />
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:820px){.rec-grid{grid-template-columns:1fr !important;gap:32px !important;}}`}</style>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <PictureLinks />
      <StrengthsCircles />
      <ServicesOverlap />
      <NewsBlock />
      <StaffPreview />
      <ContactBand />
    </>
  );
}

Object.assign(window, { HomePage });
