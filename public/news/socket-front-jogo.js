import { obterCookie } from "../utils/cookies.js";



function mostrarImagemJogo(){
    socket.emit("imagemJogoPrincipal");
};


function mostrarTituloJogo(dados){
    socket.emit("tituloJogo",dados);
};

function mostrarPrecoJogo(dados){
    socket.emit("precoJogo",dados);
};

function mostrarSinopseJogo(dados){
  socket.emit("sinopseJogo",dados);
};


const socket = io("/usuarios",{
    auth:{
        token:obterCookie("tokenJwt")
    },
});



socket.on("connect_error", (erro) => {
    window.location.href = "/";
  });



socket.on("retorno_imagem_sucesso", (dados2) =>{
  
  console.log(dados2);
  const imagens = document.getElementsByName("img-game")
  imagens.forEach((imagem, i) => {
    if (i < dados2.length) {
      imagem.src = dados2[i];
      console.log("definiu");
    } else {
      console.log("concluído");
      return; // Encerra a iteração, já que não há mais dados em dados2
    }
  });
  document.dispatchEvent(new Event('imagens-prontas'));
});

socket.on("retorno_titulo_sucesso", (dados2) =>{
  try{
      const titulos = document.getElementsByName("titulo")
      for (let i = 0; i < titulos.length; i++) {
          if (i < dados2.length) {
              
              titulos[i].textContent = dados2[i];

            
          } else {
            console.log("concluido") 
          }
        }
    }catch{
    console.log("n tem titulo");
  }
});

socket.on("retorno_preco_sucesso", (dados2) =>{
  try{
      const precos = document.getElementsByName("preco")
      console.log(dados2)
      for (let i = 0; i < precos.length; i++) {
          if (i < dados2.length) {
              
              precos[i].textContent = dados2[i];
              console.log(precos[i]);
            
          } else {
            console.log("concluido") 
          }
        }
  }catch{
    console.log("n tem preço");
  }
});

socket.on("retorno_sinopse_sucesso", (dados2) =>{
  try {
    const sinopse = document.getElementsByName("sinopse");
    console.log(dados2);
    for (let i = 0; i < sinopse.length; i++) {
      if (i < dados2.length) {
        sinopse[i].textContent = dados2[i];
  
        // Limpe o conteúdo anterior do elemento de descrição.
        sinopse[i].innerHTML = '';
  
        var paragrafos = dados2[i].split('\n');
        for (var j = 0; j < paragrafos.length; j++) {
          var paragrafo = document.createElement('p');
          paragrafo.textContent = paragrafos[j];
          sinopse[i].appendChild(paragrafo);
        }
        console.log(sinopse[i]);
      } else {
        console.log("concluído");
      }
    }
  } catch (error) {
    console.log("não tem sinopse");
  }
});







export {mostrarImagemJogo,mostrarTituloJogo,mostrarPrecoJogo,mostrarSinopseJogo};