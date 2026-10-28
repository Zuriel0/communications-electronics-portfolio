import test from "node:test";
import assert from "node:assert/strict";
import { copy } from "../src/content.js";

test("EN/ES expose the same complete content structure and stable anchors", () => {
  const shape = (value) =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, shape(item)]),
          )
        : typeof value;
  assert.deepEqual(shape(copy.es), shape(copy.en));
  for (const locale of Object.values(copy)) {
    assert.deepEqual(
      locale.map.map((item) => item.id),
      ["builder", "connections", "creative-system", "future"],
    );
    assert.deepEqual(
      locale.map.map((item) => item.kind),
      ["current", "partial", "concept", "future"],
    );
    assert.equal(
      new Set(locale.map.map((item) => item.id)).size,
      locale.map.length,
    );
    for (const item of locale.map) assert.ok(item.detail.length > 100, item.id);
  }
});

const luminance = (hex) => {
  const values = hex
    .match(/[a-f0-9]{2}/gi)
    .map((value) => parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
};
test("all designed foreground/background text pairs meet WCAG AA", () => {
  for (const [foreground, background] of [
    ["111111", "F7F7F4"],
    ["555550", "F7F7F4"],
    ["FFFFFF", "5E46FF"],
    ["111111", "C8FF5E"],
    ["CDCDC7", "111111"],
    ["C8FF5E", "5E46FF"],
    ["C8FF5E", "111111"],
  ]) {
    const [a, b] = [luminance(foreground), luminance(background)].sort(
      (x, y) => y - x,
    );
    assert.ok((a + 0.05) / (b + 0.05) >= 4.5, `${foreground}/${background}`);
  }
});
