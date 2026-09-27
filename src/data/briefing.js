/**
 * Briefing "Vamos dar forma à sua ideia?".
 * As respostas ficam só na memória da página: nada é enviado a um servidor
 * nem guardado no navegador. No final, o visitante revisa e abre o WhatsApp
 * com a mensagem pronta.
 *
 * Tipos de etapa: 'radio' (uma opção), 'checkbox' (várias), 'contact' (campos livres).
 * Opções com `exclusive: true` desmarcam as demais (ex.: "Não sei ainda").
 */
export const briefingSteps = [
  {
    id: 'need',
    short: 'Tipo',
    type: 'radio',
    required: true,
    question: 'O que você precisa?',
    help: 'Escolha o que mais se aproxima. Dá para mudar depois.',
    summaryLabel: 'O que preciso',
    options: [
      { value: 'site', label: 'Site ou landing page' },
      { value: 'loja', label: 'Loja virtual' },
      { value: 'sistema', label: 'Sistema ou aplicação web' },
      { value: 'integracao', label: 'Integração entre ferramentas' },
      { value: 'manutencao', label: 'Manutenção ou melhoria de algo que já existe' },
      { value: 'nao-sei', label: 'Ainda não sei' },
    ],
  },
  {
    id: 'goal',
    short: 'Objetivo',
    type: 'radio',
    required: true,
    question: 'Qual é o principal objetivo?',
    help: 'Pense no que precisa mudar no seu dia a dia ou no negócio.',
    summaryLabel: 'Objetivo',
    options: [
      { value: 'contatos', label: 'Receber mais contatos e clientes' },
      { value: 'vender', label: 'Vender online' },
      { value: 'organizar', label: 'Organizar um processo interno' },
      { value: 'tempo', label: 'Economizar tempo com automação' },
      { value: 'melhorar', label: 'Melhorar algo que já existe' },
      { value: 'nao-sei', label: 'Não sei ainda' },
    ],
    extra: {
      id: 'goalText',
      label: 'Quer explicar em uma frase?',
      optional: true,
      placeholder: 'Ex.: quero parar de anotar os agendamentos no caderno.',
      summaryLabel: 'Sobre o objetivo',
    },
  },
  {
    id: 'features',
    short: 'Funções',
    type: 'checkbox',
    required: true,
    question: 'Que funcionalidades você imagina?',
    help: 'Marque quantas quiser. Se não tiver certeza, escolha “Não sei ainda”.',
    summaryLabel: 'Funcionalidades que imagino',
    options: [
      { value: 'contato', label: 'Formulário ou botão de contato' },
      { value: 'login', label: 'Área com login' },
      { value: 'painel', label: 'Painel para administrar conteúdo ou cadastros' },
      { value: 'catalogo', label: 'Catálogo de produtos ou serviços' },
      { value: 'pagamento', label: 'Pagamento online' },
      { value: 'agendamento', label: 'Agendamento' },
      { value: 'relatorios', label: 'Relatórios' },
      { value: 'integracao', label: 'Conexão com outras ferramentas' },
      { value: 'nao-sei', label: 'Não sei ainda', exclusive: true },
    ],
    extra: {
      id: 'featuresOther',
      label: 'Outra funcionalidade',
      optional: true,
      placeholder: 'Ex.: emissão de certificados',
      summaryLabel: 'Outra funcionalidade',
    },
  },
  {
    id: 'deadline',
    short: 'Prazo',
    type: 'radio',
    required: true,
    question: 'Existe um prazo desejado?',
    help: 'É só uma referência para a conversa. O prazo real é definido junto com o escopo.',
    summaryLabel: 'Prazo desejado',
    options: [
      { value: 'breve', label: 'O quanto antes' },
      { value: '1-3', label: 'Nos próximos 1 a 3 meses' },
      { value: '3+', label: 'Daqui a mais de 3 meses' },
      { value: 'sem-prazo', label: 'Sem prazo definido' },
      { value: 'nao-sei', label: 'Não sei ainda' },
    ],
  },
  {
    id: 'contact',
    short: 'Você',
    type: 'contact',
    required: false,
    question: 'Quer se apresentar?',
    help: 'Os dois campos são opcionais.',
    fields: [
      {
        id: 'name',
        label: 'Seu nome',
        placeholder: 'Como prefere ser chamado',
        summaryLabel: 'Nome',
        multiline: false,
      },
      {
        id: 'details',
        label: 'Detalhes do projeto',
        placeholder: 'Conte o que achar importante: contexto, referências, dúvidas…',
        summaryLabel: 'Detalhes',
        multiline: true,
      },
    ],
  },
];
