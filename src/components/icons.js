/**
 * Família única de ícones: grade 24×24, traço 1.5, pontas retas.
 * Uso: icon('arrow-right') → SVG decorativo (aria-hidden).
 */
const paths = {
  'arrow-right': '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M20 12H5"/><path d="M11 6l-6 6 6 6"/>',
  'arrow-up-right': '<path d="M7 17L17 7"/><path d="M8 7h9v9"/>',
  'arrow-down': '<path d="M12 4v15"/><path d="M6 13l6 6 6-6"/>',
  copy: '<rect x="8.75" y="8.75" width="11.5" height="11.5"/><path d="M15.25 8.75V3.75H3.75v11.5h5"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  mail: '<rect x="3" y="5.25" width="18" height="13.5"/><path d="M3 6.5l9 6.75 9-6.75"/>',
  chat: '<path d="M4 4.75h16v11.5H9.5L4 20.25z"/><path d="M8 9.25h8"/><path d="M8 12.25h5"/>',
  menu: '<path d="M3 8h18"/><path d="M3 16h18"/>',
  close: '<path d="M5.5 5.5l13 13"/><path d="M18.5 5.5l-13 13"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  alert: '<path d="M12 3.5l9.5 17h-19z"/><path d="M12 10v5"/><path d="M12 17.25v1"/>',
  edit: '<path d="M4 20h4.5L19.5 9 15 4.5 4 15.5z"/><path d="M13 6.5l4.5 4.5"/>',
  reset: '<path d="M4 4.5v5.25h5.25"/><path d="M4.75 9.5A8 8 0 1 1 5 15"/>',
  info: '<rect x="3.75" y="3.75" width="16.5" height="16.5"/><path d="M12 10.5v6"/><path d="M12 7.25v1"/>',
};

export function icon(name, { size = 20, className = '' } = {}) {
  const body = paths[name];
  if (!body) throw new Error(`Ícone desconhecido: ${name}`);
  return `<svg class="icon${className ? ` ${className}` : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true" focusable="false">${body}</svg>`;
}

/** Os mesmos ícones em formato de dados, para o script do navegador. */
export const iconPaths = paths;
