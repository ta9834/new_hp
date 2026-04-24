// ── SEO: dynamic meta tags + breadcrumb JSON-LD per route ─────

const SITE_URL = "https://www.pas-planning.co.jp/";
const SITE_NAME = "株式会社PAS企画";
const DEFAULT_OG_IMAGE = SITE_URL + "assets/logo-pas.png";

const PAGE_META = {
  top: {
    title: "株式会社PAS企画 | 資産形成・税務・不動産・経営・AIの総合アドバイザリー｜つくば市",
    description: "株式会社PAS企画は茨城県つくば市を拠点とする独立系コングロマリット型アドバイザリー。資産形成・税務対策・不動産活用・経営サポート・AI活用DX推進の5領域を一つの窓口で横断的に支援します。初回相談無料。",
  },
  about: {
    title: "PAS企画について | 代表メッセージ・会社概要 | 株式会社PAS企画",
    description: "株式会社PAS企画の代表メッセージ・会社概要・沿革をご紹介。つくば市を拠点とする独立系アドバイザリーの理念と歩みをお伝えします。",
  },
  services: {
    title: "事業内容 | 資産形成・税務・不動産・経営・AI活用DX推進 | 株式会社PAS企画",
    description: "資産形成・税務対策・不動産総合活用・経営サポート・AI活用DX推進——5つの専門領域を一つの組織で横断的に支援するコングロマリット型アドバイザリーサービス。",
  },
  consultant: {
    title: "コンサルタント紹介 | 株式会社PAS企画",
    description: "資産運用・税務・不動産・経営、それぞれの領域で実務経験を重ねた専門家が、一つのチームとしてお客様をご支援します。",
  },
  "best-partner": {
    title: "選ばれる理由 | 独立系アドバイザー PAS企画の4つの強み",
    description: "独立系ならではの中立性・コングロマリット型の総合支援・世代を超えた長期伴走・多角的アプローチ——PAS企画が選ばれる4つの理由をご紹介します。",
  },
  staff: {
    title: "スタッフ紹介 | 株式会社PAS企画",
    description: "お客様のベストパートナーであり続けるために——多様な専門性を持つPAS企画のメンバーをご紹介します。",
  },
  news: {
    title: "お知らせ | 株式会社PAS企画",
    description: "株式会社PAS企画からのお知らせ、セミナー開催情報、メディア掲載情報などをお届けします。",
  },
  contact: {
    title: "お問い合わせ | 初回相談無料 | 株式会社PAS企画",
    description: "資産形成・税務・不動産・経営・AIのご相談はPAS企画へ。初回のご相談は無料です。Web会議・対面どちらも対応可能。お気軽にお問い合わせください。",
  },
  "contact-recruit": {
    title: "パートナー・協業のお問い合わせ | 株式会社PAS企画",
    description: "株式会社PAS企画へのパートナーシップ・協業・メディアのお問い合わせ窓口です。",
  },
  privacy: {
    title: "プライバシーポリシー | 株式会社PAS企画",
    description: "株式会社PAS企画のプライバシーポリシー（個人情報保護方針）をご案内します。",
  },
  compliance: {
    title: "コンプライアンス宣言 | 株式会社PAS企画",
    description: "株式会社PAS企画のコンプライアンス宣言と業務運営に関する方針をご案内します。",
  },
  disclaimer: {
    title: "リンク・免責事項 | 株式会社PAS企画",
    description: "株式会社PAS企画ウェブサイトのリンクポリシーおよび免責事項をご案内します。",
  },
  fiduciary: {
    title: "お客様本位の業務運営に関する方針 | 株式会社PAS企画",
    description: "株式会社PAS企画は金融庁「顧客本位の業務運営に関する原則」に基づき、お客様の最善の利益を追求する業務運営方針を定めています。",
  },
};

function getRouteMeta(route) {
  if (route && route.startsWith("news/")) {
    const id = route.split("/")[1];
    const n = (typeof NEWS !== "undefined") ? NEWS.find((x) => x.id === id) : null;
    if (n) {
      return {
        title: `${n.title} | お知らせ | 株式会社PAS企画`,
        description: n.lead ? n.lead.slice(0, 140) : "株式会社PAS企画からのお知らせです。",
        ogType: "article",
        articleDate: n.date,
      };
    }
  }
  return PAGE_META[route] || PAGE_META.top;
}

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setBreadcrumbJsonLd(route) {
  const oldEl = document.getElementById("ld-breadcrumb");
  if (oldEl) oldEl.remove();

  const crumbs = [
    { name: "ホーム", item: SITE_URL },
  ];
  const routeLabels = {
    about: "PAS企画について",
    services: "事業内容",
    consultant: "コンサルタント紹介",
    "best-partner": "選ばれる理由",
    staff: "スタッフ紹介",
    news: "お知らせ",
    contact: "お問い合わせ",
    "contact-recruit": "パートナー・協業のお問い合わせ",
    privacy: "プライバシーポリシー",
    compliance: "コンプライアンス宣言",
    disclaimer: "リンク・免責事項",
    fiduciary: "お客様本位の業務運営に関する方針",
  };

  if (route && route.startsWith("news/")) {
    crumbs.push({ name: "お知らせ", item: SITE_URL + "#news" });
    const id = route.split("/")[1];
    const n = (typeof NEWS !== "undefined") ? NEWS.find((x) => x.id === id) : null;
    if (n) crumbs.push({ name: n.title, item: SITE_URL + "#" + route });
  } else if (routeLabels[route]) {
    crumbs.push({ name: routeLabels[route], item: SITE_URL + "#" + route });
  } else {
    return; // no breadcrumb for top / unknown
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.item,
    })),
  };

  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "ld-breadcrumb";
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

function setArticleJsonLd(route) {
  const oldEl = document.getElementById("ld-article");
  if (oldEl) oldEl.remove();
  if (!route || !route.startsWith("news/")) return;
  const id = route.split("/")[1];
  const n = (typeof NEWS !== "undefined") ? NEWS.find((x) => x.id === id) : null;
  if (!n) return;

  const iso = (d) => {
    const m = d.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : d;
  };

  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": n.title,
    "datePublished": iso(n.date),
    "dateModified": iso(n.date),
    "author": { "@type": "Organization", "name": SITE_NAME, "url": SITE_URL },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": DEFAULT_OG_IMAGE },
    },
    "description": n.lead || "",
    "mainEntityOfPage": SITE_URL + "#" + route,
  };

  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "ld-article";
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

function SEO({ route }) {
  React.useEffect(() => {
    const meta = getRouteMeta(route);
    const url = SITE_URL + (route && route !== "top" ? "#" + route : "");

    document.title = meta.title;
    setMeta("description", meta.description);
    setLink("canonical", url);

    // OGP
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", meta.ogType || "website", "property");
    setMeta("og:image", DEFAULT_OG_IMAGE, "property");

    // Twitter
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", DEFAULT_OG_IMAGE);

    // Breadcrumb / Article JSON-LD
    setBreadcrumbJsonLd(route);
    setArticleJsonLd(route);
  }, [route]);

  return null;
}

Object.assign(window, { SEO });
