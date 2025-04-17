
const form = document.getElementById("form");
const tabela = document.getElementById("tabela-lista");
let lista = [];
let userId = null;

function atualizarTabela() {
  tabela.innerHTML = "";
  lista.forEach((item, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${item.titulo}</td>
      <td>${item.tipo}</td>
      <td>${item.genero}</td>
      <td>${item.onde}</td>
      <td>${item.status}</td>
      <td>${item.nota}</td>
      <td>${item.comentario}</td>
      <td><button onclick="removerItem(${index})">❌</button></td>
    `;
    tabela.appendChild(linha);
  });
}

function salvarLista(uid) {
  db.collection("listas").doc(uid).set({ itens: lista });
}

function carregarLista(uid) {
  userId = uid;
  db.collection("listas").doc(uid).get().then(doc => {
    if (doc.exists) {
      lista = doc.data().itens || [];
    } else {
      lista = [];
    }
    atualizarTabela();
  });
}

function removerItem(index) {
  lista.splice(index, 1);
  salvarLista(userId);
  atualizarTabela();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const novo = {
    titulo: titulo.value,
    tipo: tipo.value,
    genero: genero.value,
    onde: ondeAssistir.value,
    status: status.value,
    nota: nota.value,
    comentario: comentario.value,
  };
  lista.push(novo);
  salvarLista(userId);
  atualizarTabela();
  form.reset();
});
