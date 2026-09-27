import { esc } from '../lib/html.js';
import { needs } from '../data/needs.js';
import { serviceById } from '../data/services.js';
import { icon } from './icons.js';

function NeedPanel(need, i) {
  const list = need.services.length
    ? `<ul class="need-result__list">
        ${need.services
          .map((s) => {
            const svc = serviceById[s.id];
            return `<li class="need-result__item">
              <a class="need-result__service" href="#servico-${svc.id}" data-open-service="${svc.id}">
                <span class="need-result__path">${esc(svc.path)}</span>
                <span class="need-result__name">${esc(svc.title)}</span>
                ${icon('arrow-right', { size: 18 })}
              </a>
              <p class="need-result__why">${esc(s.why)}</p>
            </li>`;
          })
          .join('')}
      </ul>`
    : `<p class="need-result__fallback">${esc(need.fallback)}</p>`;

  return `<div class="need-result" id="need-panel-${need.id}" data-need-panel="${need.id}" ${i === 0 ? '' : 'data-initially-hidden'}>
    <p class="need-result__label">Para “${esc(need.label.replace(/\.$/, ''))}”</p>
    <p class="need-result__intro">${esc(need.intro)}</p>
    ${need.services.length ? '<p class="need-result__sub">Serviços que podem fazer sentido</p>' : ''}
    ${list}
    <p class="need-result__note">${icon('info', { size: 16 })}<span>Isto é um ponto de partida para a conversa, não um diagnóstico. A indicação certa depende de entender o seu contexto.</span></p>
    <a class="btn btn--primary btn--md" href="#briefing" data-briefing-need="${esc(need.briefingNeed)}">
      <span class="btn__label">Começar o briefing com esta opção</span>${icon('arrow-right', { size: 18, className: 'btn__icon' })}
    </a>
  </div>`;
}

export function Needs() {
  const options = needs
    .map(
      (need, i) => `<label class="need-option">
        <input type="radio" name="need-picker" value="${need.id}" ${i === 0 ? 'checked' : ''} aria-controls="need-panel-${need.id}">
        <span class="need-option__box" aria-hidden="true"></span>
        <span class="need-option__label">${esc(need.label)}</span>
      </label>`,
    )
    .join('');

  return `<section class="section needs" id="necessidades" aria-labelledby="necessidades-title" data-spy="servicos">
  <div class="wrap needs__grid">
    <div class="needs__intro">
      <header class="section-head">
        <p class="eyebrow"><span class="eyebrow__mark" aria-hidden="true"></span>Por onde começar</p>
        <h2 class="section-title" id="necessidades-title">O que você precisa colocar no ar?</h2>
        <p class="section-lead">Escolha a frase que mais parece com a sua situação. Eu mostro quais serviços costumam ajudar e por quê.</p>
      </header>
      <fieldset class="needs__options" data-needs>
        <legend class="sr-only">Sua situação</legend>
        ${options}
      </fieldset>
    </div>
    <div class="needs__result" aria-live="polite">
      ${needs.map(NeedPanel).join('')}
    </div>
  </div>
</section>`;
}
