// Header, Footer, Shared chrome

function Logo({ size = 36, light = false }) {
  return (
    <a href="#top" onClick={(e) => { e.preventDefault(); window.__setRoute?.("top"); }}
       style={{ display: "inline-flex", alignItems: "center", gap: 0, color: light ? "#fff" : "var(--ink)" }}>
      <img src="assets/logo-pas.png" alt="株式会社PAS企画" decoding="async" style={{ height: size + 12, width: "auto", display: "block", filter: light ? "invert(1) brightness(2)" : "none" }}/>
    </a>
  );
}

function Header({ route }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line-2)" : "1px solid transparent",
      transition: "all 240ms",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76, padding: "0 32px" }}>
        <Logo />
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desk-nav">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}
               onClick={(e) => { e.preventDefault(); window.__setRoute?.(n.id); }}
               style={{
                 padding: "10px 14px", fontSize: 13, fontWeight: 500,
                 color: route === n.id ? "var(--ink)" : "var(--ink-2)",
                 position: "relative",
               }}>
              {n.label}
              {route === n.id && <span style={{ position: "absolute", left: 14, right: 14, bottom: 4, height: 1, background: "var(--c6)", transformOrigin: "left", animation: "drawUnderline .4s ease-out forwards" }} />}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); window.__setRoute?.("contact"); }} className="pill-btn" style={{ marginLeft: 8 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" y="3.5" width="10" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 4.5 L7 8 L11.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
            <span style={{ fontWeight: 500, fontSize: 13 }}>お問い合わせ</span>
          </a>
        </nav>
        <button className="mob-menu" onClick={() => setMenuOpen(true)} style={{ display: "none", padding: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
      <style>{`@media(max-width:1100px){.desk-nav{display:none !important;}.mob-menu{display:inline-flex !important;}}`}</style>
    </header>
    {menuOpen && (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#fff", padding: "80px 24px 24px" }}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 22, right: 22, fontSize: 14 }}>CLOSE ×</button>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {[...NAV, { id: "staff", label: "スタッフ紹介", en: "STAFF" }, { id: "contact", label: "お問い合わせ", en: "CONTACT" }].filter((n, i, arr) => arr.findIndex(x => x.id === n.id) === i).map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.__setRoute?.(n.id); }}
               style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderBottom: "1px solid var(--line)" }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>{n.label}</span>
              <span className="en" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em" }}>{n.en}</span>
            </a>
          ))}
        </nav>
      </div>
    )}
    </>
  );
}

function PageTop() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ページトップへ戻る"
      className="page-top-fab"
      style={{
        position: "fixed", bottom: 90, right: 24, zIndex: 150,
        width: 56, height: 56, borderRadius: "50%",
        background: "var(--pur-1)", border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 1,
        boxShadow: "0 4px 16px rgba(100,70,180,0.25)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .3s, transform .3s, box-shadow .2s, background .2s",
      }}>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
        <path d="M3 9 L10 3 L17 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#fff", lineHeight: 1 }}>TOP</span>
      <style>{`
        .page-top-fab:hover { background: var(--pur-2) !important; box-shadow: 0 6px 22px rgba(100,70,180,0.4) !important; }
      `}</style>
    </button>
  );
}

function ContactBand() {
  return (
    <>
    <section id="contact-band" style={{
      position: "relative", minHeight: 520, overflow: "hidden", padding: "100px 0 120px",
      background: "linear-gradient(135deg, var(--pur-1) 0%, var(--pur-2) 40%, #e0d8f0 100%)",
      color: "#2a2340",
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", opacity: 0.18 }}>
        <svg width="80%" height="80%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="silh" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#5a4d88" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#5a4d88" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="400" cy="250" rx="380" ry="200" fill="url(#silh)"/>
          <g stroke="#3a2d68" strokeWidth="1.5" fill="none" opacity="0.7">
            <path d="M220 280 Q280 250 340 260 Q380 270 400 290 Q420 270 460 260 Q520 250 580 280"/>
            <path d="M340 260 L340 200 Q340 180 360 180 L440 180 Q460 180 460 200 L460 260"/>
            <path d="M320 290 Q340 310 380 310 L420 310 Q460 310 480 290"/>
          </g>
        </svg>
      </div>
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <Reveal><div className="en" style={{ fontSize: 14, letterSpacing: "0.3em", color: "#3a2d68" }}>CONTACT</div></Reveal>
        <Reveal delay={1}><h2 style={{ fontSize: 52, fontWeight: 700, marginTop: 8, marginBottom: 16, color: "#2a2340" }}>お問い合わせ</h2></Reveal>
        <Reveal delay={2}><p style={{ fontSize: 15, color: "#3a2d68", marginBottom: 64, lineHeight: 2 }}>
          ご相談・ご質問等ございましたら、<span className="contact-br"><br/></span>どうぞお気軽にお問い合わせください。
          <style>{`@media(min-width:601px){.contact-br{display:none;}}`}</style>
        </p></Reveal>
        <Reveal delay={3}><div style={{ display: "flex", justifyContent: "center" }}>
          <a href="#contact" onClick={(e) => { e.preventDefault(); window.__setRoute?.("contact"); }}
             style={{
               display: "flex", alignItems: "center", justifyContent: "space-between",
               background: "#fff", borderRadius: 999,
               padding: "22px 30px 22px 38px", minWidth: 340,
               boxShadow: "0 8px 24px -8px rgba(60,40,120,0.2)",
               color: "#2a2340", fontWeight: 600, fontSize: 16, gap: 20,
               transition: "transform .3s",
             }}
             onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
             onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
            <div>お問い合わせはこちら</div>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 999, border: "1px solid var(--pur-3)", color: "var(--pur-3)" }}>→</span>
          </a>
        </div></Reveal>
      </div>
    </section>
    </>
  );
}

