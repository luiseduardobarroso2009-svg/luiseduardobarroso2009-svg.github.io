import { esc } from '../lib/html.js';
import { processSteps, pricingNote } from '../data/process.js';
import { SectionHead } from './ui.js';

export function Process() {
  const steps = processSteps
    .map(
      (step, i) => `<li class="step">
        <p class="step__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</p>
        <p class="step__label"><span class="sr-only">Etapa ${i + 1}: </span>${esc(step.label)}</p>
        <h3 class="step__title">${esc(step.title)}</h3>
        <p class="step__text">${esc(step.text)}</p>
        <p class="step__outcome"><span class="step__outcome-label">Resultado</span> ${esc(step.outcome)}</p>
      </li>`,
    )
    .join('');

  return `<section class="section process" id="processo" aria-labelledby="processo-title" data-spy="processo">
  <div class="wrap">
    ${SectionHead({
      id: 'processo',
      eyebrow: 'Como funciona',
      title: 'Um processo simples, com você por perto',
      lead: 'Quatro etapas, cada uma com um resultado que você consegue ver. Nada começa a ser construído antes de estar claro o que será entregue.',
    })}
    <ol class="steps">${steps}</ol>
    <aside class="pricing-note" aria-labelledby="pricing-title">
      <h3 class="pricing-note__title" id="pricing-title">${esc(pricingNote.title)}</h3>
      <p class="pricing-note__text">${esc(pricingNote.text)}</p>
      <ul class="pricing-note__list">${pricingNote.factors.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    </aside>
  </div>
</section>`;
}
