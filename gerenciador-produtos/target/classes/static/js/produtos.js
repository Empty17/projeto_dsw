const API_BASE = "/api/produtos";

let idParaExcluir = null;

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
    configurarBotaoNovo();
    configurarModalExclusao();
    mostrarMensagemSeNecessario();
});

function carregarProdutos() {
    fetch(API_BASE)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar produtos");
            }
            return response.json();
        })
        .then(produtos => {
            renderizarLista(produtos);
        })
        .catch(err => {
            console.error(err);
            exibirMensagem("Erro ao carregar produtos.", "error");
        });
}

function renderizarLista(produtos) {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `<p class="empty-state">Nenhum produto cadastrado.</p>`;
        return;
    }

    produtos.forEach(produto => {
        const card = document.createElement("article");
        card.className = "produto-card";

        const precoFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(produto.preco);

        const estoqueBaixo = produto.quantidade !== null && produto.quantidade <= 3;

        card.innerHTML = `
            <h2 class="produto-nome">${produto.nome}</h2>
            <p><strong>Fabricante:</strong> ${produto.fabricante}</p>
            <p><strong>Preço:</strong> ${precoFormatado}</p>
            <p>
                <strong>Quantidade:</strong> ${produto.quantidade}
                ${estoqueBaixo ? '<span class="badge badge-warning">Estoque baixo</span>' : ""}
            </p>
            <p class="produto-descricao">${produto.descricao || ""}</p>
            <div class="card-actions">
                <button class="btn btn-secondary" data-acao="alterar" data-id="${produto.id}">Alterar</button>
                <button class="btn btn-danger" data-acao="excluir" data-id="${produto.id}">Excluir</button>
            </div>
        `;

        lista.appendChild(card);
    });

    lista.onclick = onClickLista;
}

function onClickLista(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const id = button.getAttribute("data-id");
    const acao = button.getAttribute("data-acao");

    if (acao === "alterar") {
        window.location.href = `/produto-form.html?id=${id}`;
    }
    else if (acao === "excluir") {
        confirmarExclusao(id);   
    }
}


function configurarBotaoNovo() {
    const btnNovo = document.getElementById("btn-novo");
    btnNovo.addEventListener("click", () => {
        window.location.href = "/produto-form.html";
    });
}

function exibirMensagem(texto, tipo) {
    const box = document.getElementById("mensagem-lista");
    box.textContent = texto;
    box.className = `alert alert-${tipo}`;
    box.hidden = false;

    setTimeout(() => {
        box.hidden = true;
    }, 3000);
}

function mostrarMensagemSeNecessario() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sucesso") === "1") {
        exibirMensagem("Produto salvo com sucesso.", "success");
        window.history.replaceState({}, document.title, "/produtos.html");
    }
}

/* Modal de exclusão */

function confirmarExclusao(id) {
    idParaExcluir = id;

    const overlay = document.getElementById("modal-overlay");
    const texto = document.getElementById("modal-text");

    texto.textContent = `Deseja excluir o produto ID ${id}?`;
    overlay.hidden = false;
}

function configurarModalExclusao() {
    const overlay = document.getElementById("modal-overlay");
    const btnSim = document.getElementById("btn-modal-sim");
    const btnNao = document.getElementById("btn-modal-nao");

    btnSim.addEventListener("click", () => {
        if (!idParaExcluir) {
            fecharModal();
            return;
        }

        fetch(`${API_BASE}/${idParaExcluir}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok && response.status !== 204) {
                    throw new Error("Erro ao excluir produto");
                }
                exibirMensagem("Produto excluído com sucesso.", "success");
                carregarProdutos();
            })
            .catch(err => {
                console.error(err);
                exibirMensagem("Erro ao excluir produto.", "error");
            })
            .finally(() => {
                idParaExcluir = null;
                fecharModal();
            });
    });

    btnNao.addEventListener("click", () => {
        idParaExcluir = null;
        fecharModal();
    });

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            idParaExcluir = null;
            fecharModal();
        }
    });
}

function fecharModal() {
    const overlay = document.getElementById("modal-overlay");
    overlay.hidden = true;
}
