/**
 * Monograma "LE": as duas letras compartilham a mesma grade de 4 px,
 * dentro de um quadro de linha fina. É a assinatura visual do site.
 */
export function Monogram({ size = 36, title = '' } = {}) {
  const label = title
    ? `role="img" aria-label="${title}"`
    : 'aria-hidden="true" focusable="false"';
  return `<svg class="monogram" width="${size}" height="${size}" viewBox="0 0 40 40" ${label}>
  <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <g fill="currentColor">
    <rect x="8" y="10" width="3.5" height="20"/>
    <rect x="8" y="26.5" width="10" height="3.5"/>
    <rect x="21" y="10" width="3.5" height="20"/>
    <rect x="21" y="10" width="11" height="3.5"/>
    <rect x="21" y="18.25" width="8.5" height="3.5"/>
    <rect x="21" y="26.5" width="11" height="3.5"/>
  </g>
</svg>`;
}
