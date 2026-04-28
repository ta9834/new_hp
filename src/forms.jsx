// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📝 お問い合わせフォーム関連
// ─────────────────────────────────────────────────────
// このファイルにはお問い合わせフォーム関連のコンポーネントが集約されています。
//
// 含まれる要素：
// - ContactPageV2 ……… お問い合わせページ本体（タブで切替）
// - FormLayout ……… 入力フォーム＋確認画面＋送信完了画面のレイアウト
// - FormRow ……… ラベル＋入力欄の1行レイアウト
// - TextInput ……… テキスト入力フィールド（IME対応）
// - ErrMsg ……… バリデーションエラー表示
// - inputStyle ……… 入力欄共通スタイル
// - PREFECTURES ……… 都道府県のリスト
// ─────────────────────────────────────────────────────


// 都道府県リスト
const PREFECTURES = [
  "北海道",
  "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];


// 入力欄共通スタイル
function inputStyle(extra = {}) {
  return {
    width: "100%", maxWidth: 540, padding: "14px 16px",
    border: "1px solid var(--line)", borderRadius: 8,
    fontFamily: "var(--font-jp)", fontSize: 14, lineHeight: 1.7,
    background: "#fff",
    ...extra,
  };
}

// テキスト入力フィールド（IME対応）
function TextInput({ v, oc, ph, t = "text", onCompositionUpdate, onCompositionEnd }) {
  return <input
    type={t}
    value={v}
    onChange={(e) => oc(e.target.value)}
    onCompositionUpdate={onCompositionUpdate}
    onCompositionEnd={onCompositionEnd}
    placeholder={ph}
    style={inputStyle()}
  />;
}

// バリデーションエラー表示
function ErrMsg({ children }) {
  return <div style={{ fontSize: 12, color: "#c94a5e", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>⚠ {children}</div>;
}

// 1行のフォームレイアウト（ラベル＋入力欄）
function FormRow({ label, req, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, padding: "20px 0", borderBottom: "1px solid var(--line)", alignItems: "flex-start" }} className="fr">
      <div style={{ fontSize: 13, fontWeight: 700, paddingTop: 14, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span>{label}</span>
        {req && <span style={{ fontSize: 10, padding: "2px 8px", background: "var(--pur-3)", color: "#fff", borderRadius: 3, letterSpacing: "0.08em", whiteSpace: "nowrap", flexShrink: 0 }}>必須</span>}
      </div>
      <div style={{ paddingTop: 6 }}>{children}</div>
      <style>{`@media(max-width:820px){.fr{grid-template-columns:1fr !important;gap:12px !important;}}`}</style>
    </div>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FormLayout — フォーム本体（編集 → 確認 → 送信完了の3画面切替）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 送信処理（Google Apps Script に POST）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function submitToGAS(payload) {
  const endpoint = (window.CONFIG && window.CONFIG.GAS_ENDPOINT) || "";
  if (!endpoint || endpoint === "YOUR_GAS_DEPLOYMENT_URL") {
    throw new Error("GAS_ENDPOINT が設定されていません。src/config.jsx を確認してください。");
  }
  // text/plain にすることで CORS preflight を回避（GAS推奨パターン）
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });
  const data = await res.json();
  return data;
}

// reCAPTCHA v3 トークンを取得
function getRecaptchaToken() {
  return new Promise((resolve, reject) => {
    const siteKey = window.CONFIG && window.CONFIG.RECAPTCHA_SITE_KEY;
    if (!siteKey || siteKey === "YOUR_RECAPTCHA_SITE_KEY") {
      reject(new Error("RECAPTCHA_SITE_KEY が設定されていません"));
      return;
    }
    if (typeof grecaptcha === "undefined") {
      reject(new Error("reCAPTCHAスクリプトが読み込まれていません"));
      return;
    }
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action: "submit" })
        .then(resolve)
        .catch(reject);
    });
  });
}


