// Reading states are deterministic and distinct from observed product runtime state.
export function walkthroughSteps(model) {
  return model.steps || model.edges.map(edge => ({ edge: edge.id, title: edge.label }));
}
export function walkthroughAt(model, step) {
  const steps = walkthroughSteps(model);
  const index = ((step % steps.length) + steps.length) % steps.length;
  const phase = steps[index];
  const edge = model.edges.find(item => item.id === phase.edge);
  return { index, title: phase.title, edgeId: edge?.id, source: edge?.source, target: edge?.target };
}
export function engineeringViewForHash(models, hash) {
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { id = hash.slice(1); }
  return models.find(model => model.id === id) || models[0];
}
