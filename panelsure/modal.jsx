// Lead Capture Modal — 3 steps: info → appliances → photos. Premium, trustworthy.

const { useState: mUseState, useEffect: mUseEffect, useRef: mUseRef } = React;

function LeadCaptureModal({ onClose, onSubmit }) {
  const [step, setStep] = mUseState(1);
  const [form, setForm] = mUseState({
    first_name: "", last_name: "", email: "", phone: "", address: "",
    sq_ft: "", zip_code: "",
    // appliances
    dryer: false, water_heater: false, oven: true, dishwasher: true,
    ac: true, heating: false, has_ev: false, planning_solar: false,
    breakers_loose: false,
  });
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // Focus trap + esc
  mUseEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  const canNext = (() => {
    if (step === 1) return form.first_name && form.email && form.phone && form.address && form.zip_code;
    return true;
  })();

  const stepTitles = [
    { n: 1, t: "Property details", s: "So we can locate your home and size your panel" },
    { n: 2, t: "Electrical load", s: "Helps us calculate your NEC 220.82 load" },
    { n: 3, t: "Upload panel photos", s: "3 photos. Takes ~60 seconds." },
  ];

  return (
    <div role="dialog" aria-modal="true" style={{
      position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center",
      padding: 16, background: "rgba(4,8,16,.78)", backdropFilter: "blur(10px)",
      animation: "fadeIn .2s",
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 620,
        background: "linear-gradient(180deg, var(--card-2), var(--card))",
        border: "1px solid var(--border-2)", borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 60px 120px -30px rgba(0,0,0,.8), 0 0 0 1px rgba(59,130,246,.08)",
        animation: "slideUp .3s cubic-bezier(.2,.7,.2,1)",
        maxHeight: "min(900px, 92vh)", display: "flex", flexDirection: "column",
      }}>
        {/* Header — trust band */}
        <div style={{
          position: "relative", padding: "18px 22px",
          background: "rgba(8,14,26,.6)", borderBottom: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <IconLogo size={22} />
              <div className="bebas" style={{ fontSize: 18, letterSpacing: ".08em" }}>
                <span style={{ color: "var(--amber)" }}>PANEL</span>SURE AUDIT
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Tag color="var(--green)" border="rgba(34,197,94,.3)" bg="rgba(34,197,94,.08)" dotColor="var(--green)">
                256-BIT TLS
              </Tag>
              <button onClick={onClose} style={{
                background: "transparent", border: "1px solid var(--border)", color: "var(--muted)",
                width: 36, height: 36, borderRadius: 10, cursor: "pointer", display: "grid", placeItems: "center",
              }} aria-label="Close"><IconX size={18} /></button>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div style={{ padding: "18px 22px 12px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            {stepTitles.map(({ n }, i) => (
              <div key={n} style={{
                flex: 1, height: 4, borderRadius: 4,
                background: n <= step ? "linear-gradient(90deg, #F5B731, #E8920A)" : "var(--border)",
                transition: "all .3s",
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--amber)" }}>STEP {step} OF 3</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginTop: 2 }}>{stepTitles[step-1].t}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{stepTitles[step-1].s}</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>~{step === 1 ? 90 : step === 2 ? 30 : 60}s</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 22px 6px", overflowY: "auto", flex: 1 }}>
          {step === 1 && <StepInfo form={form} update={update} />}
          {step === 2 && <StepAppliances form={form} update={update} />}
          {step === 3 && <StepPhotos />}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          padding: "16px 22px", borderTop: "1px solid var(--border)",
          background: "rgba(8,14,26,.5)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 12 }}>
            <IconLock size={14} /> Your data is encrypted & never sold
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                padding: "12px 18px", borderRadius: 12, border: "1px solid var(--border-2)",
                background: "transparent", color: "var(--muted)", cursor: "pointer", fontWeight: 600, fontSize: 14,
              }}>Back</button>
            )}
            {step < 3 ? (
              <PrimaryBtn size="sm" onClick={() => canNext && setStep(s => s + 1)} style={{ opacity: canNext ? 1 : .5 }}>
                Continue <IconArrow size={16} sw={2.2} />
              </PrimaryBtn>
            ) : (
              <PrimaryBtn size="sm" onClick={() => onSubmit?.(form)}>
                Pay $19 &amp; Run Audit
              </PrimaryBtn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepInfo({ form, update }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="First name"><Input value={form.first_name} onChange={v => update("first_name", v)} placeholder="John" /></Field>
        <Field label="Last name"><Input value={form.last_name} onChange={v => update("last_name", v)} placeholder="Martinez" /></Field>
      </div>
      <Field label="Email"><Input type="email" value={form.email} onChange={v => update("email", v)} placeholder="john@email.com" /></Field>
      <Field label="Phone" hint="We only use this to send your report and a follow-up. No spam.">
        <Input type="tel" value={form.phone} onChange={v => update("phone", v)} placeholder="(310) 555-0134" />
      </Field>
      <Field label="Property address"><Input value={form.address} onChange={v => update("address", v)} placeholder="4521 Oak Valley Dr" /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Square footage" hint="Approximate">
          <Input type="number" value={form.sq_ft} onChange={v => update("sq_ft", v)} placeholder="2100" />
        </Field>
        <Field label="ZIP code">
          <Input value={form.zip_code} onChange={v => update("zip_code", v)} placeholder="90041" />
        </Field>
      </div>

      {/* Trust row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 4,
      }}>
        {[
          { i: <IconLock size={14} />, t: "256-bit TLS" },
          { i: <IconShield size={14} />, t: "SOC 2 aligned" },
          { i: <IconCheck size={14} />, t: "No spam, ever" },
        ].map((x, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
            border: "1px solid var(--border)", borderRadius: 10, background: "var(--navy-2)",
            fontSize: 12, color: "var(--muted)",
          }}>
            <span style={{ color: "var(--green)" }}>{x.i}</span> {x.t}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAppliances({ form, update }) {
  const items = [
    ["dryer", "Electric dryer", <IconPlug size={18} />],
    ["water_heater", "Electric water heater", <IconSpark size={18} />],
    ["oven", "Electric oven / range", <IconChip size={18} />],
    ["dishwasher", "Dishwasher", <IconDoc size={18} />],
    ["ac", "Central A/C", <IconBolt size={18} />],
    ["heating", "Electric heating", <IconGauge size={18} />],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{
        padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)",
        background: "rgba(59,130,246,.06)", fontSize: 13, color: "var(--muted)",
      }}>
        Tap what applies to your home. The AI uses this to run an NEC 220.82 load calculation against your panel's rated capacity.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {items.map(([k, label, icon]) => (
          <ApplianceChip key={k} active={form[k]} onClick={() => update(k, !form[k])} icon={icon} label={label} color="var(--blue)" />
        ))}
      </div>

      <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--muted)", marginTop: 6 }}>FUTURE LOAD</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <ApplianceChip active={form.has_ev} onClick={() => update("has_ev", !form.has_ev)} icon={<IconBolt size={18} />} label="Planning EV charger" color="var(--amber)" />
        <ApplianceChip active={form.planning_solar} onClick={() => update("planning_solar", !form.planning_solar)} icon={<IconSpark size={18} />} label="Planning solar install" color="var(--green)" />
      </div>

      {/* Vibration test — dramatic */}
      <div style={{
        padding: "16px 18px", borderRadius: 14,
        background: "linear-gradient(135deg, rgba(239,68,68,.08), rgba(239,68,68,.02))",
        border: "1px solid rgba(239,68,68,.35)", position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, rgba(239,68,68,.04) 0 8px, transparent 8px 16px)",
          pointerEvents: "none",
        }} />
        <div style={{ display: "flex", gap: 12, position: "relative" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.4)",
            color: "var(--red)", display: "grid", placeItems: "center",
          }}><IconAlert size={18} /></div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--red)", marginBottom: 4 }}>VIBRATION TEST</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Do any of your breakers feel loose or wobbly?</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 10 }}>
              Gently touch (don't flip) a few breaker switches. A wobble on the bus bar is one of the strongest signals of a failing Zinsco or FPE panel.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[["No, feels solid", false], ["Yes, wobbly", true]].map(([l, v], i) => (
                <button key={i} onClick={() => update("breakers_loose", v)} style={{
                  flex: 1, padding: "10px 12px", borderRadius: 10,
                  background: form.breakers_loose === v ? (v ? "rgba(239,68,68,.18)" : "rgba(34,197,94,.15)") : "var(--navy-2)",
                  color: form.breakers_loose === v ? (v ? "var(--red)" : "var(--green)") : "var(--muted)",
                  border: `1px solid ${form.breakers_loose === v ? (v ? "rgba(239,68,68,.5)" : "rgba(34,197,94,.5)") : "var(--border)"}`,
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplianceChip({ active, onClick, icon, label, color }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "12px 14px", borderRadius: 12, cursor: "pointer", textAlign: "left",
      background: active ? `${color === "var(--blue)" ? "rgba(59,130,246,.1)" : color === "var(--amber)" ? "rgba(245,183,49,.1)" : "rgba(34,197,94,.1)"}` : "var(--navy-2)",
      border: `1px solid ${active ? color : "var(--border)"}`,
      color: active ? color : "var(--text)",
      transition: "all .15s",
    }}>
      <span style={{
        width: 30, height: 30, borderRadius: 8, display: "grid", placeItems: "center",
        background: active ? `${color}20` : "transparent",
        border: `1px solid ${active ? color : "var(--border)"}`,
        color: active ? color : "var(--muted)",
      }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{label}</span>
      <span style={{
        width: 18, height: 18, borderRadius: 6, display: "grid", placeItems: "center",
        background: active ? color : "transparent", border: `1px solid ${active ? color : "var(--border-2)"}`,
        color: "#0B1324",
      }}>{active && <IconCheck size={12} sw={3} />}</span>
    </button>
  );
}

function StepPhotos() {
  const specs = [
    { n: 1, title: "Panel door closed", desc: "Show the brand label and any safety stickers", overlay: "Center the panel label", required: true, mockup: "closed" },
    { n: 2, title: "Breakers (door open)", desc: "Main breaker at top — labels visible", overlay: "Fit all breakers in frame", required: true, mockup: "open" },
    { n: 3, title: "Exterior meter", desc: "Include the amp rating label (CL200/CL320)", overlay: "Center the meter face", required: false, mockup: "meter" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{
        display: "flex", gap: 12, alignItems: "center",
        padding: "12px 14px", borderRadius: 10,
        background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.25)",
      }}>
        <IconCamera size={18} color="var(--blue-2)" />
        <div style={{ fontSize: 13, color: "var(--text)" }}>
          <b>Phone camera works fine.</b> Good lighting beats fancy gear.
        </div>
      </div>
      {specs.map(s => <PhotoUploadBox key={s.n} {...s} />)}
      <div style={{
        display: "flex", gap: 10, alignItems: "flex-start",
        padding: "12px 14px", borderRadius: 10,
        background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.25)",
        color: "var(--red)", fontSize: 12, lineHeight: 1.55,
      }}>
        <IconAlert size={16} sw={1.8} />
        <div>
          <b>Safety first.</b> Do not touch any wires or breakers. Only open the panel cover door. If the panel shows visible arcing, burn marks, or you smell ozone: close it and call 911.
        </div>
      </div>
    </div>
  );
}

