import { esc } from '../lib/html.js';
import { site, whatsappUrl, mailtoUrl } from '../config.js';
import { briefingSteps } from '../data/briefing.js';
import { icon } from './icons.js';

const TOTAL = briefingSteps.length + 1; // + resumo

function Option(step, opt) {
  const id = `bf-${step.id}-${opt.value}`;
  return `<label class="opt opt--${step.type}" for="${id}">
    <input type="${step.type}" id="${id}" name="${step.id}" value="${esc(opt.value)}" data-label="${esc(opt.label)}"${opt.exclusive ? ' data-exclusive' : ''}>
    <span class="opt__box" aria-hidden="true">${step.type === 'checkbox' ? icon('check', { size: 16 }) : '<span class="opt__dot"></span>'}</span>
    <span class="opt__label">${esc(opt.label)}</span>
  </label>`;
}

function TextField(field, { optional }) {
  const id = `bf-${field.id}`;
  const control = field.multiline
    ? `<textarea class="input input--area" id="${id}" name="${field.id}" rows="4" placeholder="${esc(field.placeholder)}" autocomplete="off" data-summary-label="${esc(field.summaryLabel)}"></textarea>`
    : `<input class="input" type="text" id="${id}" name="${field.id}" placeholder="${esc(field.placeholder)}" autocomplete="off" data-summary-label="${esc(field.summaryLabel)}">`;
  return `<div class="field">
    <label class="field__label" for="${id}">${esc(field.label)}${optional ? ' <span class="field__opt">(opcional)</span>' : ''}</label>
    ${control}
  </div>`;
}

function Step(step, i) {
  const hidden = i === 0 ? '' : ' hidden';
  const describedBy = `bf-help-${step.id} bf-error-${step.id}`;
  let body = '';
  if (step.type === 'contact') {
    body = `<div class="bf__fields">${step.fields.map((f) => TextField(f, { optional: true })).join('')}</div>`;
  } else {
    body = `<div class="bf__options bf__options--${step.type}" role="${step.type === 'radio' ? 'radiogroup' : 'group'}" aria-labelledby="bf-q-${step.id}">
      ${step.options.map((o) => Option(step, o)).join('')}
    </div>
    ${step.extra ? `<div class="bf__extra">${TextField({ ...step.extra, multiline: false }, { optional: true })}</div>` : ''}`;
  }

  return `<fieldset class="bf__step" id="bf-step-${step.id}" data-step="${step.id}" data-step-type="${step.type}" data-required="${step.required}" data-summary-label="${esc(step.summaryLabel || '')}" aria-describedby="${describedBy}"${hidden}>
    <legend class="bf__legend">
      <span class="bf__step-count">${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span>
      <span class="bf__question" id="bf-q-${step.id}" tabindex="-1" data-step-heading>${esc(step.question)}</span>
    </legend>
    <p class="bf__help" id="bf-help-${step.id}">${esc(step.help)}</p>
    ${step.id === 'need' ? `<p class="bf__preset" data-preset hidden>${icon('info', { size: 16 })}<span>Pré-selecionado a partir da sua escolha anterior. Você pode mudar.</span></p>` : ''}
    <p class="bf__error" id="bf-error-${step.id}" data-error role="alert" hidden></p>
    ${body}
  </fieldset>`;
}

