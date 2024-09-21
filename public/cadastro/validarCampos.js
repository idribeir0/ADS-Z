function validarCampos(form) {
    const nome = form["nome"];
    const phone = form["phone"];
    const email = form["email"];
    const email2 = form["email2"];
    const inputSenha = form["inputSenha"];
    const inputSenhaConfirma = form["inputConfirma"];
  
  
    let camposValidos = true;
  
    if (nome.value.length < 2) {
      marcarCampoInvalido(nome, "O nome deve ter pelo menos 2 caracteres");
      camposValidos = false;
    } else {
      limparCampoInvalido(nome);
    }
  
    if (!validatePhone(phone.value)) {
      marcarCampoInvalido(phone, "Insira um número de telefone válido");
      camposValidos = false;
    } else {
      limparCampoInvalido(phone);
    }
  
    if (!validateEmail(email.value)) {
      marcarCampoInvalido(email, "Insira um endereço de e-mail válido");
      camposValidos = false;
    } else {
      limparCampoInvalido(email);
    }
  
    if (email.value !== email2.value) {
      marcarCampoInvalido(email2, "Os endereços de e-mail não coincidem");
      camposValidos = false;
    } else {
      limparCampoInvalido(email2);
    }
  
    if (inputSenha.value.length === 0) {
      marcarCampoInvalido(inputSenha, "Insira uma senha");
      camposValidos = false;
    } else {
      limparCampoInvalido(inputSenha);
    }
  
    if (inputSenha.value !== inputSenhaConfirma.value) {
      marcarCampoInvalido(inputSenhaConfirma, "As senhas não coincidem");
      camposValidos = false;
    } else {
      limparCampoInvalido(inputSenhaConfirma);
    }
  
    return camposValidos;
  }
  
  function validatePhone(phone) {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  }
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function marcarCampoInvalido(campo, mensagem) {
    campo.classList.add("campo-invalido");
  
    console.log("esta errado")
    campo.parentNode.appendChild(mensagemErro);
  }
  
  function limparCampoInvalido(campo) {
    campo.classList.remove("campo-invalido");
  
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    if (mensagemErro) {
      campo.parentNode.removeChild(mensagemErro);
    }
    
  }

export default validarCampos;