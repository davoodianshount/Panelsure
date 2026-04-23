import { useState } from "react";

const NAVY = "#080E1A";
const DARK = "#0B1120";
const CARD = "#111827";
const BLUE = "#3B82F6";
const AMBER = "#F5B731";
const RED = "#EF4444";
const GREEN = "#22C55E";
const ORANGE = "#F97316";
const GRAY = "#94A3B8";
const LIGHT = "#E2E8F0";
const BORDER = "#1E293B";

// ============================================================
// ICONS (inline SVG)
// ============================================================
const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 4L6 10V20C6 28.4 12 35.6 20 38C28 35.6 34 28.4 34 20V10L20 4Z" fill={BLUE} opacity="0.15"/>
    <path d="M20 4L6 10V20C6 28.4 12 35.6 20 38C28 35.6 34 28.4 34 20V10L20 4Z" stroke={BLUE} strokeWidth="2" fill="none"/>
    <path d="M15 20L18.5 23.5L26 16" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const BoltIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M22 6L10 22H20L18 34L30 18H20L22 6Z" fill={AMBER} opacity="0.2" stroke={AMBER} strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);
const ReportIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="4" width="24" height="32" rx="3" stroke={GREEN} strokeWidth="2" fill={GREEN} fillOpacity="0.1"/>
    <line x1="14" y1="14" x2="26" y2="14" stroke={GREEN} strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="20" x2="26" y2="20" stroke={GREEN} strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="26" x2="22" y2="26" stroke={GREEN} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const FireIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.5 6 4 9.5 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 9.5 15.5 6 12 2Z" fill={RED} opacity="0.2" stroke={RED} strokeWidth="1.5"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill={GREEN} opacity="0.15" stroke={GREEN} strokeWidth="1.5"/>
    <path d="M6.5 10L9 12.5L13.5 7.5" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="7" width="24" height="17" rx="3" stroke={BLUE} strokeWidth="1.5" fill="none"/>
    <circle cx="14" cy="16" r="5" stroke={BLUE} strokeWidth="1.5" fill={BLUE} fillOpacity="0.1"/>
    <path d="M9 7L10.5 3H17.5L19 7" stroke={BLUE} strokeWidth="1.5"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5L15 15M15 5L5 15" stroke={GRAY} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ============================================================
