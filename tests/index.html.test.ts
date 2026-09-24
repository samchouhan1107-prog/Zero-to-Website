import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { Window, type Document as HappyDocument } from "happy-dom";

const root = resolve(__dirname, "..");
const RAW = readFileSync(resolve(root, "index.html"), "utf-8");

function loadPage(): HappyDocument {
  const win = new Window({ url: "https://webzonebw.shop/" });
  win.document.write(RAW);
  win.document.close();
  const inline = [...RAW.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  for (const m of inline) {
    try { win.eval(m[1]); } catch { /* ignore */ }
  }
  return win.document as unknown as HappyDocument;
}

let doc: HappyDocument;

describe("index.html", () => {
  beforeEach(() => {
    doc = loadPage();
  });

  describe("document structure (positive)", () => {
    it("has a doctype, html element with lang=en and dark class", () => {
      expect(doc.doctype?.name).toBe("html");
      expect(doc.documentElement.getAttribute("lang")).toBe("en");
      expect(doc.documentElement.classList.contains("dark")).toBe(true);
    });

    it("has a non-empty, correctly branded title", () => {
      expect(doc.title).toContain("WebZoneBW SC");
      expect(doc.title).toMatch(/Curriculum/i);
    });

    it("renders navigation with core page links", () => {
      const nav = doc.querySelector("nav")!;
      const hrefs = Array.from(nav.querySelectorAll("a")).map((a) =>
        a.getAttribute("href")
      );
      for (const path of ["/", "/learn.html", "/webtools.html", "/Workspace.html", "/blog.html", "/contact.html"]) {
        expect(hrefs, `nav missing ${path}`).toContain(path);
      }
    });

    it("has a hero section with primary CTAs", () => {
      expect(doc.querySelector("h1")?.textContent).toBeTruthy();
      const heroSection = doc.querySelector("section")!;
      const links = Array.from(heroSection.querySelectorAll("a")).map((a) =>
        a.getAttribute("href")
      );
      expect(links).toContain("/learn.html");
      expect(links).toContain("/Workspace.html");
    });

    it("contains a footer with all key sections", () => {
      const footer = doc.querySelector("footer")!;
      const hrefs = Array.from(footer.querySelectorAll("a")).map((a) =>
        a.getAttribute("href")
      );
      for (const path of [
        "/learn.html",
        "/Workspace.html",
        "/blog.html",
        "/webtools.html",
        "/developertools.html",
        "/imagetools.html",
        "/contact.html",
        "/about.html",
        "/privacy-policy.html",
        "/terms-of-service.html",
      ]) {
        expect(hrefs, `footer missing ${path}`).toContain(path);
      }
    });
  });

  describe("SEO & social metadata (positive)", () => {
    const meta = (name: string) =>
      doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content");
    const og = (prop: string) =>
      doc.querySelector(`meta[property="${prop}"]`)?.getAttribute("content");

    it("has primary meta description, keywords, author and robots", () => {
      expect(meta("description")?.length ?? 0).toBeGreaterThan(50);
      expect(meta("keywords")).toContain("web development");
      expect(meta("author")).toBe("WebZoneBW");
      expect(meta("robots")).toContain("index, follow");
    });

    it("has a canonical link to the production domain", () => {
      expect(
        doc.querySelector('link[rel="canonical"]')?.getAttribute("href")
      ).toBe("https://webzonebw.shop/");
    });

    it("has complete Open Graph tags", () => {
      expect(og("og:type")).toBe("website");
      expect(og("og:url")).toBe("https://webzonebw.shop/");
      expect(og("og:title")).toBeTruthy();
      expect(og("og:description")).toBeTruthy();
      expect(og("og:image")).toBe("https://webzonebw.shop/og-image.svg");
      expect(og("og:site_name")).toBe("WebZoneBW SC");
      expect(og("og:locale")).toBe("en_US");
    });

    it("has complete Twitter Card tags", () => {
      expect(meta("twitter:card")).toBe("summary_large_image");
      expect((meta("twitter:image") ?? og("twitter:image")) ?? "").toContain("og-image.svg");
      expect(og("twitter:title")).toBeTruthy();
      expect(og("twitter:description")).toBeTruthy();
    });

    it("exposes legal links via <link rel=...> for reviewers", () => {
      for (const rel of ["privacy-policy", "terms-of-service", "copyright", "help"]) {
        expect(doc.querySelector(`link[rel="${rel}"]`), rel).toBeTruthy();
      }
      expect(doc.querySelector('link[rel="help"]')?.getAttribute("href")).toBe(
        "https://webzonebw.in/"
      );
    });

    it("declares theme-color matching the site palette", () => {
      expect(
        doc.querySelector('meta[name="theme-color"]')?.getAttribute("content")
      ).toBe("#0f172a");
    });
  });

  describe("third-party / performance integration", () => {
    it("includes the AdSense account meta and async ad script", () => {
      expect(
        doc.querySelector('meta[name="google-adsense-account"]')?.getAttribute("content")
      ).toBe("ca-pub-2904917114665090");
      const ad = doc.querySelector('script[src*="adsbygoogle"]');
      expect(ad?.hasAttribute("async")).toBe(true);
      expect(ad?.getAttribute("crossorigin")).toBe("anonymous");
      expect(ad?.getAttribute("src")).toContain("client=ca-pub-2904917114665090");
    });

    it("loads the Inter font with print-media swap trick and a noscript fallback", () => {
      const font = doc.querySelector('link[href*="family=Inter"]');
      expect(font?.getAttribute("media")).toBe("print");
      expect(font?.getAttribute("onload")).toContain("this.media");
      const fallback = doc.querySelector("noscript link[href*='family=Inter']");
      expect(fallback).toBeTruthy();
    });

    it("preconnects to required third-party origins", () => {
      const hrefs = Array.from(
        doc.querySelectorAll('link[rel="preconnect"]')
      ).map((l) => l.getAttribute("href"));
      for (const origin of [
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://www.googletagmanager.com",
        "https://pagead2.googlesyndication.com",
      ]) {
        expect(hrefs).toContain(origin);
      }
      expect(
        doc.querySelector('link[href="https://fonts.gstatic.com"]')?.getAttribute("crossorigin")
      ).toBe("");
    });

    it("has viewport meta for responsiveness and charset declared", () => {
      expect(
        doc.querySelector('meta[name="viewport"]')?.getAttribute("content")
      ).toContain("width=device-width");
      expect(doc.querySelector("meta[charset]")?.getAttribute("charset")).toBe("UTF-8");
    });

    it("references the production GA4 measurement ID", () => {
      expect(RAW).toContain("G-L1KR6MWWP3");
    });

    it("favicon is an inline data-URI svg (no 404-prone file path)", () => {
      const icon = doc.querySelector('link[rel="icon"]');
      expect(icon?.getAttribute("href")?.startsWith("data:image/svg+xml")).toBe(true);
      expect(icon?.getAttribute("type")).toBe("image/svg+xml");
    });
  });

  describe("regression / negative cases", () => {
    it("does not accidentally mark the homepage noindex", () => {
      const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
      expect(robots).not.toContain("noindex");
    });

    it("does not contain duplicate canonical tags", () => {
      expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    });

    it("canonical does not reference the wrong domain", () => {
      const canonical = doc
        .querySelector('link[rel="canonical"]')!
        .getAttribute("href")!;
      expect(canonical).not.toMatch(/webzonebw\.in/);
      expect(canonical).toMatch(/^https:\/\/webzonebw\.shop\/?$/);
    });

    it("every internal link points to a real page (connection regression)", () => {
      const links = Array.from(doc.querySelectorAll("a[href^='/']"));
      expect(links.length).toBeGreaterThan(0);
      expect(RAW).not.toContain("/learning-path.html");
    });

    it("has no href='#' dead placeholder links", () => {
      expect(RAW.match(/<a\s[^>]*href="#"/g) ?? []).toHaveLength(0);
    });

    it("JSON-LD absence is documented for the static page", () => {
      // The static index.html carries no ld+json; documented so a regenerated
      // page without schema markup is a conscious decision, not a regression.
      expect(RAW.includes("application/ld+json")).toBe(false);
    });
  });
});
