/**
 * Build sem dependências.
 * Gera /dist com HTML estático (conteúdo já renderizado, bom para buscadores),
 * um CSS e um JS únicos, e copia os arquivos de /public.
 *
 *   node build.mjs
 */
import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

// Ordem importa: tokens → base → componentes → seções.
const cssFiles = ['tokens.css', 'base.css', 'components.css', 'sections.css'];
const jsFiles = ['main.js'];

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 8);

async function readAll(dir, files) {
  const parts = await Promise.all(files.map((f) => readFile(join(root, dir, f), 'utf8')));
  return parts.join('\n');
}

/** Minificação conservadora de CSS: remove comentários e espaços redundantes. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/:\s+/g, ':')
    .replace(/;}/g, '}')
    .trim();
}

export async function build({ quiet = false } = {}) {
  const started = Date.now();
  const mod = (p) => import(pathToFileURL(join(root, p)).href);
  const { renderPage } = await mod('src/pages/index.js');
  const { renderLegalPage } = await mod('src/pages/legal.js');
  const { renderNotFound } = await mod('src/pages/notfound.js');
  const { privacy, terms } = await mod('src/data/legal.js');
  const { site } = await mod('src/config.js');

  const css = minifyCss(await readAll('src/styles', cssFiles));
  const js = await readAll('src/scripts', jsFiles);

  const cssName = `assets/site.${hash(css)}.css`;
  const jsName = `assets/site.${hash(js)}.js`;

  await rm(out, { recursive: true, force: true });
  await mkdir(join(out, 'assets'), { recursive: true });
  await cp(join(root, 'public'), out, { recursive: true });

  await writeFile(join(out, cssName), css);
  await writeFile(join(out, jsName), js);

  // Páginas. Cada uma tem title, description e canonical próprios.
  const pages = [
    { file: 'index.html', path: '', html: renderPage({ css: cssName, js: jsName }), priority: '1.0' },
    { file: 'privacidade.html', path: 'privacidade.html', html: renderLegalPage({ doc: privacy, path: 'privacidade.html', css: cssName, js: jsName }), priority: '0.3' },
    { file: 'termos.html', path: 'termos.html', html: renderLegalPage({ doc: terms, path: 'termos.html', css: cssName, js: jsName }), priority: '0.3' },
  ];
  for (const page of pages) await writeFile(join(out, page.file), page.html);

  // 404: fora do sitemap, com noindex e CSS embutido (funciona em qualquer endereço).
  await writeFile(join(out, '404.html'), renderNotFound({ inlineCss: css, js: jsName }));

  // Sitemap e robots.txt precisam do endereço final.
  if (site.url) {
    const today = new Date().toISOString().slice(0, 10);
    const urls = pages
      .map((p) => `  <url><loc>${site.url}/${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
      .join('\n');
    await writeFile(
      join(out, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
    const robots = await readFile(join(out, 'robots.txt'), 'utf8');
    await writeFile(join(out, 'robots.txt'), `${robots.trim()}\n\nSitemap: ${site.url}/sitemap.xml\n`);
  } else if (!quiet) {
    console.warn('! site.url vazio em src/config.js: sitemap.xml e links canônicos não foram gerados.');
  }

  if (!quiet) {
    console.log(`✓ build em ${Date.now() - started} ms → dist/ (${pages.map((p) => p.file).join(', ')}, 404.html)`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
