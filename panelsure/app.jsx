// Main app: hero, sections, CTA — composes everything together.

const { useState: aUseState } = React;

function App() {
  const [showModal, setShowModal] = aUseState(false);
  const open = () => setShowModal(true);

  return (
    <div style={{ background: "var(--navy)", minHeight: "100vh", position: "relative" }}>
      {showModal && <LeadCaptureModal onClose={() => setShowModal(false)} onSubmit={() => setShowModal(false)} />}

      {/* Top alert strip */}
      <div className="mono" style={{
        background: "linear-gradient(90deg, rgba(245,183,49,.12), rgba(59,130,246,.12))",
        borderBottom: "1px solid rgba(245,183,49,.2)",
        color: "var(--amber)", fontSize: 11, letterSpacing: ".18em",
        padding: "8px 20px", textAlign: "center",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--amber)", boxShadow: "0 0 8px var(--amber)", animation: "blink 1.8s infinite" }} />
          LA COUNTY · 200+ AUDITS COMPLETED · $19 CREDITED TO UPGRADES
        </span>
      </div>

      {/* Nav */}
      <Nav onCta={open} />

      {/* Hero */}
      <Hero onCta={open} />

      {/* Marquee of flagged brands */}
      <BrandMarquee />

      {/* How it works */}
      <HowItWorks />

      {/* Interactive grade demo */}
      <GradeSection onCta={open} />

      {/* What's inside the $19 report */}
      <ReportSection onCta={open} />

      {/* Hazard brand list */}
      <HazardList />

      {/* Stats + Local proof */}
      <StatsSection />

      {/* Testimonial / before-after */}
      <Testimonial />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA onCta={open} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// =====================================================
// Nav
// =====================================================
function Nav({ onCta }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(8,14,26,.72)", backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border)",
      padding: "14px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <IconLogo size={28} />
        <div className="bebas" style={{ fontSize: 24, letterSpacing: ".06em", lineHeight: 1 }}>
          <span style={{ color: "var(--amber)" }}>PANEL</span>SURE
        </div>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--muted)" }}>
        <a href="#how" style={{ color: "inherit", textDecoration: "none" }}>How it works</a>
        <a href="#grade" style={{ color: "inherit", textDecoration: "none" }}>Sample grade</a>
        <a href="#hazards" style={{ color: "inherit", textDecoration: "none" }}>Flagged panels</a>
        <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="mono nav-hide" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em" }}>
          (818) 555-0199
        </div>
        <PrimaryBtn size="sm" onClick={onCta}>Run my audit · $19</PrimaryBtn>
      </div>
      <style>{`
        @media (max-width: 880px) { .nav-links { display: none !important; } }
        @media (max-width: 620px) { .nav-hide { display: none !important; } }
      `}</style>
    </nav>
  );
}

// =====================================================
// Hero
// =====================================================
function Hero({ onCta }) {
  return (
    <section style={{ position: "relative", padding: "80px 28px 64px", overflow: "hidden" }}>
      {/* grid bg */}
      <div className="grid-bg" aria-hidden style={{
        position: "absolute", inset: 0, opacity: .35,
        maskImage: "radial-gradient(ellipse at top, black 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 70%)",
      }} />
      {/* glow */}
      <div aria-hidden style={{
        position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(239,68,68,.14) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }} className="hero-grid">
          {/* LEFT */}
          <div>
            <Tag color="var(--amber)" bg="rgba(245,183,49,.08)" border="rgba(245,183,49,.3)" dotColor="var(--amber)">
              AI PANEL AUDIT · LA COUNTY
            </Tag>

            <h1 style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(52px, 6.4vw, 96px)",
              lineHeight: .9, letterSpacing: ".01em", margin: "22px 0 0",
              color: "var(--text)",
            }}>
              KNOW YOUR<br />
              ELECTRICAL<br/>PANEL IS<br />
              <span style={{
                background: "linear-gradient(90deg, #F5B731, #E8920A 70%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              }}>SAFE, SOUND &amp; READY.</span>
            </h1>

            <p style={{
              fontSize: 19, lineHeight: 1.55, color: "var(--muted)",
              maxWidth: 540, margin: "26px 0 0",
            }}>
              Upload 3 phone photos. Our AI flags hazards, runs an <span style={{ color: "var(--text)", fontWeight: 600 }}>NEC 220.82 load calculation</span>, and tells you if your panel is ready for an EV charger, solar, or a home sale — in a professional PDF report.
            </p>

            {/* Three-angle value chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
              {[
                { c: "var(--red)", t: "Fire risk check" },
                { c: "var(--blue)", t: "Insurance & home sale" },
                { c: "var(--green)", t: "EV / solar ready?" },
              ].map((x, i) => (
                <span key={i} className="mono" style={{
                  fontSize: 11, padding: "6px 10px", borderRadius: 999,
                  background: `${x.c}12`, color: x.c, border: `1px solid ${x.c}35`,
                  letterSpacing: ".08em", textTransform: "uppercase",
                }}>{x.t}</span>
              ))}
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32, alignItems: "center" }}>
              <PrimaryBtn onClick={onCta}>
                <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
                  <span className="bebas" style={{ fontSize: 22, letterSpacing: ".06em" }}>GET MY AUDIT</span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "3px 10px", borderRadius: 6, background: "rgba(11,19,36,.85)", color: "#F5B731",
                    fontSize: 14, fontWeight: 800, letterSpacing: ".02em",
                  }}>$19</span>
                </span>
              </PrimaryBtn>
              <GhostBtn onClick={() => document.getElementById("grade").scrollIntoView({ behavior: "smooth" })}>
                See a sample report
              </GhostBtn>
            </div>

            {/* Trust row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28, fontSize: 13, color: "var(--muted)" }}>
              {[
                { i: <IconShield size={14} />, t: "NEC 2020 compliant" },
                { i: <IconClock size={14} />, t: "Report in < 5 min" },
                { i: <IconLock size={14} />, t: "Encrypted · private" },
                { i: <IconStar size={14} />, t: "4.9 · 200+ audits" },
              ].map((x, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--amber)" }}>{x.i}</span> {x.t}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual panel */}
          <div style={{ position: "relative", minHeight: 540 }}>
            <DiagnosticVisual />
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// Hero right-column: stylized "scanning panel" visual
function DiagnosticVisual() {
  return (
    <div style={{
      position: "relative",
      borderRadius: 22,
      background: "linear-gradient(160deg, #0F1829 0%, #0A1120 100%)",
      border: "1px solid var(--border-2)",
      padding: 20, overflow: "hidden",
      boxShadow: "0 40px 80px -30px rgba(0,0,0,.7)",
    }}>
      <div className="noise" />

      {/* Diagnostic header */}
      <div className="mono" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 10, letterSpacing: ".2em", color: "var(--muted)",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--red)", boxShadow: "0 0 10px var(--red)", animation: "blink 1s infinite" }} />
          SCANNING · LIVE
        </span>
        <span>AI · VISION_v2</span>
      </div>

      {/* Panel mockup with scan line */}
      <div style={{
        position: "relative",
        marginTop: 14, borderRadius: 14, padding: 14,
        background: "linear-gradient(180deg, #0B1324, #060A14)",
        border: "1px solid var(--border)",
        overflow: "hidden", aspectRatio: "4/5",
      }}>
        {/* Scan line */}
        <div aria-hidden style={{
          position: "absolute", left: 0, right: 0, height: 60,
          background: "linear-gradient(180deg, transparent, rgba(245,183,49,.25), transparent)",
          animation: "scan 3s linear infinite",
        }} />

        {/* Corner brackets */}
        {["tl","tr","bl","br"].map(p => (
          <span key={p} aria-hidden style={{
            position: "absolute",
            [p.includes("t") ? "top" : "bottom"]: 8,
            [p.includes("l") ? "left" : "right"]: 8,
            width: 20, height: 20,
            borderColor: "var(--amber)", borderStyle: "solid", borderWidth: 0,
            ...(p.includes("t") ? { borderTopWidth: 2 } : { borderBottomWidth: 2 }),
            ...(p.includes("l") ? { borderLeftWidth: 2 } : { borderRightWidth: 2 }),
          }} />
        ))}

        {/* Panel illustration */}
        <div style={{
          position: "absolute", inset: 28,
          background: "#0B1324", borderRadius: 6,
          border: "1px solid #263657",
          padding: 14,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
        }}>
          <div style={{ gridColumn: "1 / -1", height: 28, background: "linear-gradient(180deg,#1E2B47,#152038)", borderRadius: 3, display: "grid", placeItems: "center" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "#F5B731" }}>100A MAIN</div>
          </div>
          {Array.from({length: 24}).map((_, i) => {
            const hot = [3, 7, 14, 19].includes(i);
            return (
              <div key={i} style={{
                height: 14,
                background: hot ? "linear-gradient(90deg,#EF4444,#B91C1C)" : "linear-gradient(90deg,#334155,#1E293B)",
                borderRadius: 2,
                animation: hot ? `hum ${1 + (i % 3) * .4}s infinite` : "none",
              }} />
            );
          })}
        </div>

        {/* Target reticle over a "hot" breaker */}
        <div aria-hidden style={{
          position: "absolute", top: "44%", right: "22%",
          width: 60, height: 60, borderRadius: 999,
          border: "1px dashed rgba(239,68,68,.8)",
          animation: "pulseRed 1.6s infinite",
          display: "grid", placeItems: "center",
        }}>
          <div style={{ width: 4, height: 4, borderRadius: 999, background: "var(--red)" }} />
        </div>
      </div>

      {/* Readouts */}
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Readout label="BRAND MATCH" value="ZINSCO" color="var(--red)" />
        <Readout label="CONFIDENCE" value="98.2%" color="var(--amber)" />
        <Readout label="HAZARDS" value="3 DETECTED" color="var(--red)" />
        <Readout label="GRADE" value="F" color="var(--red)" big />
      </div>

      <div style={{
        marginTop: 14, padding: "10px 12px",
        border: "1px solid rgba(239,68,68,.35)", borderRadius: 10,
        background: "rgba(239,68,68,.08)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <IconFlame size={16} color="var(--red)" sw={1.8} />
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--red)", fontWeight: 700 }}>
          FIRE HAZARD · IMMEDIATE ACTION RECOMMENDED
        </div>
      </div>
    </div>
  );
}

function Readout({ label, value, color, big }) {
  return (
    <div style={{
      padding: "10px 12px", borderRadius: 10,
      background: "rgba(8,14,26,.8)", border: "1px solid var(--border)",
    }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: ".22em", color: "var(--muted)" }}>{label}</div>
      <div className={big ? "bebas" : "mono"} style={{
        fontSize: big ? 28 : 14, color, fontWeight: big ? 400 : 700,
        marginTop: 2, lineHeight: 1,
      }}>{value}</div>
    </div>
  );
}

// =====================================================
// Brand marquee
// =====================================================
function BrandMarquee() {
  const brands = ["ZINSCO", "FEDERAL PACIFIC", "PUSHMATIC", "CHALLENGER", "SYLVANIA", "STAB-LOK", "ITE", "MURRAY"];
  const row = [...brands, ...brands];
  return (
    <div style={{
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      background: "rgba(8,14,26,.5)", padding: "16px 0",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(90deg, var(--navy), transparent 8%, transparent 92%, var(--navy))", zIndex: 2,
      }} />
      <div style={{
        display: "flex", gap: 56, whiteSpace: "nowrap",
        animation: "marquee 40s linear infinite",
      }}>
        {row.map((b, i) => (
          <div key={i} className="bebas" style={{
            fontSize: 24, letterSpacing: ".12em", color: "var(--muted-2)",
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <IconFlame size={16} sw={1.6} />
            {b}
            <span style={{ color: "var(--red)", opacity: .6, fontSize: 11 }} className="mono">FLAGGED</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// How It Works
// =====================================================
function HowItWorks() {
  return (
    <Section id="how" pad="100px 28px" maxW={1200}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="bebas" style={{ fontSize: "clamp(40px, 5.2vw, 64px)", letterSpacing: ".02em", margin: "14px 0 14px", lineHeight: .95 }}>
          THREE STEPS. NO ELECTRICIAN VISIT.
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 620, margin: "0 auto" }}>
          Most homeowners finish in under 3 minutes. You'll have a printable PDF report before your coffee gets cold.
        </p>
      </div>

      <div style={{ position: "relative" }}>
        {/* Connector line */}
        <div aria-hidden className="step-connector" style={{
          position: "absolute", top: "44%", left: "16%", right: "16%", height: 1,
          background: "repeating-linear-gradient(90deg, var(--border-2) 0 6px, transparent 6px 12px)",
        }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative" }} className="step-grid">
          <StepCard n="01" icon={<IconHouse size={22} />} accent="var(--blue)"
            title="Tell us about your home"
            desc="Square footage, major appliances, ZIP. Takes ~90 seconds. We use NEC 220.82 to calculate your actual load." />
          <StepCard n="02" icon={<IconCamera size={22} />} accent="var(--amber)"
            title="Snap 3 phone photos"
            desc="Panel closed (brand label), panel open (breakers), and your meter. Guided framing overlays keep it foolproof." />
          <StepCard n="03" icon={<IconFile size={22} />} accent="var(--green)"
            title="Get your PDF in minutes"
            desc="Safety grade, hazard flags, NEC load math, insurance + home-sale impact, and a quote. Shareable with any electrician." />
        </div>

        <style>{`
          @media (max-width: 860px) {
            .step-grid { grid-template-columns: 1fr !important; }
            .step-connector { display: none; }
          }
        `}</style>
      </div>
    </Section>
  );
}

// =====================================================
// Grade section
// =====================================================
function GradeSection({ onCta }) {
  return (
    <Section id="grade" pad="80px 28px 100px" maxW={1100}>
      <div style={{ maxWidth: 680, marginBottom: 40 }}>
        <Eyebrow color="var(--red)">The output</Eyebrow>
        <h2 className="bebas" style={{ fontSize: "clamp(44px, 6vw, 72px)", letterSpacing: ".02em", margin: "14px 0 10px", lineHeight: .95 }}>
          YOUR PANEL GETS A<br/>SAFETY GRADE · A–F
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          Click through a live example. This is exactly what you'll see in your report.
        </p>
      </div>
      <GradeDemo />
      <div style={{ marginTop: 28, textAlign: "center" }}>
        <PrimaryBtn onClick={onCta}>Find my grade · $19</PrimaryBtn>
      </div>
    </Section>
  );
}

// =====================================================
// Report section (deliverable)
// =====================================================
function ReportSection({ onCta }) {
  const bullets = [
    ["Safety grade (A–F) with score", <IconShield size={16} />],
    ["Panel brand + fire hazard flags", <IconFlame size={16} />],
    ["NEC 220.82 load calculation", <IconGauge size={16} />],
    ["Insurance & home-sale impact", <IconInsurance size={16} />],
    ["Replacement quote with anchor price", <IconTag size={16} />],
    ["Custom electrician call script", <IconPhone size={16} />],
    ["Panel lifespan estimate", <IconClock size={16} />],
    ["Solar + EV readiness", <IconBolt size={16} />],
  ];

  return (
    <Section pad="100px 28px" maxW={1200}>
      <div style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 64, alignItems: "center" }} className="report-grid">
        <div>
          <Eyebrow>The deliverable</Eyebrow>
          <h2 className="bebas" style={{ fontSize: "clamp(44px, 6vw, 72px)", letterSpacing: ".02em", margin: "14px 0 12px", lineHeight: .95 }}>
            A REPORT WORTH<br/>MORE THAN $19.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 28, maxWidth: 520 }}>
            A 3-page professional PDF you can share with insurance, realtors, or any licensed electrician. What an on-site inspection would cost you <span style={{ color: "var(--text)" }}>$250–$400</span>.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
            {bullets.map(([t, icon], i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10,
                background: "rgba(15,24,41,.5)", border: "1px solid var(--border)",
              }}>
                <span style={{ color: "var(--amber)" }}>{icon}</span>
                <span style={{ fontSize: 13, color: "var(--text)" }}>{t}</span>
              </div>
            ))}
          </div>
          <PrimaryBtn onClick={onCta}>Get my report · $19</PrimaryBtn>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
            Instant delivery by email · PDF + shareable link
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Stack effect */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, transform: "translate(16px, 16px) rotate(2deg)",
            background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
          }} />
          <ReportPreview />
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .report-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </Section>
  );
}

