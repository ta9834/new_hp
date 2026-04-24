// Root App

function App() {
  const resolveRoute = (h) => {
    const valid = ["contact", "contact-recruit", "best-partner", "staff", "consultant", "privacy", "compliance", "disclaimer", "fiduciary", ...NAV.map(n => n.id)];
    if (valid.includes(h)) return h;
    if (h.startsWith("news/")) return h;
    return "top";
  };
  const [route, setRoute] = React.useState(() => {
    const h = (window.location.hash || "").replace("#", "");
    return resolveRoute(h);
  });

  React.useEffect(() => {
    window.__setRoute = (r) => {
      setRoute(r);
      window.location.hash = r;
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    const onHash = () => {
      const h = (window.location.hash || "").replace("#", "");
      setRoute(resolveRoute(h));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  let page;
  switch (true) {
    case route === "about":           page = <AboutPage />; break;
    case route === "services":        page = <ServicesPage />; break;
    case route === "consultant":      page = <ConsultantPage />; break;
    case route === "best-partner":    page = <BestPartnerPage />; break;
    case route === "staff":           page = <StaffPage />; break;
    case route === "news":            page = <NewsPage />; break;
    case route.startsWith("news/"):   page = <NewsDetailPage id={route.split("/")[1]} />; break;
    case route === "contact":         page = <ContactPage />; break;
    case route === "contact-recruit": page = <ContactRecruitPage />; break;
    case route === "privacy":         page = <PolicyPage kind="privacy" />; break;
    case route === "compliance":      page = <PolicyPage kind="compliance" />; break;
    case route === "disclaimer":      page = <PolicyPage kind="disclaimer" />; break;
    case route === "fiduciary":       page = <PolicyPage kind="fiduciary" />; break;
    default:                          page = <HomePage />;
  }

  return (
    <>
      <SEO route={route} />
      <a href="#main-content" className="skip-link">メインコンテンツへスキップ</a>
      <FixedWaveBackground />
      <Header route={route} />
      <main id="main-content" data-screen-label={route} style={{ position: "relative", zIndex: 1 }}>{page}</main>
      <Footer />
      <TweaksPanel />
      <PageTop />
      <ChatBot />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
