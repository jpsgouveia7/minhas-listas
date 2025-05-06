
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

function salvarItem(uid, item) {
  db.collection("listas").doc(uid).collection("itens").add(item);
}

function carregarLista(uid) {
  userId = uid;
  db.collection("listas").doc(uid).collection("itens").get().then(snapshot => {
    lista = [];
    snapshot.forEach(doc => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    atualizarTabela();
  });
}

function removerItem(index) {
  const id = lista[index].id;
  db.collection("listas").doc(userId).collection("itens").doc(id).delete().then(() => {
    lista.splice(index, 1);
    atualizarTabela();
  });
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
  salvarItem(userId, novo);
  lista.push(novo);
  atualizarTabela();
  form.reset();
});
