// variáveis
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const form = document.querySelector('#formulario');

// funções 

function validarUser() {

    let username = usernameInput.value; // pega o valor do input
    let email = emailInput.value;

    // valida o valor digitado
    if (username.trim() === '' || email.trim() === '' || (email.indexOf('.com', '@', 'email') == -1)) {
        window.alert('digite nomes válidos !')
    } else {
        // cria o objeto
        let user = {
            nome: username,
            email: email
        };

        // Salva o usuário no localstorage
        JSON.stringify(user)
        localStorage.setItem('user', JSON.stringify(user));

        // redireciona para a página principal
        window.location.href = "./dashboard/dashboard.html"
    }
}

// eventos
// Evita que redirecione direto 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validarUser();
})