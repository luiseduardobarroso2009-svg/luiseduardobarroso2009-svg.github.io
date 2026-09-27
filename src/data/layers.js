/**
 * Camadas do diagrama da abertura.
 */
export const layers = [
  {
    id: 'interface',
    name: 'Interface',
    hint: 'O que as pessoas veem e usam',
    text: 'Telas, botões, formulários e textos. É onde o seu cliente navega, faz um cadastro ou finaliza uma compra, no computador ou no celular.',
    example: 'A página do produto e o botão “Comprar”.',
    decide: 'O que o visitante precisa encontrar primeiro.',
  },
  {
    id: 'logica',
    name: 'Lógica',
    hint: 'As regras do seu negócio',
    text: 'A parte que decide o que acontece a cada ação: calcular um valor, verificar se um horário está livre, liberar o acesso de alguém, avisar a equipe.',
    example: 'Só confirmar o pedido depois que o pagamento for aprovado.',
    decide: 'Como o seu processo funciona de verdade.',
  },
  {
    id: 'dados',
    name: 'Dados',
    hint: 'Onde as informações ficam guardadas',
    text: 'Clientes, pedidos, produtos e históricos organizados em um banco de dados, com regras de quem pode ver e alterar cada informação.',
    example: 'O cadastro do cliente e o histórico de compras dele.',
    decide: 'Quais informações importam e quem pode acessá-las.',
  },
];
