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
        timerSpan.innerHTML = 60;
    }
}

function startGame() {
    console.log("inside the start function");
    timer = setInterval(updateTimer, 1000);
    timeLeft = 60
    updateTimer();
}