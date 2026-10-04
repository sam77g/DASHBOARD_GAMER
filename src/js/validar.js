// função de validação
export function validar(game, horas, select){
    if(game.trim() === '' || horas <= 0 ){
        // alerta caso o usário não tenha digitado os nomes
        window.alert('digite o nome do jogo e/ou horas jogadas !! ');
        return false

    }else if( select == 'selection'){
        // alerta caso o usuário não tenha selecionado a plataforma
        window.alert('selecione a plataforma !!');
        return false

    }else{
        return true
    }
}

export function jogoExiste(nome, array){
    // variavél booleana 
    const existe = array.some(function(jogo){
        return jogo.jogo.trim().toLowerCase() === nome.trim().toLowerCase()
    })
    if(existe){
        // se o jogo existe ele retorna false e impede do usuário adicionar o jogo
        window.alert('esse jogo já existe !!')
        return false
    }else{
        // senão ele deixa o fluxo seguir
        return true
    }
}