function Footer() {
  const nav = (route, scroll) => (e) => {
    e.preventDefault();
    if (scroll) {
      const el = document.getElementById(scroll);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.__pendingScroll = scroll;
    }
    window.__setRoute?.(route);
  };
  const policyItems = [
    { t: "プライバシーポリシー",   onClick: nav("privacy") },
    { t: "コンプライアンス宣言",   onClick: nav("compliance") },
    { t: "リンク・免責事項",       onClick: nav("disclaimer") },
    { t: "お客様本位の業務運営",   onClick: nav("fiduciary") },
  ];
  const cols = [
    {
      h: "PAS企画について", hr: null,
      items: [
        { t: "代表メッセージ", onClick: nav("about", "section-message") },
        { t: "会社概要",       onClick: nav("about", "section-company") },
        { t: "選ばれる理由",   onClick: nav("best-partner") },
        { t: "スタッフ紹介",   onClick: nav("staff") },
      ],
    },
    {
      h: "事業内容", hr: null,
      items: [
        { t: "資産形成・資産運用", onClick: nav("services", "section-service-01") },
        { t: "税務対策支援",       onClick: nav("services", "section-service-02") },
        { t: "不動産総合活用",     onClick: nav("services", "section-service-03") },
        { t: "経営サポート",       onClick: nav("services", "section-service-04") },
        { t: "AI導入支援",         onClick: nav("services", "section-service-05") },
      ],
    },
  ];
  return (
    <footer style={{ background: "#fff", paddingTop: 80, paddingBottom: 32 }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}><Logo size={42} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, borderTop: "1px solid var(--line-2)", paddingTop: 48, alignItems: "start" }} className="foot-grid">
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>{col.h}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.items.map((it) => (
                  <li key={it.t} style={{ fontSize: 13, color: "var(--ink-2)" }}>
                    <a href="#" onClick={it.onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--pur-3)", fontSize: 10 }}>▸</span>{it.t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* 3列目：お知らせ＋お問い合わせ＋ポリシー大項目 */}
          <div>
            <a href="#news" onClick={nav("news")}
              style={{ fontSize: 14, fontWeight: 700, marginBottom: 24, display: "block", color: "var(--ink)" }}>
              お知らせ
            </a>
            <a href="#contact" onClick={nav("contact")}
              style={{ fontSize: 14, fontWeight: 700, marginBottom: 24, display: "block", color: "var(--ink)" }}>
              お問い合わせ
            </a>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {policyItems.map((it) => (
                <a key={it.t} href="#" onClick={it.onClick}
                  style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                  {it.t}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--line-2)", fontSize: 11, color: "var(--ink-3)" }}>
          <div className="en" style={{ letterSpacing: "0.08em" }}>© 2026 PAS Planning Co., Ltd. All Rights Reserved.</div>
        </div>
      </div>
      <style>{`
        @media(max-width:820px){.foot-grid{grid-template-columns:1fr 1fr !important;gap:32px 40px !important;}}
        @media(max-width:480px){.foot-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </footer>
  );
}

function Breadcrumb({ items }) {
  const trail = [
    { label: "TOP", to: "top" },
    ...items.map((it) => typeof it === "string" ? { label: it } : it),
  ];
  return (
    <nav className="breadcrumb" style={{
      fontSize: 13, color: "var(--ink-3)",
      display: "flex", alignItems: "center", flexWrap: "wrap",
      lineHeight: 1.6,
    }}>
      {trail.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ margin: "0 10px", color: "var(--ink-4)", fontSize: 10 }}>▶</span>}
          {it.to ? (
            <a href={`#${it.to}`}
               onClick={(e) => { e.preventDefault(); window.__setRoute?.(it.to); }}
               className="bc-link"
               style={{ color: "var(--ink-3)", transition: "color .15s" }}>
              {it.label}
            </a>
          ) : (
            <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{it.label}</span>
          )}
        </React.Fragment>
      ))}
      <style>{`.bc-link:hover{color:var(--pur-3) !important;}`}</style>
    </nav>
  );
}

function PageHeader({ en, ja, lead, crumb }) {
  return (
    <section style={{ position: "relative", paddingTop: 130, paddingBottom: 100, overflow: "hidden" }} className="page-header-section">
      <style>{`@media(max-width:820px){.page-header-section{padding-bottom:48px !important; padding-top:110px !important;}}`}</style>
      <div className="wrap" style={{ position: "relative" }}>
        {crumb && <div style={{ marginBottom: 48 }}><Breadcrumb items={crumb} /></div>}
        <div style={{ textAlign: "center" }}>
          <Reveal><div className="en" style={{ fontSize: 13, letterSpacing: "0.3em", color: "var(--ink-3)", marginBottom: 10 }}>{en}</div></Reveal>
          <Reveal delay={1}><h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, letterSpacing: "0.02em", marginBottom: 24 }}>{ja}</h1></Reveal>
          {lead && <Reveal delay={2}><p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 800, margin: "0 auto", lineHeight: 2 }}>{lead}</p></Reveal>}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ ja, en, style }) {
  return (
    <div className="section-eyebrow" style={style}>
      <Reveal><span className="ja">{ja}</span></Reveal>
      <Reveal delay={1}><span className="en">{en}</span></Reveal>
    </div>
  );
}

Object.assign(window, { Logo, Header, Footer, ContactBand, PageHeader, SectionHead, Breadcrumb, PageTop });
