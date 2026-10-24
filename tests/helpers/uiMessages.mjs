import { readFileSync, readdirSync } from 'node:fs';
import { parse } from '@babel/parser';
import babelTraverse from '@babel/traverse';
const traverse = babelTraverse.default;
export function uiMessages(root = 'src') {
  const messages = new Map();
  const add = (s, f) => { if (/[a-záéíóúñ]/i.test(s)) messages.set(s, f); };
  function scalar(node, f) {
    if (!node) return;
    if (node.type === 'StringLiteral') add(node.value, f);
    if (node.type === 'ConditionalExpression') { scalar(node.consequent, f); scalar(node.alternate, f); }
    if (node.type === 'LogicalExpression') scalar(node.right, f);
  }
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const f = `${dir}/${entry.name}`;
      if (entry.isDirectory()) { if (entry.name !== 'i18n') walk(f); continue; }
      if (!/\.(jsx|js)$/.test(f)) continue;
      const ast = parse(readFileSync(f, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
      traverse(ast, {
        JSXElement(p) { if (p.node.openingElement.name.name === 'Text') for (const c of p.node.children) if (c.type === 'JSXExpressionContainer') scalar(c.expression, f); },
        JSXAttribute(p) { if (['title','summary','contribution','reading','alt','aria-label','placeholder'].includes(p.node.name.name)) scalar(p.node.value, f); },
        CallExpression(p) { if (p.node.callee.name === 't') scalar(p.node.arguments[0], f); },
        StringLiteral(p) {
          // Content arrays, profile fields and fixed diagram labels; exclude structural metadata.
          if (p.parent.type === 'ObjectProperty' && p.key !== 'key' && ['label','kicker','description','badge','summary','title','name','context'].includes(p.parent.key.name || p.parent.key.value) && !['professional','credential','project','lab'].includes(p.node.value)) add(p.node.value, f);
          if (p.parent.type === 'ArrayExpression' && /src\/data\/|sections\/introduce/.test(f) && !p.node.value.startsWith('#')) add(p.node.value, f);
        },
      });
    }
  }
  walk(root);
  return messages;
}
