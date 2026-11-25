const API = "http://localhost:3000/api";

let produtos = [];
let produtoAtual = null;
let adicionaisSelecionados = [];
let usuarioLogado = null;

const formatarMoeda = (valor) => {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

// Elementos do cadastro
const nomeCadastro = document.getElementById("nome");
const emailCadastro = document.getElementById("emailCadastro");
const telefoneCadastro = document.getElementById("telefone");
const senhaCadastro = document.getElementById("senhaCadastro");

// Elementos do login
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");

// Elementos do cardápio
const produto = document.getElementById("produto");
const imagemProduto = document.getElementById("imagemProduto");
const nomeProduto = document.getElementById("nomeProduto");
const descricaoProduto = document.getElementById("descricaoProduto");
const precoProduto = document.getElementById("precoProduto");

const areaAdicionais = document.getElementById("areaAdicionais");
const adicionaisContainer = document.getElementById("adicionaisContainer");
const totalPedido = document.getElementById("totalPedido");

const statusPedido = document.getElementById("status");
const btnPedido = document.getElementById("btnPedido");

// Imagens dos produtos
const imagensProdutos = {
    1: "imagens/hamburguer.png",
    2: "imagens/batata-frita.png",
    3: "imagens/cachorro-quente.png",
    4: "imagens/coca-cola.png",
    5: "imagens/pizza.png",
    6: "imagens/suco.png"
};

// Adicionais do hambúrguer
const adicionaisHamburguer = [
    {
        nome: "Bacon",
        preco: 2,
        imagem: "imagens/bacon.png"
    },
    {
        nome: "Ovo",
        preco: 1,
        imagem: "imagens/ovo.png"
    },
    {
        nome: "Queijo extra",
        preco: 3,
        imagem: "imagens/queijo extra.png"
    }
];

// Adicionais da pizza
const adicionaisPizza = [
    {
        nome: "Azeitona",
        preco: 1,
        imagem: "imagens/azeitona.png"
    },
    {
        nome: "Calabresa",
        preco: 4,
        imagem: "imagens/calabresa.png"
    },
    {
        nome: "Frango desfiado",
        preco: 3,
        imagem: "imagens/frango-desfiado.png"
    }
];

// CADASTRO DE USUÁRIO
document.getElementById("btnCadastrar").addEventListener("click", async (event) => {
    event.preventDefault();

    const dadosUsuario = {
        nome: nomeCadastro.value.trim(),
        email: emailCadastro.value.trim(),
        telefone: telefoneCadastro.value.trim(),
        senha: senhaCadastro.value
    };

    if (!dadosUsuario.nome || !dadosUsuario.email || !dadosUsuario.senha) {
        alert("Preencha nome, e-mail e senha.");
        return;
    }

    try {
        const resposta = await fetch(API + "/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosUsuario)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao cadastrar usuário.");
            return;
        }

        usuarioLogado = dados.usuario;

        alert("Cadastro realizado com sucesso!");

        document.getElementById("login").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        alert("Não foi possível realizar o cadastro. Verifique o servidor.");
    }
});

// LOGIN DE USUÁRIO
document.getElementById("btnEntrar").addEventListener("click", async (event) => {
    event.preventDefault();

    const dadosLogin = {
        email: emailLogin.value.trim(),
        senha: senhaLogin.value
    };

    if (!dadosLogin.email || !dadosLogin.senha) {
        alert("Informe seu e-mail e sua senha.");
        return;
    }

    try {
        const resposta = await fetch(API + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao realizar login.");
            return;
        }

        usuarioLogado = dados.usuario;

        alert("Bem-vindo(a), " + usuarioLogado.nome + "!");

        document.getElementById("home").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        alert("Não foi possível realizar o login.");
    }
});

// MOSTRAR CADASTRO
document.getElementById("btnMostrarCadastro").addEventListener("click", () => {
    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
});

// BOTÃO DA HOME
document.getElementById("btnCardapio").addEventListener("click", () => {
    document.getElementById("cardapio").scrollIntoView({
        behavior: "smooth"
    });
});

// CARREGAR PRODUTOS DA API
async function carregarProdutos() {
    try {
        const resposta = await fetch(API + "/produtos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos.");
        }

        produtos = await resposta.json();

        console.log("Produtos carregados:", produtos);

        produto.innerHTML = "";

        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";
        opcaoInicial.textContent = "Selecione um produto";

        produto.appendChild(opcaoInicial);

        produtos.forEach((item) => {
            const opcao = document.createElement("option");

            opcao.value = item.id;
            opcao.textContent = item.nome;

            produto.appendChild(opcao);
        });

    } catch (error) {
        console.error(error);
        alert("Não foi possível carregar os produtos. Verifique se o servidor está funcionando.");
    }
}

