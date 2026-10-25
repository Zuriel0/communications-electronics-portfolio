// Shared by deferred figures and deep-link tests. Invalid escapes stay harmless.
export function isDiagramDestination(hash, id) {
  try { return decodeURIComponent(hash.slice(1)) === id; }
  catch { return hash.slice(1) === id; }
}
