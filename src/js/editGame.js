export function editarGame(array){
    const game = Number(document.querySelector('#idGame'))
    let gameHours = Number(game.horas)

    console.log(game)
    console.log(gameHours)

    let gameHoursAD = Number(window.prompt('digite o número de horas a serem adicionadas'))
    gameHours += gameHoursAD

    console.log(gameHoursAD)
    console.log(gameHours)

    let idGame = game.id
    console.log(id)

    array.forEach(array =>{
        if(array.id === idGame){
            array.horas = gameHours
        }
    })


}