import { esc } from '../lib/html.js';
import { services } from '../data/services.js';
import { whatsappUrl } from '../config.js';
import { icon } from './icons.js';
import { SectionHead } from './ui.js';

const list = (items) => `<ul class="bullets">${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;

function ServiceItem(svc) {
  const waMessage = `Olá, Luis! Vim pelo seu site e quero conversar sobre ${svc.title.toLowerCase()}.`;
  return `<li class="service" id="servico-${svc.id}">
    <div class="service__head">
      <p class="service__path">${esc(svc.path)}</p>
      <h3 class="service__title">${esc(svc.title)}</h3>
      <p class="service__benefit">${esc(svc.benefit)}</p>
      <p class="service__summary">${esc(svc.summary)}</p>
    </div>
    <details class="service__details" name="servicos" data-service-details>
      <summary class="service__toggle">
        <span class="service__toggle-text"><span class="when-closed">Ver detalhes</span><span class="when-open">Fechar detalhes</span><span class="sr-only"> de ${esc(svc.title)}</span></span>
        <span class="service__toggle-icon when-closed">${icon('plus', { size: 18 })}</span>
        <span class="service__toggle-icon when-open">${icon('minus', { size: 18 })}</span>
      </summary>
      <div class="service__body">
        <div class="service__block">
          <h4 class="service__label">Problema que costuma resolver</h4>
          <p>${esc(svc.problem)}</p>
        </div>
        <div class="service__block">
          <h4 class="service__label">O que pode ser desenvolvido</h4>
          ${list(svc.build)}
        </div>
        <div class="service__block">
          <h4 class="service__label">O que definimos juntos</h4>
          ${list(svc.define)}
        </div>
        <div class="service__block service__block--next">
          <h4 class="service__label">Próximo passo</h4>
          <p>${esc(svc.next)}</p>
          <div class="service__actions">
            <a class="btn btn--primary btn--sm" href="${esc(whatsappUrl(waMessage))}" target="_blank" rel="noopener">
              <span class="btn__label">Conversar sobre isso</span>${icon('arrow-up-right', { size: 18, className: 'btn__icon' })}<span class="sr-only"> (abre o WhatsApp em outra aba)</span>
            </a>
            <a class="btn btn--ghost btn--sm" href="#briefing" data-briefing-need="${esc(svc.briefingNeed)}">
              <span class="btn__label">Montar um briefing</span>${icon('arrow-right', { size: 18, className: 'btn__icon' })}
            </a>
          </div>
        </div>
      </div>
    </details>
  </li>`;
}

export function Services() {
  return `<section class="section services" id="servicos" aria-labelledby="servicos-title" data-spy="servicos">
  <div class="wrap">
    <div class="services__top">
      ${SectionHead({
        id: 'servicos',
        eyebrow: 'Serviços',
        title: 'O que posso desenvolver para você',
        lead: 'Cada serviço parte de um problema concreto. Abra os detalhes para ver o que pode ser feito, o que definimos juntos e como começar.',
      })}
    </div>
    <ul class="services__list">
      ${services.map(ServiceItem).join('')}
    </ul>
  </div>
</section>`;
}
