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

// Produtos vindos da API
let produtos = [];

// Buscar produtos do back-end
async function carregarProdutos() {
    try {
        const resposta = await fetch("http://localhost:3000/api/produtos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos.");
        }

        produtos = await resposta.json();

        console.log("Produtos carregados:", produtos);

        // Limpar opções antigas do HTML
        produto.innerHTML = "";

        // Opção inicial
        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";
        opcaoInicial.textContent = "Selecione um produto";
        produto.appendChild(opcaoInicial);

        // Criar opções com os produtos da API
        produtos.forEach((item) => {
            const opcao = document.createElement("option");

            opcao.value = item.id;
            opcao.textContent = item.nome;

            produto.appendChild(opcao);
        });

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);

        alert("Não foi possível carregar os produtos.");
    }
}

// Atualizar produto selecionado
produto.addEventListener("change", () => {

    const produtoEscolhido = produtos.find(
        item => item.id == produto.value
    );

    if (produtoEscolhido) {

        // Imagens existentes na pasta "imagens"
const imagensProdutos = {
    1: "imagens/hamburguer.png",
    2: "imagens/batata-frita.png",
    3: "imagens/cachorro-quente.png",
    4: "imagens/coca-cola.png",
    5: "imagens/pizza.png",
    6: "imagens/suco.png"
};

imagemProduto.src =
    new URL(
        imagensProdutos[produtoEscolhido.id] || "",
        window.location.href
    ).href;
        imagemProduto.alt = produtoEscolhido.nome;

        nomeProduto.textContent =
            produtoEscolhido.nome;

        descricaoProduto.textContent =
            produtoEscolhido.descricao;

        precoProduto.textContent =
            "R$ " +
            Number(produtoEscolhido.preco)
                .toFixed(2)
                .replace(".", ",");

    } else {

        imagemProduto.src = "";

        imagemProduto.alt =
            "Produto selecionado";

        nomeProduto.textContent =
            "Nenhum produto selecionado";

        descricaoProduto.textContent =
            "Escolha um produto no menu acima.";

        precoProduto.textContent =
            "R$ 0,00";
    }
});

// Carregar produtos ao abrir a página
carregarProdutos();

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

    status.textContent =
        "Pedido recebido";

    setTimeout(() => {
        status.textContent =
            "Em preparo";
    }, 3000);

    setTimeout(() => {
        status.textContent =
            "Pronto para retirada";
    }, 6000);
});
