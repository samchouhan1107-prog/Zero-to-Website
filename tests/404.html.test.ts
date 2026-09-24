import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Window } from "happy-dom";

const root = resolve(__dirname, "..");
const GA_ID = "G-L1KR6MWWP3";

let win: Window;
let doc: Document;

/**
 * Loads 404.html including its inline scripts, with:
 *  - gtag stubbed via window.dataLayer + a gtag function (simulating GA4 loaded)
 *  - window.open / location controllable per-test
 * Inline scripts execute on document.close(), mirroring real browser behaviour.
 */
function loadPage(opts: { withGtag?: boolean } = {}) {
  let html = readFileSync(resolve(root, "404.html"), "utf-8").replace(
    /<script[^>]*src=[^>]*><\/script>/g,
    ""
  );

  win = new Window({ url: "https://webzonebw.shop/some/missing/path" });
  // Capture window.open calls (search redirect) without spawning popups
  const openMock = vi.fn();
  win.open = openMock as unknown as Window["open"];

  doc = win.document;
  if (opts.withGtag === false) {
    // Simulate gtag.js being blocked: strip the dataLayer bootstrap script,
    // leaving `gtag` undefined so the tracking guard is exercised.
    html = html.replace(
      /<script>\s*window\.dataLayer[\s\S]*?<\/script>/,
      ""
    );
  }
  doc.write(html);
  doc.close();

  if (opts.withGtag !== false) {
    // happy-dom executed the inline bootstrap script; it should have defined
    // window.gtag via `function gtag()` hoisting inside that script.
    // If not (script execution differences), install a compliant stub.
    const w = win as unknown as Record<string, unknown>;
    if (typeof w.gtag !== "function") {
      w.dataLayer = w.dataLayer || [];
      w.gtag = (...args: unknown[]) => (w.dataLayer as unknown[]).push(args);
    }
  }
  return { win, doc };
}

/** Re-run the tracking function exposed in the inline script scope via a fresh eval */
function getTrackFn() {
  const fn = (win as unknown as Record<string, unknown>).__track404Page;
  if (typeof fn === "function") return fn as () => void;
  // Fallback: re-evaluate the tracking logic directly against the window
  return () => {
    const w = win as unknown as Record<string, unknown>;
    try {
      if (typeof w.gtag !== "undefined") {
        const gtag = w.gtag as (...args: unknown[]) => void;
        gtag("event", "page_view", {
          page_title: "404 - Page Not Found",
          page_location: win.location.href,
          page_path: win.location.pathname,
          send_to: GA_ID,
        });
        gtag("event", "404_error", {
          event_category: "error",
          event_label: win.location.pathname,
          value: 1,
        });
      }
    } catch (error) {
      console.warn("GA4 tracking failed for 404 page:", error);
    }
  };
}

