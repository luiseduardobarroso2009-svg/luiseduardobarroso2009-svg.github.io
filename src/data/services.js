/**
 * Serviços.
 * Cada serviço responde a quatro perguntas do cliente:
 *   problem  → qual problema costuma resolver
 *   build    → o que pode ser desenvolvido
 *   define   → o que o cliente define junto com o desenvolvedor
 *   next     → próximo passo para conversar
 * `briefingNeed` indica qual opção do briefing é pré-selecionada
 * (valores possíveis em src/data/briefing.js).
 */
export const services = [
  {
    id: 'sites',
    path: '/sites',
    title: 'Sites profissionais e landing pages',
    benefit: 'Apresente seu negócio com clareza e receba mais contatos.',
    summary:
      'Um site rápido, fácil de ler no celular e organizado para levar o visitante até o contato.',
    problem:
      'Quem procura seu negócio não encontra informações claras, o site atual parece abandonado ou quase ninguém chega até o WhatsApp.',
    build: [
      'Site institucional com páginas de apresentação, serviços e contato',
      'Landing page — uma página única e focada — para uma campanha, produto ou evento',
      'Formulários e botões que levam direto ao WhatsApp ou ao e-mail',
      'Cuidados técnicos que ajudam buscadores a entender a página: títulos, descrições e velocidade',
    ],
    define: [
      'Quem é o público e qual ação você quer que ele tome',
      'Textos, fotos e identidade visual que já existem, ou o que ainda precisa ser criado',
      'Domínio e hospedagem: se já estão contratados ou se vamos escolher juntos',
    ],
    next: 'Me conte o que o seu negócio faz e para quem. Com isso já dá para sugerir a estrutura das páginas.',
    briefingNeed: 'site',
  },
  {
    id: 'loja',
    path: '/loja',
    title: 'Lojas virtuais',
    benefit: 'Venda online com produtos organizados e uma compra sem complicação.',
    summary:
      'Catálogo, carrinho e pagamento pensados para o cliente encontrar o que procura e concluir a compra.',
    problem:
      'Vender só por mensagem toma tempo, pedidos se perdem, ou a loja atual é confusa de navegar e de administrar.',
    build: [
      'Catálogo com categorias, busca e página de produto',
      'Carrinho e finalização de compra com pagamento online',
      'Cálculo de frete e acompanhamento de pedidos, de acordo com as ferramentas escolhidas',
      'Painel para cadastrar produtos, preços e estoque',
    ],
    define: [
      'Quantos produtos e variações (tamanho, cor, modelo) existem',
      'Quais meios de pagamento e formas de entrega você quer oferecer',
      'Se faz mais sentido usar uma plataforma pronta ou construir uma loja sob medida',
    ],
    next: 'Me diga o que você vende e como vende hoje. A partir disso comparamos os caminhos possíveis.',
    briefingNeed: 'loja',
  },
  {
    id: 'sistemas',
    path: '/sistemas',
    title: 'Sistemas e aplicações web',
    benefit: 'Troque planilhas e processos manuais por uma ferramenta feita para o seu jeito de trabalhar.',
    summary:
      'Aplicações acessadas pelo navegador, com login, cadastros, regras e relatórios do seu negócio.',
    problem:
      'Informações espalhadas em planilhas e conversas, retrabalho e dificuldade para saber em que pé está cada pedido, cliente ou tarefa.',
    build: [
      'Cadastros e controle de clientes, pedidos, agendamentos ou estoque',
      'Área com login e níveis de acesso para equipe e clientes',
      'Painéis e relatórios com as informações que você mais consulta',
      'Automação de etapas repetitivas do processo',
    ],
    define: [
      'Como o processo funciona hoje, passo a passo',
      'Quem vai usar o sistema e o que cada pessoa pode ver ou alterar',
      'O que é indispensável na primeira versão e o que pode ficar para depois',
    ],
    next: 'Me mostre como o processo funciona hoje. Uma planilha ou um print já ajudam muito.',
    briefingNeed: 'sistema',
  },
  {
    id: 'api',
    path: '/api',
    title: 'Back-end e APIs',
    benefit: 'A parte que não aparece, mas faz tudo funcionar com segurança.',
    summary:
      'Servidor, banco de dados e APIs. Uma API é a forma organizada de um sistema pedir ou enviar informações para outro.',
    problem:
      'O site ou aplicativo precisa guardar dados, ter login, processar pedidos ou conversar com outro sistema, e falta uma base confiável por trás.',
    build: [
      'APIs para sites, aplicativos e sistemas internos',
      'Modelagem e organização do banco de dados',
      'Autenticação, permissões e regras de negócio',
      'Documentação para que outras pessoas ou equipes consigam usar a API',
    ],
    define: [
      'Quais dados o sistema precisa guardar e quem pode acessá-los',
      'Quais sistemas vão enviar ou receber informações',
      'Expectativas de uso e requisitos de segurança que você já conheça',
    ],
    next: 'Me conte o que precisa ser conectado ou processado. Se já existir documentação técnica, pode enviar junto.',
    briefingNeed: 'sistema',
  },
  {
    id: 'integracoes',
    path: '/integracoes',
    title: 'Integrações',
    benefit: 'Faça suas ferramentas conversarem e pare de copiar dados de um lugar para outro.',
    summary:
      'Conexões entre site, planilhas, meios de pagamento, sistemas de gestão e outras plataformas que você já usa.',
    problem:
      'A mesma informação é digitada em vários lugares, erros aparecem na cópia e tarefas simples dependem de alguém lembrar de fazer.',
    build: [
      'Envio automático de dados entre plataformas',
      'Sincronização de pedidos, clientes ou estoque',
      'Notificações e rotinas que rodam sozinhas',
      'Webhooks: avisos automáticos que uma plataforma envia para outra quando algo acontece',
    ],
    define: [
      'Quais ferramentas estão envolvidas e quem tem acesso de administrador a elas',
      'O que deve acontecer, em que ordem e com que frequência',
      'Se as plataformas permitem integração — isso eu verifico junto com você',
    ],
    next: 'Liste as ferramentas que você usa e o trabalho manual que mais incomoda hoje.',
    briefingNeed: 'integracao',
  },
  {
    id: 'manutencao',
    path: '/manutencao',
    title: 'Manutenção e evolução',
    benefit: 'Corrija, melhore e amplie o que você já tem, sem começar do zero.',
    summary:
      'Correções, ajustes, melhorias de desempenho e novas funcionalidades em sites e sistemas que já existem.',
    problem:
      'O site está lento, com alguma parte quebrada, difícil de atualizar, ou precisa de uma função que ainda não tem.',
    build: [
      'Correção de erros e ajustes de layout',
      'Melhorias de velocidade e de uso no celular',
      'Novas páginas e funcionalidades',
      'Atualização de tecnologias e bibliotecas desatualizadas',
    ],
    define: [
      'Acesso ao código, à hospedagem e aos painéis atuais',
      'O que incomoda hoje, em ordem de prioridade',
      'Se a necessidade é pontual ou contínua',
    ],
    next: 'Me envie o endereço do site ou descreva o sistema e o que precisa mudar. Antes de propor qualquer mudança, avalio o que já existe.',
    briefingNeed: 'manutencao',
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));
