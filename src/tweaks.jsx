// Tweaks panel — simple (hero bg variant)

function TweaksPanel() {
  const [tweaks, setTweaks] = React.useState(() => window.__TWEAKS__ || {});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data?.type) return;
      if (e.data.type === "__activate_edit_mode") setVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setVisible(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const setKey = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.__TWEAKS__ = next;
    try { localStorage.setItem("pas_tweaks", JSON.stringify(next)); } catch(e){}
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
    window.dispatchEvent(new CustomEvent("pas-tweaks-changed", { detail: next }));
  };

  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 200,
      width: 300, background: "#fff", border: "1px solid var(--ink)", borderRadius: 10,
      boxShadow: "0 24px 60px -20px rgba(0,0,0,0.25)",
    }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em" }}>TWEAKS</div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <Row label="アクセントカラー">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
            {[["purple","#9d8fcc"],["pink","#e89aae"],["blue","#7aa5d2"],["teal","#7dc9b7"]].map(([k, c]) => (
              <button key={k} onClick={() => { document.documentElement.style.setProperty("--pur-3", c); setKey("accent", k); }}
                style={{ aspectRatio: "1", background: c, border: tweaks.accent === k ? "2px solid var(--ink)" : "2px solid transparent", borderRadius: 6 }}/>
            ))}
          </div>
        </Row>
        <Row label="ヒーロー背景">
          <Seg value={tweaks.heroBg} onChange={(v) => setKey("heroBg", v)} options={[["waves", "Waves"], ["dots", "Dots"]]}/>
        </Row>
        <div style={{ fontSize: 10, color: "var(--ink-3)", paddingTop: 8, borderTop: "1px solid var(--line)" }}>変更は自動保存されます。</div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return <div><div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-2)", marginBottom: 8, letterSpacing: "0.08em" }}>{label}</div>{children}</div>;
}

function Seg({ value, onChange, options }) {
  return <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid var(--line)" }}>
    {options.map(([v, l], i) => (
      <button key={v} onClick={() => onChange(v)} style={{
        flex: 1, padding: "8px 0", fontSize: 12,
        background: value === v ? "var(--ink)" : "#fff",
        color: value === v ? "#fff" : "var(--ink-2)",
        borderLeft: i ? "1px solid var(--line)" : "none",
      }}>{l}</button>
    ))}
  </div>;
}

Object.assign(window, { TweaksPanel });
