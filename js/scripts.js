const clickForPoints = document.querySelectorAll('.normalPoints');
const scoreDisplay = document.querySelector('#score');
const gameContainer = document.querySelector('.game-container');
let gameStarted = false;

function incrementScore() {
    if (!gameStarted) {
        return;
    }
    const currentScore = parseInt(scoreDisplay.textContent, 10);
    scoreDisplay.textContent = currentScore + 10;
}
function decreaseScore(event) {
    if(!gameStarted) {
        return;
    }
    const currentScore = parseInt(scoreDisplay.textContent, 10);
    if (currentScore > 0) {
        scoreDisplay.textContent = currentScore - 5;
    }
    event.stopPropagation(); //this built in function stops the click form propagating further.
}

function restartScoreboard() {
    scoreDisplay.textContent = '0';
    gameStarted = false;
}
function scoreStart () {
    gameStarted = true;
}

clickForPoints.forEach((img) => {img.addEventListener('click', incrementScore);});
document.querySelector('#endGameBtn').addEventListener('click', restartScoreboard);
document.querySelector('#startGameBtn').addEventListener('click', scoreStart)
gameContainer.addEventListener('click', decreaseScore);

///////////////////////////////////////////////////////////////////ROUND TIMER////////////////////////////////////////////////////////////////////////
//added event listeners and deleted onclick from html. below, 'on' is deleted only 'click' is inputed to parameter. same with any other event with 'on'. for example onmouseup would be mouseup. 
document.querySelector('#endGameBtn').addEventListener('click', endGame);
document.querySelector('#startGameBtn').addEventListener('click', startGame);
// changed getElementById to querySelector.
const timerSpan = document.querySelector('#timer'); 

let timer;
let timeLeft = 60;
let isGameStarted = false; 

function endGame() {
    clearInterval(timer);
    timerSpan.innerHTML = 60; //changed to 60 instead of zero, so that it would display 60 before start game.

    isGameStarted = false; // game ended, ready for new start
}

function updateTimer() {
    if(timeLeft > 0) {
        timeLeft = timeLeft - 1;
        timerSpan.innerHTML = timeLeft;
    } else {
        endGame();
        //no need to reset the timerSpan here as endGame already sets it to 60. this was why it was glitching and not stopping with end game when start is pressed twice i think.
        //timerSpan.innerHTML = 60;
    }
}

function startGame() {
    if (isGameStarted) {
        return; //if the game has already started, dont reset or start again unless end game is pressed.
    }
    console.log("inside the start function");
    //clears any existing timer to avoid multiple intervals running.
    clearInterval(timer);
    //reset time left for a new game
    timeLeft = 60;
    //resets the timer display to 60 for a new start.
    timerSpan.innerHTML = timeLeft;
    //starts the interval to update the timer every second.
    timer = setInterval(updateTimer, 1000);
    
    isGameStarted = true;//indicates the game has started 
            
    //if we call updateTimer here again it will cause timer to decrease by 1 second immedieatly upon starting giving player 59 seconds because timelLeft - 1.
    //updateTimer();
}
