const imgElements = document.querySelectorAll('.normalPoints');
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

imgElements.forEach((img) => {img.addEventListener('click', incrementScore);});
document.querySelector('#endGameBtn').addEventListener('click', restartScoreboard);
document.querySelector('#startGameBtn').addEventListener('click', scoreStart)
gameContainer.addEventListener('click', decreaseScore);
