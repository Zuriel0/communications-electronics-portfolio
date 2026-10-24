import { parse } from '@babel/parser';
import babelTraverse from '@babel/traverse';
import { createHash } from 'node:crypto';
const traverse = babelTraverse.default;
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export function normalized(value) {
  return JSON.parse(JSON.stringify(value, (key, item) => ['start','end','loc','extra','leadingComments','trailingComments','innerComments'].includes(key) ? undefined : item));
}
export function declaration(source, name) {
  let result;
  traverse(parse(source, { sourceType: 'module', plugins: ['jsx'] }), {
    VariableDeclarator(p) { if (p.node.id.name === name) result = normalized(p.node.init); },
  });
  return result;
}
