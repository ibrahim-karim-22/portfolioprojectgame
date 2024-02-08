let timer;
let timeLeft = 60;
const timerSpan = document.getElementById("timer");

function endGame() {
    clearInterval(timer);
    timerSpan.innerHTML = 0;
}

function updateTimer() {
    if(timeLeft > 0) {
        timeLeft = timeLeft - 1;
        timerSpan.innerHTML = timeLeft;
    } else {
        endGame();
        //no need to reset the timerSpan here as endGame already sets it to 0.
        //timerSpan.innerHTML = 60;
    }
}

function startGame() {
    console.log("inside the start function");
    //clears any existing timer to avoid multiple intervals running.
    clearInterval(timer);
    //reset time left for a new game
    timeLeft = 60;
    //resets the timer display to 60 for a new start.
    timerSpan.innerHTML = timeLeft;
    //starts the interval to update the timer every second.
    timer = setInterval(updateTimer, 1000);
    
    updateTimer();
}