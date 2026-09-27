import { site, mailtoUrl } from '../config.js';
import { esc } from '../lib/html.js';
import { Head } from '../components/Head.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { icon } from '../components/icons.js';
import { layout } from './index.js';

/** Converte os marcadores {email} e {whatsapp} em links, escapando o resto. */
function rich(text) {
  return esc(text)
    .replace('{email}', `<a href="${esc(mailtoUrl())}">${esc(site.email)}</a>`)
    .replace('{whatsapp}', esc(site.whatsapp.display));
}

function Section(section) {
  const paras = (arr = []) => arr.map((t) => `<p>${rich(t)}</p>`).join('');
  return `<section class="legal__section">
    <h2>${esc(section.h)}</h2>
    ${paras(section.p)}
    ${section.list ? `<ul>${section.list.map((t) => `<li>${rich(t)}</li>`).join('')}</ul>` : ''}
    ${paras(section.after)}
    ${section.link ? `<p><a href="${esc(section.link.href)}">${esc(section.link.label)}</a></p>` : ''}
  </section>`;
}

/** Página de texto longo (Política de Privacidade, Termos de Uso). */
export function renderLegalPage({ doc, path, css, js }) {
  const body = `${Header({ home: './' })}
<main id="conteudo" tabindex="-1" class="legal">
  <article class="wrap" aria-labelledby="legal-title">
    <header class="legal__head">
      <p class="eyebrow"><span class="eyebrow__mark" aria-hidden="true"></span>${esc(site.brand)} · ${esc(site.role)}</p>
      <h1 class="legal__title" id="legal-title">${esc(doc.title)}</h1>
      <p class="legal__updated">Última atualização: ${esc(site.legalUpdated)}</p>
      <p class="legal__summary">${esc(doc.summary)}</p>
    </header>
    <div class="legal__body">
      ${doc.sections.map(Section).join('')}
    </div>
    <a class="btn btn--secondary btn--md legal__back" href="./">
      ${icon('arrow-left', { size: 18, className: 'btn__icon' })}<span class="btn__label">Voltar para a página inicial</span>
    </a>
  </article>
</main>
${Footer({ home: './' })}`;

  return layout({
    head: Head({ title: doc.metaTitle, description: doc.metaDescription, path, css }),
    body,
    js,
  });
}
