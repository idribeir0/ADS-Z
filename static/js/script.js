// Lógica de login
document.getElementById('form-login').onsubmit = async function (event) {
    event.preventDefault();
    const username = document.getElementById('login').value;
    const password = document.getElementById('senha').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        window.location.href = '/home'; // Redireciona para a página Home
    } else {
        alert('Login ou senha inválidos!');
    }
};

// Lógica de cadastro
document.getElementById('btn-cadastro').onclick = async function () {
    const username = prompt('Digite um nome de usuário:');
    const password = prompt('Digite uma senha:');

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
    } else {
        alert('Erro ao cadastrar usuário. Tente outro login.');
    }
};
