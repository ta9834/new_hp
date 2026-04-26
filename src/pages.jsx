// Inner pages for PAS企画

function AboutPage() {
  React.useEffect(() => {
    const id = window.__pendingScroll;
    if (id) {
      window.__pendingScroll = null;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, []);
  return (
    <>
      <PageHeader en="ABOUT US" ja="PAS企画について" crumb={["PAS企画について"]} lead={<>人生と事業のあらゆる課題に、<span className="about-br"><br/></span>領域の垣根を越えてお応えする<span className="about-br"><br/></span>プロフェッショナル・アドバイザー集団。<style>{`.about-br{display:none;}@media(max-width:640px){.about-br{display:inline;}}`}</style></>} />
      <section id="section-message" style={{ padding: "80px 0 100px" }}>
        <div className="wrap ab-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
          <img src="assets/message.jpg" alt="代表取締役 小島拓也の写真" className="msg-img" loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center center", display: "block" }} />
          <div>
            <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--pur-3)", marginBottom: 12 }}>MESSAGE</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>代表メッセージ</h2>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.9, marginBottom: 24 }}>「すべての課題を、横断的な視点で最適解へ。」——業種・規模・世代を問わず、あらゆるお客様のベストパートナーへ。</p>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 20 }}>
              資産運用、税務対策、不動産活用、経営サポート、そしてAI活用DX推進——。私たちPAS企画は、人生と事業にまつわる多様な課題を、一つの組織で横断的に解決できる総合アドバイザリー集団を目指しています。
            </p>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 20 }}>
              「資産運用は証券会社、税務は税理士、不動産は不動産会社、経営は別の専門家——」これまでお客様は、課題ごとに異なる窓口を渡り歩く必要がありました。しかし現実の課題は、単独では存在しません。
            </p>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 20 }}>
              複雑化する経済環境の中で、一つの専門家に相談するだけでは見落としが生まれやすい時代になりました。だからこそ、複数の専門領域を内包したコングロマリット型の支援体制が必要とされています。
            </p>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 32 }}>
              創業当初から大切にしてきたのは、「特定の商品や手法を売る」のではなく、「お客様の状況に最も合った選択肢を、中立的な立場で提示する」というスタンスです。PAS企画は、特定の金融機関や商品に縛られない独立した立場から、5つの専門領域を横断して最適解をご提案します。これからも「すべての悩みを、一つの窓口で最適解へ」を合言葉に、お客様お一人おひとりに誠実に向き合ってまいります。
            </p>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>株式会社PAS企画</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>代表取締役　小島 拓也</div>
          </div>
        </div>
        <style>{`
          @media(max-width:820px){ .ab-grid{ grid-template-columns:1fr !important;} }
          @media(max-width:820px){ .msg-img{ aspect-ratio:4/3 !important; object-position:center 20% !important; } }
        `}</style>
      </section>

      <section id="section-company" style={{ padding: "100px 0", background: "var(--bg-2)" }}>
        <div className="wrap">
          <div className="section-eyebrow" style={{ marginBottom: 60 }}>
            <span className="ja">会社概要</span><span className="en">COMPANY PROFILE</span>
          </div>
          <div style={{ maxWidth: 880, margin: "0 auto", borderTop: "1px solid var(--line)" }}>
            {[
              ["会社名",   "株式会社PAS企画（PAS Planning Co., Ltd.）"],
              ["所在地",   <>〒300-3261<span className="addr-br"><br/></span> 茨城県つくば市花畑3丁目13番地10 ヤマグチビル3階<br/>TEL：029-877-6322</>],
              ["創業",     "2018年10月"],
              ["設立",     "2021年8月"],
              ["役員",     "代表取締役　小島 拓也\n取締役　　　阿部 龍一"],
              ["関連会社", "合同会社PASパートナーズ（旧：合同会社グラン・ジュテ）"],
              ["営業時間", "9:30〜18:30（日祝祭日を除く）"],
              ["適格請求書発行事業者登録番号", "T8050001049710"],
            ].map(([k, v], i) => (
              <div key={i} className="company-row" style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: 24, padding: "20px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-2)" }}>{k}</div>
                <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{v}</div>
              </div>
            ))}
            <style>{`
              .addr-br{ display:none; }
              @media(max-width:640px){
                .company-row{ grid-template-columns:1fr !important; gap:6px !important; }
                .addr-br{ display:inline; }
              }
            `}</style>
          </div>
        </div>
      </section>

      <ValuesSection />
      <AccessSection />
      <ContactBand />
    </>
  );
}

