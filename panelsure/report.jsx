// Sample PDF-style report preview card — looks like a mini report

function ReportPreview() {
  return (
    <div style={{
      position: "relative",
      background: "linear-gradient(180deg, #F8F6F0, #ECE7DB)",
      borderRadius: 14,
      padding: 0,
      color: "#0B1324",
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      boxShadow: "0 40px 80px -30px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08)",
      overflow: "hidden",
      transform: "rotate(-.6deg)",
    }}>
      {/* top letterhead */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px", borderBottom: "1px solid #D2CCBA",
        background: "#0B1324", color: "#F6F2E8",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconLogo size={20} />
          <span className="bebas" style={{ fontSize: 18, letterSpacing: ".1em" }}>
            <span style={{ color: "#F5B731" }}>PANEL</span>SURE
          </span>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "#8A97B2" }}>
          SAFETY REPORT · RPT-24251
        </div>
      </div>

      <div style={{ padding: "22px 24px" }}>
        {/* Address + date */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: ".24em", color: "#6B6453", marginBottom: 4 }}>PROPERTY</div>
            <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.15 }}>4521 Oak Valley Dr</div>
            <div style={{ fontSize: 12, color: "#6B6453" }}>Los Angeles, CA 90041</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: ".24em", color: "#6B6453", marginBottom: 4 }}>ISSUED</div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>2026.04.22</div>
          </div>
        </div>

        {/* Fire alert */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#DC2626", color: "#fff",
          padding: "10px 14px", borderRadius: 8, marginBottom: 16,
        }}>
          <IconFlame size={16} sw={2} />
          <span className="mono" style={{ fontSize: 11, letterSpacing: ".14em", fontWeight: 700 }}>FIRE HAZARD · IMMEDIATE ACTION</span>
        </div>

        {/* Grade + panel */}
        <div style={{
          display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center",
          marginBottom: 20, paddingBottom: 20, borderBottom: "1px dashed #C8C1AC",
        }}>
          <div style={{
            width: 92, height: 92, borderRadius: 10,
            background: "linear-gradient(180deg, #FEE2E2, #FECACA)",
            border: "2px solid #EF4444",
            display: "grid", placeItems: "center", position: "relative",
          }}>
            <div className="bebas" style={{ fontSize: 72, color: "#DC2626", lineHeight: .8 }}>F</div>
            <div className="mono" style={{ position: "absolute", bottom: 6, fontSize: 8, letterSpacing: ".18em", color: "#DC2626", fontWeight: 700 }}>FAILING · 12</div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: ".22em", color: "#6B6453" }}>PANEL</div>
            <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>Zinsco / Sylvania</div>
            <div style={{ fontSize: 12, color: "#3A3628", marginTop: 2 }}>42 yrs old · 100A · 107.5A load</div>
            <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: "#E6E0CC", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, width: "100%", background: "linear-gradient(90deg,#F5B731,#EF4444)" }} />
              <div style={{ position: "absolute", top: -2, bottom: -2, left: "93%", width: 2, background: "#0B1324" }} />
            </div>
            <div className="mono" style={{ fontSize: 10, color: "#DC2626", fontWeight: 700, marginTop: 6 }}>108% — OVER CAPACITY</div>
          </div>
        </div>

        {/* Risk flags */}
        <div style={{ marginBottom: 18 }}>
          <div className="mono" style={{ fontSize: 9, letterSpacing: ".24em", color: "#6B6453", marginBottom: 8 }}>RISK FLAGS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              ["Insurance refusal risk", "#DC2626"],
              ["Home sale blocked", "#DC2626"],
              ["NEC violation × 2", "#F97316"],
            ].map(([t, c], i) => (
              <span key={i} className="mono" style={{
                fontSize: 10, padding: "4px 8px", borderRadius: 4,
                background: `${c}15`, color: c, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", border: `1px solid ${c}40`,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Quote row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "center",
          padding: 14, borderRadius: 10, background: "#0B1324", color: "#F6F2E8",
        }}>
          <div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: ".22em", color: "#8A97B2", marginBottom: 2 }}>REPLACEMENT ESTIMATE</div>
            <div className="bebas" style={{ fontSize: 28, lineHeight: 1, color: "#F5B731", letterSpacing: ".02em" }}>$2,900 — $3,900</div>
            <div style={{ fontSize: 11, color: "#C3CADA", marginTop: 4 }}>Most homeowners pay <b>$3,400</b> · 200A · 24ckt</div>
          </div>
          <div style={{
            padding: "8px 12px", borderRadius: 8, border: "1px solid #F5B73140",
            background: "#F5B73115",
          }}>
            <div className="mono" style={{ fontSize: 9, color: "#F5B731", letterSpacing: ".18em" }}>YOUR $19</div>
            <div className="mono" style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>CREDITED</div>
          </div>
        </div>

        {/* Page indicator */}
        <div className="mono" style={{ fontSize: 9, letterSpacing: ".24em", color: "#6B6453", marginTop: 16, display: "flex", justifyContent: "space-between" }}>
          <span>PAGE 01 OF 03</span>
          <span>NEC 2020 · 220.82</span>
        </div>
      </div>
    </div>
  );
}

// Hazard brand row
function HazardRow({ name, risk, desc }) {
  const color = risk === "CRITICAL" ? "var(--red)" : risk === "HIGH" ? "var(--orange)" : "var(--amber)";
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "flex-start",
      padding: "18px 22px", borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center",
        background: `${color}15`, border: `1px solid ${color}40`, color,
      }}>
        <IconFlame size={18} sw={1.8} />
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{desc}</div>
      </div>
      <span className="mono" style={{
        fontSize: 10, padding: "6px 10px", borderRadius: 999, background: `${color}18`,
        color, border: `1px solid ${color}40`, fontWeight: 700, letterSpacing: ".12em", whiteSpace: "nowrap",
      }}>{risk}</span>
    </div>
  );
}

// 3-step explainer card
function StepCard({ n, title, desc, icon, accent = "var(--blue)" }) {
  return (
    <div style={{
      position: "relative", padding: "32px 28px", borderRadius: 18,
      background: "linear-gradient(180deg, var(--card-2), var(--card))",
      border: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      <div className="bebas" style={{
        position: "absolute", top: -18, right: 10, fontSize: 180, lineHeight: 1,
        color: accent, opacity: .07,
      }}>{n}</div>
      <div style={{
        width: 44, height: 44, borderRadius: 12, display: "grid", placeItems: "center",
        background: `${accent}15`, border: `1px solid ${accent}40`, color: accent, marginBottom: 20,
      }}>{icon}</div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 6 }}>STEP · {n}</div>
      <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)", marginBottom: 8, lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>{desc}</div>
    </div>
  );
}

Object.assign(window, { ReportPreview, HazardRow, StepCard });
