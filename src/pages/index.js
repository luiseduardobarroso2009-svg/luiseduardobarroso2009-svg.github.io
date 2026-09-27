import { site } from '../config.js';
import { esc } from '../lib/html.js';
import { Head, personJsonLd } from '../components/Head.js';
import { Header } from '../components/Header.js';
import { Hero } from '../components/Hero.js';
import { Needs } from '../components/Needs.js';
import { Services } from '../components/Services.js';
import { Process } from '../components/Process.js';
import { Projects } from '../components/Projects.js';
import { Briefing } from '../components/Briefing.js';
import { Faq } from '../components/Faq.js';
import { Contact } from '../components/Contact.js';
import { Footer } from '../components/Footer.js';

/** Conteúdo do <body> da página inicial, na ordem da página. */
export function renderBody() {
  return `${Header()}
<main id="conteudo" tabindex="-1">
${Hero()}
${Needs()}
${Services()}
${Process()}
${Projects()}
${Briefing()}
${Faq()}
</main>
${Contact()}
${Footer()}`;
}

/** Estrutura HTML comum a todas as páginas. */
export function layout({ head, body, js }) {
  return `<!doctype html>
<html lang="${esc(site.lang)}">
<head>
${head}
</head>
<body>
${body}
${js ? `<script src="${esc(js)}" defer></script>` : ''}
</body>
</html>
`;
}

export function renderPage({ css, js }) {
  return layout({
    head: Head({ css, path: '', jsonLd: personJsonLd() }),
    body: renderBody(),
    js,
  });
}
