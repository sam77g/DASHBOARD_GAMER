// função de validação
export function validar(game, horas, select) {

    // Valida os tipos
    if (typeof game !== 'string') return false
    if (typeof select !== 'string') return false
    if (typeof horas !== 'number') return false

    // valida se o texto é vazio 
    // Ex: "" ou "             "
    if (isEmpty(game) || isEmpty(select)) {
        window.alert("valores vazios são inválidos")
        return false
    }

    // Valida se as horas são finitas 
    if (!Number.isFinite(horas)) {
        window.alert('Horas inválidas ');
        return false
    } else if (horas < 0) { // valida se as hora é negativa
        window.alert('Digite horas válidas!! ');
        return false

    } else if (select === 'selection') {
        // alerta caso o usuário não tenha selecionado a plataforma
        window.alert('selecione a plataforma !!');
        return false

    } else {
        return true // retorna True se os valores são válidos
    }
}
// Função adjunta para verificar se é uma string e se é vazia
function isEmpty(str) {
    return typeof str !== 'string' || str.trim() === '';
}

// Função para verificar se o jogoo já existe
export function jogoExiste(nome, array) {
    // variavél booleana 
    const existe = array.some(function (jogo) {
        return jogo.nome.trim().toLowerCase() === nome.trim().toLowerCase()
    })
    if (existe) {
        // se o jogo existe ele retorna false e impede do usuário adicionar o jogo
        window.alert('esse jogo já existe !!')
        return false
    } else {
        // senão ele deixa o fluxo seguir
        return true
    }
}

