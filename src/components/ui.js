import { esc, attrs } from '../lib/html.js';
import { icon } from './icons.js';

/**
 * Botão ou link com aparência de botão.
 * variant: 'primary' | 'secondary' | 'ghost'
 * Links externos abrem em nova aba e recebem um texto oculto avisando isso.
 */
export function Button({
  href,
  label,
  variant = 'primary',
  iconName,
  external = false,
  size = 'md',
  extra = {},
  type = 'button',
}) {
  const cls = `btn btn--${variant} btn--${size}${extra.class ? ` ${extra.class}` : ''}`;
  const { class: _omit, ...rest } = extra;
  const inner = `<span class="btn__label">${esc(label)}</span>${iconName ? icon(iconName, { size: 18, className: 'btn__icon' }) : ''}${external ? '<span class="sr-only"> (abre em outra aba)</span>' : ''}`;
  if (href) {
    return `<a ${attrs({
      class: cls,
      href,
      target: external ? '_blank' : null,
      rel: external ? 'noopener' : null,
      ...rest,
    })}>${inner}</a>`;
  }
  return `<button ${attrs({ class: cls, type, ...rest })}>${inner}</button>`;
}

/** Cabeçalho padrão de seção: rótulo técnico, título e texto de apoio. */
export function SectionHead({ id, eyebrow, title, lead, align = 'start' }) {
  return `<header class="section-head section-head--${align}">
    <p class="eyebrow"><span class="eyebrow__mark" aria-hidden="true"></span>${esc(eyebrow)}</p>
    <h2 class="section-title" id="${esc(id)}-title">${esc(title)}</h2>
    ${lead ? `<p class="section-lead">${esc(lead)}</p>` : ''}
  </header>`;
}

/** Botão que copia um texto e anuncia o resultado. */
export function CopyButton({ value, label, copiedLabel, id }) {
  return `<button type="button" class="copy-btn" id="${esc(id)}" data-copy="${esc(value)}" data-copied-label="${esc(copiedLabel)}">
    <span class="copy-btn__icon copy-btn__icon--idle">${icon('copy', { size: 18 })}</span>
    <span class="copy-btn__icon copy-btn__icon--done">${icon('check', { size: 18 })}</span>
    <span class="copy-btn__label" data-label>${esc(label)}</span>
  </button>`;
}
