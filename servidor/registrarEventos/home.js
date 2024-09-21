import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import {obterImagemDoBancoDeDados } from "../db/imagemJogos.js"
import {obterTituloJogos,obterPrecoJogos,obterSinopseJogos} from "../db/obterDadosJogos.js"



async function registrarEventosImagem(socket, io) {
  
   socket.on("imagemJogoPrincipal", async () => {

     const listaDeImagens = await obterImagemDoBancoDeDados();
 
   
    socket.emit("retorno_imagem_sucesso", listaDeImagens);
   });
 }

 
async function registrarEventosTitulos(socket, io) {
  socket.on("tituloJogo", async () => {
  
  const listaDeTitulos = await obterTituloJogos();
  
   socket.emit("retorno_titulo_sucesso", listaDeTitulos);
  });
}

async function registrarEventosPrecos(socket, io) {
  socket.on("precoJogo", async () => {

  const listaDePrecos = await obterPrecoJogos();
  
   socket.emit("retorno_preco_sucesso", listaDePrecos);
  });
}

async function registrarEventosSinopseJogos(socket, io) {
  socket.on("sinopseJogo", async () => {
    console.log("ta chegando ate aq");
  const listaDeSinopse = await obterSinopseJogos();
   
   socket.emit("retorno_sinopse_sucesso", listaDeSinopse);
  });
}
export  {registrarEventosImagem,registrarEventosTitulos,registrarEventosPrecos,registrarEventosSinopseJogos};


    
     
   
 
export default registrarEventosImagem;
