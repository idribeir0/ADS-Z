import {jogosColecao} from "./dbConnect.js";


async function obterTituloJogos(){
    try {
        const cursor = jogosColecao.find();
        const jogos = await cursor.toArray();
       const titulo =[]
        for (let i = 0; i < jogos.length; i++) {
            titulo[i] = jogos[i].titulo;
          }
    
        return titulo;
          
      
      } catch (error) {
        console.log("deu erro no banco de dados");
        console.error(error);
      }
};

async function obterPrecoJogos(){
    try {
        const cursor = jogosColecao.find();
        const jogos = await cursor.toArray();
       const preco =[]
        for (let i = 0; i < jogos.length; i++) {
            preco[i] = jogos[i].preco;
          }
    
        return preco;
          
      
      } catch (error) {
        console.log("deu erro no banco de dados");
        console.error(error);
      }
};

async function obterSinopseJogos(){
  try {
    const cursor = jogosColecao.find();
    const jogos = await cursor.toArray();
    const sinopse =[]
    for (let i = 0; i < jogos.length; i++) {
      sinopse[i] = jogos[i].sinopse;
      }

    return sinopse;
      
  
  } catch (error) {
    console.log("deu erro no banco de dados");
    console.error(error);
  }
}

export {obterTituloJogos,obterPrecoJogos,obterSinopseJogos};
