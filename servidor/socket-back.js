import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import {registrarEventosImagem,registrarEventosTitulos,registrarEventosPrecos,registrarEventosSinopseJogos }from "./registrarEventos/home.js"


import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  console.log("Nova conexão de usuário");
  registrarEventosImagem(socket, io);
  registrarEventosTitulos(socket,io);
  registrarEventosPrecos(socket,io);
  registrarEventosSinopseJogos(socket,io);


});

io.of("/").on("connection", (socket) => {
  //console.log("entrou aq quando")
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
  
});


