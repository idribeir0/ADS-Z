import { obterCookie } from "../utils/cookies.js";



function mostrarImagemJogo(){
    socket.emit("imagemJogoPrincipal");
};


function mostrarTituloJogo(){
    socket.emit("tituloJogo");
};

function mostrarPrecoJogo(){
    socket.emit("precoJogo");
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
  console.log("passou aqui");
  //console.log(dados2);

  const imagemContainer = document.querySelector(".splide .splide__track ul"); // Seleciona a ul dentro da track do Splide
  const imagemContainer2 = document.querySelector(".splide2 .splide__track ul"); // Seleciona a ul dentro da track do Splide2

  // Limpa as uls para garantir que estejam vazias antes de adicionar as imagens
  imagemContainer.innerHTML = "";
  imagemContainer2.innerHTML = "";

  dados2.forEach((imagemSrc, index) => {
    const li = document.createElement("li");
    li.className = "splide__slide";


    const img = document.createElement("img");
    img.src = imagemSrc;
    img.alt = `Imagem do jogo ${index + 1}`;
    img.className = "img-game";

    li.appendChild(img);
    imagemContainer.appendChild(li);

    const li2 = document.createElement("li");
    li2.className = "splide__slide";

    const a = document.createElement("a");
    a.href = "../news/news.html";

    const divAumentaTudo = document.createElement("div");
    divAumentaTudo.className = "aumentaTudo";

    const img2 = document.createElement("img");
    img2.src = imagemSrc;
    img2.alt = `Imagem do jogo ${index + 1}`;
    img2.className = "imagenzinhas";
    img2.name = "img-game";

    const spanNome = document.createElement("span");
    spanNome.className = "nome";
    spanNome.name = "titulo";

    const spanPreco = document.createElement("span");
    spanPreco.className = "preco";
    spanPreco.name = "preco";

    divAumentaTudo.appendChild(img2);
    divAumentaTudo.appendChild(spanNome);
    divAumentaTudo.appendChild(spanPreco);

    a.appendChild(divAumentaTudo);
    li2.appendChild(a);

    // Adicione o elemento completo ao Splide2
    imagemContainer2.appendChild(li2);
  });

    document.dispatchEvent(new Event('imagens-prontas'));
    
});

socket.on("retorno_titulo_sucesso", (dados2) =>{
    const titulos = document.getElementsByClassName("titulo");
    for (let i = 0; i < titulos.length; i++) {
        if (i < dados2.length) {
            
            titulos[i].textContent = dados2[i];

          
        } else {
          console.log("concluido") 
        }
      }
});

socket.on("retorno_preco_sucesso", (dados2) =>{

      const precos = document.getElementsByClassName("preco");
      
      console.log(precos);
      for (let i = 0; i < precos.length; i++) {
          if (i < dados2.length) {
              
              precos[i].textContent = dados2[i];
              console.log(precos[i]);
            
          } else {
            console.log("concluido") 
          }
        }
    
});







export {mostrarImagemJogo,mostrarTituloJogo,mostrarPrecoJogo};
