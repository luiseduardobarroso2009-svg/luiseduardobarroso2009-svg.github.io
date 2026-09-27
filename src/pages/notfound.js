import { site, whatsappUrl } from '../config.js';
import { esc } from '../lib/html.js';
import { Head } from '../components/Head.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { icon } from '../components/icons.js';
import { layout } from './index.js';

/**
 * Página 404.
 * Pode ser exibida em qualquer endereço (ex.: /pasta/qualquer), por isso
 * usa endereços absolutos para arquivos e links e traz o CSS embutido.
 */
export function renderNotFound({ inlineCss, js }) {
  const base = site.url ? `${site.url}/` : '/';

  const links = [
    { href: `${base}#servicos`, label: 'Ver os serviços' },
    { href: `${base}#briefing`, label: 'Organizar a ideia do meu projeto' },
    { href: `${base}#contato`, label: 'Falar com Luis Eduardo' },
  ]
    .map((l) => `<li><a href="${esc(l.href)}"><span>${esc(l.label)}</span>${icon('arrow-right', { size: 18 })}</a></li>`)
    .join('');

  const body = `${Header({ home: base })}
<main id="conteudo" tabindex="-1">
  <section class="notfound theme-dark" aria-labelledby="nf-title">
    <div class="hero__grid-bg" aria-hidden="true"></div>
    <div class="wrap notfound__inner">
      <p class="notfound__code">Erro 404 · Página não encontrada</p>
      <h1 class="notfound__title" id="nf-title">Este endereço <em>não leva a lugar nenhum.</em></h1>
      <p class="notfound__text">O link pode estar errado ou a página mudou de lugar. Nada se perdeu: escolha por onde continuar.</p>
      <div class="hero__actions">
        <a class="btn btn--primary btn--md" href="${esc(base)}"><span class="btn__label">Ir para a página inicial</span>${icon('arrow-right', { size: 18, className: 'btn__icon' })}</a>
        <a class="btn btn--secondary btn--md" href="${esc(whatsappUrl())}" target="_blank" rel="noopener"><span class="btn__label">Conversar pelo WhatsApp</span>${icon('arrow-up-right', { size: 18, className: 'btn__icon' })}<span class="sr-only"> (abre em outra aba)</span></a>
      </div>
      <ul class="notfound__links" aria-label="Atalhos">${links}</ul>
    </div>
  </section>
</main>
${Footer({ home: base })}`;

  return layout({
    head: Head({
      title: 'Página não encontrada — Luis Eduardo',
      description: 'Este endereço não existe no site de Luis Eduardo, Desenvolvedor Web Full Stack. Volte para a página inicial ou fale pelo WhatsApp.',
      path: '404.html',
      inlineCss,
      noindex: true,
      assetBase: base,
    }),
    body,
    js: `${base}${js}`,
  });
}
