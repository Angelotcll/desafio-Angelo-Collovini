const produtos = {
  cafe: {
    descricao: "Café",
    valor: 3.0,
  },
  chantily: {
    descricao: "Chantily (extra do Café)",
    valor: 1.5,
  },
  suco: {
    descricao: "Suco Natural",
    valor: 6.2,
  },
  sanduiche: {
    descricao: "Sanduíche",
    valor: 6.5,
  },
  queijo: {
    descricao: "Queijo (extra do Sanduíche)",
    valor: 2.0,
  },
  salgado: {
    descricao: "Salgado",
    valor: 7.25,
  },
  combo1: {
    descricao: "1 Suco e 1 Sanduíche",
    valor: 9.5,
  },
  combo2: {
    descricao: "1 Café e 1 Sanduíche",
    valor: 7.5,
  },
};

const formasDePagamento = {
  dinheiro: 0.95,
  debito: 1,
  credito: 1.03,
};

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!formasDePagamento.hasOwnProperty(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    let itensPedido;

    try {
      itensPedido = montandoPedido(itens);
    } catch (error) {
      return error.message;
    }

    const totalPedido =
      itensPedido.reduce((acc, item) => acc + item.subtotal, 0) *
      formasDePagamento[metodoDePagamento];

    return `R$ ${totalPedido.toFixed(2).replace(".", ",")}`;
  }
}

function montandoPedido(itens) {
  if (itens.length === 0) {
    throw new Error("Não há itens no carrinho de compra!");
  }

  let itensPedido = itens.map((item) => {
    const [nome, quantidade] = item.split(",");
    const qtd = parseInt(quantidade);

    if (qtd === 0) {
      throw new Error("Quantidade inválida!");
    }

    if (!produtos.hasOwnProperty(nome)) {
      throw new Error("Item inválido!");
    }

    return { nome, qtd, subtotal: produtos[nome].valor * qtd };
  });

  if (!validarItemExtra(itensPedido)) {
    throw new Error("Item extra não pode ser pedido sem o principal");
  }

  return itensPedido;
}

function validarItemExtra(pedido) {
  const nomeItensPedidos = pedido.map((item) => item.nome);

  if (nomeItensPedidos.includes("chantily")) {
    if (!nomeItensPedidos.includes("cafe")) {
      return false;
    }
  }
  if (nomeItensPedidos.includes("queijo")) {
    if (!nomeItensPedidos.includes("sanduiche")) {
      return false;
    }
  }

  return true;
}

export { CaixaDaLanchonete };
