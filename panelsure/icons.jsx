// Icons — minimal, technical, no emoji.
const Icon = ({ children, size = 24, stroke = "currentColor", fill = "none", sw = 1.6, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);

const IconShield = (p) => <Icon {...p}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9.5C7.5 20.5 4 17 4 12V6l8-3z"/><path d="M9 12l2.2 2.2L15 10.5"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/></Icon>;
const IconCamera = (p) => <Icon {...p}><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></Icon>;
const IconDoc = (p) => <Icon {...p}><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M10 12h7M10 16h7M10 8h2"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="M5 12l4 4 10-10"/></Icon>;
const IconX = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>;
const IconArrow = (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>;
const IconFlame = (p) => <Icon {...p}><path d="M12 3c1 4 4 5 4 9a4 4 0 01-8 0c0-2 1-3 2-4-1 3 1 4 1 4s-1-3 1-5 0-4 0-4z"/></Icon>;
const IconAlert = (p) => <Icon {...p}><path d="M12 3L2 20h20L12 3z"/><path d="M12 10v5"/><circle cx="12" cy="17.5" r=".6" fill="currentColor"/></Icon>;
const IconLock = (p) => <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconGauge = (p) => <Icon {...p}><path d="M4 14a8 8 0 0116 0"/><path d="M12 14l4-4"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/></Icon>;
const IconHouse = (p) => <Icon {...p}><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/></Icon>;
const IconStar = (p) => <Icon {...p} fill="currentColor" stroke="none"><path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17l-5.9 3 1.3-6.5L2.5 8.9l6.6-.8z"/></Icon>;
const IconChip = (p) => <Icon {...p}><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></Icon>;
const IconPlug = (p) => <Icon {...p}><path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 01-12 0z"/><path d="M12 17v4"/></Icon>;
const IconMinus = (p) => <Icon {...p}><path d="M5 12h14"/></Icon>;
const IconPlus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconInsurance = (p) => <Icon {...p}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9.5C7.5 20.5 4 17 4 12V6l8-3z"/><path d="M12 8v4M12 15.5v.5"/></Icon>;
const IconTag = (p) => <Icon {...p}><path d="M3 12V3h9l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/></Icon>;
const IconPhone = (p) => <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></Icon>;
const IconSpark = (p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></Icon>;
const IconFile = (p) => <Icon {...p}><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/></Icon>;
const IconLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 2L4 7v9c0 7 5 12 12 14 7-2 12-7 12-14V7L16 2z" fill="url(#psg)" />
    <path d="M17 8l-6 10h4l-1 6 6-10h-4l1-6z" fill="#0B1324"/>
    <defs>
      <linearGradient id="psg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F5B731"/>
        <stop offset="1" stopColor="#E8920A"/>
      </linearGradient>
    </defs>
  </svg>
);

Object.assign(window, {
  Icon, IconShield, IconBolt, IconCamera, IconDoc, IconCheck, IconX, IconArrow,
  IconFlame, IconAlert, IconLock, IconClock, IconGauge, IconHouse, IconStar,
  IconChip, IconPlug, IconMinus, IconPlus, IconInsurance, IconTag, IconPhone,
  IconSpark, IconFile, IconLogo,
});