function FormLayout({ form, up, sent, setSent, deptOptions, inquiryPH, heading, phoneNote, kind }) {
  const [errors, setErrors] = React.useState({});
  const [confirming, setConfirming] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const composingNameRef = React.useRef("");
  const confirmHeadingRef = React.useRef(null);
  const sentHeadingRef = React.useRef(null);

  // 画面切替時のスクロール制御
  // - 完了画面 ：「THANK YOU」見出しまでスクロール
  // - 確認画面 ：「入力内容のご確認」見出しまでスクロール
  // - 編集画面 ：ページトップへ
  React.useEffect(() => {
    if (sent && sentHeadingRef.current) {
      sentHeadingRef.current.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (confirming && confirmHeadingRef.current) {
      confirmHeadingRef.current.scrollIntoView({ block: "start", behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [confirming, sent]);
  const handleNameCompositionUpdate = (e) => {
    const data = e.data || "";
    // ひらがな/カタカナのみ保持（漢字変換後の値で上書きしない）
    if (/^[぀-ヿ]+$/.test(data)) {
      composingNameRef.current = data;
    }
  };
  const handleNameCompositionEnd = (e) => {
    if (composingNameRef.current) {
      const katakana = composingNameRef.current.replace(/[ぁ-ゖ]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) + 0x60)
      );
      const currentName = (e && e.target && e.target.value) || form.name || "";
      const nameSpaces = (currentName.match(/[ 　]/g) || []).length;
      const kanaSpaces = ((form.kana || "").match(/[ 　]/g) || []).length;
      const separator = nameSpaces > kanaSpaces ? " " : "";
      up("kana", (form.kana || "") + separator + katakana);
      composingNameRef.current = "";
    }
  };
  const validate = () => {
    const e = {};
    if (!form.dept) e.dept = "選択してください";
    if (!form.customerType) e.customerType = "選択してください";
    if (form.customerType === "corporate" && !form.company) e.company = "ご入力ください";
    if (!form.name) e.name = "ご入力ください";
    if (!form.kana) e.kana = "ご入力ください";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "正しいメールアドレスをご入力ください";
    if (!form.tel) e.tel = "ご入力ください";
    if (!form.address) e.address = "ご入力ください";
    if (!form.inquiry) e.inquiry = "ご入力ください";
    if (kind === "service" && !form.meeting) e.meeting = "選択してください";
    if (!form.agree) e.agree = "ご同意ください";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const meetingLabels = { web: "Web会議", inperson: "対面", either: "対面・Web会議どちらでも可" };
  const customerTypeLabel = { individual: "個人", corporate: "法人" };
  const deptLabel = () => (deptOptions.find(([v]) => v === form.dept) || [])[1] || "";
  const confirmRows = [
    { label: "お問い合わせ種別", value: deptLabel(), required: true },
    { label: "ご所属区分", value: customerTypeLabel[form.customerType] || "", required: true },
    ...(form.customerType === "corporate" ? [{ label: "会社名", value: form.company, required: true }] : []),
    { label: "お名前", value: form.name, required: true },
    { label: "フリガナ", value: form.kana, required: true },
    { label: "メールアドレス", value: form.email, required: true },
    { label: "電話番号", value: form.tel, required: true },
    { label: "ご住所(都道府県)", value: form.address, required: true },
    { label: "お問い合わせ内容", value: form.inquiry, required: true },
    ...(kind === "service" ? [{ label: "Web会議もしくは対面での相談希望", value: meetingLabels[form.meeting] || "", required: true }] : []),
    { label: "個人情報の取り扱いについて", value: "同意する", required: true },
  ];
  return (
    <section style={{ padding: "40px 0 100px" }}>
      <div className="wrap" style={{ maxWidth: 1100 }}>
        {sent ? (
          <Reveal>
            <div ref={sentHeadingRef} style={{ padding: "80px 48px", background: "var(--bg-2)", borderRadius: 16, textAlign: "center", scrollMarginTop: "100px" }}>
              <div className="en prismatic" style={{ fontSize: 56, fontWeight: 800, letterSpacing: "0.02em" }}>THANK YOU</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 12 }}>お問い合わせありがとうございます</div>
              <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 20, lineHeight: 2 }}>
                自動返信メールを送付いたしました。担当者より2営業日以内にご連絡いたします。<br/>
                万一、自動返信メールが届かない場合はお電話にてご確認ください。
              </p>
              <button onClick={() => { setSent(false); setConfirming(false); setSubmitError(""); }}
                      className="pill-btn" style={{ marginTop: 32 }}>トップへ戻る</button>
            </div>
          </Reveal>
        ) : confirming ? (
          <Reveal>
            <div ref={confirmHeadingRef} style={{ marginBottom: 8, scrollMarginTop: "100px" }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.04em" }}>入力内容のご確認</h2>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 48, lineHeight: 1.9 }}>
              以下の内容で送信してよろしければ「送信する」ボタンを押してください。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {confirmRows.map((r) => (
                <div key={r.label}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--ink)" }}>{r.label}</span>
                    {r.required && (
                      <span style={{
                        fontSize: 10.5, padding: "2px 10px", borderRadius: 999,
                        border: "1px solid var(--pur-3)", color: "var(--pur-3)",
                        letterSpacing: "0.06em", lineHeight: 1.6,
                      }}>必須</span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.85, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {r.value}
                  </div>
                </div>
              ))}
            </div>
            {submitError && (
              <div style={{
                marginTop: 32, padding: "16px 20px",
                background: "#fdeaea", border: "1px solid #e8b8b8", borderRadius: 10,
                fontSize: 13, color: "#a0445a", lineHeight: 1.8,
              }}>
                ⚠ 送信エラー：{submitError}<br/>
                お手数ですが時間をおいて再度お試しいただくか、お電話（029-877-6322）にてご連絡ください。
              </div>
            )}
            <div style={{ marginTop: 72, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <button type="button"
                disabled={submitting}
                onClick={async () => {
                  setSubmitError("");
                  setSubmitting(true);
                  try {
                    const recaptchaToken = await getRecaptchaToken();
                    const payload = {
                      kind,
                      recaptchaToken,
                      dept: form.dept,
                      deptLabel: deptLabel(),
                      customerType: form.customerType,
                      company: form.company,
                      name: form.name,
                      kana: form.kana,
                      email: form.email,
                      tel: form.tel,
                      address: form.address,
                      inquiry: form.inquiry,
                      meeting: form.meeting,
                      meetingLabel: meetingLabels[form.meeting] || "",
                    };
                    const result = await submitToGAS(payload);
                    if (result && result.ok) {
                      setSent(true);
                    } else {
                      setSubmitError(result?.error || "送信に失敗しました");
                    }
                  } catch (err) {
                    setSubmitError(err.message || "送信に失敗しました");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="confirm-submit-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", maxWidth: 400, padding: "10px 10px 10px 36px",
                  borderRadius: 999, border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.6 : 1,
                  background: "linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%)",
                  color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.04em",
                  boxShadow: "0 8px 24px -8px rgba(100,120,200,0.35)",
                  transition: "transform .2s, box-shadow .2s, opacity .2s",
                }}>
                <span style={{ flex: 1, textAlign: "center" }}>{submitting ? "送信中..." : "送信する"}</span>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 14,
                  background: "rgba(255,255,255,0.15)", flexShrink: 0,
                }}>{submitting ? "⌛" : "▸"}</span>
              </button>
              <button type="button"
                disabled={submitting}
                onClick={() => { setConfirming(false); setSubmitError(""); }}
                style={{
                  fontSize: 13, color: "var(--ink-2)",
                  textDecoration: "underline",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.5 : 1,
                  background: "none", border: "none",
                  padding: "4px 8px",
                }}>
                前の画面へ戻る
              </button>
            </div>
            <style>{`
              .confirm-submit-btn:not(:disabled):hover { transform: translateY(-3px); box-shadow: 0 12px 32px -8px rgba(100,70,180,0.5) !important; }
            `}</style>
          </Reveal>
        ) : (
          <>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.04em" }}>{heading}</h2>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 36, lineHeight: 1.9 }}>
                {phoneNote}　<span style={{ color: "var(--pur-3)" }}>*</span> は入力必須項目です。
              </p>
            </Reveal>

            <form onSubmit={(e) => { e.preventDefault(); if (validate()) { setConfirming(true); } }}>
              <FormRow label="お問い合わせ種別" req>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {deptOptions.map(([v, l]) => (
                    <button key={v} type="button" onClick={() => up("dept", v)} style={{
                      padding: "10px 18px", borderRadius: 999, fontSize: 12.5,
                      border: form.dept === v ? "1px solid transparent" : "1px solid var(--line)",
                      background: form.dept === v ? "linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%)" : "#fff",
                      color: form.dept === v ? "#fff" : "var(--ink-2)",
                    }}>{l}</button>
                  ))}
                </div>
                {errors.dept && <ErrMsg>{errors.dept}</ErrMsg>}
              </FormRow>

              <FormRow label="ご所属区分" req>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[["individual", "個人"], ["corporate", "法人"]].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => up("customerType", v)} style={{
                      padding: "10px 28px", borderRadius: 999, fontSize: 12.5,
                      border: form.customerType === v ? "1px solid transparent" : "1px solid var(--line)",
                      background: form.customerType === v ? "linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%)" : "#fff",
                      color: form.customerType === v ? "#fff" : "var(--ink-2)",
                      cursor: "pointer",
                    }}>{l}</button>
                  ))}
                </div>
                {errors.customerType && <ErrMsg>{errors.customerType}</ErrMsg>}
              </FormRow>
              {form.customerType === "corporate" && (
                <FormRow label="会社名" req>
                  <TextInput v={form.company} oc={(v) => up("company", v)} ph="株式会社〇〇"/>
                  {errors.company && <ErrMsg>{errors.company}</ErrMsg>}
                </FormRow>
              )}
              <FormRow label="お名前" req>
                <TextInput
                  v={form.name}
                  oc={(v) => up("name", v)}
                  ph="山田 太郎"
                  onCompositionUpdate={handleNameCompositionUpdate}
                  onCompositionEnd={handleNameCompositionEnd}
                />
                {errors.name && <ErrMsg>{errors.name}</ErrMsg>}
              </FormRow>
              <FormRow label="フリガナ" req>
                <TextInput v={form.kana} oc={(v) => up("kana", v)} ph="ヤマダ タロウ"/>
                {errors.kana && <ErrMsg>{errors.kana}</ErrMsg>}
              </FormRow>
              <FormRow label="メールアドレス" req>
                <TextInput v={form.email} oc={(v) => up("email", v)} ph="name@example.com" t="email"/>
                {errors.email && <ErrMsg>{errors.email}</ErrMsg>}
              </FormRow>
              <FormRow label="電話番号" req>
                <TextInput v={form.tel} oc={(v) => up("tel", v)} ph="029-000-0000"/>
                {errors.tel && <ErrMsg>{errors.tel}</ErrMsg>}
              </FormRow>
              <FormRow label="ご住所(都道府県)" req>
                <select
                  value={form.address || ""}
                  onChange={(e) => up("address", e.target.value)}
                  style={inputStyle({ appearance: "auto", cursor: "pointer" })}
                >
                  <option value="">—以下から選択してください—</option>
                  {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.address && <ErrMsg>{errors.address}</ErrMsg>}
              </FormRow>
              <FormRow label="お問い合わせ内容" req>
                <textarea value={form.inquiry} onChange={(e) => up("inquiry", e.target.value)} rows={8}
                  placeholder={inquiryPH} style={inputStyle({ resize: "vertical", minHeight: 180 })}/>
                {errors.inquiry && <ErrMsg>{errors.inquiry}</ErrMsg>}
              </FormRow>

              {kind === "service" && (
                <FormRow label="Web会議もしくは対面での相談を希望する" req>
                  <select
                    value={form.meeting || ""}
                    onChange={(e) => up("meeting", e.target.value)}
                    style={inputStyle({ appearance: "auto", cursor: "pointer" })}
                  >
                    <option value="">—以下から選択してください—</option>
                    <option value="web">Web会議</option>
                    <option value="inperson">対面</option>
                    <option value="either">対面・Web会議どちらでも可</option>
                  </select>
                  {errors.meeting && <ErrMsg>{errors.meeting}</ErrMsg>}
                  <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.8 }}>
                    ※ご希望いただいた場合、改めて担当者より日程候補をご連絡いたします。
                  </p>
                </FormRow>
              )}

              <div style={{
                background: "var(--bg-2)", borderRadius: 12, padding: 24, fontSize: 12,
                color: "var(--ink-2)", lineHeight: 1.95, marginTop: 32,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--ink)" }}>個人情報の取り扱いについて</div>
                <p>
                  ご提供いただく個人情報は、お問い合わせへの回答および必要なご連絡のために利用し、法令に基づく場合を除き、ご本人の同意なく第三者へ提供することはいたしません。詳細は<a href="#privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "var(--pur-3)", display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>プライバシーポリシー<svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" style={{ marginLeft: 1 }}><path d="M5 1 H11 V7 M11 1 L6 6 M10 6 V10 H2 V2 H6" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></a>をご確認ください。
                </p>
              </div>

              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 24, cursor: "pointer" }}>
                <input type="checkbox" checked={form.agree} onChange={(e) => up("agree", e.target.checked)} style={{ marginTop: 4 }}/>
                <span style={{ fontSize: 13, color: "var(--ink)" }}>
                  個人情報の取り扱いに同意します。<span style={{ color: "var(--pur-3)" }}>*</span>
                </span>
              </label>
              {errors.agree && <ErrMsg>{errors.agree}</ErrMsg>}

              {/* reCAPTCHA 利用規約（バッジ非表示時に必須の表記） */}
              <p style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 20, lineHeight: 1.7 }}>
                このサイトは reCAPTCHA によって保護されており、Google の
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--pur-3)", textDecoration: "underline", margin: "0 3px" }}>プライバシーポリシー</a>
                と
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "var(--pur-3)", textDecoration: "underline", margin: "0 3px" }}>利用規約</a>
                が適用されます。
              </p>

              <div style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                <button type="submit" className="confirm-submit-btn" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", maxWidth: 400, padding: "10px 10px 10px 36px",
                  borderRadius: 999, border: "none", cursor: "pointer",
                  background: "linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%)",
                  color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.04em",
                  boxShadow: "0 8px 24px -8px rgba(100,120,200,0.35)",
                  transition: "transform .2s, box-shadow .2s",
                }}>
                  <span style={{ flex: 1, textAlign: "center" }}>確認画面へ</span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 14,
                    background: "rgba(255,255,255,0.15)", flexShrink: 0,
                  }}>▸</span>
                </button>
                <button type="reset" onClick={() => { up("dept", ""); up("customerType", ""); up("company", ""); up("name", ""); up("kana", ""); up("email", ""); up("tel", ""); up("address", ""); up("inquiry", ""); up("meeting", ""); up("agree", false); setErrors({}); }}
                        style={{
                          fontSize: 13, color: "var(--ink-2)",
                          textDecoration: "underline", cursor: "pointer", background: "none", border: "none",
                          padding: "4px 8px",
                        }}>入力内容をリセット</button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ContactPageV2 — お問い合わせページ本体（タブ切替）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ContactPageV2({ defaultTab = "service" }) {
  const [tab, setTab] = React.useState(defaultTab);
  const [form1, setForm1] = React.useState({ dept: "", customerType: "", company: "", name: "", kana: "", email: "", tel: "", address: "", inquiry: "", meeting: "", agree: false });
  const [sent1, setSent1] = React.useState(false);
  const [form2, setForm2] = React.useState({ dept: "", customerType: "", company: "", name: "", kana: "", email: "", tel: "", address: "", inquiry: "", agree: false });
  const [sent2, setSent2] = React.useState(false);
  const up1 = (k, v) => setForm1((f) => ({ ...f, [k]: v }));
  const up2 = (k, v) => setForm2((f) => ({ ...f, [k]: v }));
  const tabs = [
    { id: "service", label: "お客様からのお問い合わせはこちら" },
    { id: "recruit", label: "パートナー・協業のお問い合わせはこちら" },
  ];
  return (
    <>
      <PageHeader en="CONTACT" ja="お問い合わせ" crumb={["お問い合わせ"]}
        lead="お気軽にご連絡ください。ご入力いただいた内容をもとに、担当者より2営業日以内にご連絡いたします。" />
      <section style={{ padding: "0 0 0" }}>
        <div className="wrap" style={{ maxWidth: 1100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", marginBottom: 48 }} className="ct-tabs">
            {tabs.map((t, i) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`ct-tab-btn${tab === t.id ? " ct-tab-active" : ""}`} style={{
                padding: "20px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
                background: tab === t.id ? "linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%)" : "#fff",
                color: tab === t.id ? "#fff" : "var(--ink-2)",
                borderRight: i === 0 ? "1px solid var(--line)" : "none",
                transition: "background .2s, color .2s",
              }}>{t.label}</button>
            ))}
          </div>
          <style>{`
            @media(max-width:640px){
              .ct-tabs{
                display:flex !important;
                flex-direction:column !important;
                border:none !important;
                gap:12px !important;
                background:transparent !important;
                overflow:visible !important;
              }
              .ct-tab-btn{
                border:none !important;
                border-radius:999px !important;
                padding:16px 24px !important;
                font-size:14px !important;
              }
              .ct-tab-active{
                background:linear-gradient(90deg, var(--c1) 0%, var(--c2) 100%) !important;
                color:#fff !important;
              }
              .ct-tab-btn:not(.ct-tab-active){
                background:transparent !important;
                color:var(--ink-2) !important;
                font-weight:500 !important;
                font-size:13px !important;
              }
            }
          `}</style>
        </div>
      </section>
      {tab === "service" ? (
        <FormLayout phoneNote="※初回のご相談は無料です。2営業日以内にご連絡いたします。"
          form={form1} setForm={setForm1} up={up1} sent={sent1} setSent={setSent1}
          deptOptions={[
            ["asset",      "資産形成・資産運用について"],
            ["tax",        "税務対策支援について"],
            ["realestate", "不動産総合活用について"],
            ["business",   "経営サポートについて"],
            ["ai",         "AI活用・DX推進について"],
            ["seminar",    "セミナー参加について"],
            ["other",      "その他"],
          ]}
          inquiryPH="ご相談内容・ご質問を具体的にご記入ください。"
          heading="お客様からのお問い合わせフォーム" kind="service"/>
      ) : (
        <FormLayout phoneNote="※担当者より2営業日以内にご連絡いたします。"
          form={form2} setForm={setForm2} up={up2} sent={sent2} setSent={setSent2}
          deptOptions={[
            ["partner", "業務提携・パートナーシップについて"],
            ["project", "共同プロジェクト・協業について"],
            ["referral", "情報提供・紹介について"],
            ["media", "取材・メディアのご依頼"],
            ["seminar", "セミナー・講演のご依頼"],
            ["other", "その他のお問い合わせ"],
          ]}
          inquiryPH="ご提案内容・ご依頼内容を具体的にご記入ください。"
          heading="パートナー・協業のお問い合わせフォーム" kind="recruit"/>
      )}
    </>
  );
}

// パートナー・協業向け（リクルートタブを初期表示）
function RecruitInquiryPage() { return <ContactPageV2 defaultTab="recruit" />; }


Object.assign(window, {
  ContactPage: ContactPageV2,
  ContactRecruitPage: RecruitInquiryPage,
  ContactPageV2,
  FormLayout, FormRow, TextInput, ErrMsg,
  inputStyle, PREFECTURES,
});
