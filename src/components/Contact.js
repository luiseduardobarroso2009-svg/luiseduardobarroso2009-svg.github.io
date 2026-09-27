import { esc } from '../lib/html.js';
import { site, whatsappUrl, mailtoUrl } from '../config.js';
import { icon } from './icons.js';
import { Monogram } from './Monogram.js';
import { CopyButton } from './ui.js';

export function Contact() {
  return `<section class="contact theme-dark" id="contato" aria-labelledby="contato-title" data-spy="contato">
  <div class="wrap">
    <div class="contact__head">
      <p class="eyebrow"><span class="eyebrow__mark" aria-hidden="true"></span>Contato</p>
      <h2 class="contact__title" id="contato-title">Tem um projeto em mente? <span class="contact__title-em">Vamos conversar.</span></h2>
      <p class="section-lead">Conte o que você precisa, mesmo que a ideia ainda esteja no começo. Eu respondo com perguntas, próximos passos e o que dá para fazer.</p>
    </div>

    <ul class="channels">
      <li class="channel">
        <p class="channel__kind">${icon('chat', { size: 18 })}WhatsApp</p>
        <p class="channel__value"><span class="channel__text" id="contact-phone">${esc(site.whatsapp.display)}</span></p>
        <div class="channel__actions">
          <a class="btn btn--primary btn--md" href="${esc(whatsappUrl())}" target="_blank" rel="noopener">
            <span class="btn__label">Abrir conversa</span>${icon('arrow-up-right', { size: 18, className: 'btn__icon' })}<span class="sr-only"> no WhatsApp (abre em outra aba)</span>
          </a>
          ${CopyButton({ id: 'copy-phone', value: site.whatsapp.display, label: 'Copiar número', copiedLabel: 'Número copiado' })}
        </div>
      </li>
      <li class="channel">
        <p class="channel__kind">${icon('mail', { size: 18 })}E-mail</p>
        <p class="channel__value"><span class="channel__text channel__text--email" id="contact-email">${esc(site.email)}</span></p>
        <div class="channel__actions">
          <a class="btn btn--secondary btn--md" href="${esc(mailtoUrl())}">
            <span class="btn__label">Escrever e-mail</span>${icon('arrow-up-right', { size: 18, className: 'btn__icon' })}
          </a>
          ${CopyButton({ id: 'copy-email', value: site.email, label: 'Copiar e-mail', copiedLabel: 'E-mail copiado' })}
        </div>
      </li>
    </ul>
  </div>
</section>
`;
}
