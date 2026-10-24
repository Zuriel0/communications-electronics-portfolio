import Text from "../../i18n/Text.jsx";
// Four connected planes: a conceptual transfer of signals, not a real topology.
const terminals = [[88, 88], [412, 88], [412, 412], [88, 412]];
const routes = [
  'M88 88H178L250 160V250L322 322H412V412',
  'M88 412V322H178L250 250H322L412 160V88',
  'M88 250H178L250 178H322L412 88',
  'M250 412V322L322 250H412',
];

export default function ConnectionSculpture() {
  return (
    <div className="hero-sculpture" aria-hidden="true">
      <div className="sculpture-light" />
      <div className="sculpture-transport">
        <div className="sculpture-pointer">
          <div className="sculpture-orbit">
            <div className="sculpture-rig">
              <Text>{[0, 1, 2, 3].map(plane => (
                <svg key={plane} className={`core-plane core-plane--${plane}`} viewBox="0 0 500 500" fill="none" focusable="false" style={{ '--plane': plane }}>
                  <rect className="core-frame" x="88" y="88" width="324" height="324" rx="36" />
                  <rect className="core-inset" x="108" y="108" width="284" height="284" rx="25" />
                  <g className="core-traces" strokeLinecap="round" strokeLinejoin="round">
                    <Text>{routes.map(route => <path key={route} d={route} />)}</Text>
                  </g>
                  <path className="core-signal" pathLength="100" d={routes[plane]} strokeLinecap="round" />
                  <Text>{terminals.map(([cx, cy]) => <circle className="core-terminal" key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)}</Text>
                  <path className="core-hub" d="M250 222L278 250L250 278L222 250Z" />
                  <circle className="core-center" cx="250" cy="250" r="5" />
                </svg>
              ))}</Text>
              <Text>{[0, 1, 2, 3].map(plane => <span key={plane} className="core-beacon" style={{ '--plane': plane }} />)}</Text>
              <Text>{terminals.map(([x, y]) => <span key={`${x}-${y}`} className="core-via" style={{ left: `${x / 5}%`, top: `${y / 5}%` }} />)}</Text>
            </div>
          </div>
        </div>
      </div>
      <svg className="sculpture-continuation" viewBox="0 0 400 180" fill="none" focusable="false">
        <path d="M80 1V40Q80 65 105 65H295Q320 65 320 90V180M200 1V180M320 1V32Q320 52 300 52H220Q200 52 200 72" />
      </svg>
    </div>
  );
}
