/**
 * Dados principais do site.
 * Tudo o que aparece como contato, nome ou metadado vem daqui.
 */
export const site = {
  brand: 'Luis Eduardo',
  fullName: 'Luis Eduardo Barroso Santos',
  role: 'Desenvolvedor Web Full Stack',

  // Endereço final do site, sem barra no fim.
  // Se trocar de endereço (ex.: domínio próprio), mude aqui e gere o build de novo.
  url: 'https://luiseduardobarroso2009-svg.github.io',

  // Código de verificação do Google Search Console (método "Tag HTML").
  // Cole só o valor de content="…". Deixe vazio se não usar.
  googleVerification: '',

  // Data da última revisão da Política de Privacidade e dos Termos de Uso.
  legalUpdated: '27 de setembro de 2026',

  lang: 'pt-BR',
  locale: 'pt_BR',

  title: 'Luis Eduardo — Desenvolvedor Web Full Stack',
  description:
    'Sites, lojas virtuais, sistemas web, APIs e integrações sob medida — do planejamento à publicação. Converse com Luis Eduardo sobre o seu projeto.',

  whatsapp: {
    display: '+55 64 99342-8204',
    number: '5564993428204',
    defaultMessage:
      'Olá, Luis! Vim pelo seu site e gostaria de conversar sobre um projeto.',
  },

  email: 'luiseduardobarroso2009@gmail.com',
};

export function whatsappUrl(message = site.whatsapp.defaultMessage) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoUrl(subject = '', body = '') {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}${params.length ? `?${params.join('&')}` : ''}`;
}
