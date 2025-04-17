const provider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogle() {
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.getElementById("user-name").textContent = user.displayName;
      document.getElementById("user-info").classList.remove("hidden");
      document.getElementById("login-area").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
    })
    .catch(error => {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login.");
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    document.getElementById("user-info").classList.add("hidden");
    document.getElementById("login-area").classList.remove("hidden");
    document.getElementById("app").classList.add("hidden");
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("login-area").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
  }
});

const form = document.getElementById("form");
const tabela = document.getElementById("tabela-lista");
let lista = JSON.parse(localStorage.getItem("minhaLista")) || [];

function salvarLista() {
  localStorage.setItem("minhaLista", JSON.stringify(lista));
}

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

function removerItem(index) {
  lista.splice(index, 1);
  salvarLista();
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
  salvarLista();
  atualizarTabela();
  form.reset();
});

atualizarTabela();
