let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')


const updateGame = (p1, p2, gameState) => {
    p1NameDiv.innerText = p1.name
    p2NameDiv.innerText = p2.name
    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health
    if(p1.health <= 0 || p2.health <= 0){
        game.isOver = true
        gameState = game.isOver
        resultDiv.innerText = game.declareWinner(gameState,p1,p2)
    }
}

class Player{
    constructor(name, health, attackDmg){
        this.name = name;
        this.health = health;
        this.attackDmg = attackDmg;
    }
    strike(player,enemy,attackDmg){
        let damageAmt = Math.floor(Math.random() * attackDmg)
        enemy.health -= damageAmt 
        updateGame(p1,p2,game.isOver)
        return `${player.name} attacks ${enemy.name} for ${damageAmt} damage!`
    }
    heal(player){
        let hpAmt = Math.floor(Math.random() * 5)
        player.health += hpAmt
        updateGame(p1,p2,game.isOver)
        return `${player.name} heals for ${hpAmt} HP!`
    }
}

class Game{
    constructor(){
        this.isOver = false
    }
    declareWinner(isOver,p1,p2){
        let message
        if(isOver == true && p1.health <= 0){
            message = `${p2.name} wins!`
        }else if(isOver == true && p2.health <= 0){
            message = `${p1.name} wins!`
        }
        document.getElementById("victory").play()
        return message
    }
    reset(p1,p2){
        p1.health = 100
        p2.health = 100
        this.isOver = false
        resultDiv.innerText = ''
        updateGame(p1, p2, game.isOver)
    }
    play(p1,p2){
        this.reset(p1,p2)
        while(!this.isOver){
            p1.strike(p1,p2,p1.attackDmg)
            p1.heal(p1)
            p2.strike(p2,p1,p2.attackDmg)
            p2.heal(p2)
        }
       return this.declareWinner(this.isOver,p1,p2)
    }
}

let player1 = new Player("Banjo", 100, 10)
let player2 = new Player("Lucifer", 100, 10)
let game = new Game()

let p1 = player1
let p2 = player2

//Player 1 strike controls
document.addEventListener("keydown", function (event){
    if(event.key == 'q' && p2.health > 0 && game.isOver == false){
        p1.strike(p1,p2,p1.attackDmg)
        document.getElementById("p1attack").play()
    }
});

//Player 1 heal control
document.addEventListener("keydown", function (event){
    if(event.key == 'a' && p1.health > 0 && game.isOver == false){
        p1.heal(p1)
        document.getElementById("p2heal").play()
    }
});

//Player 2 strike controls
document.addEventListener("keydown", function(event){
    if(event.key == 'p' && p1.health > 0 && game.isOver == false){
        p2.strike(p2,p1,p2.attackDmg)
        document.getElementById("p2attack").play()
    }
});

//Player 2 heal control
document.addEventListener("keydown", function (event){
    if(event.key == 'l' && p2.health > 0 && game.isOver == false){
        p2.heal(p2)
        document.getElementById("p1heal").play()
    }
});

//When you click play button
playButton.onclick = () => game.play(p1,p2)