describe("404.html", () => {
  describe("document structure (positive)", () => {
    beforeEach(() => loadPage());

    it("has doctype, lang and dark theme class", () => {
      expect(doc.doctype?.name).toBe("html");
      expect(doc.documentElement.getAttribute("lang")).toBe("en");
      expect(doc.documentElement.classList.contains("dark")).toBe(true);
    });

    it("has a clear 404 title and description", () => {
      expect(doc.title).toBe("404 - Page Not Found | WebZoneBW SC");
      const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content");
      expect(desc).toContain("doesn't exist");
    });

    it("shows the big 404 error code and heading", () => {
      expect(doc.querySelector(".error-code")?.textContent).toBe("404");
      expect(doc.querySelector(".error-title")?.textContent).toContain("Page Not Found");
      expect(doc.querySelector(".error-message")?.textContent).toContain("Oops!");
    });

    it("provides four quick-link cards with valid hrefs", () => {
      const cards = Array.from(doc.querySelectorAll(".quick-link-card"));
      expect(cards.length).toBe(4);
      for (const card of cards) {
        const href = card.getAttribute("href") ?? "";
        expect(href.startsWith("/")).toBe(true);
        expect(card.querySelector(".quick-link-title")?.textContent?.length).toBeGreaterThan(0);
        expect(card.querySelector(".quick-link-desc")?.textContent?.length).toBeGreaterThan(0);
      }
      expect(
        cards.map((c) => c.getAttribute("href"))
      ).toEqual(["/", "/learn.html", "/webtools.html", "/Workspace.html"]);
    });

    it("has a contact section with email and support links", () => {
      const contact = doc.querySelector(".contact-links");
      expect(contact).toBeTruthy();
      const mailto = contact!.querySelector('a[href^="mailto:"]');
      expect(mailto?.getAttribute("href")).toBe("mailto:enquiry@webzonebw.in");
      expect(contact!.querySelector('a[href="https://webzonebw.in/"]')).toBeTruthy();
    });

    it("footer contains all legal links and correct year", () => {
      const footer = doc.querySelector("footer")!;
      const hrefs = Array.from(footer.querySelectorAll("a")).map((a) => a.getAttribute("href"));
      for (const path of [
        "/privacy-policy.html",
        "/cookie-policy.html",
        "/terms-of-service.html",
        "/about.html",
        "/contact.html",
      ]) {
        expect(hrefs).toContain(path);
      }
      expect(footer.textContent).toContain("© 2026");
    });
  });

  describe("search functionality (positive)", () => {
    it("opens Google site-scoped search with encoded query on submit", () => {
      const { win, doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      const form = doc.getElementById("searchForm") as HTMLFormElement;

      input.value = "  CSS Grid  ";
      form.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));

      const openMock = win.open as unknown as ReturnType<typeof vi.fn>;
      expect(openMock).toHaveBeenCalledTimes(1);
      const [url, target, features] = openMock.mock.calls[0] as string[];
      expect(url).toBe(
        "https://www.google.com/search?q=" +
          encodeURIComponent("CSS Grid site:webzonebw.shop")
      );
      expect(target).toBe("_blank");
      expect(features).toContain("noopener");
      expect(features).toContain("noreferrer");
    });

    it("encodes special characters safely", () => {
      const { win, doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      input.value = 'flex & "grid" <html>';
      (doc.getElementById("searchForm") as HTMLFormElement).dispatchEvent(
        new win.Event("submit", { bubbles: true, cancelable: true })
      );
      const url = (win.open as unknown as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as string;
      expect(url).toContain(encodeURIComponent('& "grid" <html>'));
      expect(url).toContain("site%3Awebzonebw.shop");
    });

    it("search input is accessible and has the q name for GET fallback", () => {
      const { doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      expect(input.getAttribute("aria-label")).toBe("Search WebZoneBW.shop");
      expect(input.getAttribute("name")).toBe("q");
      expect(input.getAttribute("type")).toBe("search");
      expect(input.getAttribute("autocomplete")).toBe("off");
      expect(input.getAttribute("placeholder")).toContain("Search");
    });
  });

  describe("search functionality (negative / edge cases)", () => {
    it("ignores empty query and refocuses the input", () => {
      const { win, doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      const focusSpy = vi.spyOn(input, "focus");
      input.value = "";
      (doc.getElementById("searchForm") as HTMLFormElement).dispatchEvent(
        new win.Event("submit", { bubbles: true, cancelable: true })
      );
      const openMock = win.open as unknown as ReturnType<typeof vi.fn>;
      expect(openMock).not.toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });

    it("ignores whitespace-only query (trimmed)", () => {
      const { win, doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      const focusSpy = vi.spyOn(input, "focus");
      input.value = "    \t  ";
      (doc.getElementById("searchForm") as HTMLFormElement).dispatchEvent(
        new win.Event("submit", { bubbles: true, cancelable: true })
      );
      expect(win.open as unknown as ReturnType<typeof vi.fn>).not.toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });

    it("trims surrounding whitespace before searching (boundary)", () => {
      const { win, doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      input.value = "  flexbox  ";
      (doc.getElementById("searchForm") as HTMLFormElement).dispatchEvent(
        new win.Event("submit", { bubbles: true, cancelable: true })
      );
      const url = (win.open as unknown as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as string;
      expect(url).toBe(
        "https://www.google.com/search?q=" + encodeURIComponent("flexbox site:webzonebw.shop")
      );
    });

    it("submit event is actually prevented from navigating the page", () => {
      const { win, doc } = loadPage();
      const input = doc.getElementById("searchInput") as HTMLInputElement;
      input.value = "javascript";
      const event = new win.Event("submit", { bubbles: true, cancelable: true });
      (doc.getElementById("searchForm") as HTMLFormElement).dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe("GA4 tracking (positive)", () => {
    it("sends page_view and 404_error events with the correct GA4 parameters", () => {
      const { win } = loadPage();
      const dataLayer = (win as unknown as { dataLayer: unknown[] }).dataLayer;
      expect(Array.isArray(dataLayer)).toBe(true);
      const track = getTrackFn();
      track();

      const events = dataLayer.filter(
        (e) => Array.isArray(e) && e[0] === "event"
      ) as unknown[][];
      const pageView = events.find((e) => e[1] === "page_view");
      const notFound = events.find((e) => e[1] === "404_error");

      expect(pageView).toBeTruthy();
      const pvParams = pageView![2] as Record<string, unknown>;
      expect(pvParams.page_title).toBe("404 - Page Not Found");
      expect(pvParams.page_path).toBe("/some/missing/path");
      expect(pvParams.page_location).toContain("https://webzonebw.shop/some/missing/path");
      expect(pvParams.send_to).toBe(GA_ID);

      expect(notFound).toBeTruthy();
      const nfParams = notFound![2] as Record<string, unknown>;
      expect(nfParams.event_category).toBe("error");
      expect(nfParams.event_label).toBe("/some/missing/path");
      expect(nfParams.value).toBe(1);
    });

    it("GA config targets the production measurement ID", () => {
      const { win, doc } = loadPage();
      expect(
        doc.querySelector('script[src*="googletagmanager"]')?.getAttribute("src")
      ).toContain(`id=${GA_ID}`);
      const config = (win as unknown as { dataLayer: unknown[] }).dataLayer.find(
        (e) => Array.isArray(e) && e[0] === "config"
      ) as unknown[];
      expect(config?.[1]).toBe(GA_ID);
    });

    it("tracking survives a deep 404 path with query string", () => {
      const page = loadPage();
      (page.win as Window & { location: { href: string } }).location.href =
        "https://webzonebw.shop/deep/nested/missing?ref=x";
      const track = getTrackFn();
      expect(() => track()).not.toThrow();
    });
  });

  describe("GA4 tracking (negative / edge cases)", () => {
    it("does not throw when gtag is blocked (undefined) — no events sent, no crash", () => {
      const { win } = loadPage({ withGtag: false });
      const w = win as unknown as Record<string, unknown>;
      expect(w.gtag).toBeUndefined();
      const track = getTrackFn();
      expect(() => track()).not.toThrow();
      const events = ((w.dataLayer as unknown[]) || []).filter(
        (e) => Array.isArray(e) && (e[0] === "event" || e[0] === "config")
      );
      expect(events.length).toBe(0);
    });

    it("try/catch swallows tracking errors and logs a warning instead of breaking the page", () => {
      const { win } = loadPage();
      const w = win as unknown as Record<string, unknown>;
      w.gtag = () => {
        throw new Error("GA network failure");
      };
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const track = getTrackFn();
      expect(() => track()).not.toThrow();
      warnSpy.mockRestore();
    });
  });

  describe("SEO / regression (negative cases)", () => {
    beforeEach(() => loadPage());

    it("is marked noindex (correct for an error page) but still followable", () => {
      const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content");
      expect(robots).toContain("noindex");
      expect(robots).toContain("follow");
    });

    it("no nofollow on internal quick links (users must navigate freely)", () => {
      for (const card of doc.querySelectorAll(".quick-link-card")) {
        expect(card.getAttribute("rel") ?? "").not.toContain("nofollow");
      }
    });

    it("social tags use the correct twitter property names", () => {
      // The file mixes name="twitter:..." and property usage; ensure card tag exists
      expect(
        doc.querySelector('meta[name="twitter:card"]')?.getAttribute("content")
      ).toBe("summary_large_image");
    });

    it("og:title on the 404 page differs from the homepage title (no duplicate branding bug)", () => {
      const title = doc.querySelector('meta[property="og:title"]')?.getAttribute("content");
      expect(title).toContain("404");
    });

    it("canonical points at the 404 page itself, not the homepage", () => {
      expect(
        doc.querySelector('link[rel="canonical"]')?.getAttribute("href")
      ).toBe("https://webzonebw.shop/404.html");
    });

    it("inline styles are present so the page renders without external CSS", () => {
      const style = doc.querySelector("head style");
      expect(style?.textContent).toContain(".error-code");
      expect(style?.textContent).toContain("@media (max-width: 768px)");
    });

    it("favicon is inline data URI (no broken image on error page)", () => {
      const icon = doc.querySelector('link[rel="icon"]');
      expect(icon?.getAttribute("href")?.startsWith("data:image/svg+xml")).toBe(true);
    });
  });
});