function ValuesSection() {
  const cards = [
    {
      label: "経営理念", en: "Philosophy",
      body: "お客様の幸せ創造を通じて\n社会に貢献し、\n社員の幸福向上を図る",
      bodyStyle: { fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 700, lineHeight: 1.9, whiteSpace: "pre-line" },
    },
    {
      label: "ミッション", en: "Mission",
      body: "お金と事業の悩みを、\nすべて",
      highlight: "最適解",
      bodyAfter: "へ導く",
      bodyStyle: { fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 700, lineHeight: 1.9 },
    },
    {
      label: "ビジョン", en: "Vision",
      body: "世代を超えて選ばれる、\n総合アドバイザリーパートナーへ",
      bodyStyle: { fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 700, lineHeight: 1.9, whiteSpace: "pre-line" },
    },
    {
      label: "指針", en: "Policy",
      list: [
        "誠意誠実をもって、お客様と共に歩む",
        "専門家として、誇り得る知識と品質を常に磨き続ける",
        "中立を貫き、お客様本位の最適解を導く",
        "領域の垣根を越え、新しい価値を共創する",
        "世代を超えた、長期的な信頼関係を築く",
      ],
    },
  ];
  return (
    <section id="section-values" style={{ padding: "100px 0", background: "#fff" }}>
      <div className="wrap">
        <div className="section-eyebrow" style={{ marginBottom: 64 }}>
          <Reveal><span className="ja">私たちの価値観</span></Reveal>
          <Reveal delay={1}><span className="en">OUR VALUES</span></Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, gridAutoRows: "1fr" }} className="values-grid">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i} style={{ height: "100%" }}>
              <div style={{
                padding: "44px 48px",
                borderRadius: 16,
                border: "1px solid var(--line)",
                background: "var(--bg-2)",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--pur-3)" }}>{c.label}</span>
                  <span className="en" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--ink-3)" }}>{c.en}</span>
                </div>
                {c.list ? (
                  <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {c.list.map((item, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--ink)", lineHeight: 1.75 }}>
                        <span style={{ color: "var(--pur-3)", fontWeight: 700, minWidth: 22 }}>{j + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : c.highlight ? (
                  <div style={c.bodyStyle}>
                    {c.body}
                    <span style={{ color: "var(--pur-3)" }}>{c.highlight}</span>
                    {c.bodyAfter}
                  </div>
                ) : (
                  <div style={c.bodyStyle}>{c.body}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`@media(max-width:640px){.values-grid{grid-template-columns:1fr !important; grid-auto-rows:auto !important;}}`}</style>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section style={{ padding: "100px 0 120px" }}>
      <div className="wrap">
        <div className="section-eyebrow" style={{ marginBottom: 56 }}>
          <span className="ja">アクセス</span><span className="en">ACCESS</span>
        </div>
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid var(--line)",
          padding: 40, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 48,
          boxShadow: "0 10px 28px -20px rgba(60,40,120,0.2)",
        }} className="ac-grid">
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, letterSpacing: "0.04em" }}>本社・つくばオフィス</div>
            {[
              ["住所", "〒300-3261\n茨城県つくば市花畑3丁目13番地10\nヤマグチビル3階"],
              ["最寄駅", "つくばエクスプレス「つくば駅」\nより車で約15分"],
              ["電話", "029-877-6322"],
              ["営業時間", "9:30〜18:30（日祝祭日を除く）"],
            ].map(([k, v], i) => (
              <div key={i} style={{ padding: "14px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--pur-3)", fontWeight: 700, marginBottom: 6 }}>{k}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden", background: "#f0eef6", position: "relative", minHeight: 340 }}>
            <iframe
              title="株式会社PAS企画 本社地図"
              src="https://www.google.com/maps?q=%E8%8C%A8%E5%9F%8E%E7%9C%8C%E3%81%A4%E3%81%8F%E3%81%B0%E5%B8%82%E8%8A%B1%E7%95%913%E4%B8%81%E7%9B%AE13-10&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 340, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href="https://www.google.com/maps?q=%E8%8C%A8%E5%9F%8E%E7%9C%8C%E3%81%A4%E3%81%8F%E3%81%B0%E5%B8%82%E8%8A%B1%E7%95%913%E4%B8%81%E7%9B%AE13-10"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute", right: 14, bottom: 14,
                padding: "8px 14px", borderRadius: 999, background: "#fff",
                border: "1px solid var(--line)", fontSize: 11, fontWeight: 600,
                color: "var(--ink)", boxShadow: "0 6px 16px -8px rgba(0,0,0,0.2)",
                display: "inline-flex", gap: 6, alignItems: "center",
              }}>
              Google Mapsで開く <span style={{ color: "var(--pur-3)" }}>↗</span>
            </a>
          </div>
        </div>
        <style>{`@media(max-width:820px){.ac-grid{grid-template-columns:1fr !important;padding:24px !important;}}`}</style>
      </div>
    </section>
  );
}

