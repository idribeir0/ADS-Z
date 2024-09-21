import { emitirAutenticarUsuario } from "./socket-front-login.js";

const form = document.getElementById("form-tela-login");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  
  const nome = form["loginInput"].value.replace("(",'').replace(")",'').replace(' ','').replace('-','');
  const senha = form["input-senha"].value;
    

  emitirAutenticarUsuario({ nome, senha });
});

