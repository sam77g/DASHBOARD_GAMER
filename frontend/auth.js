// variáveis
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const form = document.querySelector('#formulario');

// funções 

function validarUser(){

    let username = usernameInput.value ;
    let email = emailInput.value ;
    if(username.trim() === '' || email.trim() === '' ||  (email.indexOf('.com', '@', 'email') == -1) ){
        window.alert('digite nomes válidos !')
    }else{
        let user = {
            nome : username ,
            email : email
        } ;

        JSON.stringify(user)
        localStorage.setItem('user', JSON.stringify(user));


        window.location.href = "./dashboard/index.html"
    }
}

// eventos

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarUser();
})