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

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const pedido = separandoItens(itens);
    console.log(pedido);

    if (!validarFormaDePagamento(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    } else if (validarEntradaDeItens(itens)) {
      return "Não há itens no carrinho de compra!";
    } else if (validarPedidosComItens(pedido)) {
      return "Quantidade inválida!";
    } else if (validarCodigosValidos(pedido)) {
      return "Item inválido!";
    } else if (validarItemExtra(pedido)) {
      return "Item extra não pode ser pedido sem o principal";
    } else {
      return valorDoPedido(pedido, metodoDePagamento);
    }
  }
}

function separandoItens(itens) {
  const pedido = itens.map((produtos) => {
    const [nome, quantidade] = produtos.split(",");
    return { nome: nome, quantidade: parseInt(quantidade) };
  });
  return pedido;
}

function validarFormaDePagamento(metodoDePagament) {
  return formasDePagamento.find((item) => item.forma === metodoDePagament);
}

function validarEntradaDeItens(itens) {
  return itens.length === 0;
}

function validarPedidosComItens(pedido) {
  return pedido.find((item) => item.quantidade === 0);
}

function validarCodigosValidos(pedido) {
  return pedido.some(
    (item) => !produtos.map((item) => item.codigo).includes(item.nome)
  );
}

function validarItemExtra(pedido) {
  if (pedido.find((item) => item.nome === "chantily")) {
    return !pedido.some((item) => item.nome === "cafe");
  } else if (pedido.find((item) => item.nome === "queijo")) {
    return !pedido.some((item) => item.nome === "sanduiche");
  }

  return false;
}

function valorDoPedido(pedid, metodoDePagament) {
  const valorTotalPorItem = pedid.map((item) => {
    const produtoEncontrado = produtos.find(
      (produto) => produto.codigo === item.nome
    );
    return produtoEncontrado.valor * item.quantidade;
  });

  const totalPedido = valorTotalPorItem.reduce((acc, valor) => acc + valor, 0) *multiplicadorPagamento(metodoDePagament);
  const saida = `R$ ${totalPedido.toFixed(2).replace(".", ",")}`;
  return saida;
}

function multiplicadorPagamento(metodoDePagament) {
    const multiplicador = formasDePagamento.find(
        (item) => item.forma === metodoDePagament
    );
    return multiplicador.multiplicador;
}

export { CaixaDaLanchonete };
