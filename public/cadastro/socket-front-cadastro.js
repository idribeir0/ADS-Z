const socket = io();

function emitirCadastrarUsuario(dados) {
  socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () =>{
   const greenMessage = document.getElementById("loginErrorMessage")
greenMessage.innerText = "Cadastro realizado com sucesso.";
greenMessage.style.color = "green";});
socket.on("cadastro_erro", () =>{

const errorMessage = document.getElementById("loginErrorMessage");
  errorMessage.innerText = "Houve um erro no cadastro, por favor tente novamente mais tarde.";
  errorMessage.style.color = "red";});
socket.on("usuario_ja_existente", () => {

  const errorMessage = document.getElementById("loginErrorMessage");
    errorMessage.innerText = "Esse usuário já esta cadastrado por favor insira outro.";
    errorMessage.style.color = "red";});


export { emitirCadastrarUsuario };
