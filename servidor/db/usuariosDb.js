import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(contato) {
  
  return usuariosColecao.findOne({ 
    $or: [
      { email: contato },
      { tel: contato }
    ]
 });
}

function cadastrarUsuario({ email, tel,senha }) {
  const { hashSenha, salSenha } = criaHashESalSenha(senha);

  return usuariosColecao.insertOne({ email, tel,hashSenha, salSenha });
}

export { cadastrarUsuario, encontrarUsuario };
