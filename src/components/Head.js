import { esc } from '../lib/html.js';
import { site } from '../config.js';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap';

/**
 * <head> de cada página.
 * title / description: únicos por página.
 * path: caminho da página a partir da raiz ('' para a inicial, 'privacidade.html'…).
 * assetBase: prefixo dos arquivos (vazio nas páginas normais; URL absoluta na 404).
 */
export function Head({
  title = site.title,
  description = site.description,
  path = '',
  css,
  inlineCss = '',
  noindex = false,
  assetBase = '',
  type = 'website',
  jsonLd = null,
}) {
  const abs = (p) => (site.url ? `${site.url}/${p}` : p);
  const pageUrl = site.url ? `${site.url}/${path}` : '';
  const ogImage = abs('og-image.png');
  const a = (p) => `${assetBase}${p}`;

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(site.fullName)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#0B0C0C">
${pageUrl && !noindex ? `<link rel="canonical" href="${esc(pageUrl)}">` : ''}
${site.googleVerification ? `<meta name="google-site-verification" content="${esc(site.googleVerification)}">` : ''}
<meta property="og:type" content="${type}">
<meta property="og:locale" content="${esc(site.locale)}">
<meta property="og:site_name" content="${esc(site.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${pageUrl ? `<meta property="og:url" content="${esc(pageUrl)}">` : ''}
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Monograma LE e o texto: Luis Eduardo, Desenvolvedor Web Full Stack.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<link rel="icon" href="${a('favicon.ico')}" sizes="48x48">
<link rel="icon" href="${a('favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${a('apple-touch-icon.png')}">
<link rel="manifest" href="${a('site.webmanifest')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<script>document.documentElement.classList.add('js')</script>
${inlineCss ? `<style>${inlineCss}</style>` : `<link rel="stylesheet" href="${esc(a(css))}">`}
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}`;
}

/** Dados estruturados da página inicial (schema.org). */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.fullName,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: `+${site.whatsapp.number}`,
    ...(site.url ? { url: `${site.url}/` } : {}),
    knowsAbout: [
      'Desenvolvimento web',
      'Sites e landing pages',
      'Lojas virtuais',
      'Sistemas web',
      'APIs',
      'Integrações entre sistemas',
    ],
  };
}
