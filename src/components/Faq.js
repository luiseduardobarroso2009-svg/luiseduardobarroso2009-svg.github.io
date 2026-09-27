import { esc } from '../lib/html.js';
import { faq } from '../data/faq.js';
import { icon } from './icons.js';
import { SectionHead } from './ui.js';

export function Faq() {
  const items = faq
    .map(
      (item) => `<details class="faq__item">
        <summary class="faq__q">
          <span class="faq__q-text">${esc(item.q)}</span>
          <span class="faq__icon faq__icon--plus">${icon('plus', { size: 20 })}</span>
          <span class="faq__icon faq__icon--minus">${icon('minus', { size: 20 })}</span>
        </summary>
        <div class="faq__a">${item.a.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
      </details>`,
    )
    .join('');

  return `<section class="section faq" id="perguntas" aria-labelledby="perguntas-title">
  <div class="wrap faq__grid">
    ${SectionHead({
      id: 'perguntas',
      eyebrow: 'Perguntas frequentes',
      title: 'Antes de conversar',
      lead: 'Respostas diretas para as dúvidas mais comuns. Se a sua não estiver aqui, é só perguntar.',
    })}
    <div class="faq__list">${items}</div>
  </div>
</section>`;
}
