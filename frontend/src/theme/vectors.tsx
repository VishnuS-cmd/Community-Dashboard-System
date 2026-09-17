import { themeConfig } from './theme.config';

type VectorProps = {
  className?: string;
};

export function DomainVector({ className = '' }: VectorProps) {
  const vector = themeConfig.vectorFamily || themeConfig.vector;
  if (vector === 'library') return <LibraryVector className={className} />;
  if (vector === 'hospital') return <HospitalVector className={className} />;
  if (vector === 'school') return <SchoolVector className={className} />;
  if (vector === 'education') return <SchoolVector className={className} />;
  if (vector === 'healthcare') return <HospitalVector className={className} />;
  if (vector === 'inventory') return <InventoryVector className={className} />;
  if (vector === 'hr') return <EmployeeVector className={className} />;
  if (vector === 'employee') return <EmployeeVector className={className} />;
  if (vector === 'finance') return <FinanceVector className={className} />;
  if (vector === 'booking') return <BookingVector className={className} />;
  if (vector === 'crm') return <CrmVector className={className} />;
  if (vector === 'project') return <ProjectVector className={className} />;
  if (vector === 'retail') return <RetailVector className={className} />;
  if (vector === 'property') return <PropertyVector className={className} />;
  if (vector === 'transport') return <TransportVector className={className} />;
  if (vector === 'community') return <CommunityVector className={className} />;
  if (vector === 'government') return <GovernmentVector className={className} />;
  if (vector === 'ai') return <AiVector className={className} />;
  if (vector === 'agriculture') return <AgricultureVector className={className} />;
  if (vector === 'manufacturing') return <ManufacturingVector className={className} />;
  if (vector === 'hospitality') return <HospitalityVector className={className} />;
  if (vector === 'security') return <SecurityVector className={className} />;
  return <ManagementVector className={className} />;
}

function Shell({ className, children }: React.PropsWithChildren<VectorProps>) {
  return (
    <svg className={className} viewBox="0 0 420 260" fill="none" role="img" aria-label="Project theme illustration">
      <rect width="420" height="260" rx="22" fill="var(--theme-muted)" />
      <circle cx="342" cy="54" r="36" fill="var(--theme-accent)" opacity="0.14" />
      <circle cx="72" cy="214" r="46" fill="var(--theme-primary)" opacity="0.10" />
      {children}
    </svg>
  );
}

function LibraryVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="90" y="66" width="230" height="122" rx="12" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="118" y="92" width="36" height="74" rx="5" fill="var(--theme-primary)" />
      <rect x="166" y="82" width="36" height="84" rx="5" fill="var(--theme-accent)" />
      <rect x="214" y="100" width="36" height="66" rx="5" fill="#f59e0b" />
      <path d="M278 90v78" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
      <path d="M110 188h220" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
    </Shell>
  );
}

function HospitalVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="116" y="58" width="188" height="150" rx="18" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M210 88v88M166 132h88" stroke="var(--theme-accent)" strokeWidth="18" strokeLinecap="round" />
      <rect x="90" y="174" width="240" height="34" rx="10" fill="var(--theme-primary)" opacity="0.15" />
      <circle cx="128" cy="192" r="10" fill="var(--theme-primary)" />
      <circle cx="292" cy="192" r="10" fill="var(--theme-primary)" />
    </Shell>
  );
}

function SchoolVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="84" y="70" width="252" height="118" rx="14" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="110" y="96" width="200" height="58" rx="8" fill="var(--theme-primary)" opacity="0.12" />
      <path d="M134 126h84M134 146h128" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="282" cy="126" r="22" fill="var(--theme-accent)" opacity="0.85" />
      <path d="M92 198h236" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
    </Shell>
  );
}

function InventoryVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="90" y="74" width="72" height="72" rx="10" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="174" y="74" width="72" height="72" rx="10" fill="white" stroke="var(--theme-accent)" strokeWidth="4" />
      <rect x="258" y="74" width="72" height="72" rx="10" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="132" y="156" width="72" height="62" rx="10" fill="white" stroke="var(--theme-accent)" strokeWidth="4" />
      <rect x="216" y="156" width="72" height="62" rx="10" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M104 106h44M188 106h44M272 106h44" stroke="var(--theme-primary)" strokeWidth="6" strokeLinecap="round" />
    </Shell>
  );
}

function EmployeeVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="118" y="56" width="184" height="148" rx="18" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <circle cx="210" cy="106" r="28" fill="var(--theme-accent)" opacity="0.85" />
      <path d="M158 170c20-30 84-30 104 0" stroke="var(--theme-primary)" strokeWidth="12" strokeLinecap="round" />
      <path d="M152 76h116M152 196h116" stroke="var(--theme-primary)" strokeWidth="7" strokeLinecap="round" opacity="0.25" />
    </Shell>
  );
}

function ManagementVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="94" y="70" width="232" height="130" rx="16" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="122" y="102" width="54" height="62" rx="8" fill="var(--theme-primary)" opacity="0.88" />
      <rect x="188" y="88" width="54" height="76" rx="8" fill="var(--theme-accent)" opacity="0.88" />
      <rect x="254" y="118" width="54" height="46" rx="8" fill="#f59e0b" opacity="0.88" />
      <path d="M122 184h186" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
    </Shell>
  );
}

function FinanceVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="96" y="66" width="228" height="134" rx="16" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M134 112h152M134 144h108M134 176h152" stroke="var(--theme-primary)" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
      <circle cx="286" cy="104" r="26" fill="var(--theme-accent)" />
      <path d="M286 88v32M274 104h24" stroke="white" strokeWidth="7" strokeLinecap="round" />
    </Shell>
  );
}

function BookingVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="92" y="72" width="236" height="132" rx="18" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M92 112h236" stroke="var(--theme-primary)" strokeWidth="8" />
      <rect x="126" y="136" width="42" height="34" rx="8" fill="var(--theme-accent)" />
      <rect x="190" y="136" width="42" height="34" rx="8" fill="var(--theme-primary)" opacity="0.82" />
      <rect x="254" y="136" width="42" height="34" rx="8" fill="var(--theme-muted)" stroke="var(--theme-primary)" strokeWidth="3" />
    </Shell>
  );
}

function CrmVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <path d="M104 82h212l-74 74v48l-64 22v-70z" fill="white" stroke="var(--theme-primary)" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="130" cy="104" r="10" fill="var(--theme-accent)" />
      <circle cx="186" cy="126" r="10" fill="var(--theme-primary)" />
      <circle cx="246" cy="104" r="10" fill="var(--theme-accent)" />
      <path d="M130 104l56 22 60-22" stroke="var(--theme-primary)" strokeWidth="5" strokeLinecap="round" />
    </Shell>
  );
}

function ProjectVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="84" y="70" width="252" height="132" rx="16" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="110" y="100" width="58" height="72" rx="10" fill="var(--theme-muted)" stroke="var(--theme-primary)" strokeWidth="3" />
      <rect x="182" y="92" width="58" height="88" rx="10" fill="var(--theme-primary)" opacity="0.82" />
      <rect x="254" y="112" width="58" height="52" rx="10" fill="var(--theme-accent)" />
    </Shell>
  );
}

function RetailVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <path d="M102 110h216l-18-40H120z" fill="white" stroke="var(--theme-primary)" strokeWidth="5" strokeLinejoin="round" />
      <rect x="118" y="110" width="184" height="88" rx="12" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M144 138h78M144 164h118" stroke="var(--theme-primary)" strokeWidth="7" strokeLinecap="round" />
      <circle cx="270" cy="154" r="22" fill="var(--theme-accent)" />
    </Shell>
  );
}

function PropertyVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="118" y="78" width="78" height="122" rx="8" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="212" y="58" width="90" height="142" rx="8" fill="white" stroke="var(--theme-accent)" strokeWidth="4" />
      <path d="M142 112h28M142 142h28M236 96h42M236 126h42M236 156h42" stroke="var(--theme-primary)" strokeWidth="6" strokeLinecap="round" />
    </Shell>
  );
}

function TransportVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <path d="M92 166c56-70 176 50 236-34" stroke="var(--theme-primary)" strokeWidth="9" strokeLinecap="round" strokeDasharray="12 14" />
      <rect x="116" y="84" width="92" height="58" rx="12" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <rect x="226" y="108" width="72" height="48" rx="10" fill="var(--theme-accent)" />
      <circle cx="142" cy="154" r="12" fill="var(--theme-primary)" />
      <circle cx="274" cy="166" r="12" fill="var(--theme-primary)" />
    </Shell>
  );
}

function CommunityVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <circle cx="158" cy="108" r="30" fill="var(--theme-primary)" opacity="0.85" />
      <circle cx="240" cy="108" r="30" fill="var(--theme-accent)" opacity="0.85" />
      <path d="M112 184c18-44 74-44 92 0M216 184c18-44 74-44 92 0" stroke="var(--theme-primary)" strokeWidth="12" strokeLinecap="round" />
      <path d="M210 84v54M184 112h52" stroke="white" strokeWidth="7" strokeLinecap="round" />
    </Shell>
  );
}

function GovernmentVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <path d="M210 56l122 48H88z" fill="white" stroke="var(--theme-primary)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M120 112v76M170 112v76M220 112v76M270 112v76M100 192h220" stroke="var(--theme-primary)" strokeWidth="9" strokeLinecap="round" />
      <circle cx="210" cy="94" r="14" fill="var(--theme-accent)" />
    </Shell>
  );
}

function AiVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="132" y="70" width="156" height="130" rx="26" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <circle cx="174" cy="122" r="12" fill="var(--theme-accent)" />
      <circle cx="246" cy="122" r="12" fill="var(--theme-primary)" />
      <path d="M174 122h72M174 122l36 44M246 122l-36 44" stroke="var(--theme-primary)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="210" cy="166" r="12" fill="var(--theme-accent)" />
    </Shell>
  );
}

function AgricultureVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <path d="M92 190c50-42 186-42 236 0" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
      <path d="M118 164c42-28 142-28 184 0M146 138c34-18 94-18 128 0" stroke="var(--theme-accent)" strokeWidth="8" strokeLinecap="round" />
      <path d="M210 138c0-42 28-66 70-70-2 42-28 66-70 70z" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
    </Shell>
  );
}

function ManufacturingVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="96" y="122" width="228" height="76" rx="12" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M118 122V82l48 28V82l52 32V92h80v30" fill="white" stroke="var(--theme-primary)" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="150" cy="160" r="14" fill="var(--theme-accent)" />
      <circle cx="210" cy="160" r="14" fill="var(--theme-primary)" />
      <circle cx="270" cy="160" r="14" fill="var(--theme-accent)" />
    </Shell>
  );
}

function HospitalityVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <rect x="110" y="74" width="200" height="126" rx="18" fill="white" stroke="var(--theme-primary)" strokeWidth="4" />
      <path d="M142 122h136M142 156h136" stroke="var(--theme-primary)" strokeWidth="8" strokeLinecap="round" />
      <path d="M154 92c12 18 32 18 44 0M222 92c12 18 32 18 44 0" stroke="var(--theme-accent)" strokeWidth="7" strokeLinecap="round" />
    </Shell>
  );
}

function SecurityVector({ className }: VectorProps) {
  return (
    <Shell className={className}>
      <path d="M210 58l96 34v66c0 48-38 78-96 100-58-22-96-52-96-100V92z" fill="white" stroke="var(--theme-primary)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M174 142l26 26 54-62" stroke="var(--theme-accent)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </Shell>
  );
}
