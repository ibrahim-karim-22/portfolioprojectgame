let timer;
let timeLeft = 60;
const timerSpan = document.getElementById("timer");

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