import { mostrarImagemJogo,mostrarTituloJogo, mostrarPrecoJogo,mostrarSinopseJogo} from "./socket-front-jogo.js";
import { removerCookie, obterCookie } from "../utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt");

console.log(tokenJwt);

const btnLogout = document.getElementById("btnLogout");


const titulos = document.getElementsByClassName('titulo');

const precos = document.getElementsByClassName('preco');
const sinopse = document.getElementsByClassName('sinopse');
document.addEventListener("DOMContentLoaded", function () {
  mostrarImagemJogo();

  mostrarTituloJogo(titulos);

  mostrarPrecoJogo(precos);
  
  mostrarSinopseJogo(sinopse);
});
  
btnLogout.addEventListener("click", () => {
  removerCookie("tokenJwt");
  
  window.location.href = "/"      
});


