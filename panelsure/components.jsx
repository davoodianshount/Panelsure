// Shared small components + UI primitives
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Subtle animated entry wrapper
function Reveal({ children, delay = 0, y = 18, as: As = "div", style, ...rest }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <As ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .7s ${delay}ms cubic-bezier(.2,.7,.2,1), transform .7s ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      ...style
    }} {...rest}>{children}</As>
  );
}

// Monospace "tag" chips used across the site
function Tag({ children, color = "var(--muted)", bg = "transparent", border = "var(--border)", dotColor, style }) {
  return (
    <span className="mono" style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 10px",
      borderRadius: 999, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase",
      color, background: bg, border: `1px solid ${border}`, ...style
    }}>
      {dotColor && <span style={{ width: 6, height: 6, borderRadius: 999, background: dotColor, boxShadow: `0 0 10px ${dotColor}` }} />}
      {children}
    </span>
  );
}

// System label (section eyebrow with bracket style)
function Eyebrow({ children, color = "var(--amber)" }) {
  return (
    <div className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color }}>
      <span style={{ width: 24, height: 1, background: color, opacity: .5 }} />
      {children}
    </div>
  );
}

// Primary button: amber gradient (the "$19 steal" button)
function PrimaryBtn({ children, onClick, full, style, size = "lg" }) {
  const pad = size === "lg" ? "18px 28px" : "12px 20px";
  const fs = size === "lg" ? 16 : 14;
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
      background: "linear-gradient(135deg,#F5B731 0%, #E8920A 100%)",
      color: "#0B0F18", border: "none", padding: pad, borderRadius: 14,
      fontWeight: 800, fontSize: fs, letterSpacing: ".01em", cursor: "pointer",
      width: full ? "100%" : "auto",
      boxShadow: "0 14px 40px -10px rgba(245,183,49,.55), inset 0 1px 0 rgba(255,255,255,.35)",
      position: "relative", overflow: "hidden",
      ...style,
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >{children}</button>
  );
}

function GhostBtn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "transparent", color: "var(--text)",
      border: "1px solid var(--border-2)", padding: "16px 22px", borderRadius: 14,
      fontWeight: 600, fontSize: 15, cursor: "pointer",
      ...style,
    }}>{children}</button>
  );
}

// Card with optional "bracket" corners (tech frame)
function Bracketed({ children, style, color = "var(--border-2)" }) {
  const C = ({ pos }) => (
    <span style={{
      position: "absolute", width: 10, height: 10,
      borderColor: color, borderStyle: "solid",
      [pos.includes("t") ? "top" : "bottom"]: -1,
      [pos.includes("l") ? "left" : "right"]: -1,
      borderWidth: 0,
      ...(pos.includes("t") ? { borderTopWidth: 1 } : { borderBottomWidth: 1 }),
      ...(pos.includes("l") ? { borderLeftWidth: 1 } : { borderRightWidth: 1 }),
    }} />
  );
  return (
    <div style={{ position: "relative", ...style }}>
      {["tl","tr","bl","br"].map(p => <C key={p} pos={p} />)}
      {children}
    </div>
  );
}

// Input used by modal and elsewhere
function Field({ label, hint, error, children, style }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</span>
      {children}
      {hint && <span style={{ fontSize: 12, color: "var(--muted)" }}>{hint}</span>}
      {error && <span style={{ fontSize: 12, color: "var(--red)" }}>{error}</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", style }) {
  return (
    <input type={type} value={value || ""} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid var(--border)",
        background: "var(--navy-2)", color: "var(--text)", fontSize: 15, outline: "none",
        transition: "border-color .15s, box-shadow .15s",
        ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = "var(--blue)"; e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,.15)"; }}
      onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
    />
  );
}

// Reusable section shell (max-width + padding)
function Section({ children, pad = "120px 32px", maxW = 1200, style, id }) {
  return (
    <section id={id} style={{ padding: pad, ...style }}>
      <div style={{ maxWidth: maxW, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

Object.assign(window, { Reveal, Tag, Eyebrow, PrimaryBtn, GhostBtn, Bracketed, Field, Input, Section });
