import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { generateSitemap } from './src/seo/generateSitemap';
import { SITE_ORIGIN, type PageRegistryEntry } from './src/seo/pageRegistry';

const coreRoot = resolve(process.cwd(), '..', 'core');

async function loadRegistry(): Promise<PageRegistryEntry[]> {
  // pageRegistry.ts re-exports no UI dependencies, but bundling it dynamically
  // keeps imports transitive-free. Write the compiled output to a stable temp
  // file so dynamic import() can resolve it.
  const tmpDir = resolve(tmpdir(), 'frylane-sitemap');
  mkdirSync(tmpDir, { recursive: true });
  const tmpFile = resolve(tmpDir, 'pageRegistry.mjs');
  const out = await build({
    entryPoints: [resolve(process.cwd(), 'src/seo/pageRegistry.ts')],
    bundle: false,
    format: 'esm',
    platform: 'node',
    write: false,
    sourcemap: false,
    outfile: tmpFile,
  });
  writeFileSync(tmpFile, out.outputFiles[0].text, 'utf8');
  try {
    const mod = (await import(pathToFileURL(tmpFile).href)) as {
      PAGE_REGISTRY: PageRegistryEntry[];
    };
    return mod.PAGE_REGISTRY;
  } finally {
    rmSync(tmpFile, { force: true });
  }
}

function sitemapPlugin(): Plugin {
  return {
    name: 'frylane-sitemap',
    apply: 'build',
    async closeBundle() {
      const registry = await loadRegistry();
      const xml = generateSitemap(registry, SITE_ORIGIN);
      const publicDir = resolve(process.cwd(), 'public');
      const distDir = resolve(process.cwd(), 'dist');
      writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8');
      // Vite copies public/* into dist/ before closeBundle fires; rewrite
      // dist/sitemap.xml so the production bundle reflects the registry.
      writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf8');
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@core/': `${coreRoot}/`,
      '@design-system': resolve(process.cwd(), '..', 'design-system', 'tokens', 'index.ts'),
      '@design-system/': resolve(process.cwd(), '..', 'design-system') + '/',
    },
  },
});