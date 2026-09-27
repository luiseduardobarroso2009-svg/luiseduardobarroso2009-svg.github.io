const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto para uso seguro em HTML (conteúdo e atributos). */
export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Junta pedaços de HTML ignorando valores vazios. */
export const join = (parts, sep = '') => parts.filter(Boolean).join(sep);

/** Monta atributos a partir de um objeto. `true` vira atributo booleano; false/null são ignorados. */
export const attrs = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== false && v !== null && v !== undefined)
    .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
    .join(' ');
