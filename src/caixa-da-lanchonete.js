const produtos = [
  {
    codigo: "cafe",
    descricao: "Café",
    valor: 3.0,
  },
  {
    codigo: "chantily",
    descricao: "Chantily (extra do Café)",
    valor: 1.5,
  },
  {
    codigo: "suco",
    descricao: "Suco Natural",
    valor: 6.2,
  },
  {
    codigo: "sanduiche",
    descricao: "Sanduíche",
    valor: 6.5,
  },
  {
    codigo: "queijo",
    descricao: "Queijo (extra do Sanduíche)",
    valor: 2.0,
  },
  {
    codigo: "salgado",
    descricao: "Salgado",
    valor: 7.25,
  },
  {
    codigo: "combo1",
    descricao: "1 Suco e 1 Sanduíche",
    valor: 9.5,
  },
  {
    codigo: "combo2",
    descricao: "1 Café e 1 Sanduíche",
    valor: 7.5,
  },
];

const formasDePagamento = [
  {
    forma: "dinheiro",
    multiplicador: 0.95,
  },
  {
    forma: "debito",
    multiplicador: 1,
  },
  {
    forma: "credito",
    multiplicador: 1.03,
  },
];

let itens = ['pizza, 1'];
let metodoDePagamento = "dinheiro";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
   const pedido = separandoItens(itens);
    console.log(pedido);

    if (!formasDePagamento.find((item) => item.forma === metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    } else if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }else if(pedido.find((item) => item.quantidade === 0)){
        return "Quantidade inválida!"
    }else if(pedido.some((item) => !produtos.map((item) => item.codigo).includes(item.nome))){
        return "Item inválido!"
    }

    return "ok"
  }
}

function separandoItens(itens) {
  const pedido = itens.map((produtos) => {
    const [nome, quantidade] = produtos.split(",");
    return { nome: nome, quantidade: parseInt(quantidade) };
  });
  return pedido;
}

console.log(
  new CaixaDaLanchonete().calcularValorDaCompra(metodoDePagamento, itens)
);

export { CaixaDaLanchonete };
