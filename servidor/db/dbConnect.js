import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://luan:123@cluster0.ufkuy08.mongodb.net/alura-node"
);

let documentosColecao, usuariosColecao,jogosColecao;

async function conectarAoBancoDeDados() {
  try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    documentosColecao = db.collection("documentos");
    usuariosColecao = db.collection("usuariosTeste");
    jogosColecao = db.collection("gamesTeste1");

    console.log("Conectado ao banco de dados com sucesso!");
  } catch (erro) {
    console.log(erro);
  }
}

conectarAoBancoDeDados();

export { documentosColecao, usuariosColecao,jogosColecao };
