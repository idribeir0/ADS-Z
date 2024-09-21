import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("cadastrar_usuario", async (dados) => {
    
    const usuario = await encontrarUsuario(dados.email,dados.tel);
    
    if (usuario === null || usuario == undefined) {
      const resultado = await cadastrarUsuario(dados);

      if (resultado.acknowledged) {
        socket.emit("cadastro_sucesso");
      } else {
        socket.emit("cadastro_erro");
      }
    } else {
      socket.emit("usuario_ja_existente");
    }
  });
}

export default registrarEventosCadastro;
