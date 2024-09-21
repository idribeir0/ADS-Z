import { mostrarImagemJogo,mostrarTituloJogo, mostrarPrecoJogo} from "./socket-front-home.js";
import { removerCookie, obterCookie } from "../utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt");

console.log(tokenJwt);

const btnLogout = document.getElementById("btnLogout");




  
mostrarImagemJogo();
document.addEventListener('DOMContentLoaded', () => {
  mostrarTituloJogo();
  mostrarPrecoJogo();
});

  
  
btnLogout.addEventListener("click", () => {
  removerCookie("tokenJwt");
  
  window.location.href = "/"      
});


