// Signature flowing waves — the HIROKEI aesthetic moment.
// Multiple colored strands sweeping across the bottom.

function WaveField({ height = 440, density = 10, position = "bottom", animate = false }) {
  const colors = [
    "var(--c1)","var(--c2)","var(--c3)","var(--c4)","var(--c5)","var(--c6)","var(--c7)",
    "var(--c1)","var(--c2)","var(--c3)","var(--c4)","var(--c5)","var(--c6)","var(--c7)",
    "var(--c1)","var(--c2)","var(--c3)","var(--c4)","var(--c5)","var(--c6)","var(--c7)",
    "var(--c1)","var(--c2)","var(--c3)","var(--c4)","var(--c5)","var(--c6)","var(--c7)",
  ];
  const total = density * 2;
  // Each line: base amplitude + slight phase offset, generate path
  const W = 1600, H = height;
  function wavePath(phase, amp, baseY) {
    // 4 gentle cycles across the width
    const pts = [];
    const N = 120;
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * W;
      const y = baseY
        + Math.sin((i / N) * Math.PI * 4 + phase) * amp
        + Math.sin((i / N) * Math.PI * 2.2 + phase * 0.6) * amp * 0.35;
      pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }
  const lines = [];
  for (let i = 0; i < total; i++) {
    const color = colors[i % colors.length];
    const phase = (i / total) * Math.PI * 2.4;
    const amp = 22 + (i % 4) * 8;
    // spread vertically across the full height (not just middle)
    const baseY = H * 0.5 + (i - total / 2) * (H / total) * 0.85;
    lines.push({ d: wavePath(phase, amp, baseY), color, opacity: 0.55 - (i / total) * 0.18 });
  }
  return (
    <div style={{
      position: "absolute",
      left: 0, right: 0,
      [position]: 0,
      height, pointerEvents: "none", overflow: "hidden",
    }}>
      <svg viewBox={`0 0 ${W * 2} ${H}`} width="200%" height="100%" preserveAspectRatio="none" style={{ display: "block" }} className={animate ? "wave-anim" : ""}>
        {lines.map((l, i) => (
          <g key={i}>
            <path d={l.d} fill="none" stroke={l.color} strokeWidth="1.2" opacity={l.opacity} />
            <path d={l.d} transform={`translate(${W},0)`} fill="none" stroke={l.color} strokeWidth="1.2" opacity={l.opacity} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Fixed-background rainbow waves — rendered as a position:fixed element
// so it works on all devices including iOS Safari (which doesn't support background-attachment:fixed).
function FixedWaveBackground() {
  const [paths, setPaths] = React.useState([]);
  React.useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const cs = [1,2,3,4,5,6,7].map(i => root.getPropertyValue(`--c${i}`).trim() || "#cccccc");
    const W = 1600, H = 350;
    const density = 18;
    const total = density * 2;
    function wavePath(phase, amp, baseY) {
      const pts = [];
      const N = 140;
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * W;
        const y = baseY
          + Math.sin((i / N) * Math.PI * 4 + phase) * amp
          + Math.sin((i / N) * Math.PI * 2.2 + phase * 0.6) * amp * 0.35;
        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return pts.join(" ");
    }
    const result = [];
    for (let i = 0; i < total; i++) {
      const color = cs[i % cs.length];
      const phase = (i / total) * Math.PI * 2.4;
      const amp = 14 + (i % 4) * 5;
      const baseY = H * 0.55 + (i - total / 2) * (H / total) * 0.75;
      const opacity = parseFloat((0.55 - (i / total) * 0.18).toFixed(2));
      result.push({ d: wavePath(phase, amp, baseY), color, opacity });
    }
    setPaths(result);
  }, []);

  return (
    <div style={{
      position: "fixed", left: 0, right: 0, bottom: 0,
      height: "36vh", pointerEvents: "none", zIndex: 0,
    }}>
      <svg viewBox="0 0 1600 350" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }}>
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="1.2" opacity={p.opacity} />
        ))}
      </svg>
    </div>
  );
}

// Subtle grid/dot background
function SubtleDots() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dots-bg" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--line)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-bg)" />
      </svg>
    </div>
  );
}

Object.assign(window, { WaveField, SubtleDots, FixedWaveBackground });
