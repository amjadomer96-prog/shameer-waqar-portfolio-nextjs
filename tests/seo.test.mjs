// Search and sharing checks against a running build.
//   npm run build && npm start      then   npm test
//   SEO_BASE_URL=https://shameer-waqar-portfolio-nextjs.vercel.app npm test
// Canonical URLs always point at SITE_URL, wherever the pages are served from.

import { test } from "node:test";
import assert from "node:assert/strict";
import { SITE_URL, GITHUB_URL, LINKEDIN_URL } from "../lib/site.js";
import { PROJECTS } from "../lib/projects.js";

const BASE = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const PAGES = [
  { path: "/", url: SITE_URL },
  ...PROJECTS.map((p) => ({ path: `/work/${p.slug}`, url: `${SITE_URL}/work/${p.slug}`, project: p })),
];

const cache = new Map();
async function load(path) {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(BASE + path, { redirect: "manual" }).then(async (r) => ({ res: r, body: await r.text() }))
    );
  }
  return cache.get(path);
}
async function page(path) {
  const { res, body } = await load(path);
  assert.equal(res.status, 200, `${path} returned ${res.status}`);
  return body;
}

// Small HTML readers. The markup is our own, so patterns are enough.
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const tags = (doc, name) => doc.match(new RegExp(`<${name}\\b[^>]*>`, "g")) ?? [];
const attr = (tag, name) => {
  const v = tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
  return v === undefined ? undefined : decode(v);
};
const meta = (doc, key) =>
  attr(tags(doc, "meta").find((t) => attr(t, "name") === key || attr(t, "property") === key) ?? "", "content");
const link = (doc, rel) => attr(tags(doc, "link").find((t) => attr(t, "rel") === rel) ?? "", "href");
const title = (doc) => decode(doc.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
const text = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const h1s = (doc) => doc.match(/<h1\b[\s\S]*?<\/h1>/g) ?? [];
const jsonLd = (doc) =>
  [...doc.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });
const ofType = (nodes, type) => nodes.filter((n) => [].concat(n["@type"]).includes(type));
const strip = (u) => u.replace(/\/$/, "");

test("robots.txt allows crawling and names the sitemap", async () => {
  const body = await page("/robots.txt");
  assert.match(body, /User-agent: \*/i);
  assert.doesNotMatch(body, /^Disallow: \/\s*$/m, "the whole site is disallowed");
  assert.match(body, new RegExp(`Sitemap: ${SITE_URL}/sitemap.xml`));
});

test("sitemap.xml lists the home page and every case study, all on the site's own host", async () => {
  const body = await page("/sitemap.xml");
  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => strip(m[1]));
  for (const p of PAGES) assert.ok(locs.includes(strip(p.url)), `sitemap is missing ${p.url}`);
  for (const loc of locs) assert.ok(loc.startsWith(SITE_URL), `${loc} is not on ${SITE_URL}`);
});

for (const p of PAGES) {
  test(`${p.path}: title, description and canonical are set for search`, async () => {
    const doc = await page(p.path);
    const t = title(doc);
    assert.ok(t.length >= 30 && t.length <= 60, `title is ${t.length} characters: "${t}"`);
    assert.match(t, /Shameer Waqar/);
    const d = meta(doc, "description") ?? "";
    assert.ok(d.length >= 70 && d.length <= 155, `description is ${d.length} characters: "${d}"`);
    assert.equal(strip(link(doc, "canonical") ?? ""), strip(p.url));
    assert.equal(strip(meta(doc, "og:url") ?? ""), strip(p.url), "og:url should match the canonical");
    const robots = meta(doc, "robots") ?? "";
    assert.doesNotMatch(robots, /noindex/);
    assert.match(robots, /max-image-preview:large/);
  });

  test(`${p.path}: one h1 and a share image`, async () => {
    const doc = await page(p.path);
    const found = h1s(doc);
    assert.equal(found.length, 1, `found ${found.length} h1 elements`);
    if (p.project) assert.match(text(found[0]), new RegExp(p.project.name));
    assert.match(meta(doc, "og:image") ?? "", /^https:\/\//);
    assert.ok(meta(doc, "twitter:card"), "twitter:card is missing");
  });

  test(`${p.path}: every image has alt text`, async () => {
    const doc = await page(p.path);
    for (const img of tags(doc, "img")) assert.notEqual(attr(img, "alt"), undefined, `no alt on ${img}`);
  });

  test(`${p.path}: lists only contain list items`, async () => {
    const doc = (await page(p.path)).replace(/<(script|style)\b[\s\S]*?<\/\1>/g, "");
    const VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/;
    const stack = [];
    for (const m of doc.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g)) {
      const [, close, raw, selfClose] = m;
      const name = raw.toLowerCase();
      if (close) {
        const at = stack.lastIndexOf(name);
        if (at !== -1) stack.length = at;
        continue;
      }
      const parent = stack[stack.length - 1];
      if ((parent === "ul" || parent === "ol") && name !== "li" && name !== "template") {
        assert.fail(`<${name}> sits directly inside <${parent}>`);
      }
      if (!selfClose && !VOID.test(name)) stack.push(name);
    }
  });
}

test("titles and descriptions are unique across pages", async () => {
  const docs = await Promise.all(PAGES.map((p) => page(p.path)));
  const titles = docs.map(title);
  const descriptions = docs.map((d) => meta(d, "description"));
  assert.equal(new Set(titles).size, titles.length, `duplicate titles: ${titles.join(" / ")}`);
  assert.equal(new Set(descriptions).size, descriptions.length, "duplicate descriptions");
});

