// Cadastro
document.getElementById("btnCadastrar").addEventListener("click", () => {
    alert("Cadastro realizado com sucesso!");
});


// Login
document.getElementById("btnEntrar").addEventListener("click", () => {
    alert("Login realizado com sucesso!");
});


// Botão da Home
document.getElementById("btnCardapio").addEventListener("click", () => {

    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });

    document.querySelector("article").scrollIntoView({
        behavior: "smooth"
    });

});


// Cardápio
const produto = document.getElementById("produto");

const imagemProduto = document.getElementById("imagemProduto");

const nomeProduto = document.getElementById("nomeProduto");

const descricaoProduto = document.getElementById("descricaoProduto");

const precoProduto = document.getElementById("precoProduto");


const produtos = {

    hamburguer: {
        nome: "Hambúrguer",
        descricao: "Pão, carne, queijo e molho especial.",
        preco: "R$ 15,00",
        imagem: "imagens/hamburguer.png"
    },

    pizza: {
        nome: "Pizza",
        descricao: "Pizza saborosa com queijo e molho especial.",
        preco: "R$ 35,00",
        imagem: "imagens/pizza.png"
    },

    "cachorro-quente": {
        nome: "Cachorro-quente",
        descricao: "Pão, salsicha, molho e complementos.",
        preco: "R$ 12,00",
        imagem: "imagens/cachorro-quente.png"
    },

    "batata-frita": {
        nome: "Batata frita",
        descricao: "Porção de batata frita crocante.",
        preco: "R$ 10,00",
        imagem: "imagens/batata-frita.png"
    },

    "coca-cola": {
        nome: "Coca-Cola",
        descricao: "Refrigerante Coca-Cola lata 350 ml.",
        preco: "R$ 6,00",
        imagem: "imagens/coca-cola.png"
    },

    suco: {
        nome: "Suco",
        descricao: "Suco natural.",
        preco: "R$ 7,00",
        imagem: "imagens/suco.png"
    }

};


// Atualizar produto e preço
produto.addEventListener("change", () => {

    const produtoEscolhido = produtos[produto.value];

    if (produtoEscolhido) {

        imagemProduto.src = produtoEscolhido.imagem;

        imagemProduto.alt = produtoEscolhido.nome;

        nomeProduto.textContent = produtoEscolhido.nome;

        descricaoProduto.textContent = produtoEscolhido.descricao;

        precoProduto.textContent = produtoEscolhido.preco;

    } else {

        imagemProduto.src = "";

        imagemProduto.alt = "Produto selecionado";

        nomeProduto.textContent = "Nenhum produto selecionado";

        descricaoProduto.textContent =
            "Escolha um produto no menu acima.";

        precoProduto.textContent = "R$ 0,00";

    }

});


// Pedido
const status = document.getElementById("status");

document.getElementById("btnPedido").addEventListener("click", () => {

    const pagamento =
        document.querySelector(
            'input[name="pagamento"]:checked'
        ).value;

    alert(
        "Pedido enviado!\nPagamento: " + pagamento
    );

    status.textContent = "Pedido recebido";

    setTimeout(() => {
        status.textContent = "Em preparo";
    }, 3000);

    setTimeout(() => {
        status.textContent = "Pronto para retirada";
    }, 6000);

});