// MOSTRAR ADICIONAIS
function mostrarAdicionais(item) {
    adicionaisContainer.innerHTML = "";
    adicionaisSelecionados = [];

    const nome = item.nome.toLowerCase();
    let listaAdicionais = [];

    if (nome.includes("hamburg") || nome.includes("burger")) {
        listaAdicionais = adicionaisHamburguer;
    } else if (nome.includes("pizza")) {
        listaAdicionais = adicionaisPizza;
    }

    if (listaAdicionais.length === 0) {
        areaAdicionais.hidden = true;
        atualizarTotal();
        return;
    }

    areaAdicionais.hidden = false;

    listaAdicionais.forEach((adicional, indice) => {
        const linha = document.createElement("div");
        linha.className = "adicional-item";

        const imagem = document.createElement("img");
        imagem.src = adicional.imagem;
        imagem.alt = adicional.nome;

        const label = document.createElement("label");
        label.htmlFor = "adicional-" + indice;

        const texto = document.createElement("span");
        texto.textContent =
            adicional.nome + " - " + formatarMoeda(adicional.preco);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "adicional-" + indice;

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                adicionaisSelecionados.push(adicional);
            } else {
                adicionaisSelecionados = adicionaisSelecionados.filter(
                    item => item.nome !== adicional.nome
                );
            }

            atualizarTotal();
        });

        label.appendChild(texto);

        linha.appendChild(imagem);
        linha.appendChild(label);
        linha.appendChild(checkbox);

        adicionaisContainer.appendChild(linha);
    });

    atualizarTotal();
}

// ATUALIZAR VALOR TOTAL
function atualizarTotal() {
    if (!produtoAtual) {
        totalPedido.textContent = "R$ 0,00";
        return;
    }

    const valorAdicionais = adicionaisSelecionados.reduce(
        (soma, item) => soma + item.preco,
        0
    );

    const total = Number(produtoAtual.preco) + valorAdicionais;

    totalPedido.textContent = formatarMoeda(total);
}

// SELECIONAR PRODUTO
produto.addEventListener("change", () => {
    produtoAtual = produtos.find(
        item => item.id == produto.value
    );

    adicionaisSelecionados = [];
    adicionaisContainer.innerHTML = "";
    areaAdicionais.hidden = true;

    if (produtoAtual) {
        const nome = produtoAtual.nome.toLowerCase();

        if (nome.includes("burger") || nome.includes("hamburg")) {
            imagemProduto.src = "imagens/hamburguer.png";
        } else {
            imagemProduto.src =
                produtoAtual.imagem ||
                imagensProdutos[produtoAtual.id] ||
                "";
        }

        imagemProduto.alt = produtoAtual.nome;

        nomeProduto.textContent = produtoAtual.nome;

        descricaoProduto.textContent =
            produtoAtual.descricao || "";

        precoProduto.textContent = formatarMoeda(produtoAtual.preco);

        mostrarAdicionais(produtoAtual);

    } else {
        imagemProduto.src = "";
        imagemProduto.alt = "Produto selecionado";

        nomeProduto.textContent = "Nenhum produto selecionado";
        descricaoProduto.textContent = "Escolha um produto no menu acima.";

        precoProduto.textContent = "R$ 0,00";
        totalPedido.textContent = "R$ 0,00";
    }
});

// ATUALIZAR STATUS NO BANCO DE DADOS
async function atualizarStatusPedido(id, status) {
    const resposta = await fetch(
        API + "/pedidos/" + id + "/status",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: status })
        }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao atualizar status.");
    }

    statusPedido.textContent = dados.pedido.status;

    return dados.pedido;
}

// REALIZAR PEDIDO
btnPedido.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!usuarioLogado) {
        alert("Faça seu cadastro ou login antes de realizar o pedido.");
        document.getElementById("login").scrollIntoView({
            behavior: "smooth"
        });
        return;
    }

    if (!produtoAtual) {
        alert("Selecione um produto antes de realizar o pedido.");
        return;
    }

    const pagamentoSelecionado = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!pagamentoSelecionado) {
        alert("Selecione uma forma de pagamento.");
        return;
    }

    const valorAdicionais = adicionaisSelecionados.reduce(
        (soma, item) => soma + item.preco,
        0
    );

    const total = Number(produtoAtual.preco) + valorAdicionais;

    const dadosPedido = {
        usuarioId: usuarioLogado.id,
        pagamento: pagamentoSelecionado.value,
        itens: [
            {
                produtoId: Number(produtoAtual.id),
                quantidade: 1,
                adicionais: adicionaisSelecionados.map(item => ({
                    nome: item.nome,
                    preco: item.preco
                }))
            }
        ]
    };

    btnPedido.disabled = true;

    try {
        const resposta = await fetch(API + "/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosPedido)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Erro ao realizar pedido.");
        }

        const pedidoCriado = dados.pedido;

        const nomesAdicionais = adicionaisSelecionados.length
            ? adicionaisSelecionados.map(item => item.nome).join(", ")
            : "Nenhum";

        alert(
            "Pedido realizado com sucesso!\n\n" +
            "Número do pedido: " + pedidoCriado.id + "\n" +
            "Produto: " + produtoAtual.nome + "\n" +
            "Adicionais: " + nomesAdicionais + "\n" +
            "Total: " + formatarMoeda(pedidoCriado.valorTotal || total) + "\n" +
            "Pagamento: " + pagamentoSelecionado.value
        );

        statusPedido.textContent = "Pedido recebido";

        const pedidoId = pedidoCriado.id;

        setTimeout(() => {
            atualizarStatusPedido(pedidoId, "Em preparo")
                .catch(error => console.error(error));
        }, 3000);

        setTimeout(() => {
            atualizarStatusPedido(pedidoId, "Finalizado")
                .catch(error => console.error(error));
        }, 5000);

        setTimeout(() => {
            atualizarStatusPedido(pedidoId, "Pronto para retirada")
                .catch(error => console.error(error));
        }, 7000);

    } catch (error) {
        console.error(error);
        alert(error.message || "Não foi possível realizar o pedido.");

    } finally {
        btnPedido.disabled = false;
    }
});

// CARREGAR PRODUTOS AO ABRIR A PÁGINA
carregarProdutos();