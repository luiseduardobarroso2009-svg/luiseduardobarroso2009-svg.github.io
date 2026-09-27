/**
 * Etapas de "Como funciona". A ordem é a ordem real do trabalho.
 */
export const processSteps = [
  {
    label: 'Conversa',
    title: 'Entender o objetivo',
    text: 'Você explica a ideia do seu jeito. Eu faço perguntas para entender o problema, quem vai usar e o que já existe.',
    outcome: 'Uma visão mais clara do que precisa ser feito.',
  },
  {
    label: 'Escopo',
    title: 'Definir escopo e prioridades',
    text: 'Separamos o essencial do que pode ficar para depois e registramos o que será entregue. É nesta etapa que prazo e investimento são definidos.',
    outcome: 'Uma proposta com escopo, etapas e valores.',
  },
  {
    label: 'Desenvolvimento',
    title: 'Construir em etapas',
    text: 'O projeto avança em partes que você consegue ver e testar. Os alinhamentos acontecem ao longo do caminho, para ajustar cedo o que precisar.',
    outcome: 'Versões funcionando para acompanhar, não só relatórios.',
  },
  {
    label: 'Publicação',
    title: 'Revisar, publicar e seguir',
    text: 'Revisamos juntos, o projeto vai para o ar no endereço definido e eu explico como usar. Depois, conversamos sobre melhorias e manutenção.',
    outcome: 'O projeto publicado e orientações de uso.',
  },
];

// EDITAR: se quiser, detalhe aqui como você costuma trabalhar
// (formas de pagamento, forma dos alinhamentos etc.).
export const pricingNote = {
  title: 'Prazo e investimento dependem do escopo',
  text: 'Não existe preço de tabela. Depois da primeira conversa, você recebe uma proposta com o que está incluído. O que mais influencia:',
  factors: [
    'Quantidade de páginas, telas e funcionalidades',
    'Integrações com outras plataformas',
    'Conteúdo disponível: textos, imagens, dados',
    'Prazo desejado e prioridades',
  ],
};