// =====================================================
// Hazard list
// =====================================================
function HazardList() {
  return (
    <Section id="hazards" pad="80px 28px" maxW={1000}>
      <div style={{ marginBottom: 40 }}>
        <Eyebrow color="var(--red)">Panels our AI auto-flags</Eyebrow>
        <h2 className="bebas" style={{ fontSize: "clamp(40px, 5vw, 60px)", letterSpacing: ".02em", margin: "14px 0 10px", lineHeight: 1 }}>
          IF YOUR PANEL IS ONE OF THESE<br/>— YOU NEED TO KNOW.
        </h2>
      </div>
      <div style={{
        background: "linear-gradient(180deg, var(--card-2), var(--card))",
        borderRadius: 18, border: "1px solid var(--border)", overflow: "hidden",
      }}>
        <HazardRow name="Zinsco / Sylvania" risk="CRITICAL"
          desc="Breakers melt to the bus bar and continue conducting through a fault. Documented cause of residential fires nationwide." />
        <HazardRow name="Federal Pacific (FPE Stab-Lok)" risk="CRITICAL"
          desc="Independent testing shows up to 60% breaker failure rate. Associated with 2,800+ residential fires. No longer UL-listed." />
        <HazardRow name="Pushmatic (ITE)" risk="HIGH"
          desc="Push-button breakers are obsolete. Replacement parts are scarce and often don't meet current code." />
        <HazardRow name="Challenger" risk="MODERATE"
          desc="Select models recalled for defective breaker connections. Requires inspection to verify model number." />
      </div>
    </Section>
  );
}

