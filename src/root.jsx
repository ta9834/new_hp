// Root App

function App() {
  const [route, setRoute] = React.useState(() => {
    const h = (window.location.hash || "").replace("#", "");
    return NAV.find((n) => n.id === h)?.id || "top";
  });

  React.useEffect(() => {
    window.__setRoute = (r) => {
      setRoute(r);
      window.location.hash = r;
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    const onHash = () => {
      const h = (window.location.hash || "").replace("#", "");
      const valid = ["contact", "contact-recruit", "best-partner", "staff", ...NAV.map(n => n.id)];
      if (valid.includes(h)) setRoute(h);
      else if (h.startsWith("news/")) setRoute(h);
      else if (["privacy", "compliance", "disclaimer", "fiduciary"].includes(h)) setRoute(h);
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
      <FixedWaveBackground />
      <Header route={route} />
      <main data-screen-label={route} style={{ position: "relative", zIndex: 1 }}>{page}</main>
      <Footer />
      <TweaksPanel />
      <ChatBot />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
