import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(__dirname, "..");
const SITE_PAGES = [
  "index.html",
  "index-classroom.html",
  "404.html",
  "learn.html",
  "webtools.html",
  "Workspace.html",
  "blog.html",
  "about.html",
  "contact.html",
  "privacy-policy.html",
  "terms-of-service.html",
  "cookie-policy.html",
  "developertools.html",
  "imagetools.html",
];

/** hrefs that are legitimately non-navigational */
const ALLOWED_HREFS = new Set([
  "#", // pure in-page anchors handled by JS smooth-scroll are allowed only when a matching id exists — checked separately
]);

function hrefsOf(file: string) {
  const doc = readFileSync(resolve(root, file), "utf-8");
  return Array.from(doc.matchAll(/<a\s[^>]*href="([^"]*)"/g)).map((m) => m[1]);
}

describe("connection checks — no dead internal links", () => {
  describe.each(SITE_PAGES)("%s", (file) => {
    it("has no broken internal page links (learning-path.html regression)", () => {
      for (const href of hrefsOf(file)) {
        if (!href.startsWith("/")) continue; // external / mailto / anchor-only
        const path = href.split("#")[0].split("?")[0];
        const target = path === "/" ? "index.html" : decodeURIComponent(path.replace(/^\//, ""));
        // /learning-path.html was a dead link shipped by accident — regression guard
        expect(target, `${file} → ${href}`).not.toBe("learning-path.html");
        if (target === "sitemap.xml") continue;
        expect(
          existsSync(resolve(root, target)) ||
            existsSync(resolve(root, "dist", target)) ||
            existsSync(resolve(root, "public", target)),
          `${file} → ${href} points to a missing file`
        ).toBe(true);
      }
    });

    it("has no href='#' placeholder links (dead social buttons regression)", () => {
      const raw = readFileSync(resolve(root, file), "utf-8");
      const dead = Array.from(raw.matchAll(/<a\s[^>]*href="#"/g)).map((m) => m[0]);
      // Smooth-scroll anchors are fine only if they point at a real element id;
      // bare href="#" placeholders are always a bug.
      expect(dead, `${file} contains ${dead.length} dead '#' link(s): ${dead.join(", ")}`).toHaveLength(0);
    });
  });

  it("every in-page anchor link has a matching element id", () => {
    for (const file of SITE_PAGES) {
      const raw = readFileSync(resolve(root, file), "utf-8");
      const ids = new Set(Array.from(raw.matchAll(/id="([^"]+)"/g)).map((m) => m[1]));
      for (const href of hrefsOf(file)) {
        if (!href.startsWith("#")) continue;
        const id = href.slice(1);
        expect(
          ids.has(id) || id === "",
          `${file} → ${href} has no matching id on the page`
        ).toBe(true);
      }
    }
  });

  it("classroom page is theme-consistent with the site", () => {
    const classroom = readFileSync(resolve(root, "index-classroom.html"), "utf-8");
    expect(classroom).toContain('meta name="theme-color" content="#0f172a"');
    expect(classroom).not.toContain("#1a1a2e");
  });

  it("classroom page tracks under its own title, not 'Home'", () => {
    const classroom = readFileSync(resolve(root, "index-classroom.html"), "utf-8");
    expect(classroom).toContain("page_title: 'Interactive Web Development Classroom'");
    expect(classroom).toMatch(/function trackClassroomPage/);
  });
});