// LEAD CAPTURE MODAL (captures before report)
// ============================================================
function LeadCaptureModal({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", address: "", sq_ft: "",
    zip_code: "", hvac: "central_ac", has_ev: false, planning_solar: false,
  });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16,
      backdropFilter: "blur(8px)"
    }}>
      <div style={{
        background: CARD, borderRadius: 20, width: "100%", maxWidth: 520,
        border: `1px solid ${BORDER}`, overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px", borderBottom: `1px solid ${BORDER}`
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {step === 1 ? "About your home" : step === 2 ? "Your appliances" : "Upload panel photos"}
            </div>
            <div style={{ fontSize: 13, color: GRAY }}>Step {step} of 3</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <CloseIcon />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: BORDER }}>
          <div style={{ height: "100%", width: `${(step / 3) * 100}%`, background: BLUE, transition: "width 0.3s" }} />
        </div>

        <div style={{ padding: 24 }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input label="First name" value={form.first_name} onChange={v => update("first_name", v)} />
                <Input label="Last name" value={form.last_name} onChange={v => update("last_name", v)} />
              </div>
              <Input label="Email" type="email" value={form.email} onChange={v => update("email", v)} />
              <Input label="Phone" type="tel" value={form.phone} onChange={v => update("phone", v)} />
              <Input label="Property address" value={form.address} onChange={v => update("address", v)} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input label="Square footage" type="number" value={form.sq_ft} onChange={v => update("sq_ft", v)} placeholder="e.g. 2100" />
                <Input label="ZIP code" value={form.zip_code} onChange={v => update("zip_code", v)} placeholder="e.g. 90041" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 14, color: LIGHT, marginBottom: 4 }}>
                Select what applies to your home. This helps us calculate your electrical load.
              </div>
              {[
                ["Electric dryer", "dryer"],
                ["Electric water heater", "water_heater"],
                ["Electric oven/range", "oven"],
                ["Dishwasher", "dishwasher"],
                ["Central A/C", "ac"],
                ["Electric heating", "heating"],
              ].map(([label, key]) => (
                <label key={key} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  background: form[key] ? `${BLUE}15` : NAVY, borderRadius: 10,
                  border: `1px solid ${form[key] ? BLUE : BORDER}`, cursor: "pointer", transition: "all 0.2s"
                }}>
                  <input type="checkbox" checked={!!form[key]}
                    onChange={e => update(key, e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: BLUE }} />
                  <span style={{ color: "#fff", fontSize: 14 }}>{label}</span>
                </label>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                  background: form.has_ev ? `${AMBER}15` : NAVY, borderRadius: 10,
                  border: `1px solid ${form.has_ev ? AMBER : BORDER}`, cursor: "pointer"
                }}>
                  <input type="checkbox" checked={form.has_ev}
                    onChange={e => update("has_ev", e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: AMBER }} />
                  <span style={{ color: "#fff", fontSize: 13 }}>Planning EV charger</span>
                </label>
                <label style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                  background: form.planning_solar ? `${GREEN}15` : NAVY, borderRadius: 10,
                  border: `1px solid ${form.planning_solar ? GREEN : BORDER}`, cursor: "pointer"
                }}>
                  <input type="checkbox" checked={form.planning_solar}
                    onChange={e => update("planning_solar", e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: GREEN }} />
                  <span style={{ color: "#fff", fontSize: 13 }}>Planning solar</span>
                </label>
              </div>

              {/* Vibration test - Gemini's suggestion */}
              <div style={{
                marginTop: 8, padding: "14px 16px", background: `${RED}08`,
                borderRadius: 10, border: `1px solid ${RED}20`
              }}>
                <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!form.breakers_loose}
                    onChange={e => update("breakers_loose", e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: RED }} />
                  <div>
                    <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Do your breakers feel loose or wobbly?</div>
                    <div style={{ color: GRAY, fontSize: 11, marginTop: 2 }}>
                      Gently touch a few breaker switches. If they wobble or feel loose on the bar, check this box.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <PhotoUploadBox
                title="1. Panel door closed"
                desc="Show the brand label and any safety stickers"
                overlay="Center the panel label here"
              />
              <PhotoUploadBox
                title="2. Breakers visible (door open)"
                desc="Main breaker at top — make sure labels are readable"
                overlay="Center the main breaker here"
              />
              <PhotoUploadBox
                title="3. Exterior meter (optional)"
                desc="Include the meter face and amp rating label"
                overlay="Center the meter face here"
                optional
              />
              <div style={{
                padding: "12px 16px", background: `${RED}10`, borderRadius: 8,
                border: `1px solid ${RED}30`, fontSize: 12, color: RED
              }}>
                Safety note: Do not touch any wires or breakers. Only open the panel cover door.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", padding: "16px 24px",
          borderTop: `1px solid ${BORDER}`
        }}>
          {step > 1 ? (
            <button onClick={() => setStep(s => s - 1)} style={{
              background: "transparent", color: GRAY, border: `1px solid ${BORDER}`,
              padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontSize: 14
            }}>Back</button>
          ) : <div />}
          <button onClick={() => step < 3 ? setStep(s => s + 1) : onSubmit?.(form)} style={{
            background: step === 3 ? GREEN : BLUE, color: "#fff", border: "none",
            padding: "10px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: `0 4px 16px ${step === 3 ? GREEN : BLUE}40`
          }}>
            {step === 3 ? "Submit & Pay $19 →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label style={{ fontSize: 12, color: GRAY, display: "block", marginBottom: 4 }}>{label}</label>
      <input type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${BORDER}`,
          background: NAVY, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box"
        }}
        onFocus={e => e.target.style.borderColor = BLUE}
        onBlur={e => e.target.style.borderColor = BORDER}
      />
    </div>
  );
}

function PhotoUploadBox({ title, desc, overlay, optional = false }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div
      onClick={() => setUploaded(!uploaded)}
      style={{
        border: `2px dashed ${uploaded ? GREEN : BORDER}`, borderRadius: 12,
        padding: "20px 16px", textAlign: "center", cursor: "pointer",
        background: uploaded ? `${GREEN}08` : "transparent", transition: "all 0.2s",
        position: "relative"
      }}
    >
      {optional && (
        <span style={{
          position: "absolute", top: 8, right: 12, fontSize: 10, color: GRAY,
          background: NAVY, padding: "2px 8px", borderRadius: 4
        }}>Optional</span>
      )}
      <div style={{ marginBottom: 8 }}>
        {uploaded ? <CheckIcon /> : <CameraIcon />}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: uploaded ? GREEN : "#fff", marginBottom: 4 }}>
        {uploaded ? "Photo uploaded" : title}
      </div>
      <div style={{ fontSize: 12, color: GRAY }}>{desc}</div>
      {!uploaded && (
        <div style={{
          marginTop: 10, padding: "6px 12px", background: `${BLUE}15`, borderRadius: 6,
          fontSize: 11, color: BLUE, display: "inline-block"
        }}>
          Tip: {overlay}
        </div>
      )}
    </div>
  );
}

// ============================================================
// GRADE DEMO (interactive)
// ============================================================
function GradeDemo() {
  const [step, setStep] = useState(0);
  const grades = [
    { letter: "A", label: "Excellent", color: GREEN, pct: 95, brand: "Square D QO", desc: "Modern panel, properly maintained, all AFCI/GFCI compliant." },
    { letter: "C", label: "Fair", color: AMBER, pct: 62, brand: "Murray / Crouse-Hinds", desc: "Aging panel with limited capacity. May need attention within 2-3 years." },
    { letter: "F", label: "Failing", color: RED, pct: 12, brand: "Zinsco / Sylvania", desc: "Documented fire hazard. Breakers fail to trip during overcurrent. Immediate replacement recommended." },
  ];
  const g = grades[step];
  return (
    <div style={{ background: CARD, borderRadius: 16, padding: "32px 28px", border: `1px solid ${g.color}33` }}>
      {step === 2 && (
        <div style={{
          background: RED, borderRadius: 8, padding: "10px 16px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 10
        }}>
          <span style={{ fontSize: 18 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L1 18H19L10 2Z" fill="none" stroke="#fff" strokeWidth="1.5"/><line x1="10" y1="8" x2="10" y2="12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="15" r="1" fill="#fff"/></svg>
          </span>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
            THIS PANEL TYPE HAS BEEN LINKED TO ELECTRICAL FIRES
          </span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{
          width: 90, height: 90, borderRadius: "50%", border: `3px solid ${g.color}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
          background: `${g.color}10`, transition: "all 0.3s"
        }}>
          <span style={{ fontSize: 38, fontWeight: 800, color: g.color, lineHeight: 1 }}>{g.letter}</span>
          <span style={{ fontSize: 11, color: g.color, fontWeight: 600, letterSpacing: 1 }}>{g.label.toUpperCase()}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: GRAY, marginBottom: 4 }}>Panel detected</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{g.brand}</div>
          <div style={{ background: BORDER, borderRadius: 6, height: 10, overflow: "hidden" }}>
            <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 6, transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 12, color: GRAY, marginTop: 4 }}>Safety score: {g.pct}/100</div>
        </div>
      </div>
      <p style={{ color: LIGHT, fontSize: 14, lineHeight: 1.6, margin: "16px 0 0", opacity: 0.85 }}>{g.desc}</p>
      {step === 2 && (
        <div style={{
          display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap"
        }}>
          <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: `${ORANGE}20`, color: ORANGE, fontWeight: 600 }}>
            Insurance Risk
          </span>
          <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: `${AMBER}20`, color: AMBER, fontWeight: 600 }}>
            Home Sale Blocker
          </span>
          <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: `${RED}20`, color: RED, fontWeight: 600 }}>
            Lifespan: 0-2 years
          </span>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {grades.map((gr, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${i === step ? gr.color : BORDER}`,
            background: i === step ? `${gr.color}15` : "transparent", color: i === step ? gr.color : GRAY,
            cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s"
          }}>
            Grade {gr.letter}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HAZARD BRAND ROW
// ============================================================
function HazardBrand({ name, risk, desc }) {
  const color = risk === "CRITICAL" ? RED : risk === "HIGH" ? ORANGE : AMBER;
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 0", borderBottom: `1px solid ${BORDER}` }}>
      <FireIcon />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{name}</span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 20, background: `${color}20`, color, letterSpacing: 0.5 }}>{risk}</span>
        </div>
        <p style={{ color: GRAY, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

// ============================================================
// STEP CARD
// ============================================================
function StepCard({ num, icon, title, desc }) {
  return (
    <div style={{
      background: CARD, borderRadius: 14, padding: "28px 24px",
      border: `1px solid ${BORDER}`, position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: 12, right: 16, fontSize: 48, fontWeight: 800, color: BLUE, opacity: 0.08, lineHeight: 1 }}>{num}</div>
      <div style={{ marginBottom: 16 }}>{icon}</div>
      <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ color: GRAY, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ============================================================
// MAIN LANDING PAGE
// ============================================================
export default function PanelSureLanding() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ background: NAVY, color: "#fff", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", minHeight: "100vh" }}>
      {showModal && <LeadCaptureModal onClose={() => setShowModal(false)} onSubmit={(data) => { console.log("Lead captured:", data); setShowModal(false); }} />}

      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", borderBottom: `1px solid ${BORDER}`, position: "sticky",
        top: 0, background: `${NAVY}ee`, backdropFilter: "blur(12px)", zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L4 7V14C4 20.6 8.4 26.4 14 28C19.6 26.4 24 20.6 24 14V7L14 2Z" fill={BLUE} opacity="0.9"/>
            <path d="M10 14L13 17L19 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>
            <span style={{ color: AMBER }}>PANEL</span><span style={{ color: "#fff" }}>SURE</span>
          </span>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          background: BLUE, color: "#fff", border: "none", padding: "10px 24px",
          borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer"
        }}>
          Get Your Audit — $19
        </button>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 32px 60px", textAlign: "center", maxWidth: 720, margin: "0 auto", position: "relative" }}>
        <div style={{
          position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}12 0%, transparent 70%)`, pointerEvents: "none"
        }} />
        <div style={{
          display: "inline-block", padding: "6px 18px", borderRadius: 20,
          background: `${RED}15`, color: RED, fontSize: 13, fontWeight: 600,
          marginBottom: 20, border: `1px solid ${RED}30`
        }}>
          25,000+ house fires per year are caused by electrical failures
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: -1 }}>
          Is your electrical panel<br/><span style={{ color: AMBER }}>a fire risk?</span>
        </h1>
        <p style={{ fontSize: 18, color: GRAY, lineHeight: 1.6, margin: "0 0 32px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Upload a photo. Our AI identifies hazardous panels, calculates your electrical load per NEC standards, and delivers a professional safety report — all for $19.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setShowModal(true)} style={{
            background: BLUE, color: "#fff", border: "none", padding: "14px 36px",
            borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer",
            boxShadow: `0 4px 24px ${BLUE}40`
          }}>
            Start Your Safety Audit →
          </button>
          <button style={{
            background: "transparent", color: LIGHT, border: `1px solid #334155`,
            padding: "14px 28px", borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: "pointer"
          }}>
            See a sample report
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, fontSize: 13, color: GRAY }}>
          <span>NEC 2020 compliant</span>
          <span>AI-powered analysis</span>
          <span>Results in minutes</span>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>How it works</h2>
        <p style={{ textAlign: "center", color: GRAY, fontSize: 15, marginBottom: 36 }}>Three steps. No electrician visit required.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <StepCard num="01" icon={<BoltIcon />} title="Tell us about your home" desc="Enter your square footage, major appliances, and ZIP code. Takes about 90 seconds." />
          <StepCard num="02" icon={<ShieldIcon />} title="Upload panel photos" desc="Snap 2-3 photos: panel with door closed (brand label), door open (breakers), and your meter." />
          <StepCard num="03" icon={<ReportIcon />} title="Get your safety report" desc="AI identifies your panel brand, detects hazards, and runs a full NEC 220.82 load calculation." />
        </div>
      </section>

      {/* Interactive Grade Demo */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>Your panel gets a safety grade</h2>
        <p style={{ textAlign: "center", color: GRAY, fontSize: 15, marginBottom: 36 }}>
          Our AI scores your panel A through F based on brand, age, capacity, and visible hazards.
        </p>
        <GradeDemo />
      </section>

      {/* Hazard Brands */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Panels our AI flags automatically</h2>
        <p style={{ color: GRAY, fontSize: 15, marginBottom: 24 }}>These brands have documented safety issues. If your panel is one of them, you need to know.</p>
        <div style={{ background: CARD, borderRadius: 14, padding: "8px 24px", border: `1px solid ${BORDER}` }}>
          <HazardBrand name="Zinsco / Sylvania" risk="CRITICAL" desc="Breakers melt to the bus bar and fail to trip during overcurrent. Documented cause of house fires nationwide." />
          <HazardBrand name="Federal Pacific (FPE Stab-Lok)" risk="CRITICAL" desc="Independent testing shows up to 60% breaker failure rate. No longer UL-listed. Associated with 2,800+ fires." />
          <HazardBrand name="Pushmatic (ITE)" risk="HIGH" desc="Push-button breakers are obsolete. Replacement parts are scarce and may not meet current code." />
          <HazardBrand name="Challenger" risk="MODERATE" desc="Select models were recalled for defective breaker connections. Requires inspection to verify model number." />
        </div>
      </section>

      {/* What's In The Report */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What you get for $19</h2>
            <p style={{ color: GRAY, fontSize: 15, marginBottom: 24 }}>A professional-grade PDF report that would cost $250+ from an on-site electrician.</p>
            {[
              "Safety grade (A through F) with risk score",
              "Panel brand identification and fire hazard flags",
              "NEC 220.82 load calculation with full breakdown",
              "Insurance risk and home sale impact assessment",
              "Upgrade cost estimate with price anchoring",
              "Custom electrician call script",
              "Panel lifespan estimate",
              "Solar and EV readiness assessment",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                <CheckIcon /><span style={{ color: LIGHT, fontSize: 14 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{
            background: CARD, borderRadius: 14, padding: "28px 24px",
            border: `1px solid ${BLUE}30`, position: "relative"
          }}>
            <div style={{ position: "absolute", top: -12, right: 20, background: AMBER, color: NAVY, padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>SAMPLE</div>
            <div style={{ fontSize: 12, color: GRAY, marginBottom: 4 }}>PANELSURE SAFETY REPORT</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>4521 Oak Valley Dr</div>

            {/* Fire warning preview */}
            <div style={{
              background: RED, borderRadius: 6, padding: "8px 12px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 8
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L0.5 14.5H15.5L8 1Z" fill="none" stroke="#fff" strokeWidth="1.2"/><line x1="8" y1="6" x2="8" y2="9.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="12" r="0.8" fill="#fff"/></svg>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>FIRE HAZARD — LINKED TO ELECTRICAL FIRES</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", border: `3px solid ${RED}`,
                display: "flex", alignItems: "center", justifyContent: "center", background: `${RED}10`, flexDirection: "column"
              }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: RED, lineHeight: 1 }}>F</span>
                <span style={{ fontSize: 7, color: RED, fontWeight: 700 }}>FAILING</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Zinsco Panel Detected</div>
                <div style={{ fontSize: 11, color: GRAY }}>42 yrs old · 100A · 107.5A load</div>
                <div style={{ fontSize: 11, color: RED, fontWeight: 600, marginTop: 2 }}>Panel at 108% capacity</div>
              </div>
            </div>

            {/* Risk badges */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: `${ORANGE}20`, color: ORANGE, fontWeight: 600 }}>Insurance Risk</span>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: `${AMBER}20`, color: AMBER, fontWeight: 600 }}>Home Sale Blocker</span>
            </div>

            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
              <div style={{ fontSize: 11, color: GRAY, marginBottom: 6 }}>ESTIMATED REPLACEMENT</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>$2,900 — $3,900</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginTop: 2 }}>Most homeowners pay: $3,400</div>
              <div style={{ fontSize: 11, color: GRAY, marginTop: 2 }}>200A panel · 24 circuits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
          {[
            { num: "$19", label: "vs. $250+ electrician visit" },
            { num: "<5 min", label: "Upload to report delivery" },
            { num: "NEC 2020", label: "Code-compliant calculations" },
          ].map((s, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 14, padding: "28px 16px", border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: AMBER }}>{s.num}</div>
              <div style={{ fontSize: 13, color: GRAY, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Local Proof */}
        <div style={{
          marginTop: 24, padding: "20px 24px", background: CARD, borderRadius: 14,
          border: `1px solid ${BORDER}`, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", background: `${GREEN}15`,
              border: `1.5px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2L4 6V12C4 17 7.2 20.4 11 22C14.8 20.4 18 17 18 12V6L11 2Z" fill={GREEN} opacity="0.3"/>
                <path d="M8 11L10.5 13.5L15 8.5" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Trusted across Los Angeles</div>
              <div style={{ fontSize: 13, color: GRAY }}>200+ panel audits completed in LA County</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["LADWP", "SCE", "NEC 2020"].map((tag, i) => (
              <span key={i} style={{
                fontSize: 11, padding: "4px 10px", borderRadius: 6,
                background: `${BLUE}10`, color: BLUE, fontWeight: 600, border: `1px solid ${BLUE}20`
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          background: `linear-gradient(135deg, ${DARK} 0%, ${CARD} 100%)`,
          borderRadius: 20, padding: "48px 32px",
          border: `1px solid ${BLUE}30`, position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60, width: 200, height: 200,
            borderRadius: "50%", background: `${BLUE}08`
          }} />
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Don't wait for a fire to find out</h2>
          <p style={{ color: GRAY, fontSize: 16, marginBottom: 28, maxWidth: 460, margin: "0 auto 28px" }}>
            For less than a dinner out, know if your family is safe. Get your AI-powered electrical safety audit now.
          </p>

          {/* Urgency badge */}
          <div style={{
            display: "inline-block", padding: "8px 20px", borderRadius: 10,
            background: `${AMBER}15`, border: `1px solid ${AMBER}40`,
            fontSize: 13, fontWeight: 700, color: AMBER, marginBottom: 20
          }}>
            Your $19 audit fee is credited toward any upgrade booked within 48 hours
          </div>

          <div>
            <button onClick={() => setShowModal(true)} style={{
            background: BLUE, color: "#fff", border: "none", padding: "16px 48px",
            borderRadius: 14, fontWeight: 700, fontSize: 17, cursor: "pointer",
            boxShadow: `0 4px 32px ${BLUE}50`
          }}>
            Get Your Safety Audit — $19
          </button>
          </div>
          <p style={{ fontSize: 12, color: GRAY, marginTop: 16 }}>No subscriptions. One-time fee. Report delivered instantly.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 32, textAlign: "center", borderTop: `1px solid ${BORDER}`, fontSize: 13, color: GRAY }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: AMBER }}>PANEL</span>
          <span style={{ fontWeight: 700 }}>SURE</span>
          <span style={{ margin: "0 12px", opacity: 0.3 }}>|</span>
          AI-Powered Electrical Safety Audits
        </div>
        <p style={{ margin: 0, fontSize: 11, opacity: 0.6 }}>
          This service is for informational purposes only. Always consult a licensed electrician before performing any electrical work.
          PanelSure does not perform electrical work or provide licensed electrical contracting services.
        </p>
      </footer>
    </div>
  );
}
