// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📢 お知らせ管理ファイル
// ─────────────────────────────────────────────────────
// このファイルはお知らせのデータと表示コンポーネントを集約しています。
// お知らせの追加・編集はすべてこのファイル内で完結します。
// ─────────────────────────────────────────────────────
//
// ▼▼▼ 新しいお知らせの追加方法 ▼▼▼
//
// 1. 下の NEWS 配列の【先頭】に { ... } を追加
//    （配列の先頭にあるお知らせほど、サイト上で上に表示されます）
//
// 2. 各フィールドの記入ルール
//    ・id    … 重複しないユニークな文字列。前回の最大値+1（例："001"→"002"→"003"）
//    ・date  … "YYYY.MM.DD" 形式（例："2026.05.01"）
//    ・cat   … カテゴリ名（例："お知らせ"、"セミナー"、"メディア掲載" など）
//    ・title … 一覧と詳細ページの両方に表示される見出し
//    ・tone  … アイキャッチ画像のグラデーション色 [開始色, 終了色]（例：["#c8b9e0", "#a6c4e0"]）
//    ・lead  … リード文（詳細ページの冒頭に大きく表示）
//    ・sections … 本文の各セクション（複数指定可。順番通りに表示されます）
//
// 3. sections は以下の3タイプから選択：
//
//    【A】type: "para"   ─ 段落のみ
//      { h: "見出し", type: "para", body: "本文..." }
//
//    【B】type: "list"   ─ 箇条書き
//      { h: "見出し", type: "list", items: [
//        "項目1",
//        "項目2",
//        "項目3",
//      ]}
//
//    【C】type: "info"   ─ 表形式（左ラベル、右値）
//      { h: "見出し", type: "info", items: [
//        ["項目名1", "値1"],
//        ["項目名2", "値2"],
//      ]}
//
// 4. tone（アイキャッチの色）は 2色のグラデーションを指定：
//    例：["#c8b9e0", "#a6c4e0"] = 紫→青
//        ["#7dc9b7", "#cdd67a"] = 緑→黄緑（クールビズ用）
//        ["#f0b87a", "#e89aae"] = オレンジ→ピンク（GW・休暇用）
//
// 5. 編集後はファイル保存だけでOK。ビルドや変換は不要です。
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NEWS = [

  // ━━━━━━━━ ↓ ここから新しいお知らせを上に追加 ↓ ━━━━━━━━

  // ──────────────────────────────────────────
  // 以下 2件（クールビズ／GW休業）は一旦非掲載化（コメントアウト）。
  // 再掲載する場合は /* */ を外してください。
  // ──────────────────────────────────────────
  /*
  {
    id: "003", date: "2026.04.24", cat: "お知らせ",
    title: "クールビズ実施のお知らせ",
    tone: ["#7dc9b7", "#cdd67a"],
    lead: "平素より格別のお引き立てを賜り、誠にありがとうございます。株式会社PAS企画では、環境省が推進する「クールビズ」の趣旨に賛同し、地球温暖化対策・省エネルギー活動の一環として、下記の期間中クールビズを実施いたします。",
    sections: [
      { h: "実施期間", type: "info", items: [
        ["期間", "2026年5月1日（金）〜 9月30日（水）"],
      ]},
      { h: "実施内容", type: "para", body: "期間中、役員・社員は季節・気温に応じた軽装（ノーネクタイ・ノージャケット等）にて業務にあたらせていただきます。また、オフィスの室温を適切に管理するとともに、省エネルギー型空調の活用等を通じて、温室効果ガスの排出削減に努めてまいります。" },
      { h: "お客様へのお願い", type: "para", body: "期間中、ご来社・お打ち合わせ時にスタッフの服装が略装となりますこと、何卒ご理解賜りますようお願い申し上げます。お客様ご自身におかれましても、どうぞお気軽な服装でお越しください。" },
      { h: "お問い合わせ窓口", type: "info", items: [
        ["電話", "029-877-6322"],
        ["受付時間", "9:30〜18:30（日祝祭日を除く）"],
        ["メール・Web", "本サイトのお問い合わせフォームよりご連絡ください"],
      ]},
    ],
  },

  {
    id: "002", date: "2026.04.24", cat: "お知らせ",
    title: "ゴールデンウィーク休業のお知らせ",
    tone: ["#f0b87a", "#e89aae"],
    lead: "平素より格別のお引き立てを賜り、誠にありがとうございます。誠に勝手ながら、ゴールデンウィーク期間中の休業日につきまして、下記のとおりご案内申し上げます。",
    sections: [
      { h: "休業期間", type: "info", items: [
        ["休業日", "2026年5月2日（土）〜 5月6日（水）"],
        ["通常営業再開", "2026年5月7日（木）より"],
      ]},
      { h: "お問い合わせについて", type: "para", body: "休業期間中にいただいたお問い合わせにつきましては、2026年5月7日（木）以降、順次対応させていただきます。お客様には大変ご不便をおかけいたしますが、何卒ご理解賜りますようお願い申し上げます。" },
      { h: "お問い合わせ窓口", type: "info", items: [
        ["電話", "029-877-6322"],
        ["受付時間", "9:30〜18:30（日祝祭日を除く）"],
        ["メール・Web", "本サイトのお問い合わせフォームよりご連絡ください"],
      ]},
    ],
  },
  */

  {
    id: "001", date: "2026.04.27", cat: "お知らせ",
    title: "ホームページをリニューアルしました",
    tone: ["#c8b9e0", "#a6c4e0"],
    lead: "このたび、株式会社PAS企画の公式ホームページを全面リニューアルいたしました。資産形成・税務・不動産・経営・AIという5つの専門領域を「一つの窓口」でご支援するコングロマリット型アドバイザリーとして、私たちの価値をよりわかりやすくお伝えできる構成に生まれ変わりました。",
    sections: [
      { h: "リニューアルの背景", type: "para", body: "創業から5年、個人・法人・業種を問わず多角的なご支援を続けてきた中で、「PAS企画がどんな会社か、何をしてくれる会社か」がより伝わるサイトへ刷新する必要性を感じておりました。今回のリニューアルでは、私たちの強みである独立系・中立的な立場とコングロマリット型支援体制を前面に打ち出した構成としています。" },
      { h: "主な変更点", type: "list", items: [
        "デザインを全面刷新し、スマートフォンでも快適に閲覧できるよう最適化しました",
        "事業内容（資産形成・税務対策・不動産・経営サポート・AI活用DX推進）をわかりやすく整理しました",
        "代表メッセージ・会社概要・スタッフ紹介など、PAS企画をより深く知っていただけるコンテンツを充実させました",
        "お問い合わせフォームをリニューアルし、ご相談内容に応じた入力項目に対応しました",
        "お知らせページを新設し、セミナー情報や最新の活動報告を随時発信してまいります",
      ]},
      { h: "今後の情報発信について", type: "para", body: "今後はセミナーのご案内・相続・税務・資産運用に関するコラム・AI活用情報など、幅広い世代・業種のお客様のお役に立てる情報を定期的に発信してまいります。どうぞお気軽にご活用ください。" },
      { h: "お問い合わせ", type: "info", items: [
        ["電話", "029-877-6322"],
        ["受付時間", "9:30〜18:30（日祝祭日を除く）"],
        ["メール・Web", "本サイトのお問い合わせフォームよりご連絡ください"],
      ]},
    ],
  },

  // ━━━━━━━━ ↑ ここまで（古いお知らせは下になるよう保つ） ↑ ━━━━━━━━

];


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 以下、表示用コンポーネント（基本的に編集不要）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// お知らせ一覧ページ
function NewsPage() {
  return (
    <>
      <PageHeader en="NEWS" ja="お知らせ" crumb={["お知らせ"]} lead="PAS企画からのお知らせ、セミナー開催情報、メディア掲載などをお届けします。" />
      <section style={{ padding: "60px 0 100px" }}>
        <div className="wrap" style={{ maxWidth: 960 }}>
          <ul style={{ listStyle: "none", borderTop: "1px solid var(--line)" }}>
            {NEWS.map((n, i) => (
              <li key={i}>
                <a href={`#news/${n.id}`}
                   onClick={(e) => { e.preventDefault(); window.__setRoute?.(`news/${n.id}`); }}
                   className="news-page-item"
                   style={{
                     display: "grid", gridTemplateColumns: "150px 100px 1fr 30px", gap: 24,
                     alignItems: "center", padding: "24px 0", borderBottom: "1px solid var(--line)",
                     transition: "background .3s, padding .3s",
                   }}
                   onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-2)"; e.currentTarget.style.paddingLeft = "18px"; e.currentTarget.style.paddingRight = "18px"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.paddingRight = "0"; }}>
                  <span className="en" style={{ fontSize: 13, fontWeight: 600 }}>{n.date}</span>
                  <span style={{ fontSize: 11, padding: "4px 14px", background: "var(--bg-2)", borderRadius: 999, justifySelf: "start", color: "var(--ink-2)" }}>{n.cat}</span>
                  <span style={{ fontSize: 15 }}>{n.title}</span>
                  <span style={{ color: "var(--pur-3)", textAlign: "right" }}>→</span>
                </a>
              </li>
            ))}
          </ul>
          <style>{`
            @media(max-width:640px){
              .news-page-item{grid-template-columns:110px 1fr !important;grid-template-rows:auto auto !important;align-items:start !important;column-gap:16px !important;}
              .news-page-item span:nth-child(1){grid-column:1;grid-row:1;}
              .news-page-item span:nth-child(2){grid-column:1;grid-row:2;margin-top:6px;}
              .news-page-item span:nth-child(3){grid-column:2;grid-row:1/3;align-self:center;}
              .news-page-item span:nth-child(4){display:none;}
            }
          `}</style>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

// お知らせ詳細ページ
function NewsDetailPage({ id }) {
  const idx = NEWS.findIndex((n) => n.id === id);
  const n = NEWS[idx];
  if (!n) {
    return (
      <>
        <PageHeader en="NOT FOUND" ja="お知らせが見つかりません" crumb={[{ label: "お知らせ", to: "news" }, "記事が見つかりません"]} lead="指定されたお知らせは存在しないか、既に削除された可能性があります。" />
        <section style={{ padding: "40px 0 120px", textAlign: "center" }}>
          <a href="#news" onClick={(e) => { e.preventDefault(); window.__setRoute?.("news"); }}
             style={{ display: "inline-block", padding: "16px 36px", borderRadius: 999, border: "1px solid var(--line)", fontSize: 14 }}>
            お知らせ一覧に戻る
          </a>
        </section>
      </>
    );
  }
  const prev = NEWS[idx + 1]; // older (NEWS is newest-first)
  const next = NEWS[idx - 1]; // newer
  return (
    <>
      {/* compact page header */}
      <section style={{ paddingTop: 140, paddingBottom: 40, position: "relative" }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div style={{ marginBottom: 28 }}>
            <Breadcrumb items={[{ label: "お知らせ", to: "news" }, n.title]} />
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
            <span className="en" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>{n.date}</span>
            <span style={{ fontSize: 11, padding: "5px 14px", background: "var(--bg-2)", borderRadius: 999, color: "var(--ink-2)" }}>{n.cat}</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 700, lineHeight: 1.55, letterSpacing: "0.01em" }}>{n.title}</h1>
        </div>
      </section>

      {/* eyecatch */}
      <section style={{ padding: "0 0 60px" }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div style={{ aspectRatio: "16/7", background: `linear-gradient(135deg, ${n.tone[0]} 0%, ${n.tone[1]} 100%)`, borderRadius: 14, position: "relative", overflow: "hidden" }}>
            <svg width="100%" height="100%" viewBox="0 0 880 400" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
              <g fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.7">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path key={i} d={`M-20 ${100 + i * 40} Q220 ${70 + i * 40} 440 ${110 + i * 40} T900 ${100 + i * 40}`}/>
                ))}
              </g>
              <circle cx="700" cy="140" r="80" fill="#fff" opacity="0.25"/>
              <circle cx="700" cy="140" r="50" fill="#fff" opacity="0.35"/>
            </svg>
            <div style={{ position: "absolute", top: 24, left: 28, fontSize: 10, letterSpacing: "0.3em", color: "#fff", background: "rgba(0,0,0,0.25)", padding: "6px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>
              NEWS / {n.id}
            </div>
          </div>
        </div>
      </section>

      {/* body */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: 16, lineHeight: 2.1, color: "var(--ink)", marginBottom: 48, fontWeight: 500 }}>{n.lead}</p>

          {n.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 44 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, paddingBottom: 14, borderBottom: "2px solid var(--ink)", position: "relative" }}>
                <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pur-3)", borderRadius: 999, marginRight: 12, verticalAlign: "middle" }}/>
                {s.h}
              </h2>
              {s.type === "info" && (
                <dl style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "14px 24px", fontSize: 14, lineHeight: 1.8 }}>
                  {s.items.map(([k, v], j) => (
                    <React.Fragment key={j}>
                      <dt style={{ color: "var(--ink-3)", fontWeight: 600, paddingTop: 2 }}>{k}</dt>
                      <dd style={{ color: "var(--ink)", margin: 0 }}>{v}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              )}
              {s.type === "list" && (
                <ul style={{ paddingLeft: 4, listStyle: "none" }}>
                  {s.items.map((it, j) => (
                    <li key={j} style={{ fontSize: 14, lineHeight: 1.9, color: "var(--ink-2)", paddingLeft: 22, position: "relative", marginBottom: 10 }}>
                      <span style={{ position: "absolute", left: 0, top: 10, width: 10, height: 2, background: "var(--pur-3)" }}/>
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {s.type === "para" && (
                <p style={{ fontSize: 14, lineHeight: 2.05, color: "var(--ink-2)" }}>{s.body}</p>
              )}
            </div>
          ))}

          {/* cta */}
          <div style={{ padding: "32px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <a href="#contact" onClick={(e) => { e.preventDefault(); window.__setRoute?.("contact"); }}
               style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 999, background: "linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%)", color: "#fff", fontSize: 13, fontWeight: 600 }}>
              このお知らせについて問い合わせる <span>→</span>
            </a>
          </div>

          {/* prev/next */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 40 }} className="news-nav">
            {[
              { label: "前の記事", item: prev, align: "left" },
              { label: "次の記事", item: next, align: "right" },
            ].map((nav, i) => (
              <div key={i} style={{ textAlign: nav.align }}>
                {nav.item ? (
                  <a href={`#news/${nav.item.id}`}
                     onClick={(e) => { e.preventDefault(); window.__setRoute?.(`news/${nav.item.id}`); }}
                     style={{ display: "block", padding: 20, border: "1px solid var(--line)", borderRadius: 12, background: "#fff", transition: "transform .3s, background .3s" }}
                     onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "var(--bg-2)"; }}
                     onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "#fff"; }}>
                    <div className="en" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--pur-3)", marginBottom: 6 }}>
                      {nav.align === "left" ? "← " : ""}{nav.label.toUpperCase()}{nav.align === "right" ? " →" : ""}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 4 }}>{nav.item.date} ・ {nav.item.cat}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: "var(--ink)" }}>{nav.item.title}</div>
                  </a>
                ) : (
                  <div style={{ padding: 20, border: "1px dashed var(--line)", borderRadius: 12, color: "var(--ink-3)", fontSize: 12 }}>
                    {nav.align === "left" ? "← " : ""}{nav.label}はありません{nav.align === "right" ? " →" : ""}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="#news" onClick={(e) => { e.preventDefault(); window.__setRoute?.("news"); }}
               style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 36px", borderRadius: 999, border: "1px solid var(--line)", background: "#fff", fontSize: 13, fontWeight: 600 }}>
              <span>一覧に戻る</span>
            </a>
          </div>
          <style>{`@media(max-width:720px){.news-nav{grid-template-columns:1fr !important;}}`}</style>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

Object.assign(window, { NEWS, NewsPage, NewsDetailPage });