function StrengthsBand() {
  return (
    <section style={{ position: "relative", padding: "100px 0 140px", overflow: "hidden" }}>
      <WaveField height={420} density={11} position="bottom"/>
      <div className="wrap" style={{ position: "relative" }}>
        <div className="section-eyebrow" style={{ marginBottom: 64 }}>
          <span className="ja">私たちの強み</span><span className="en">OUR STRENGTHS</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }} className="st-grid">
          {STRENGTHS.map((s, i) => (
            <div key={i} style={{
              padding: "40px 28px", borderRadius: 12, background: "rgba(255,255,255,0.8)",
              border: "1px solid var(--line)", textAlign: "center", minHeight: 240,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
            }}>
              <div className="en prismatic" style={{ fontSize: 34, fontWeight: 800, marginBottom: 4 }}>0{i + 1}</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{s.n}<span style={{ color: "var(--pur-3)" }}>・</span>{s.ja}</div>
              <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.9 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:820px){ .st-grid{ grid-template-columns:1fr 1fr !important;}}`}</style>
      </div>
    </section>
  );
}

function ServicesPage() {
  React.useEffect(() => {
    const id = window.__pendingScroll;
    if (id) {
      window.__pendingScroll = null;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, []);
  return (
    <>
      <PageHeader en="OUR SERVICES" ja="事業内容" crumb={["事業内容"]} lead={<>資産形成・税務・不動産・経営・AI——<br/>別々に相談するしかなかった5つの領域を、<span className="sv-lead-br"><br/></span>一つの窓口で横断的に支援する「コングロマリット型」アドバイザリー。<style>{`@media(min-width:601px){.sv-lead-br{display:none;}}`}</style></>} />

      <section style={{ padding: "80px 0 60px" }}>
        <div className="wrap">
          {SERVICES.map((s, i) => (
            <div key={s.no} id={`section-service-${s.no}`} style={{
              display: "grid", gridTemplateColumns: i % 2 ? "1fr 1.3fr" : "1.3fr 1fr",
              gap: 48, padding: "48px 0", borderTop: "1px solid var(--line)",
              alignItems: "center",
            }} className="sv-row">
              {i % 2 === 0 ? (
                <>
                  <TextBlock s={s}/>
                  <CirclePanel s={s}/>
                </>
              ) : (
                <>
                  <CirclePanel s={s}/>
                  <TextBlock s={s}/>
                </>
              )}
            </div>
          ))}
        </div>
        <style>{`
          .sv-no-sp{ display:none; }
          @media(max-width:820px){
            .sv-row{ grid-template-columns:1fr !important; padding:32px 0 !important;}
            .sv-circle{ display:none !important;}
            .sv-no-sp{ display:block !important;}
          }
        `}</style>
      </section>

      <section style={{ padding: "80px 0 40px", background: "var(--bg-2)" }}>
        <div className="wrap">
          <div className="section-eyebrow" style={{ marginBottom: 40 }}>
            <span className="ja">こんなお悩みはありませんか</span>
            <span className="en">YOUR CONCERNS</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="cn-grid">
            {CONCERNS.map((c) => (
              <div key={c.no} style={{ padding: 28, border: "1px solid var(--line)", borderRadius: 12, background: "#fff" }}>
                <div className="en" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--pur-3)", marginBottom: 10 }}>CASE {c.no}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{c.t}</div>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.9 }}>{c.body}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:600px){ .cn-grid{ grid-template-columns:1fr !important;}}`}</style>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 2 }}>
              どんなお悩みも、まずはお気軽にご相談ください。<br/>
              PAS企画の専門チームが、複数の領域を横断して最適な解決策をご提案します。
            </p>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

function TextBlock({ s }) {
  return (
    <div>
      <div className="en prismatic sv-no-sp" style={{ fontSize: 60, fontWeight: 800, marginBottom: 12 }}>{s.no}</div>
      <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--pur-3)", marginBottom: 4 }}>{s.en.toUpperCase()}</div>
      <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, letterSpacing: "0.04em" }}>{s.ja}</h3>
      <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.8, marginBottom: 16 }}>{s.lead}</p>
      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 24 }}>{s.body}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {s.items.map((it) => (
          <span key={it} style={{ fontSize: 12, padding: "6px 12px", background: "var(--bg-2)", borderRadius: 999, color: "var(--ink-2)" }}>{it}</span>
        ))}
      </div>
    </div>
  );
}

function CirclePanel({ s }) {
  return (
    <div className="sv-circle" style={{ display: "flex", justifyContent: "center" }}>
      <div style={{
        width: 360, height: 360, borderRadius: 999,
        border: "1px solid var(--pur-2)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(circle at 30% 30%, rgba(197,184,232,0.25), transparent 70%)",
        textAlign: "center",
      }}>
        <div className="en prismatic" style={{ fontSize: 80, fontWeight: 800 }}>0{parseInt(s.no, 10)}</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8, letterSpacing: "0.04em" }}>{s.ja}</div>
        <div className="en" style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--ink-3)", marginTop: 6 }}>{s.en.toUpperCase()}</div>
      </div>
    </div>
  );
}