// =====================================================
// Stats section
// =====================================================
function StatsSection() {
  return (
    <Section pad="60px 28px" maxW={1200}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="stats-grid">
        {[
          { k: "$19", v: "vs. $250+ for an electrician site visit", c: "var(--amber)" },
          { k: "< 5 MIN", v: "upload to full PDF report", c: "var(--blue)" },
          { k: "NEC 2020", v: "code-compliant load calculation", c: "var(--green)" },
          { k: "200+", v: "panel audits completed in LA County", c: "var(--text)" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "28px 22px", borderRadius: 16,
            background: "linear-gradient(180deg, var(--card-2), var(--card))",
            border: "1px solid var(--border)", position: "relative", overflow: "hidden",
          }}>
            <div className="bebas" style={{ fontSize: 44, letterSpacing: ".02em", color: s.c, lineHeight: 1 }}>{s.k}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, lineHeight: 1.45 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Local proof row */}
      <div style={{
        marginTop: 18, padding: "20px 24px", borderRadius: 16,
        background: "linear-gradient(90deg, rgba(34,197,94,.08), rgba(59,130,246,.08))",
        border: "1px solid rgba(34,197,94,.25)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.4)", color: "var(--green)", display: "grid", placeItems: "center" }}>
            <IconHouse size={20} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Trusted across Los Angeles</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>200+ homes audited in LA County · Los Feliz · Eagle Rock · Pasadena · Burbank · Glendale</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["LADWP", "SCE", "NEC 2020"].map(t => (
            <span key={t} className="mono" style={{
              fontSize: 11, padding: "6px 10px", borderRadius: 8,
              background: "rgba(59,130,246,.12)", color: "var(--blue-2)",
              border: "1px solid rgba(59,130,246,.3)", letterSpacing: ".08em",
            }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

// =====================================================
// Testimonial
// =====================================================
function Testimonial() {
  return (
    <Section pad="80px 28px" maxW={1000}>
      <div style={{
        position: "relative",
        padding: "40px 40px", borderRadius: 22,
        background: "linear-gradient(135deg, var(--card-2), var(--card))",
        border: "1px solid var(--border-2)", overflow: "hidden",
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".24em", color: "var(--amber)", marginBottom: 16 }}>CUSTOMER · EAGLE ROCK, CA</div>
        <div style={{ display: "flex", gap: 2, marginBottom: 16, color: "var(--amber)" }}>
          {[0,1,2,3,4].map(i => <IconStar key={i} size={16} />)}
        </div>
        <p style={{ fontSize: 22, lineHeight: 1.45, color: "var(--text)", margin: 0, fontWeight: 500, maxWidth: 820 }}>
          "The inspector flagged our Zinsco panel on the disclosure. We were 9 days from closing. PanelSure ran the audit in minutes, we had three quotes by Friday, and the deal closed on time. Nineteen bucks saved a six-figure sale."
        </p>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999,
            background: "linear-gradient(135deg, #F5B731, #E8920A)", color: "#0B1324",
            display: "grid", placeItems: "center", fontWeight: 800, fontSize: 16,
          }}>DM</div>
          <div>
            <div style={{ fontWeight: 700 }}>Diane M.</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Homeowner · Sold April 2026</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// =====================================================
// FAQ
// =====================================================
function FAQ() {
  const items = [
    ["Is this a replacement for a licensed electrician?", "No. PanelSure is a diagnostic tool, not a substitute for licensed electrical work. We identify risk and document it so a licensed electrician can act on it. If we flag a hazard, book one — we'll even hand you a call script."],
    ["How accurate is the AI analysis?", "Our vision model is tuned specifically for residential panels and identifies brand and visible hazards with 95%+ confidence on clear photos. If your photos aren't clear enough for a reliable call, we'll tell you and refund the $19."],
    ["What if my panel is safe?", "You'll still get a full PDF with your grade, NEC load math, and EV/solar readiness. Peace of mind is the product."],
    ["What if I need the actual work done?", "Your $19 is credited toward any upgrade booked through us within 48 hours. We'll put you in touch with a licensed electrician in your ZIP."],
    ["How long does it take?", "Most reports finish in under 5 minutes. You'll get an email + a shareable link."],
  ];
  const [open, setOpen] = aUseState(0);
  return (
    <Section id="faq" pad="80px 28px" maxW={900}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="bebas" style={{ fontSize: "clamp(40px, 5vw, 60px)", margin: "14px 0 10px", lineHeight: 1 }}>
          COMMON QUESTIONS
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(([q, a], i) => (
          <div key={i} style={{
            borderRadius: 14, border: "1px solid var(--border)",
            background: open === i ? "var(--card-2)" : "rgba(15,24,41,.5)",
            overflow: "hidden", transition: "background .15s",
          }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 22px", background: "transparent", border: "none", color: "var(--text)",
              cursor: "pointer", textAlign: "left", fontSize: 16, fontWeight: 600,
            }}>
              <span>{q}</span>
              <span style={{
                width: 28, height: 28, borderRadius: 8, display: "grid", placeItems: "center",
                border: "1px solid var(--border-2)", color: "var(--muted)",
              }}>{open === i ? <IconMinus size={14} sw={2} /> : <IconPlus size={14} sw={2} />}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 22px 20px", color: "var(--muted)", fontSize: 14, lineHeight: 1.65 }}>
                {a}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// =====================================================
// Final CTA
// =====================================================
function FinalCTA({ onCta }) {
  return (
    <Section pad="60px 28px 100px" maxW={1200}>
      <div style={{
        position: "relative", overflow: "hidden",
        borderRadius: 28, padding: "72px 40px",
        background: "linear-gradient(135deg, #0B1324 0%, #13203A 60%, #1A1614 100%)",
        border: "1px solid rgba(245,183,49,.25)",
        textAlign: "center",
      }}>
        {/* Decorative */}
        <div aria-hidden style={{
          position: "absolute", top: -120, right: -120, width: 360, height: 360,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,.22), transparent 65%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: -120, left: -120, width: 360, height: 360,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,.22), transparent 65%)",
        }} />

        <div style={{ position: "relative" }}>
          <Tag color="var(--amber)" border="rgba(245,183,49,.4)" bg="rgba(245,183,49,.1)" dotColor="var(--amber)">
            LIMITED · LA COUNTY
          </Tag>
          <h2 className="bebas" style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: ".02em", margin: "20px 0 14px", lineHeight: .9 }}>
            DON'T WAIT FOR A FIRE<br/>TO FIND OUT.
          </h2>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.55 }}>
            For less than dinner out — know if your family is safe, if your insurance is at risk, and if your panel is silently failing.
          </p>

          {/* Urgency card */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 14,
            padding: "14px 22px", borderRadius: 14,
            background: "rgba(245,183,49,.08)", border: "1px dashed rgba(245,183,49,.4)",
            marginBottom: 28, maxWidth: "100%", flexWrap: "wrap", justifyContent: "center",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(245,183,49,.15)", border: "1px solid rgba(245,183,49,.4)",
              color: "var(--amber)", display: "grid", placeItems: "center",
            }}><IconTag size={18} /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Your $19 is credited back</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Toward any upgrade booked within 48 hours</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryBtn onClick={onCta}>
              <span style={{ display: "inline-flex", alignItems: "baseline", gap: 10 }}>
                <span className="bebas" style={{ fontSize: 24, letterSpacing: ".06em" }}>RUN MY AUDIT</span>
                <span style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(11,19,36,.85)", color: "#F5B731", fontSize: 14, fontWeight: 800 }}>$19</span>
              </span>
            </PrimaryBtn>
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: "var(--muted)" }}>
            One-time fee · No subscriptions · Report delivered in minutes
          </div>
        </div>
      </div>
    </Section>
  );
}

