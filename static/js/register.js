// Alternar visibilidade da senha
document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye-slash');
    this.querySelector('i').classList.toggle('bi-eye');
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPassword = document.getElementById('confirm-password');
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye-slash');
    this.querySelector('i').classList.toggle('bi-eye');
});

// Lógica para registrar o usuário
document.getElementById('form-register').onsubmit = async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    });

    if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '/';
    } else {
        alert('Erro ao cadastrar usuário. Tente novamente!');
    }
};