function ConsultantPage() {
  return (
    <>
      <PageHeader en="CONSULTANT" ja="コンサルタント紹介" crumb={["コンサルタント紹介"]} lead="資産運用・税務・不動産・経営、それぞれの領域で実務経験を重ねた専門家が、一つのチームとしてお客様をご支援します。" />
      <section style={{ padding: "80px 0 120px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }} className="cs-grid">
            {CONSULTANTS.map((c, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
                <div style={{ aspectRatio: "1", borderRadius: 999, background: `linear-gradient(135deg, oklch(0.68 0.08 ${60 + i * 70}) 0%, oklch(0.82 0.06 ${90 + i * 60}) 100%)` }}/>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div className="en" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--pur-3)", marginBottom: 6 }}>{c.role.toUpperCase()}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 10 }}>{c.role}</div>
                  <div style={{ fontSize: 13, color: "var(--ink)" }}>{c.spec}</div>
                  <div className="en" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)", marginTop: 6 }}>{c.years}</div>
                </div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:820px){ .cs-grid{ grid-template-columns:1fr !important;}}`}</style>
        </div>
      </section>
      <FaqBlock />
      <ContactBand />
    </>
  );
}

function FaqBlock() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: "80px 0 120px", background: "var(--bg-2)" }}>
      <div className="wrap" style={{ maxWidth: 880 }}>
        <div className="section-eyebrow" style={{ marginBottom: 48 }}>
          <span className="ja">よくあるご質問</span><span className="en">FAQ</span>
        </div>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: "100%", textAlign: "left", padding: "22px 0",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
            }}>
              <span style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span className="en prismatic" style={{ fontSize: 22, fontWeight: 800 }}>Q</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{f.q}</span>
              </span>
              <span style={{ color: "var(--pur-3)", transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", fontSize: 20 }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 0 22px 40px", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 2 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// NewsPage / NewsDetailPage は src/news.jsx に移動しました

// ── Best Partner Page ──────────────────────────────────
function BestPartnerPage() {
  return (
    <>
      <PageHeader en="BEST PARTNER" ja="選ばれる理由" crumb={["選ばれる理由"]} lead="「数ある選択肢の中で、なぜPAS企画なのか？」——4つの理由で、私たちの価値をお伝えします。" />
      <section style={{ padding: "60px 0 40px" }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 820 }}>
          <Reveal>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span className="en" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 11, letterSpacing: "0.4em", color: "var(--pur-3)" }}>ベストパートナー</span>
              <PrismaticTitle tag="h2" text="BEST PARTNER" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800, letterSpacing: "0.01em", lineHeight: 1 }} />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.1, marginTop: 48 }}>
              お客様の人生と向き合うアドバイザーとして、私たちが大切にしている4つの約束。<br/>
              それは、日々の業務のすべての土台になっています。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our Strengths — 4 cards */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap" style={{ maxWidth: 1440 }}>
          <div className="section-eyebrow" style={{ marginBottom: 56 }}>
            <span className="ja">私たちの強み</span><span className="en">OUR STRENGTHS</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="st-cards">
            {STRENGTHS.map((s, i) => {
              const [ref, shown] = useReveal();
              return (
                <div key={i} ref={ref} style={{
                  padding: "40px 22px 32px", borderRadius: 14, background: "#fff",
                  border: "1px solid var(--line)", textAlign: "center", minHeight: 240,
                  display: "flex", flexDirection: "column", alignItems: "center",
                  boxShadow: "0 10px 28px -22px rgba(60,40,120,0.25)",
                  opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .7s ${i * 120}ms, transform .7s ${i * 120}ms`,
                }}>
                  <div className="en prismatic prismatic-animated" style={{ fontSize: 36, fontWeight: 800, marginBottom: 6, letterSpacing: "0.02em" }}>0{i + 1}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{s.n}<span style={{ color: "var(--pur-3)" }}>・</span>{s.ja}</div>
                  <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.9, whiteSpace: "nowrap" }}>{s.body}</p>
                </div>
              );
            })}
          </div>
          <style>{`@media(max-width:900px){.st-cards{grid-template-columns:1fr 1fr !important;}}@media(max-width:560px){.st-cards{grid-template-columns:1fr !important;}}`}</style>
        </div>
      </section>

      <section style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          {REASONS.map((r, i) => (
            <div key={r.no} style={{
              display: "grid", gridTemplateColumns: i % 2 ? "1.3fr 1fr" : "1fr 1.3fr",
              gap: 64, padding: "70px 0", borderTop: "1px solid var(--line)", alignItems: "center",
            }} className="bp-row">
              {i % 2 === 0 ? <><ReasonVisual r={r}/><ReasonText r={r}/></> : <><ReasonText r={r}/><ReasonVisual r={r}/></>}
            </div>
          ))}
        </div>
        <style>{`
          .reason-title-sp{ display:none; }
          .reason-title-pc{ display:block; }
          .reason-no-sp{ display:none; }
          @media(max-width:820px){
            .bp-row{
              display:block !important;
              padding:40px 0 !important;
            }
            .bp-row .reason-visual{ display:none !important; }
            .reason-no-sp{ display:block !important; }
            .reason-title-pc{ display:none !important; }
            .reason-title-sp{ display:block !important; }
            .bp-row .reason-text-body{ margin-top:20px; }
          }
        `}</style>
      </section>
      <ContactBand />
    </>
  );
}

function ReasonVisual({ r }) {
  return (
    <div className="reason-visual" style={{ display: "flex", justifyContent: "center" }}>
      <div style={{
        width: 400, height: 400, borderRadius: 999, border: "1px solid var(--pur-2)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(circle at 30% 30%, rgba(197,184,232,0.3), transparent 70%)",
      }}>
        <div className="en prismatic" style={{ fontSize: 108, fontWeight: 800, lineHeight: 1 }}>{r.no}</div>
        <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--ink-3)", marginTop: 12 }}>REASON</div>
      </div>
    </div>
  );
}

