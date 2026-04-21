// Shared animation utilities

// Hook: IntersectionObserver-based reveal
function useReveal(options = {}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, slow = false, as = "div", className = "", style }) {
  const [ref, shown] = useReveal();
  const Comp = as;
  const cls = `reveal ${shown ? "in" : ""} ${slow ? "reveal-slow" : ""} ${delay ? `reveal-delay-${delay}` : ""} ${className}`;
  return <Comp ref={ref} className={cls} style={style}>{children}</Comp>;
}

// Animated number counter
function Counter({ to, suffix = "", duration = 1400 }) {
  const [ref, shown] = useReveal();
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Prismatic animated title — wrapper handles opacity fade, inner span handles gradient clip
function PrismaticTitle({ text, tag: Tag = "h2", style }) {
  return (
    <Tag className="en" style={{ ...style, display: "block" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="hero-letter-wrap"
          style={{ animationDelay: `${80 + i * 50}ms` }}
        >
          <span className="prismatic prismatic-animated">
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </Tag>
  );
}

Object.assign(window, { useReveal, Reveal, Counter, PrismaticTitle });
