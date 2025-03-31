const form = document.getElementById('signInForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmacaoSenha = document.getElementById('confirmacao-senha');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    if (nome) isValid &= validateNome(nome);
    isValid &= validateEmail(email);
    isValid &= validateSenha(senha);
    if (confirmacaoSenha) isValid &= validateConfirmacaoSenha(confirmacaoSenha);

    if (isValid) {
        window.location.href = './index-login.html';
    }
});

if (nome) nome.addEventListener('blur', () => validateNome(nome));
email.addEventListener('blur', () => validateEmail(email));
senha.addEventListener('blur', () => validateSenha(senha));
if (confirmacaoSenha) confirmacaoSenha.addEventListener('blur', () => validateConfirmacaoSenha(confirmacaoSenha));

function validateNome(input) {
    let isValid = true;
    if (input.value.trim() === '') {
        showError(input, 'Este campo é obrigatório.');
        isValid = false;
    } else {
        removeError(input);
    }
    return isValid;
}

function validateEmail(input) {
    let isValid = true;
    const emailValue = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '' || !regex.test(emailValue)) {
        showError(input, 'Este campo é obrigatório e deve ser um e-mail válido.');
        isValid = false;
    } else {
        removeError(input);
    }
    return isValid;
}

function validateSenha(input) {
    let isValid = true;
    const senhaValue = input.value.trim();

    if (senhaValue.length < 6 || senhaValue.length > 12) {
        showError(input, 'A senha deve ter entre 6 e 12 caracteres.');
        isValid = false;
    } else {
        removeError(input);
    }
    return isValid;
}

function validateConfirmacaoSenha(input) {
    let isValid = true;
    const confirmacaoSenhaValue = input.value.trim();

    if (confirmacaoSenhaValue !== senha.value.trim()) {
        showError(input, 'As senhas não coincidem.');
        isValid = false;
    } else {
        removeError(input);
    }
    return isValid;
}

function showError(input, message) {
    const container = input.closest('.input-container');
    const error = container.querySelector('.input-error-message');
    container.classList.add('input-container--invalid');
    error.textContent = message;
}

function removeError(input) {
    const container = input.closest('.input-container');
    const error = container.querySelector('.input-error-message');
    container.classList.remove('input-container--invalid');
    error.textContent = '';
}
