import { readdirSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getHtmlFiles() {
  const pagesDir = resolve(__dirname, "");
  const entries = {};

  const files = readdirSync(pagesDir);

  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  for (const html of htmlFiles) {
    const name = basename(html, ".html");
    entries[name] = resolve(pagesDir, html);
  }

  return entries;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: getHtmlFiles(),
    },
  },
});
