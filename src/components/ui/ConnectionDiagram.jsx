import Text from "../../i18n/Text.jsx";
export default function ConnectionDiagram() {
  return (
    <figure className="connection-figure">
      <div className="connection-map">
        <svg className="connection-lines" viewBox="0 0 1000 120" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
          <path className="connection-base" d="M167 44H833" />
          <path className="connection-signal" pathLength="1" d="M167 44H833" />
        </svg>
        <Text>{['Networking', 'Infrastructure', 'Software'].map((label, index) => (
          <div className="connection-node" key={label}>
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
              <Text>{index === 0 && <><circle cx="24" cy="12" r="4" /><circle cx="12" cy="34" r="4" /><circle cx="36" cy="34" r="4" /><path d="M22 16L14 30M26 16L34 30M16 34H32" /></>}</Text>
              <Text>{index === 1 && <><rect x="12" y="10" width="24" height="12" rx="3" /><rect x="12" y="26" width="24" height="12" rx="3" /><path d="M17 16H18M17 32H18M25 16H31M25 32H31" /></>}</Text>
              <Text>{index === 2 && <><path d="M17 14L7 24L17 34M31 14L41 24L31 34M27 10L21 38" /></>}</Text>
            </svg>
            <p><Text>{label}</Text></p>
          </div>
        ))}</Text>
      </div>
      <figcaption><Text>{"A conceptual connection between systems."}</Text></figcaption>
    </figure>
  );
}
