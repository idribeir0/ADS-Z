import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitirAutenticarUsuario(dados) {
  socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
  console.log("passou por aqui")
  definirCookie("tokenJwt", tokenJwt);

  //alert("Usuário autenticado com sucesso!");
  const errorMessage = document.getElementById("loginErrorMessage");
  errorMessage.innerText = "Login autenticado com sucesso";
  errorMessage.style.color = "green";
  window.location.href = "/home";
});

socket.on("autenticacao_erro", () => {
  const errorMessage = document.getElementById("loginErrorMessage");
  errorMessage.innerText = "Verifique a sua senha e nome de usuário e tente novamente.";
  errorMessage.style.color = "red";
});

socket.on("usuario_nao_encontrado", () => {
  const errorMessage = document.getElementById("loginErrorMessage");
  errorMessage.innerText = "Verifique a sua senha e nome de usuário e tente novamente.";
  errorMessage.style.color = "red";
});

export { emitirAutenticarUsuario };
