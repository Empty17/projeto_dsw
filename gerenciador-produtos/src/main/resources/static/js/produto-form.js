const API_BASE = "/api/produtos";

document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
});

function configurarFormulario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const form = document.getElementById("produto-form");
    const btnVoltar = document.getElementById("btn-voltar");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        salvarProduto(id);
    });

    btnVoltar.addEventListener("click", () => {
        window.location.href = "/produtos.html";
    });

    if (id) {
        carregarProduto(id);
    }
}

function carregarProduto(id) {
    document.getElementById("titulo-form").textContent = `Alterar produto - ID ${id}`;

    fetch(`${API_BASE}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar produto");
            }
            return response.json();
        })
        .then(produto => {
            document.getElementById("nome").value = produto.nome;
            document.getElementById("preco").value = produto.preco.toString().replace(".", ",");
            document.getElementById("fabricante").value = produto.fabricante;
            document.getElementById("quantidade").value = produto.quantidade;
            document.getElementById("descricao").value = produto.descricao || "";
        })
        .catch(err => {
            console.error(err);
            exibirMensagemForm("Erro ao carregar dados do produto.", "error");
        });
}

function salvarProduto(id) {
    const nome = document.getElementById("nome").value.trim();
    const fabricante = document.getElementById("fabricante").value.trim();
    const precoStr = document.getElementById("preco").value.trim();
    const quantidadeStr = document.getElementById("quantidade").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    const erros = [];

    if (!nome) erros.push("O campo Produto é obrigatório.");
    if (!precoStr) erros.push("O campo Preço é obrigatório.");
    if (!fabricante) erros.push("O campo Fabricante é obrigatório.");
    if (!quantidadeStr) erros.push("O campo Quantidade é obrigatório.");
    if (!descricao || descricao.length < 10) {
        erros.push("A descrição deve ter no mínimo 10 caracteres.");
    }

    const preco = parseFloat(precoStr.replace(".", "").replace(",", "."));
    const quantidade = parseInt(quantidadeStr, 10);

    if (isNaN(preco) || preco <= 0) {
        erros.push("O preço deve ser um número maior que zero.");
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        erros.push("A quantidade em estoque deve ser um número maior que zero.");
    }

    if (erros.length > 0) {
        exibirMensagemForm(erros.join(" "), "error");
        return;
    }

    const produto = {
        nome,
        fabricante,
        preco,
        quantidade,
        descricao
    };


    const url = id ? `${API_BASE}/${id}` : API_BASE;
    const metodo = id ? "PUT" : "POST";

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
        .then(async response => {
            if (!response.ok) {
                let msg = "Erro ao salvar o produto.";
                try {
                    const data = await response.json();
                    if (data && data.message) {
                        msg = data.message;
                    }
                } catch (_) {}
                throw new Error(msg);
            }

            window.location.href = "/produtos.html?sucesso=1";
        })
        .catch(err => {
            console.error(err);
            exibirMensagemForm(err.message, "error");
        });
}

function exibirMensagemForm(texto, tipo) {
    const box = document.getElementById("mensagem-form");
    box.textContent = texto;
    box.className = `alert alert-${tipo}`;
    box.hidden = false;
}
