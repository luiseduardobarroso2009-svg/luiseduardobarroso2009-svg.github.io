import { esc } from '../lib/html.js';
import { whatsappUrl } from '../config.js';
import { layers } from '../data/layers.js';
import { Button } from './ui.js';

/** Desenho esquemático de cada camada (decorativo, sem código simulado). */
const layerArt = {
  interface: `<span class="art art--ui">
      <span class="art-ui__bar"></span>
      <span class="art-ui__title"></span>
      <span class="art-ui__line"></span>
      <span class="art-ui__line art-ui__line--short"></span>
      <span class="art-ui__btn"></span>
    </span>`,
  logica: `<span class="art art--logic">
      <span class="art-logic__node">ação</span>
      <span class="art-logic__edge"></span>
      <span class="art-logic__node art-logic__node--rule">regra</span>
      <span class="art-logic__edge"></span>
      <span class="art-logic__node">resultado</span>
    </span>`,
  dados: `<span class="art art--data">${'<span class="art-data__cell"></span>'.repeat(12)}</span>`,
};

function LayerDiagram() {
  const tabs = layers
    .map(
      (layer, i) => `<button class="layer" type="button" role="tab" id="layer-tab-${layer.id}"
        aria-controls="layer-panel-${layer.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-layer-tab>
        <span class="layer__meta">
          <span class="layer__index">L${i + 1}</span>
          <span class="layer__state" aria-hidden="true">em foco</span>
        </span>
        <span class="layer__name">${esc(layer.name)}</span>
        <span class="layer__hint">${esc(layer.hint)}</span>
        ${layerArt[layer.id]}
      </button>`,
    )
    .join('');

  const panels = layers
    .map(
      (layer, i) => `<div class="layer-panel" role="tabpanel" id="layer-panel-${layer.id}"
        aria-labelledby="layer-tab-${layer.id}" tabindex="0" ${i === 0 ? '' : 'data-initially-hidden'}>
        <p class="layer-panel__kicker">Camada ${i + 1} de ${layers.length} · ${esc(layer.name)}</p>
        <p class="layer-panel__text">${esc(layer.text)}</p>
        <dl class="layer-panel__facts">
          <div><dt>Exemplo</dt><dd>${esc(layer.example)}</dd></div>
          <div><dt>Você define</dt><dd>${esc(layer.decide)}</dd></div>
        </dl>
      </div>`,
    )
    .join('');

  return `<figure class="layers" data-layers>
    <figcaption class="layers__caption">
      <span class="layers__caption-title">Anatomia de um produto web</span>
      <span class="layers__caption-help">Selecione uma camada</span>
    </figcaption>
    <div class="layers__stack" role="tablist" aria-label="Camadas de um produto web" aria-orientation="vertical">
      ${tabs}
    </div>
    <div class="layers__panels">${panels}</div>
  </figure>`;
}

export function Hero() {
  return `<section class="hero theme-dark" id="inicio" aria-labelledby="hero-title">
  <div class="hero__grid-bg" aria-hidden="true"></div>
  <div class="hero__inner wrap">
    <div class="hero__copy">
      <p class="eyebrow eyebrow--hero"><span class="eyebrow__mark" aria-hidden="true"></span>Desenvolvimento web · Full stack</p>
      <h1 class="hero__title" id="hero-title">Sua ideia pode virar um produto web <span class="hero__title-em">de verdade.</span></h1>
      <p class="hero__lead">Desenvolvo sites, sistemas e integrações sob medida, do planejamento à publicação. Código bem pensado, experiência simples para quem usa e comunicação clara durante todo o projeto.</p>
      <div class="hero__actions">
        ${Button({
          href: whatsappUrl(),
          label: 'Conversar sobre meu projeto',
          variant: 'primary',
          iconName: 'arrow-up-right',
          external: true,
        })}
        ${Button({
          href: '#servicos',
          label: 'Ver o que posso desenvolver',
          variant: 'secondary',
          iconName: 'arrow-down',
        })}
      </div>
      <p class="hero__sig">
        <span>Luis Eduardo Barroso Santos</span>
        <span aria-hidden="true">/</span>
        <span>Desenvolvedor Web Full Stack</span>
      </p>
    </div>
    <div class="hero__visual">
      ${LayerDiagram()}
    </div>
  </div>
</section>`;
}
