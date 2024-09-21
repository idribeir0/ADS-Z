import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";
import validarCampos from "./validarCampos.js";

const form = document.getElementById("form-tela-cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const email = form["email"].value.replace("(",'').replace(")",'').replace(' ','').replace('-','');
  const senha = form["inputSenha"].value;
  const tel = form["phone"].value.replace("(",'').replace(")",'').replace(' ','').replace('-','');

    if (validarCampos(form)) {
      emitirCadastrarUsuario({ email, tel,senha });
    }
});
