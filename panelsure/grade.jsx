// Interactive Grade demo — the hook. Three states: A / C / F.
// F state animates in an alarm stack with scan-line, flicker and severity readouts.

function GradeDemo() {
  const [idx, setIdx] = React.useState(2); // start on F for shock value
  const grades = [
    {
      letter: "A", label: "Excellent", color: "var(--green)", hex:"#22C55E",
      score: 94, brand: "Square D QO", model: "QO130L200PG", year: 2021, age: 4,
      capacity: 68, capacityNote: "Comfortably below rated capacity",
      lifespan: "20+ years",
      hazards: [],
      summary: "Modern panel, properly installed, AFCI/GFCI compliant. Bus bar in pristine condition, grounding verified. No action required.",
      verdict: "SAFE",
      badges: [{ label: "Insurance: approved", color: "var(--green)" }, { label: "Home sale: pass", color: "var(--green)" }, { label: "EV-ready", color: "var(--blue)" }],
    },
    {
      letter: "C", label: "Fair", color: "var(--amber)", hex:"#F5B731",
      score: 62, brand: "Murray / Crouse-Hinds", model: "LC2040B1100", year: 2003, age: 22,
      capacity: 88, capacityNote: "Approaching rated capacity",
      lifespan: "3–7 years",
      hazards: [{ t: "Double-tapped breaker", s: "moderate" }, { t: "Mild surface corrosion", s: "low" }],
      summary: "Aging panel nearing end of serviceable life. Minor defects detected that a licensed electrician should address. Consider upgrade within 2–3 years.",
      verdict: "MONITOR",
      badges: [{ label: "Insurance: disclose", color: "var(--amber)" }, { label: "Home sale: may delay", color: "var(--amber)" }, { label: "Not EV-ready", color: "var(--muted)" }],
    },
    {
      letter: "F", label: "Failing", color: "var(--red)", hex:"#EF4444",
      score: 12, brand: "Zinsco / Sylvania", model: "RC38-42-150B", year: 1983, age: 42,
      capacity: 108, capacityNote: "OVER rated capacity — overload imminent",
      lifespan: "0–2 years",
      hazards: [
        { t: "Breakers fail to trip on overcurrent", s: "critical" },
        { t: "Visible scorching on bus bar", s: "critical" },
        { t: "Double-tapped breaker × 3", s: "high" },
      ],
      summary: "Zinsco panel: documented cause of residential fires nationwide. Breakers can melt to the bus bar and continue conducting through a fault. Immediate replacement recommended.",
      verdict: "IMMEDIATE ACTION",
      badges: [{ label: "Insurance: REFUSAL RISK", color: "var(--red)" }, { label: "Home sale: BLOCKED", color: "var(--red)" }, { label: "Fire hazard", color: "var(--red)" }],
    },
  ];
  const g = grades[idx];
  const isF = idx === 2;

  // Re-trigger entry animations when switching grades
  const [key, setKey] = React.useState(0);
  React.useEffect(() => { setKey(k => k + 1); }, [idx]);

  return (
    <div style={{ position: "relative" }}>
      {/* Tab switcher (segmented) */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 20, padding: 6,
        background: "var(--card)", borderRadius: 14, border: "1px solid var(--border)",
        width: "fit-content"
      }}>
        {grades.map((gr, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
            background: i === idx ? gr.hex : "transparent",
            color: i === idx ? (gr.letter === "A" ? "#0B0F18" : "#0B0F18") : "var(--muted)",
            fontWeight: 800, fontSize: 13, letterSpacing: ".06em",
            transition: "all .2s",
          }}>
            GRADE {gr.letter}
          </button>
        ))}
      </div>

      {/* Main diagnostic card */}
      <div key={key} style={{
        position: "relative",
        borderRadius: 20,
        background: isF
          ? "linear-gradient(180deg, rgba(239,68,68,.08), rgba(239,68,68,.02) 40%, var(--card) 100%)"
          : "linear-gradient(180deg, var(--card-2), var(--card))",
        border: `1px solid ${isF ? "rgba(239,68,68,.4)" : "var(--border)"}`,
        overflow: "hidden",
        animation: isF ? "shake .5s cubic-bezier(.36,.07,.19,.97)" : undefined,
      }}>
        {/* Scan line (F only) */}
        {isF && (
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1,
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, height: 40,
              background: "linear-gradient(180deg, transparent, rgba(239,68,68,.18), transparent)",
              animation: "scan 3.5s linear infinite",
            }} />
          </div>
        )}

        {/* Header bar — instrument style */}
        <div className="mono" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", borderBottom: "1px solid var(--border)",
          background: "rgba(8,14,26,.4)", fontSize: 11, letterSpacing: ".14em",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--muted)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: g.hex, boxShadow: `0 0 12px ${g.hex}`, animation: isF ? "blink 1s infinite" : "hum 2.5s infinite" }} />
            PANELSURE · DIAGNOSTIC_v2
          </div>
          <div style={{ display: "flex", gap: 14, color: "var(--muted-2)" }}>
            <span>RPT-{2026 - idx}4{idx}2</span>
            <span style={{ color: g.hex, fontWeight: 700 }}>{g.verdict}</span>
          </div>
        </div>

        {/* Fire hazard band — only on F */}
        {isF && (
          <div style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 20px",
            background: "linear-gradient(90deg, #DC2626, #EF4444 60%, #B91C1C)",
            color: "#fff", position: "relative",
            animation: "slideUp .5s both",
          }}>
            <div style={{ animation: "flick 3s infinite" }}>
              <IconFlame size={22} sw={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="bebas" style={{ fontSize: 22, letterSpacing: ".08em", lineHeight: 1 }}>FIRE HAZARD DETECTED</div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: ".14em", opacity: .92, marginTop: 4 }}>
                THIS PANEL TYPE HAS BEEN LINKED TO ELECTRICAL FIRES
              </div>
            </div>
            <div aria-hidden style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              width: 22, height: 22, borderRadius: 999,
              background: "#fff", color: "#DC2626",
              display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14,
              animation: "pulseRed 1.6s infinite",
            }}>!</div>
          </div>
        )}

        {/* Body grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 0, padding: 0,
        }} className="gd-body">
          {/* LEFT: big grade + brand */}
          <div style={{ padding: "36px 32px", borderRight: "1px solid var(--border)", animation: "slideUp .5s .05s both" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 14 }}>SAFETY GRADE</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 180, lineHeight: .78,
                  color: g.hex, letterSpacing: "-.02em",
                  textShadow: isF ? `0 0 40px ${g.hex}88` : "none",
                }}>{g.letter}</div>
                {/* Small score under */}
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, letterSpacing: ".14em" }}>
                  SCORE · <span style={{ color: g.hex, fontWeight: 700 }}>{g.score}/100</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--muted)" }}>PANEL DETECTED</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginTop: 4, marginBottom: 6, lineHeight: 1.15 }}>{g.brand}</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--muted-2)", marginBottom: 16 }}>{g.model} · EST. {g.year}</div>

                {/* Tiny stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <MiniStat label="AGE" value={`${g.age} yrs`} color="var(--muted)" />
                  <MiniStat label="LIFESPAN" value={g.lifespan} color={g.hex} />
                </div>
              </div>
            </div>

            {/* Capacity gauge */}
            <div style={{ marginTop: 26 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--muted)" }}>LOAD CAPACITY</div>
                <div className="mono" style={{ fontSize: 12, color: g.hex, fontWeight: 700 }}>{g.capacity}%</div>
              </div>
              <div style={{ position: "relative", height: 10, borderRadius: 6, background: "var(--navy-2)", overflow: "hidden", border: "1px solid var(--border)" }}>
                <div style={{
                  position: "absolute", top: 0, bottom: 0, left: 0,
                  width: `${Math.min(g.capacity, 100)}%`,
                  background: `linear-gradient(90deg, ${g.hex}88, ${g.hex})`,
                  transition: "width .8s cubic-bezier(.2,.7,.2,1)",
                }} />
                {/* 100% marker */}
                <div style={{ position: "absolute", left: "100%", top: -3, bottom: -3, width: 1, background: "var(--border-2)" }} />
                {/* Over-cap ghost bar */}
                {g.capacity > 100 && (
                  <div style={{
                    position: "absolute", top: 0, bottom: 0, left: "100%",
                    width: `${Math.min(g.capacity - 100, 100) * 4}px`,
                    background: "repeating-linear-gradient(-45deg, rgba(239,68,68,.9) 0 6px, rgba(239,68,68,.55) 6px 12px)",
                    maxWidth: "calc(100% - 100px)"
                  }} />
                )}
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: g.capacity > 100 ? "var(--red)" : "var(--muted)" }}>{g.capacityNote}</div>
            </div>
          </div>

          {/* RIGHT: readouts */}
          <div style={{ padding: "36px 32px", animation: "slideUp .5s .1s both", position: "relative" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 14 }}>FINDINGS</div>

            {g.hazards.length === 0 ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                border: "1px solid rgba(34,197,94,.35)", borderRadius: 12,
                background: "rgba(34,197,94,.08)", color: "var(--green)",
                marginBottom: 16,
              }}>
                <IconCheck size={18} /> No hazards detected
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {g.hazards.map((h, i) => {
                  const sev = h.s;
                  const sc = sev === "critical" ? "#EF4444" : sev === "high" ? "#F97316" : sev === "moderate" ? "#F5B731" : "#8A97B2";
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                      border: `1px solid ${sc}40`, borderRadius: 10,
                      background: `${sc}10`,
                      animation: `slideUp .4s ${i * 80}ms both`,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: sc, boxShadow: `0 0 8px ${sc}` }} />
                      <span style={{ flex: 1, fontSize: 13, color: "var(--text)" }}>{h.t}</span>
                      <span className="mono" style={{ fontSize: 10, color: sc, letterSpacing: ".14em", fontWeight: 700 }}>{sev.toUpperCase()}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Risk badges */}
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".24em", color: "var(--muted)", marginBottom: 10 }}>RISK FLAGS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {g.badges.map((b, i) => (
                <span key={i} className="mono" style={{
                  fontSize: 11, padding: "6px 10px", borderRadius: 6,
                  background: `${b.color}18`, color: b.color,
                  border: `1px solid ${b.color}38`, letterSpacing: ".06em", textTransform: "uppercase",
                }}>{b.label}</span>
              ))}
            </div>

            {/* Summary */}
            <div style={{
              padding: "14px 16px", borderRadius: 12, border: "1px dashed var(--border-2)",
              background: "var(--navy-2)", fontSize: 14, lineHeight: 1.55, color: "var(--text)",
            }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--muted)", marginBottom: 6 }}>INSPECTOR NOTE</div>
              {g.summary}
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="mono" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 20px", background: "rgba(8,14,26,.55)",
          borderTop: "1px solid var(--border)", fontSize: 10, letterSpacing: ".2em",
          color: "var(--muted-2)",
        }}>
          <span>NEC 2020 · 220.82</span>
          <span>GENERATED IN 47s</span>
          <span>PAGE 01 / 03</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .gd-body { grid-template-columns: 1fr !important; }
          .gd-body > div { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(8,14,26,.5)" }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: 13, color, fontWeight: 700, marginTop: 2 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { GradeDemo });
