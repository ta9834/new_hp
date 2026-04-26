// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔧 サイト設定（お問い合わせフォーム連携）
// ─────────────────────────────────────────────────────
// 詳細なセットアップ手順は tools/contact-form.gs を参照してください。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  // reCAPTCHA v3 サイトキー（公開鍵：フロントに置いてOK）
  // 取得：https://www.google.com/recaptcha/admin
  RECAPTCHA_SITE_KEY: "6LewQ8ssAAAAAOP6bp7ZENMC6tOkxopqPOSgbCx7",

  // Google Apps Script の Web App エンドポイント URL
  // 取得：GASで「ウェブアプリとしてデプロイ」した URL
  // 例：https://script.google.com/macros/s/AKfycbz.../exec
  GAS_ENDPOINT: "https://script.google.com/macros/s/AKfycbyI1EWPQJoRa9RqQbeRxpxDoMT2Nf6BSRdlqEVFE9SaB_pYjLBZ7pAECdVFgvBlEFKO/exec",
};

Object.assign(window, { CONFIG });