test("home page describes Shameer as a Person, with his profiles", async () => {
  const nodes = jsonLd(await page("/"));
  const [person] = ofType(nodes, "Person");
  assert.ok(person, "no Person in JSON-LD");
  assert.equal(person.name, "Shameer Waqar");
  assert.ok(person.jobTitle, "Person has no jobTitle");
  assert.ok(person.sameAs?.includes(GITHUB_URL), "sameAs is missing GitHub");
  assert.ok(person.sameAs?.includes(LINKEDIN_URL), "sameAs is missing LinkedIn");
  assert.ok(person.worksFor?.name, "Person has no worksFor");
  const [site] = ofType(nodes, "WebSite");
  assert.equal(strip(site?.url ?? ""), SITE_URL, "WebSite url should be the site");
  assert.ok(ofType(nodes, "ProfilePage").length, "no ProfilePage");
});

test("every organization in the structured data has an @id", async () => {
  for (const p of PAGES) {
    const orgs = [];
    const walk = (v) => {
      if (Array.isArray(v)) return v.forEach(walk);
      if (v && typeof v === "object") {
        if (/Organization|CollegeOrUniversity/.test([].concat(v["@type"] ?? []).join())) orgs.push(v);
        Object.values(v).forEach(walk);
      }
    };
    walk(jsonLd(await page(p.path)));
    for (const o of orgs) assert.ok(o["@id"], `${p.path}: ${o.name} has no @id`);
  }
});

test("the home page points AI assistants to llms.txt", async () => {
  const doc = await page("/");
  const hrefs = tags(doc, "link").map((t) => (attr(t, "href") ?? "").replace(SITE_URL, ""));
  assert.ok(hrefs.includes("/llms.txt"), "no <link> to /llms.txt");
});

test("home page links to every case study", async () => {
  const doc = await page("/");
  for (const p of PROJECTS) assert.match(doc, new RegExp(`href="/work/${p.slug}"`), `no link to /work/${p.slug}`);
});

test("hero headline is visible before JavaScript runs", async () => {
  const [h1] = h1s(await page("/"));
  assert.doesNotMatch(h1, /opacity:\s*0/, "the h1 is rendered transparent");
});

test("walkthrough videos carry captions", async () => {
  const doc = await page("/");
  const videos = doc.match(/<video\b[\s\S]*?<\/video>/g) ?? [];
  assert.ok(videos.length > 0, "no videos found");
  for (const v of videos) assert.match(v, /<track\b[^>]*kind="captions"/, "a video has no captions track");
});

for (const p of PROJECTS) {
  test(`/work/${p.slug}: breadcrumb and project structured data`, async () => {
    const nodes = jsonLd(await page(`/work/${p.slug}`));
    const [crumbs] = ofType(nodes, "BreadcrumbList");
    assert.ok(crumbs, "no BreadcrumbList");
    const items = crumbs.itemListElement;
    assert.ok(items.length >= 2, "breadcrumb needs at least two levels");
    assert.equal(strip(items[0].item), SITE_URL);
    assert.equal(items.at(-1).name, p.name);
    const work = nodes.find((n) => n.name === p.name && n.author);
    assert.ok(work, `no structured data entry for ${p.name} with an author`);
    const [webPage] = ofType(nodes, "WebPage");
    for (const key of ["datePublished", "dateModified"]) {
      assert.ok(!Number.isNaN(Date.parse(webPage?.[key])), `WebPage ${key} is missing or not a date`);
    }
  });

  test(`/work/${p.slug}: links home and to the next project`, async () => {
    const doc = await page(`/work/${p.slug}`);
    assert.match(doc, /href="\/"/, "no link back home");
    const others = PROJECTS.filter((o) => o.slug !== p.slug);
    assert.ok(others.some((o) => doc.includes(`href="/work/${o.slug}"`)), "no link to another case study");
  });
}

test("an unknown case study is a 404 that stays out of the index", async () => {
  const { res, body } = await load("/work/not-a-project");
  assert.equal(res.status, 404);
  const robots = tags(body, "meta")
    .filter((t) => attr(t, "name") === "robots")
    .map((t) => attr(t, "content"));
  assert.ok(robots.length > 0, "no robots meta");
  for (const r of robots) assert.match(r, /noindex/, `conflicting robots meta: ${robots.join(" | ")}`);
  assert.equal(title(body).match(/Shameer Waqar/g)?.length, 1, `title: "${title(body)}"`);
});

test("favicon, touch icon and web manifest are served", async () => {
  for (const path of ["/favicon.ico", "/apple-icon.png"]) {
    const { res } = await load(path);
    assert.equal(res.status, 200, `${path} returned ${res.status}`);
    assert.match(res.headers.get("content-type") ?? "", /^image\//, `${path} is not an image`);
  }
  const manifest = JSON.parse(await page("/manifest.webmanifest"));
  assert.match(manifest.name, /Shameer Waqar/);
  assert.ok(manifest.icons?.length, "manifest has no icons");
});

test("llms.txt summarises the site with links to every case study", async () => {
  const { res, body } = await load("/llms.txt");
  assert.equal(res.status, 200, `/llms.txt returned ${res.status}`);
  assert.match(res.headers.get("content-type") ?? "", /^text\/plain/);
  assert.match(body, /^# Shameer Waqar/);
  for (const p of PROJECTS) assert.ok(body.includes(`${SITE_URL}/work/${p.slug}`), `llms.txt is missing ${p.slug}`);
});

test("security headers are sent", async () => {
  const { res } = await load("/");
  const h = (name) => res.headers.get(name) ?? "";
  assert.equal(h("x-content-type-options"), "nosniff");
  assert.ok(/DENY|SAMEORIGIN/i.test(h("x-frame-options")) || /frame-ancestors/.test(h("content-security-policy")), "framing is not restricted");
  assert.ok(h("referrer-policy"), "no Referrer-Policy");
  assert.ok(h("permissions-policy"), "no Permissions-Policy");
});
