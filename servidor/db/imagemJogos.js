import {jogosColecao} from "./dbConnect.js";


async function obterImagemDoBancoDeDados() {
  try {
    const cursor = jogosColecao.find();
    const jogos = await cursor.toArray();

    // Verifica se há jogos e se há imagens definidas
    const imagens = jogos.map((jogo) => jogo.img).filter(Boolean);
    console.log("IMAGEM AQUI")
    console.log(imagens)
    return imagens;
  } catch (error) {
    console.log("Ocorreu um erro no banco de dados.");
    console.error(error);
    return [];
  }
}



export { obterImagemDoBancoDeDados };

 