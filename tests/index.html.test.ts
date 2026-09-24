import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";

const root = resolve(__dirname, "..");

/**
 * Loads a static HTML file into a happy-dom Window.
 * External scripts (AdSense, gtag, module entry) are stripped so tests are
 * deterministic and network-free; the index page depends on /src/utils/main.tsx
 * which is compiled by Vite and can't be executed in a unit test context.
 */
function loadPage(file: string): Document {
  const html = readFileSync(resolve(root, file), "utf-8").replace(
    /<script[^>]*src=[^>]*><\/script>/g,
    ""
  );
  const win = new Window({ url: `https://webzonebw.shop/${file}` });
  win.document.write(html);
  win.document.close();
  return win.document;
}

let doc: Document;

describe("index.html", () => {
  beforeEach(() => {
    doc = loadPage("index.html");
  });

  describe("document structure (positive)", () => {
    it("has a doctype, html element with lang=en and dark class", () => {
      expect(doc.doctype?.name).toBe("html");
      const html = doc.documentElement;
      expect(html.getAttribute("lang")).toBe("en");
      expect(html.classList.contains("dark")).toBe(true);
    });

    it("has a non-empty, correctly branded title", () => {
      expect(doc.title).toContain("WebZoneBW SC");
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.title).toMatch(/Web Developer Tools/i);
    });

    it("renders the pre-rendered noscript SEO content", () => {
      const noscript = doc.getElementById("main-content");
      expect(noscript).toBeTruthy();
      expect(noscript?.querySelector("h1")?.textContent).toContain(
        "WebZoneBW SC"
      );
      // All advertised tools are listed for crawlers / AdSense review
      const tools = [
        "Interactive Web REPL Sandbox",
        "CSS Box Model Studio",
        "Flexbox Studio",
        "CSS Grid Matrix",
        "DOM Tree Inspector",
        "HTTP & DNS Flow Trace",
        "Git Commit DAG Explorer",
      ];
      for (const tool of tools) {
        expect(noscript?.textContent).toContain(tool);
      }
    });

    it("contains a footer with all legal disclosure links", () => {
      const footer = doc.querySelector("footer");
      expect(footer).toBeTruthy();
      const hrefs = Array.from(footer!.querySelectorAll("a")).map((a) =>
        a.getAttribute("href")
      );
      for (const path of [
        "/privacy-policy.html",
        "/cookie-policy.html",
        "/terms-of-service.html",
        "/about.html",
        "/contact.html",
      ]) {
        expect(hrefs).toContain(path);
      }
      // External reach-out link is safe (noopener + noreferrer)
      const external = footer!.querySelector('a[href="https://webzonebw.in/"]');
      expect(external?.getAttribute("rel")).toContain("noopener");
      expect(external?.getAttribute("rel")).toContain("noreferrer");
      expect(external?.getAttribute("target")).toBe("_blank");
    });
  });

  describe("SEO & social metadata (positive)", () => {
    it("has primary meta description, keywords, author and robots", () => {
      const meta = (name: string) =>
        doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content");
      expect(meta("description")?.length ?? 0).toBeGreaterThan(50);
      expect(meta("description")).toContain("free developer platform");
      expect(meta("keywords")).toContain("web developer tools");
      expect(meta("author")).toBe("WebZoneBW");
      expect(meta("robots")).toContain("index, follow");
    });

    it("has a canonical link to the production domain", () => {
      expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
        "https://webzonebw.shop/"
      );
    });

    it("has complete Open Graph tags", () => {
      const og = (prop: string) =>
        doc.querySelector(`meta[property="${prop}"]`)?.getAttribute("content");
      expect(og("og:type")).toBe("website");
      expect(og("og:url")).toBe("https://webzonebw.shop/");
      expect(og("og:title")).toBeTruthy();
      expect(og("og:description")).toBeTruthy();
      expect(og("og:image")).toMatch(/^https:\/\/webzonebw\.shop\/og-image\.svg$/);
      expect(og("og:site_name")).toBe("WebZoneBW SC");
      expect(og("og:locale")).toBe("en_US");
    });

    it("has complete Twitter Card tags", () => {
      const tw = (name: string) =>
        doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content");
      expect(tw("twitter:card")).toBe("summary_large_image");
      expect(tw("twitter:url")).toBe("https://webzonebw.shop/");
      expect(tw("twitter:title")).toBeTruthy();
      expect(tw("twitter:description")).toBeTruthy();
      expect(tw("twitter:image")).toContain("og-image.svg");
    });

    it("exposes legal links via <link rel=...> for reviewers", () => {
      for (const rel of ["privacy-policy", "terms-of-service", "copyright", "help"]) {
        expect(doc.querySelector(`link[rel="${rel}"]`)).toBeTruthy();
      }
      expect(
        doc.querySelector('link[rel="help"]')?.getAttribute("href")
      ).toBe("https://webzonebw.in/");
    });

    it("declares theme-color and alternate/hreflang", () => {
      expect(doc.querySelector('meta[name="theme-color"]')?.getAttribute("content")).toBe(
        "#0f172a"
      );
      expect(doc.querySelector('link[rel="alternate"][hreflang="en"]')).toBeTruthy();
    });
  });

  describe("structured data (JSON-LD)", () => {
    const jsonLdBlocks = () =>
      Array.from(
        doc.querySelectorAll('script[type="application/ld+json"]')
      ).map((s) => JSON.parse(s.textContent || ""));

    it("contains valid, parseable JSON-LD blocks", () => {
      const blocks = jsonLdBlocks();
      expect(blocks.length).toBeGreaterThanOrEqual(2);
      for (const block of blocks) {
        expect(block["@context"]).toBe("https://schema.org");
      }
    });

    it("declares a WebSite with matching url", () => {
      const site = jsonLdBlocks().find((b) => b["@type"] === "WebSite");
      expect(site).toBeTruthy();
      expect(site.url).toBe("https://webzonebw.shop");
      expect(site.name).toBe("webzonebw.shop");
    });

    it("declares an EducationalOrganization with founder", () => {
      const org = jsonLdBlocks().find(
        (b) => b["@type"] === "EducationalOrganization"
      );
      expect(org).toBeTruthy();
      expect(org.name).toBe("WebZoneBW SC");
      expect(org.founder).toEqual({ "@type": "Organization", name: "WebZoneBW" });
      expect(Array.isArray(org.sameAs)).toBe(true);
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
      expect(fallback?.getAttribute("href")).toContain("display=swap");
    });

    it("preconnects to required third-party origins", () => {
      const hrefs = Array.from(doc.querySelectorAll('link[rel="preconnect"]')).map(
        (l) => l.getAttribute("href")
      );
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
      expect(doc.querySelector('meta[name="viewport"]')?.getAttribute("content")).toContain(
        "width=device-width"
      );
      expect(doc.querySelector("meta[charset]")?.getAttribute("charset")).toBe("UTF-8");
    });

    it("mounts the SPA via a type=module script and React root", () => {
      const entry = doc.querySelector('script[type="module"]');
      expect(entry?.getAttribute("src")).toBe("/src/utils/main.tsx");
      expect(doc.getElementById("root")).toBeTruthy();
    });

    it("references the sitemap", () => {
      expect(doc.querySelector('link[rel="sitemap"]')?.getAttribute("href")).toBe(
        "/sitemap.xml"
      );
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

    it("does not reference the wrong or missing production domain", () => {
      const canonical = doc.querySelector('link[rel="canonical"]')!.getAttribute("href")!;
      expect(canonical).not.toMatch(/webzonebw\.in/);
      expect(canonical).toMatch(/^https:\/\/webzonebw\.shop\/?$/);
    });

    it("every noscript link inside body points to a real internal path or https/mailto url", () => {
      const links = Array.from(doc.querySelectorAll("#main-content a, footer a"));
      expect(links.length).toBeGreaterThan(0);
      for (const a of links) {
        const href = a.getAttribute("href") ?? "";
        expect(
          href.startsWith("/") ||
            href.startsWith("https://") ||
            href.startsWith("mailto:")
        ).toBe(true);
      }
    });

    it("favicon is an inline data-URI svg (no 404-prone file path)", () => {
      const icon = doc.querySelector('link[rel="icon"]');
      expect(icon?.getAttribute("href")?.startsWith("data:image/svg+xml")).toBe(true);
      expect(icon?.getAttribute("type")).toBe("image/svg+xml");
    });

    it("JSON-LD blocks are syntactically valid (no broken schema from edits)", () => {
      expect(() => jsonLdBlocks()).not.toThrow();
    });
  });
});
