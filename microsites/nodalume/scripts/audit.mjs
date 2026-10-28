import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
const modules = process.argv[2];
if (!modules)
  throw new Error(
    "Pass the external audit node_modules directory. See docs/performance.md.",
  );
const load = (path) => import(pathToFileURL(resolve(modules, path)));
const { default: lighthouse } = await load("lighthouse/core/index.js");
const { default: desktopConfig } = await load(
  "lighthouse/core/config/desktop-config.js",
);
const chromeLauncher = await load("chrome-launcher/dist/index.js");
const { default: BaseGatherer } = await load(
  "lighthouse/core/gather/base-gatherer.js",
);
const { Audit } = await load("lighthouse/core/audits/audit.js");
import { writeFile, mkdir } from "node:fs/promises";
const output = fileURLToPath(
  new URL("../docs/evidence/lighthouse/", import.meta.url),
);
await mkdir(output, { recursive: true });
class SiteState extends BaseGatherer {
  meta = { supportedModes: ["navigation"] };
  async getArtifact(ctx) {
    return ctx.driver.executionContext.evaluate(
      () => ({
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
        motion: document.querySelector(".site")?.dataset.motion,
        triggers: document.querySelector(".site")?.dataset.triggers,
        ambient: document.querySelector(".site")?.dataset.ambient,
        heading: document.querySelector("h1")?.textContent,
        motionDisabled: document.querySelector(".motion-control")?.disabled,
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        motionRequested: performance
          .getEntriesByType("resource")
          .some((e) => /\/motion-[^/]+\.js/.test(e.name)),
      }),
      { useIsolation: true, args: [] },
    );
  }
}
class SiteStateAudit extends Audit {
  static get meta() {
    return {
      id: "nodalume-state",
      title: "Nodalume diagnostic state",
      description: "Read-only DOM evidence from the audited local landing.",
      scoreDisplayMode: "informative",
      requiredArtifacts: ["NodalumeState"],
    };
  }
  static audit(artifacts) {
    return {
      score: 1,
      details: {
        type: "table",
        headings: [
          { key: "state", valueType: "text", label: "Observed state" },
        ],
        items: [{ state: JSON.stringify(artifacts.NodalumeState) }],
      },
    };
  }
}
const config = {
  extends: "lighthouse:default",
  artifacts: [{ id: "NodalumeState", gatherer: { instance: new SiteState() } }],
  audits: [{ implementation: SiteStateAudit }],
  categories: {
    diagnostic: {
      title: "Local diagnostics",
      auditRefs: [{ id: "nodalume-state", weight: 0 }],
    },
  },
};
const rows = [];
for (const profile of ["mobile", "desktop"]) {
  for (let run = 1; run <= 3; run++) {
    const chrome = await chromeLauncher.launch({
      chromePath:
        process.env.NDL_CHROME_PATH ||
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      chromeFlags: [
        "--headless=new",
        "--no-first-run",
        "--no-default-browser-check",
      ],
    });
    try {
      const result = await lighthouse(
        "http://127.0.0.1:4186/",
        {
          port: chrome.port,
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "diagnostic"],
        },
        profile === "desktop"
          ? { ...config, settings: desktopConfig.settings }
          : config,
      );
      const l = result.lhr;
      await writeFile(`${output}/${profile}-${run}.json`, JSON.stringify(l));
      const row = {
        profile,
        run,
        lighthouse: l.lighthouseVersion,
        userAgent: l.environment.hostUserAgent,
        performance: l.categories.performance.score * 100,
        accessibility: l.categories.accessibility.score * 100,
        lcp: l.audits["largest-contentful-paint"].numericValue,
        cls: l.audits["cumulative-layout-shift"].numericValue,
        tbt: l.audits["total-blocking-time"].numericValue,
        state: l.audits["nodalume-state"].details?.items?.[0]?.state,
        warnings: l.runWarnings,
      };
      rows.push(row);
      console.log(JSON.stringify(row));
    } finally {
      await chrome.kill();
    }
  }
}
const chrome = await chromeLauncher.launch({
  chromePath:
    process.env.NDL_CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  chromeFlags: [
    "--headless=new",
    "--force-prefers-reduced-motion",
    "--no-first-run",
  ],
});
try {
  const result = await lighthouse(
    "http://127.0.0.1:4186/",
    {
      port: chrome.port,
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "diagnostic"],
    },
    { ...config, settings: desktopConfig.settings },
  );
  await writeFile(`${output}/reduced-motion.json`, JSON.stringify(result.lhr));
  console.log(
    "REDUCED " + result.lhr.audits["nodalume-state"].details?.items?.[0]?.state,
  );
} finally {
  await chrome.kill();
}
await writeFile(`${output}/summary.json`, JSON.stringify(rows, null, 2));
