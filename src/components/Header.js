import { esc } from '../lib/html.js';
import { site, whatsappUrl } from '../config.js';
import { icon } from './icons.js';
import { Monogram } from './Monogram.js';
import { Button } from './ui.js';

export const navItems = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

/** home: prefixo dos links internos ('' na página inicial, './' nas demais). */
export function Header({ home = '' } = {}) {
  const links = navItems
    .map(
      (item) =>
        `<li><a class="nav__link" href="${home}${item.href}" data-nav-link>${esc(item.label)}</a></li>`,
    )
    .join('');

  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header theme-dark" data-header data-wa-number="${esc(site.whatsapp.number)}" data-wa-display="${esc(site.whatsapp.display)}" data-email="${esc(site.email)}">
  <div class="site-header__inner wrap">
    <a class="brand" href="${home}#inicio" aria-label="${esc(site.brand)}, ${esc(site.role)} — voltar ao início">
      ${Monogram({ size: 34 })}
      <span class="brand__text">
        <span class="brand__name">${esc(site.brand)}</span>
        <span class="brand__role">${esc(site.role)}</span>
      </span>
    </a>

    <nav class="nav" aria-label="Principal">
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-panel" data-nav-toggle>
        <span class="nav__toggle-icon nav__toggle-icon--open">${icon('menu', { size: 22 })}</span>
        <span class="nav__toggle-icon nav__toggle-icon--close">${icon('close', { size: 22 })}</span>
        <span class="nav__toggle-label" data-nav-toggle-label>Menu</span>
      </button>
      <div class="nav__panel" id="nav-panel" data-nav-panel>
        <ul class="nav__list">${links}</ul>
        ${Button({
          href: whatsappUrl(),
          label: 'Vamos conversar',
          variant: 'primary',
          size: 'sm',
          iconName: 'arrow-up-right',
          external: true,
          extra: { class: 'nav__cta' },
        })}
      </div>
    </nav>
  </div>
</header>`;
}
