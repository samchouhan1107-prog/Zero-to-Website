import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["server/**/*.test.ts", "tests/**/*.test.ts"],
    environmentMatchGlobs: [["tests/**", "happy-dom"]],
    environment: "node",
  },
});
