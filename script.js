// script.js

const produtos = document.querySelectorAll(".produto");
const carrinhoLista = document.querySelector(".carrinho-lista");
const totalEl = document.querySelector(".total");
const btnFinalizar = document.querySelector(".btn-finalizar");

let carrinho = [];

// Adicionar produto ao carrinho
produtos.forEach((produto) => {
  produto.querySelector(".btn-add").addEventListener("click", () => {
    const id = produto.getAttribute("data-id");
    const nome = produto.getAttribute("data-nome");
    const preco = parseFloat(produto.getAttribute("data-preco"));

    carrinho.push({ id, nome, preco });
    atualizarCarrinho();
  });
});

// Atualizar carrinho
function atualizarCarrinho() {
  carrinhoLista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item) => {
    total += item.preco;
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco}`;
    carrinhoLista.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

// Finalizar compra
btnFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // Chamar API de pagamento (simulada aqui)
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ carrinho }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Compra finalizada com sucesso!");
      carrinho = [];
      atualizarCarrinho();
    })
    .catch(() => alert("Erro ao processar pagamento!"));
});
