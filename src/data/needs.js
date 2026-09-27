/**
 * Seletor "O que você precisa colocar no ar?".
 * `services` aponta para ids de src/data/services.js, com o motivo em linguagem simples.
 * `briefingNeed` é a opção pré-selecionada ao iniciar o briefing.
 */
export const needs = [
  {
    id: 'apresentar',
    label: 'Quero apresentar melhor meu negócio.',
    intro:
      'O ponto de partida costuma ser uma presença clara: dizer o que você faz, para quem, e facilitar o contato.',
    services: [
      {
        id: 'sites',
        why: 'Um site ou uma landing page organiza a sua apresentação e leva o visitante até o WhatsApp ou o e-mail.',
      },
      {
        id: 'manutencao',
        why: 'Se você já tem um site, talvez uma reformulação resolva sem recomeçar do zero.',
      },
    ],
    briefingNeed: 'site',
  },
  {
    id: 'vender',
    label: 'Quero vender produtos online.',
    intro:
      'Vender online envolve catálogo, pagamento e entrega. A combinação certa depende do volume e de como você vende hoje.',
    services: [
      {
        id: 'loja',
        why: 'Reúne catálogo, carrinho e pagamento em um só lugar, com um painel para você administrar.',
      },
      {
        id: 'integracoes',
        why: 'Útil se a loja precisar conversar com estoque, sistema de gestão ou outras ferramentas que você já usa.',
      },
    ],
    briefingNeed: 'loja',
  },
  {
    id: 'planilha',
    label: 'Quero substituir uma planilha ou processo manual.',
    intro:
      'Quando uma planilha vira o centro do negócio, um sistema sob medida pode organizar o fluxo e reduzir erros.',
    services: [
      {
        id: 'sistemas',
        why: 'Transforma o processo em telas, cadastros e regras, com acesso controlado para cada pessoa.',
      },
      {
        id: 'api',
        why: 'Entra em cena se os dados precisarem ser usados também por outros sistemas ou aplicativos.',
      },
    ],
    briefingNeed: 'sistema',
  },
  {
    id: 'conectar',
    label: 'Quero conectar ferramentas que não conversam.',
    intro:
      'Muita gente perde horas copiando informação de uma ferramenta para outra. Parte disso pode ser automatizada.',
    services: [
      {
        id: 'integracoes',
        why: 'Liga as plataformas que você já usa para que os dados passem de uma para outra sem digitação.',
      },
      {
        id: 'api',
        why: 'Necessário quando é preciso criar uma ponte própria entre sistemas que não se conectam sozinhos.',
      },
    ],
    briefingNeed: 'integracao',
  },
  {
    id: 'melhorar',
    label: 'Já tenho um site e preciso melhorá-lo.',
    intro:
      'Antes de decidir entre ajustar ou refazer, vale entender o que existe hoje e o que mais atrapalha.',
    services: [
      {
        id: 'manutencao',
        why: 'Corrige problemas, melhora a velocidade e adiciona o que falta, aproveitando o que já funciona.',
      },
      {
        id: 'sites',
        why: 'Se a estrutura atual não ajudar mais, um site novo pode sair mais simples do que remendar o antigo.',
      },
    ],
    briefingNeed: 'manutencao',
  },
  {
    id: 'entendendo',
    label: 'Ainda estou entendendo o que preciso.',
    intro:
      'Tudo bem começar assim. Uma conversa curta ajuda a separar o que é essencial do que pode esperar.',
    services: [],
    fallback:
      'Comece pelo briefing marcando “Ainda não sei”. Com as suas respostas, eu consigo indicar os caminhos possíveis e o que cada um envolve.',
    briefingNeed: 'nao-sei',
  },
];
