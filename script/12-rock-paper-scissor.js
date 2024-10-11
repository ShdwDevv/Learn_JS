const scoreElement = document.querySelector('.js-score');
const resultElement = document.querySelector('.js-result');
const movesElement = document.querySelector('.js-moves');
const autoElement = document.querySelector('.js-auto-play-button');
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    play('rock');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
    play('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    play('scissors');
});
autoElement.addEventListener('click',() => {
    autoPlay();
})
document.querySelector('.js-reset-button').addEventListener('click',() => {
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem('score'); // This remove the storage while refreshing
    updateScoreElement();
});
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r') play('rock');
    else if(event.key === 'p') play('paper');
    else if(event.key === 's') play('scissors');
    else if(event.key === 'Enter') autoPlay();
});
let randomNumber = 0;
let computerMove = '';
let result = '';
let score = JSON.parse(localStorage.getItem("score")) || {
    win : 0,
    lose : 0,
    tie : 0
}; // After the || is considered as default value
/*if(!score){ // while removing the score from local storage the score become null
    score = {
        win : 0,
        lose : 0,
        tie : 0
    }
}*/
updateScoreElement();
function computerPick(){
    randomNumber = Math.random();
    console.log(randomNumber);
    if(randomNumber >= 0 && randomNumber < 1/3){
        return 'rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
        return 'paper';
    }
    else{
        return 'scissors';
    }
}
let play = (user)=>{
    computerMove = computerPick();
    if(user === 'rock'){
        if(computerMove === 'rock') result = 'Tie.';
        else if(computerMove === 'paper') result = 'You lose.';
        else result = 'You win.'
    }
    else if(user === 'paper'){
        if(computerMove === 'rock') result = 'You win';
        else if(computerMove === 'paper') result = 'Tie';
        else result = 'You lose.'
    }
    else if(user === 'scissors'){
        if(computerMove === 'rock') result = 'You lose.';
        else if(computerMove === 'paper') result = 'You win.';
        else result = 'Tie.'
    }
    if(result === 'You win.') score.win += 1;
    else if(result === 'You lose.') score.lose += 1;
    else if(result === 'Tie.') score.tie += 1;
    updateScoreElement(user);
    localStorage.setItem("score",JSON.stringify(score));
    resultElement.innerHTML = result;
    movesElement.innerHTML = `You <img class="move-icon" src="./images/${user}-emoji.png" alt=""> <img class="move-icon" src="./images/${computerMove}-emoji.png" alt=""> Computer`;

}
function updateScoreElement(user='rock'){
    scoreElement.innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}
let isAutoPlaying = false;
let intervalID;
function autoPlay(){
    if(!isAutoPlaying){
        intervalID = setInterval(() =>{
            const userVal = computerPick();
            play(userVal);
        },1000);
        isAutoPlaying = true;
        autoElement.innerHTML = 'Stop Play';
    }
    else{
        clearInterval(intervalID);
        isAutoPlaying = false;
        autoElement.innerHTML = 'Auto Play';
    }
}