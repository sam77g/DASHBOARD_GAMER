export function salvarJogos(array){
   
    localStorage.setItem(
        'jogos',
        JSON.stringify(array)
    );

}

export function carregarJogos(){
    const jogosString = localStorage.getItem('jogos');
    if(jogosString === null ){
        return []
    }
    const jogos = JSON.parse(jogosString)
    // validação
    if(Array.isArray(jogos) == false){
        return []
    }
    return jogos
    
}