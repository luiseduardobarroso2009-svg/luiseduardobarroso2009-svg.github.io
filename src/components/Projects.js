import { esc } from '../lib/html.js';
import { projects } from '../data/projects.js';
import { whatsappUrl } from '../config.js';
import { icon } from './icons.js';
import { SectionHead, Button } from './ui.js';

function ProjectCard(p) {
  const media = p.image
    ? `<img class="project__img" src="${esc(p.image)}" alt="${esc(p.imageAlt || '')}" loading="lazy" decoding="async" width="1200" height="750">`
    : '';
  const meta = [p.type, p.year].filter(Boolean).map(esc).join(' · ');
  return `<li class="project">
    ${media}
    <div class="project__body">
      ${p.demo ? '<p class="badge">Demonstração — não é um projeto de cliente</p>' : ''}
      ${meta ? `<p class="project__meta">${meta}</p>` : ''}
      <h3 class="project__title">${esc(p.title)}</h3>
      <p class="project__summary">${esc(p.summary)}</p>
      ${p.stack?.length ? `<ul class="project__stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
      ${
        p.url
          ? `<a class="project__link" href="${esc(p.url)}" target="_blank" rel="noopener">Ver projeto${icon('arrow-up-right', { size: 16 })}<span class="sr-only"> ${esc(p.title)} (abre em outra aba)</span></a>`
          : ''
      }
    </div>
  </li>`;
}

function EmptyState() {
  return `<div class="projects-empty">
    <div class="projects-empty__art" aria-hidden="true">
      <span class="pe-plate pe-plate--1"></span>
      <span class="pe-plate pe-plate--2"></span>
      <span class="pe-plate pe-plate--3"></span>
    </div>
    <div class="projects-empty__copy">
      <p class="projects-empty__kicker">Converse antes de decidir</p>
      <h3 class="projects-empty__title">Quer conversar sobre uma ideia parecida com a sua?</h3>
      <p class="projects-empty__text">Esta seção vai reunir projetos reais, apresentados com autorização. Enquanto isso, a forma mais direta de saber se faz sentido trabalharmos juntos é conversar sobre o seu caso.</p>
      <div class="projects-empty__actions">
        ${Button({ href: whatsappUrl(), label: 'Conversar pelo WhatsApp', variant: 'primary', iconName: 'arrow-up-right', external: true })}
        ${Button({ href: '#briefing', label: 'Organizar minha ideia antes', variant: 'ghost', iconName: 'arrow-right' })}
      </div>
    </div>
  </div>`;
}

export function Projects() {
  const hasProjects = projects.length > 0;
  return `<section class="section projects" id="projetos" aria-labelledby="projetos-title" data-spy="projetos">
  <div class="wrap">
    ${SectionHead({
      id: 'projetos',
      eyebrow: 'Projetos',
      title: hasProjects ? 'Trabalhos selecionados' : 'Projetos',
      lead: hasProjects ? 'Alguns projetos, com o problema de cada um e o que foi construído.' : '',
    })}
    ${hasProjects ? `<ul class="projects__grid">${projects.map(ProjectCard).join('')}</ul>` : EmptyState()}
  </div>
</section>`;
}