function ReasonText({ r }) {
  return (
    <div className="reason-text">
      <div className="reason-text-head">
        <div className="en prismatic reason-no-sp" style={{ fontSize: 60, fontWeight: 800, marginBottom: 8, lineHeight: 1 }}>{r.no}</div>
        <div className="en" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--pur-3)", marginBottom: 4 }}>{r.en}</div>
        <h3 className="reason-title-pc" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.4, marginBottom: 20 }}>{r.ja}</h3>
        <h3 className="reason-title-sp" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 0, whiteSpace: "pre-line" }}>{r.jaSp || r.ja}</h3>
      </div>
      <div className="reason-text-body">
        <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 2.05, marginBottom: 24 }}>{r.body}</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {r.points.map((p) => (
            <li key={p} style={{ fontSize: 13.5, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ color: "var(--pur-3)", marginTop: 2 }}>▸</span>{p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Contact Page (Services/Products inquiry) ───────────
function StaffPage() {
  const [active, setActive] = React.useState(null);
  return (
    <>
      <PageHeader en="STAFF" ja="スタッフ紹介" crumb={["スタッフ紹介"]} lead="異なる専門性を持つメンバーが一つのチームとなり、お客様の人生と事業のあらゆる課題に多角的にお応えします。" />

      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap" style={{ maxWidth: 1200 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36, alignItems: "stretch" }} className="staff-grid">
            {STAFF.map((s, i) => (
              <Reveal key={s.id} delay={i % 3} style={{ height: "100%" }}>
                <div
                  onClick={() => setActive(s)}
                  style={{
                    cursor: "pointer", background: "#fff", border: "1px solid var(--line)",
                    borderRadius: 18, overflow: "hidden", transition: "transform .35s, box-shadow .35s",
                    display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 18px 40px -20px rgba(50,40,90,0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div className="staff-card-img" style={{ aspectRatio: "4/5", background: `linear-gradient(135deg, ${s.tone[0]} 0%, ${s.tone[1]} 100%)`, position: "relative", overflow: "hidden" }}>
                    {s.photo ? (
                      <img src={s.photo} alt={`${s.name}（${s.role}）の写真`} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: s.photoFit || "cover", objectPosition: s.photoPos || "center center" }} />
                    ) : (
                      <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
                        <circle cx="200" cy="200" r="85" fill="#fff" opacity="0.82"/>
                        <path d="M70 500 Q70 340 200 340 Q330 340 330 500 Z" fill="#fff" opacity="0.82"/>
                      </svg>
                    )}
                    <div style={{ position: "absolute", top: 16, left: 16, fontSize: 10, letterSpacing: "0.3em", color: "#fff", background: "rgba(0,0,0,0.22)", padding: "6px 12px", borderRadius: 999, backdropFilter: "blur(4px)" }}>
                      STAFF / {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div style={{ padding: "26px 26px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div className="en" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--pur-3)", marginBottom: 6 }}>{s.roleEn}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 4 }}>{s.role}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
                    <div className="en" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", marginBottom: 16 }}>{s.nameEn}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {s.spec.map((sp) => (
                        <span key={sp} style={{ fontSize: 10.5, padding: "5px 10px", borderRadius: 999, background: "var(--bg-2)", color: "var(--ink-2)" }}>{sp}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px dashed var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--ink-3)" }}>
                      <span>詳細プロフィール</span>
                      <span style={{ color: "var(--pur-3)" }}>→</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`
            @media(max-width:980px){.staff-grid{grid-template-columns:repeat(2,1fr) !important;}}
            @media(max-width:600px){
              .staff-grid{grid-template-columns:1fr !important;}
              .staff-card-img{aspect-ratio:4/3 !important;}
            }
          `}</style>
        </div>
      </section>

      <section style={{ padding: "60px 0 100px", position: "relative", overflow: "hidden" }}>
        {/* 装飾：背景のソフトグラデーション円 */}
        <div aria-hidden="true" style={{
          position: "absolute", top: -120, right: -120, width: 420, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(157,143,204,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div aria-hidden="true" style={{
          position: "absolute", bottom: -100, left: -120, width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(122,165,210,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div className="wrap" style={{ maxWidth: 1080, position: "relative" }}>
          <div className="section-eyebrow" style={{ marginBottom: 56 }}>
            <span className="ja">私たちが大切にしていること</span>
            <span className="en">OUR TEAM VALUES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, textAlign: "left", alignItems: "stretch" }} className="values-grid">
            {[
              {
                en: "TEAM",
                h: "チームで向き合う",
                body: "一人のお客様を複数メンバーで担当。専門分野の垣根を越えて意見を持ち寄り、最適解を探します。",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="11" cy="13" r="5" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="25" cy="13" r="5" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="18" cy="24" r="5" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                ),
              },
              {
                en: "LEARN",
                h: "学び続けるチーム",
                body: "税制・金融・テクノロジーの変化に常に追従。お客様に最新の選択肢をお届けするため、学びを止めません。",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <path d="M6 9 L18 12 L18 30 L6 27 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M30 9 L18 12 L18 30 L30 27 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M10 16 L14 17 M10 20 L14 21 M22 16 L26 15 M22 20 L26 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                en: "LIFELONG",
                h: "長期で寄り添う",
                body: "一度きりの相談で終わる関係ではなく、人生と事業の節目ごとに継続的に並走するパートナーを目指します。",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="13" cy="18" r="7" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="23" cy="18" r="7" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                ),
              },
            ].map((v, i) => (
              <div key={i} className="value-card" style={{
                background: "#fff", padding: "44px 32px 36px",
                borderRadius: 16, border: "1px solid var(--line)",
                position: "relative", overflow: "hidden",
                transition: "transform .35s cubic-bezier(.22,.61,.36,1), box-shadow .35s, border-color .35s",
              }}>
                {/* トップのプリズマティックグラデーション帯 */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg, var(--c1) 0%, var(--c2) 25%, var(--c3) 50%, var(--c5) 75%, var(--c6) 100%)",
                }}/>
                {/* No.+ アイコン */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 26 }}>
                  <div className="en prismatic prismatic-animated" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: "0.02em" }}>
                    0{i + 1}
                  </div>
                  <div style={{ color: "var(--pur-3)" }}>{v.icon}</div>
                </div>
                <div className="en" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--pur-3)", marginBottom: 10 }}>{v.en}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, letterSpacing: "0.02em" }}>{v.h}</div>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.95 }}>{v.body}</p>
              </div>
            ))}
          </div>
          <style>{`
            .value-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 24px 48px -24px rgba(50,40,90,0.20);
              border-color: var(--pur-2);
            }
            @media(max-width:820px){.values-grid{grid-template-columns:1fr !important;}}
          `}</style>
        </div>
      </section>

      {active && <StaffModal staff={active} onClose={() => setActive(null)} />}

      <ContactBand />
    </>
  );
}

function StaffModal({ staff, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // iOS Safariでもスクロール位置を保ったまま背景スクロールをロックするため、bodyをposition:fixedで固定
    const scrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  return (
    <div onClick={onClose}
         style={{ position: "fixed", inset: 0, background: "rgba(20,16,40,0.55)", backdropFilter: "blur(6px)",
                  zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "100px 24px 24px",
                  animation: "fadeIn .25s ease" }}
         className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()}
           style={{ background: "#fff", borderRadius: 20, maxWidth: 820, width: "100%",
                    position: "relative", overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    boxShadow: "0 40px 80px -30px rgba(0,0,0,0.4)", animation: "slideUp .35s ease" }}
           className="staff-modal-inner">
        {/* PC用閉じるボタン（写真右上） */}
        <button onClick={onClose} className="modal-close-pc" style={{ position: "absolute", top: 18, right: 18, width: 36, height: 36,
                                          borderRadius: 999, border: "1px solid var(--line)", background: "#fff",
                                          fontSize: 16, cursor: "pointer", zIndex: 10 }}>×</button>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, flex: 1, minHeight: 0 }} className="modal-grid">
          <div style={{ background: `linear-gradient(135deg, ${staff.tone[0]} 0%, ${staff.tone[1]} 100%)`, minHeight: 360, position: "relative" }} className="modal-photo-panel">
            {/* スマホ用閉じるボタン（写真右上） */}
            <button onClick={onClose} className="modal-close-sp" style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32,
                                                borderRadius: 999, border: "1px solid rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.25)",
                                                fontSize: 14, cursor: "pointer", zIndex: 2, color: "#fff", display: "none" }}>×</button>
            {staff.photo ? (
              <img src={staff.photo} alt={`${staff.name}（${staff.role}）の写真`} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: staff.photoFit || "cover", objectPosition: staff.photoPos || "center center" }} />
            ) : (
              <svg width="100%" height="100%" viewBox="0 0 280 400" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
                <circle cx="140" cy="150" r="68" fill="#fff" opacity="0.85"/>
                <path d="M40 400 Q40 260 140 260 Q240 260 240 400 Z" fill="#fff" opacity="0.85"/>
              </svg>
            )}
            <div style={{ position: "absolute", bottom: 20, left: 24, color: "#fff", textShadow: staff.photo ? "0 1px 4px rgba(0,0,0,0.6)" : "none" }}>
              <div className="en" style={{ fontSize: 10, letterSpacing: "0.3em", opacity: 0.9 }}>{staff.roleEn}</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{staff.name}</div>
            </div>
          </div>
          <div style={{ padding: "36px 36px 40px", overflowY: "auto", minHeight: 0 }} className="modal-content">
            <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em", marginBottom: 4 }}>{staff.role}</div>
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 2 }}>{staff.name}</div>
            <div className="en" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em", marginBottom: 22 }}>{staff.nameEn}</div>

            <div style={{ padding: "18px 20px", background: "var(--bg-2)", borderRadius: 12, marginBottom: 22, borderLeft: "3px solid var(--pur-3)" }}>
              <div style={{ fontSize: 11, color: "var(--pur-3)", letterSpacing: "0.2em", marginBottom: 6 }}>MESSAGE</div>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--ink)" }}>{staff.msg}</p>
            </div>

            {[
              { label: "専門領域", en: "SPECIALTY", items: staff.spec },
              { label: "保有資格", en: "QUALIFICATIONS", items: staff.qual },
            ].map((sec) => (
              <div key={sec.label} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.2em", marginBottom: 8 }}>{sec.en} / {sec.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {sec.items.map((it) => (
                    <span key={it} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 999, border: "1px solid var(--line)", background: "#fff", color: "var(--ink-2)" }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.2em", marginBottom: 6 }}>CAREER / 経歴</div>
              <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.9 }}>{staff.career}</p>
            </div>

            <div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.2em", marginBottom: 6 }}>HOBBY / オフの顔</div>
              <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.9 }}>{staff.hobby}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
        .staff-modal-inner{
          max-height: calc(100vh - 124px);
          max-height: calc(100dvh - 124px);
        }
        @media(max-width:720px){
          .modal-overlay{ align-items:flex-start !important; padding:88px 16px 16px !important; }
          .staff-modal-inner{
            max-height: calc(100vh - 104px) !important;
            max-height: calc(100dvh - 104px) !important;
          }
          .modal-grid{ grid-template-columns:1fr !important; grid-template-rows:auto 1fr !important; }
          .modal-photo-panel{ min-height:200px !important; max-height:220px !important; }
          .modal-close-pc{ display:none !important; }
          .modal-close-sp{ display:block !important; }
        }
      `}</style>
    </div>
  );
}

function PolicyPage({ kind }) {
  const meta = {
    privacy: {
      en: "PRIVACY POLICY", ja: "プライバシーポリシー",
      lead: "株式会社PAS企画（以下、当社）は、事業に係る業務遂行および連絡のために取り扱うお客様の個人情報を、個人情報の保護に関する法律その他関係法令を遵守し、以下のとおり適切に取り扱います。",
      sections: [
        { h: "第1条 個人情報の取得", p: "当社は、お客様からご提供いただく個人情報を、適法かつ公正な手段により取得し、利用目的の範囲内でのみ利用いたします。" },
        { h: "第2条 個人情報の利用目的", p: "お預かりした個人情報は、以下の目的で利用いたします。", list: [
          "資産形成・資産運用に関する情報提供",
          "相続・不動産コンサルティング業務",
          "提携保険会社の保険商品販売",
          "イベント・セミナーのご案内",
          "商品・サービスのご案内",
          "本人確認",
          "統計データの作成",
          "お客様のご感想・事例のご紹介",
          "契約・法律に基づく権利の行使および義務の履行",
          "その他業務遂行に必要な手続き",
        ]},
        { h: "第3条 個人情報の第三者提供", p: "当社は、以下の場合を除き、あらかじめお客様の同意を得ることなく、個人情報を第三者に提供いたしません。", list: [
          "法令に基づく場合",
          "人の生命・身体・財産の保護のために必要な場合",
          "公衆衛生の向上または児童の健全育成のために特に必要な場合",
          "国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行するために必要な場合",
          "当社が提携する保険会社への提供",
          "当社が提携する金融商品取引業者への提供",
          "海外の金融商品情報提供者への紹介",
          "業務委託先への提供（委託先との間で機密保持契約を締結し、適切な監督を行います）",
        ]},
        { h: "第4条 個人情報の安全管理", p: "当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等を防止するため、組織的・人的・物理的・技術的な安全管理措置を講じ、従業員への適切な監督を実施いたします。" },
        { h: "第5条 機微情報の取り扱い", p: "政治的見解、信教（宗教・思想・信条）、労働組合への加盟、民族的出自、健康・性生活等に関する機微な個人情報については、法令等に基づく場合またはご本人の同意がある場合に限り取り扱います。" },
        { h: "第6条 個人情報の開示・訂正・削除", p: "お客様ご本人からの個人情報の開示、訂正、追加、削除、利用停止のご請求があった場合には、所定の手続きに従い合理的な範囲で速やかに対応いたします。" },
        { h: "第7条 本ポリシーの改定", p: "当社は、法令の改正、社会情勢の変化等に応じて、本プライバシーポリシーを随時改訂いたします。最新の内容は常に本ページに掲載いたします。" },
        { h: "第8条 個人情報に関するお問い合わせ窓口", p: "個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。", contact: true },
      ],
      rev: "2026年4月1日 改定",
    },
    compliance: {
      en: "COMPLIANCE", ja: "コンプライアンス宣言",
      lead: "株式会社PAS企画は、金融サービス事業者として法令遵守はもとより、高い倫理観をもって業務を遂行し、お客様と社会からの信頼に応えることを最優先と考えます。",
      sections: [
        { h: "1. 法令等の遵守", p: "当社は、金融商品取引法、金融サービス提供法、個人情報保護法、関連諸法令および各業界団体の自主規制ルールを遵守し、健全な業務運営を行います。" },
        { h: "2. お客様本位の業務運営", p: "当社は、特定の金融商品の販売を目的とした業務ではなく、お客様のライフプランとご意向を最優先に考えたアドバイザリーサービスの提供に徹します。" },
        { h: "3. 利益相反の適切な管理", p: "当社は、お客様と当社または第三者との間で利益相反となる可能性のある取引について、適切に識別・管理し、お客様の利益を不当に害することのないよう努めます。" },
        { h: "4. 反社会的勢力の排除", p: "当社は、反社会的勢力に対しては毅然とした態度で臨み、一切の関係を遮断します。取引開始時および継続的な確認を実施し、社会の秩序や安全を脅かす勢力との関わりを断固として拒絶します。" },
        { h: "5. 役職員教育の徹底", p: "当社は、全役職員に対しコンプライアンス教育を継続的に実施し、法令遵守と高い倫理観の定着を図ります。" },
        { h: "6. 内部通報制度", p: "当社は、法令違反等の早期発見・是正のため、内部通報制度を整備し、通報者の保護に努めます。" },
      ],
      rev: "2026年4月1日 制定",
    },
    disclaimer: {
      en: "LINKS & DISCLAIMER", ja: "リンク・免責事項",
      lead: "当ウェブサイト（以下「本サイト」といいます）のご利用にあたり、以下の事項にご同意いただいた上でご覧くださいますようお願い申し上げます。",
      sections: [
        { h: "1. 本サイトの内容について", p: "本サイトに掲載されている情報は、掲載時点において信頼できると考えられる情報源から入手したものですが、その正確性・完全性を保証するものではありません。法令・税制・金融商品等は改定されることがあり、閲覧時点で内容が異なる場合がございます。" },
        { h: "2. 投資判断について", p: "本サイトに掲載されている資産運用・税務・不動産等に関する情報は、一般的な情報提供を目的としたものであり、特定の金融商品の取得・処分その他の投資判断を勧めるものではありません。投資判断はお客様ご自身の責任でお願いいたします。" },
        { h: "3. 免責事項", p: "本サイトのご利用によって生じた一切の損害について、当社は責任を負いかねます。本サイトは予告なく内容を変更または削除することがあります。" },
        { h: "4. リンクについて", p: "本サイトへのリンクは原則として自由ですが、以下に該当する場合はお断りいたします。", list: [
          "公序良俗に反する内容を含むサイトからのリンク",
          "当社および当社関係者、お客様を誹謗中傷するサイトからのリンク",
          "当社のイメージを損なう恐れのあるサイトからのリンク",
          "フレーム内に本サイトを表示するリンク",
        ]},
        { h: "5. 外部サイトへのリンク", p: "本サイトには外部サイトへのリンクが含まれる場合があります。リンク先サイトの内容について当社は関知せず、その利用によって生じた損害等について責任を負いかねます。" },
        { h: "6. 著作権・知的財産権", p: "本サイトに掲載されている文章・写真・図版・ロゴ等のすべての情報についての著作権および知的財産権は、当社または権利者に帰属します。無断での転載・複製・改変等はご遠慮ください。" },
      ],
      rev: "2026年4月1日 改定",
    },
    fiduciary: {
      en: "FIDUCIARY DUTY", ja: "お客様本位の業務運営に関する方針",
      lead: "株式会社PAS企画は、金融庁が示す「顧客本位の業務運営に関する原則」を踏まえ、お客様の最善の利益を追求する業務運営を実現するため、以下のとおり方針を定めます。",
      sections: [
        { h: "方針1. お客様本位の業務運営に係る方針の策定・公表", p: "当社は、本方針を策定し、ウェブサイト等を通じて公表いたします。本方針は継続的に見直し、その取組状況についても定期的に公表いたします。" },
        { h: "方針2. お客様の最善の利益の追求", p: "当社は、高度な専門性と職業倫理を保持し、お客様に対して誠実・公正に業務を行い、お客様の最善の利益を図ることを常に最優先に考えます。特定の金融機関・保険会社の商品販売ではなく、独立した立場でのアドバイスに徹します。" },
        { h: "方針3. 利益相反の適切な管理", p: "当社は、お客様との取引において利益相反の可能性を正確に把握し、これを適切に管理します。利益相反のおそれがある場合には、その内容をお客様にお知らせし、ご理解いただいた上で業務を行います。" },
        { h: "方針4. 手数料等の明確化", p: "当社は、お客様にご負担いただく手数料・費用について、その対価として提供するサービスの内容とあわせて、事前に明確にご説明いたします。" },
        { h: "方針5. 重要な情報のわかりやすい提供", p: "当社は、金融商品等の選定理由、商品の内容、リスク、手数料等、お客様が判断するために必要な情報を、お客様の知識・経験・資産状況・目的に応じてわかりやすくご提供いたします。" },
        { h: "方針6. お客様にふさわしいサービスの提供", p: "当社は、お客様のライフプラン・資産状況・ご意向・知識経験・リスク許容度等を十分に把握し、それらに最もふさわしいサービスのご提案に努めます。" },
        { h: "方針7. 役職員への適切な動機づけの枠組み", p: "当社は、お客様の最善の利益を追求することが実現されるよう、役職員の業績評価・報酬体系が、販売手数料に過度に依存しない仕組みを整備します。継続的な教育・研修を通じて、職業倫理と専門知識の向上を図ります。" },
      ],
      rev: "2026年4月1日 制定",
    },
  }[kind];

  return (
    <>
      <PageHeader en={meta.en} ja={meta.ja} crumb={[meta.ja]} lead={meta.lead} />
      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          {meta.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 40, padding: "32px 0", borderBottom: i === meta.sections.length - 1 ? "none" : "1px solid var(--line)" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: "var(--ink)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--pur-3)" }}/>
                {s.h}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 2.05, color: "var(--ink-2)" }}>{s.p}</p>
              {s.list && (
                <ul style={{ marginTop: 14, paddingLeft: 4, listStyle: "none" }}>
                  {s.list.map((it, j) => (
                    <li key={j} style={{ fontSize: 13.5, lineHeight: 1.95, color: "var(--ink-2)", paddingLeft: 22, position: "relative", marginBottom: 6 }}>
                      <span style={{ position: "absolute", left: 0, top: 11, width: 10, height: 2, background: "var(--pur-3)" }}/>
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {s.contact && (
                <div style={{ marginTop: 18, padding: 22, background: "var(--bg-2)", borderRadius: 10, fontSize: 13, lineHeight: 2 }}>
                  株式会社PAS企画　個人情報お問い合わせ窓口<br/>
                  〒300-3261 茨城県つくば市花畑3丁目13番地10 ヤマグチビル3階<br/>
                  TEL：029-877-6322　FAX：029-877-6323<br/>
                  営業時間：9:30〜18:30（日曜・祝日を除く）
                </div>
              )}
            </div>
          ))}
          <div style={{ textAlign: "right", fontSize: 12, color: "var(--ink-3)", marginTop: 20 }}>{meta.rev}</div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

Object.assign(window, { AboutPage, ServicesPage, ConsultantPage, BestPartnerPage, StaffPage, PolicyPage });
// ContactPage / ContactRecruitPage は src/forms.jsx で公開されています
