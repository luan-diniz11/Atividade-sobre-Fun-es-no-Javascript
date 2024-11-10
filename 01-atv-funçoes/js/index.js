function aplicarDesconto(preco) {
    const desconto = 0.10;
    return preco - (preco * desconto); 
}

function calcularParcelasSemJuros(preco, numParcelas) {
    return preco / numParcelas;
}

function calcularParcelasComJuros(preco, numParcelas) {
    const taxaJuros = 0.02; 
    const precoComJuros = preco * (1 + taxaJuros);  
    return precoComJuros / numParcelas;
}

function calcularCompra(produto, numParcelas) {
    const precoProduto = produto.preco;
    const nomeProduto = produto.nome;

    if (precoProduto <= 0) {
        return "Erro: O preço do produto deve ser maior que zero.";
    }

    if (numParcelas < 0) {
        return "Erro: O número de parcelas não pode ser negativo.";
    }

    let mensagem = `Você escolheu: ${nomeProduto} (R$ ${precoProduto.toFixed(2)})<br>`;

    if (numParcelas === 0) {
        const valorComDesconto = aplicarDesconto(precoProduto);
        mensagem += `Pagamento à vista com desconto de 10%.<br>`;
        mensagem += `Total a pagar: R$ ${valorComDesconto.toFixed(2)}`;
    } 
    else if (numParcelas >= 1 && numParcelas <= 10) {
        const valorParcelado = calcularParcelasSemJuros(precoProduto, numParcelas);
        mensagem += `Compra parcelada em ${numParcelas}x sem juros.<br>`;
        mensagem += `Valor de cada parcela: R$ ${valorParcelado.toFixed(2)}<br>`;
        mensagem += `Total a pagar: R$ ${precoProduto.toFixed(2)}`;
    } 
    else if (numParcelas >= 11 && numParcelas <= 12) {
        const valorParceladoComJuros = calcularParcelasComJuros(precoProduto, numParcelas);
        const totalComJuros = valorParceladoComJuros * numParcelas;
        mensagem += `Compra parcelada em ${numParcelas}x com 2% de juros.<br>`;
        mensagem += `Valor de cada parcela: R$ ${valorParceladoComJuros.toFixed(2)}<br>`;
        mensagem += `Total a pagar com juros: R$ ${totalComJuros.toFixed(2)}`;
    } 
    else {
        mensagem += "Ops! O número de parcelas deve ser entre 1 e 12.";
    }

    return mensagem;
}

function calcularCompraUsuario() {
    const nomeProduto = document.getElementById('nomeProduto').value;
    const precoProduto = parseFloat(document.getElementById('precoProduto').value);
    const numParcelas = parseInt(document.getElementById('numParcelas').value);

    const produto = { nome: nomeProduto, preco: precoProduto };
    const resultado = calcularCompra(produto, numParcelas);

    document.getElementById('resultado').innerHTML = resultado;
}