function PhotoUploadBox({ n, title, desc, overlay, required, mockup }) {
  const [uploaded, setUploaded] = mUseState(false);
  return (
    <button onClick={() => setUploaded(u => !u)} style={{
      display: "grid", gridTemplateColumns: "96px 1fr auto", gap: 14, alignItems: "center",
      padding: 12, borderRadius: 14,
      background: uploaded ? "rgba(34,197,94,.06)" : "var(--navy-2)",
      border: `1px ${uploaded ? "solid" : "dashed"} ${uploaded ? "rgba(34,197,94,.5)" : "var(--border-2)"}`,
      cursor: "pointer", textAlign: "left", color: "var(--text)",
      transition: "all .15s",
    }}>
      {/* Mock preview frame */}
      <div style={{
        position: "relative", width: 96, height: 72, borderRadius: 8,
        background: "linear-gradient(135deg, #1A2336, #0F1827)",
        border: "1px solid var(--border)", overflow: "hidden",
      }}>
        <MockPanel kind={mockup} />
        {/* Viewfinder corners */}
        <span style={{ position: "absolute", top: 4, left: 4, width: 10, height: 10, borderTop: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}`, borderLeft: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}` }} />
        <span style={{ position: "absolute", top: 4, right: 4, width: 10, height: 10, borderTop: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}`, borderRight: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}` }} />
        <span style={{ position: "absolute", bottom: 4, left: 4, width: 10, height: 10, borderBottom: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}`, borderLeft: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}` }} />
        <span style={{ position: "absolute", bottom: 4, right: 4, width: 10, height: 10, borderBottom: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}`, borderRight: `1.5px solid ${uploaded ? "#22C55E" : "#F5B731"}` }} />
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: uploaded ? "var(--green)" : "var(--muted)" }}>PHOTO {n.toString().padStart(2,"0")}</span>
          {!required && <span className="mono" style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, border: "1px solid var(--border)", color: "var(--muted)", letterSpacing: ".1em" }}>OPTIONAL</span>}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: uploaded ? "var(--green)" : "var(--text)" }}>
          {uploaded ? "Uploaded ✓" : title}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{uploaded ? "Tap to remove" : desc}</div>
      </div>

      <div style={{
        width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center",
        background: uploaded ? "rgba(34,197,94,.15)" : "rgba(245,183,49,.12)",
        color: uploaded ? "var(--green)" : "var(--amber)",
        border: `1px solid ${uploaded ? "rgba(34,197,94,.45)" : "rgba(245,183,49,.35)"}`,
      }}>
        {uploaded ? <IconCheck size={18} sw={2} /> : <IconCamera size={18} />}
      </div>
    </button>
  );
}

// Tiny iconographic "panel" mockups for the upload boxes
function MockPanel({ kind }) {
  if (kind === "closed") {
    return (
      <svg viewBox="0 0 96 72" width="100%" height="100%">
        <rect x="16" y="8" width="64" height="56" rx="3" fill="#E2E8F0" stroke="#64748B" />
        <rect x="24" y="14" width="48" height="8" rx="1" fill="#F5B731" />
        <rect x="30" y="28" width="36" height="28" rx="1" fill="#94A3B8" opacity=".6"/>
      </svg>
    );
  }
  if (kind === "open") {
    return (
      <svg viewBox="0 0 96 72" width="100%" height="100%">
        <rect x="10" y="8" width="76" height="56" rx="3" fill="#0B1324" stroke="#334155" />
        <rect x="22" y="12" width="52" height="8" rx="1" fill="#475569" />
        {[0,1,2,3].map(r => (
          <g key={r}>
            {[0,1,2,3,4,5].map(c => <rect key={c} x={22 + c*9} y={24 + r*8} width="7" height="6" fill={Math.random() > .7 ? "#F5B731" : "#94A3B8"} rx="1" />)}
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 96 72" width="100%" height="100%">
      <circle cx="48" cy="36" r="22" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="48" cy="36" r="15" fill="#0B1324" />
      <text x="48" y="40" textAnchor="middle" fontSize="9" fill="#F5B731" fontFamily="monospace">CL200</text>
    </svg>
  );
}

Object.assign(window, { LeadCaptureModal });