// =====================================================
// Footer
// =====================================================
function Footer() {
  return (
    <footer style={{
      padding: "40px 28px", borderTop: "1px solid var(--border)",
      background: "rgba(8,14,26,.6)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 40 }} className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <IconLogo size={24} />
            <div className="bebas" style={{ fontSize: 20, letterSpacing: ".06em" }}>
              <span style={{ color: "var(--amber)" }}>PANEL</span>SURE
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, maxWidth: 320 }}>
            AI-powered electrical panel safety audits. Built in Los Angeles. Every audit reviewed against the 2020 National Electrical Code.
          </div>
        </div>
        <FooterCol title="Product" items={["How it works", "Sample report", "FAQ", "Pricing"]} />
        <FooterCol title="Company" items={["About", "Electricians", "Contact", "Press"]} />
        <FooterCol title="Legal" items={["Terms", "Privacy", "Disclaimer", "NEC license"]} />
      </div>
      <div style={{
        maxWidth: 1200, margin: "32px auto 0", paddingTop: 22, borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        fontSize: 12, color: "var(--muted-2)",
      }}>
        <div>© 2026 PanelSure Inc. · Los Angeles, CA</div>
        <div style={{ fontSize: 11, maxWidth: 640, textAlign: "right" }}>
          PanelSure is an informational diagnostic service. Always consult a licensed electrician before performing any electrical work. PanelSure does not perform electrical contracting.
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--muted)", marginBottom: 14 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(i => <a key={i} href="#" style={{ color: "var(--text)", textDecoration: "none", fontSize: 14 }}>{i}</a>)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
