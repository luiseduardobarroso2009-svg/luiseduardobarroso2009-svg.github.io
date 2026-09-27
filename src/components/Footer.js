import { esc } from '../lib/html.js';
import { site } from '../config.js';
import { icon } from './icons.js';
import { Monogram } from './Monogram.js';

/**
 * Rodapé comum a todas as páginas.
 * home: prefixo para links da página inicial ('' na inicial, './' nas demais).
 */
export function Footer({ home = '' } = {}) {
  return `<footer class="site-footer theme-dark">
  <div class="wrap site-footer__inner">
    <div class="site-footer__id">
      ${Monogram({ size: 40 })}
      <p><strong>${esc(site.fullName)}</strong><br>${esc(site.role)}</p>
    </div>
    <div class="site-footer__legal">
      <p class="site-footer__note">Este site não usa cookies e não guarda as respostas do briefing.</p>
      <ul class="site-footer__links">
        <li><a href="${home}privacidade.html">Política de Privacidade</a></li>
        <li><a href="${home}termos.html">Termos de Uso</a></li>
      </ul>
    </div>
    <p class="site-footer__meta">
      <span>© ${new Date().getFullYear()} ${esc(site.fullName)}</span>
      <a href="${home ? `${home}#inicio` : '#inicio'}">${home ? 'Página inicial' : 'Voltar ao topo'} ${icon('arrow-right', { size: 16, className: home ? '' : 'rot-up' })}</a>
    </p>
  </div>
</footer>

<div class="toast" data-toast role="status" aria-live="polite" aria-atomic="true">
  <span class="toast__icon" data-toast-icon></span>
  <span class="toast__text" data-toast-text></span>
</div>`;
}
