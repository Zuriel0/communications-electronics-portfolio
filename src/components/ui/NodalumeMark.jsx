// Conceptual service layers, not a product screenshot or network topology.
export default function NodalumeMark() {
  return <svg className="nodalume-mark" viewBox="0 0 460 420" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="1.2">
      <path d="M40 210 230 100 420 210 230 320Z" opacity=".25" />
      <path d="M40 260 230 150 420 260 230 370Z" opacity=".4" />
      <path d="M40 160 230 50 420 160 230 270Z" opacity=".7" />
      <path d="M40 160v100m190 10v100m190-210v100M230 50v50" strokeDasharray="4 7" opacity=".6" />
      <path d="m135 160 95-55 95 55-95 55Zm0 100 95-55 95 55-95 55Z" />
      <path d="M135 160v100m190-100v100m-95-45v100" opacity=".5" />
    </g>
    <g fill="currentColor"><circle cx="135" cy="160" r="5"/><circle cx="325" cy="160" r="5"/><circle cx="230" cy="315" r="5"/><circle cx="230" cy="105" r="5"/></g>
  </svg>;
}
