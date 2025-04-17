
const firebaseConfig = {
  apiKey: "AIzaSyDwKfJtE7gPMYjaCoO1U5bTdbKbHcBqTj0",
  authDomain: "minhaslistas-e2e62.firebaseapp.com",
  projectId: "minhaslistas-e2e62",
  storageBucket: "minhaslistas-e2e62.appspot.com",
  messagingSenderId: "481150895107",
  appId: "1:481150895107:web:23dcbb548b85599f31ba36",
  measurementId: "G-GF1N4HY509"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(console.error);
}

function logout() {
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged((user) => {
  const loginArea = document.getElementById("login-area");
  const userInfo = document.getElementById("user-info");
  const appDiv = document.getElementById("app");
  if (user) {
    document.getElementById("user-name").textContent = user.displayName;
    loginArea.classList.add("hidden");
    userInfo.classList.remove("hidden");
    appDiv.classList.remove("hidden");
    carregarLista(user.uid);
  } else {
    loginArea.classList.remove("hidden");
    userInfo.classList.add("hidden");
    appDiv.classList.add("hidden");
  }
});