export function Briefing() {
  const labels = [...briefingSteps.map((s) => s.short), 'Resumo'];
  const progress = labels
    .map(
      (label, i) => `<li class="bf__seg${i === 0 ? ' is-current' : ''}" data-progress-item>
        <span class="bf__seg-bar" aria-hidden="true"></span>
        <span class="bf__seg-label">${esc(label)}</span>
      </li>`,
    )
    .join('');

  return `<section class="section briefing theme-dark" id="briefing" aria-labelledby="briefing-title">
  <div class="wrap briefing__grid">
    <div class="briefing__intro">
      <header class="section-head">
        <p class="eyebrow"><span class="eyebrow__mark" aria-hidden="true"></span>Briefing</p>
        <h2 class="section-title" id="briefing-title">Vamos dar forma à sua ideia?</h2>
        <p class="section-lead">Cinco perguntas rápidas para organizar o que você tem em mente. No final, você confere o resumo e envia pelo WhatsApp, se quiser.</p>
      </header>
      <ul class="briefing__facts">
        <li>${icon('check', { size: 18 })}<span>Leva cerca de dois minutos. Você pode voltar e mudar qualquer resposta.</span></li>
        <li>${icon('check', { size: 18 })}<span>Nada é enviado nem guardado por este site. As respostas viram uma mensagem que você revisa antes de enviar.</span></li>
        <li>${icon('check', { size: 18 })}<span>Não gera preço automático. O orçamento vem depois da conversa, com base no escopo.</span></li>
      </ul>
    </div>

    <div class="briefing__app">
      <noscript>
        <div class="bf-noscript">
          <p>O briefing interativo precisa de JavaScript. Você pode conversar diretamente:</p>
          <p><a href="${esc(whatsappUrl())}">WhatsApp: ${esc(site.whatsapp.display)}</a></p>
          <p><a href="${esc(mailtoUrl('Projeto'))}">E-mail: ${esc(site.email)}</a></p>
        </div>
      </noscript>
      <form class="bf" data-briefing novalidate autocomplete="off" aria-labelledby="briefing-title">
        <div class="bf__progress">
          <p class="bf__progress-text" data-progress-text aria-live="polite">Etapa 1 de ${TOTAL} · ${esc(labels[0])}</p>
          <ol class="bf__segs" aria-hidden="true">${progress}</ol>
        </div>

        <div class="bf__steps">
          ${briefingSteps.map(Step).join('')}

          <div class="bf__step bf__summary" data-step="summary" hidden>
            <div class="bf__legend">
              <span class="bf__step-count">${String(TOTAL).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span>
              <h3 class="bf__question" tabindex="-1" data-step-heading>Confira antes de enviar</h3>
            </div>
            <p class="bf__help">Revise as respostas. Para mudar alguma, use “Editar”.</p>
            <dl class="bf-summary" data-summary></dl>

            <div class="bf-message">
              <p class="bf-message__label" id="bf-message-label">Mensagem que será colocada no WhatsApp</p>
              <pre class="bf-message__text" data-message aria-labelledby="bf-message-label" tabindex="0"></pre>
            </div>

            <div class="bf-confirm" role="note">
              ${icon('info', { size: 18 })}
              <p><strong>Antes de abrir:</strong> ao continuar, o WhatsApp abre com esta mensagem preenchida para ${esc(site.whatsapp.display)}. Nada é enviado automaticamente — você revisa e decide se envia.</p>
            </div>

            <div class="bf-final">
              <a class="btn btn--primary btn--md" href="${esc(whatsappUrl())}" target="_blank" rel="noopener" data-bf-whatsapp>
                <span class="btn__label">Abrir o WhatsApp para revisar e enviar</span>${icon('arrow-up-right', { size: 18, className: 'btn__icon' })}<span class="sr-only"> (abre em outra aba ou no aplicativo)</span>
              </a>
              <div class="bf-final__alt">
                <button type="button" class="btn btn--ghost btn--sm" data-bf-copy>
                  <span class="btn__label" data-label>Copiar mensagem</span>${icon('copy', { size: 18, className: 'btn__icon' })}
                </button>
                <a class="btn btn--ghost btn--sm" href="${esc(mailtoUrl('Projeto'))}" data-bf-mail>
                  <span class="btn__label">Enviar por e-mail</span>${icon('mail', { size: 18, className: 'btn__icon' })}
                </a>
              </div>
            </div>
            <p class="bf-after" data-bf-after role="status" hidden></p>
          </div>
        </div>

        <div class="bf__nav">
          <button type="button" class="btn btn--ghost btn--md" data-bf-back hidden>
            ${icon('arrow-left', { size: 18, className: 'btn__icon' })}<span class="btn__label">Voltar</span>
          </button>
          <button type="button" class="btn btn--ghost btn--md bf__reset" data-bf-reset hidden>
            ${icon('reset', { size: 18, className: 'btn__icon' })}<span class="btn__label" data-label>Recomeçar</span>
          </button>
          <button type="submit" class="btn btn--primary btn--md bf__next" data-bf-next>
            <span class="btn__label" data-label>Continuar</span>${icon('arrow-right', { size: 18, className: 'btn__icon' })}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>`;
}
