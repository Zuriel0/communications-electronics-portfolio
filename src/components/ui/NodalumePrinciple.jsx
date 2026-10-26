// Illustrations of interaction principles, not product screenshots or runtime flows.
export default function NodalumePrinciple({ kind }) {
  return <svg className={`nodalume-principle nodalume-principle--${kind}`} viewBox="0 0 240 160" fill="none" aria-hidden="true" focusable="false">
    {kind==='composition' && <>
      <rect className="dna-outline" x="18" y="18" width="196" height="122" rx="8"/>
      <path className="dna-guide" d="M32 54h168M32 116h168M122 68v34"/>
      <rect className="dna-form dna-form--first" x="32" y="68" width="74" height="34" rx="4"/>
      <rect className="dna-form dna-form--second" x="138" y="68" width="62" height="34" rx="4"/>
      <path className="dna-link" d="M48 36h80m-80 87h106"/>
    </>}
    {kind==='context' && <>
      <path className="dna-guide" d="M72 10v140M8 80h224"/>
      <rect className="dna-outline" x="24" y="30" width="100" height="100" rx="6"/>
      <rect className="dna-form" x="44" y="54" width="60" height="52" rx="4"/>
      <path className="dna-link" d="M124 80h30m0-32v64m0-64h52m-52 32h38m-38 32h46"/>
      <circle className="dna-focus" cx="124" cy="80" r="4"/>
    </>}
    {kind==='logic' && <>
      <rect className="dna-outline" x="12" y="58" width="46" height="44" rx="6"/>
      <path className="dna-form" d="m108 52 28 28-28 28-28-28Z"/>
      <path className="dna-link" d="M58 80h22m56 0h18V34h28m-28 46v46h28"/>
      <rect className="dna-outline" x="182" y="16" width="44" height="36" rx="6"/>
      <rect className="dna-outline" x="182" y="108" width="44" height="36" rx="6"/>
    </>}
    {kind==='request' && <>
      <path className="dna-guide" d="M14 36h48m-48 12h30m144 64h40m-40 12h26"/>
      <path className="dna-link" d="M14 80h62m88 0h62m-158-6 8 6-8 6m150-12 8 6-8 6"/>
      <rect className="dna-outline" x="76" y="44" width="88" height="72" rx="8"/>
      <path className="dna-form" d="m108 65-12 15 12 15m24-30 12 15-12 15"/>
    </>}
  </svg>;
}
