const GRID_1 = document.querySelectorAll("button")[2];
const GRID_2 = document.querySelectorAll("button")[3];
const GRID_3 = document.querySelectorAll("button")[4];
const GRID_4 = document.querySelectorAll("button")[5];
const GRID_5 = document.querySelectorAll("button")[6];
const GRID_6 = document.querySelectorAll("button")[7];
const GRID_7 = document.querySelectorAll("button")[8];
const GRID_8 = document.querySelectorAll("button")[9];
const GRID_9 = document.querySelectorAll("button")[10];
const GRID_ARRAY = [GRID_1, GRID_2, GRID_3, GRID_4, GRID_5, GRID_6, GRID_7, GRID_8, GRID_9];
// Declared all the grid-button variables for the buttons, and then put them inside of an array
const clickForPoints = document.querySelectorAll('.normalPoints');
const scoreDisplay = document.querySelector('#score');
const gameContainer = document.querySelector('.game-container');
let pick; // Declared global variable for random number generator
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
    alert('Your total score is ' + scoreDisplay.textContent + ' points. Thank you for playing!'); //alert showing point total when game ends
    scoreDisplay.textContent = '0';
    gameStarted = false;
}
function scoreStart () {
    gameStarted = true;
}

// clickForPoints.forEach((img) => {img.addEventListener('click', incrementScore);});
// Commented out the above code since images will be created later on
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
    pick = 10; // Reset the pick to a number outside the range of the Array
}

function updateTimer() {
    if(timeLeft > 0) {
        timeLeft-- // changed to decrement the value for cleaner code
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

    moleUp(); // Begins the cycle of the moles appearing
}

// New functions here

function moleUp() {
    let mole = document.createElement('img'); // Creates new image element inside the DOM
    pick = Math.floor(Math.random() * GRID_ARRAY.length); // Assigns pick variable to a random number to be indexed inside the Array
    console.log(pick); // For debugging purposes, can be removed

    // This code block assigns CSS values to the new image element
    mole.src = 'https://img.freepik.com/free-vector/little-mole-white-background_1308-93097.jpg?w=1060&t=st=1707271894~exp=1707272494~hmac=f945d34661b36cefc82f58d69c9fd50c5243faa3cd7c3264cb4ea93765d3c16b'
    mole.style.height = '100%';
    mole.style.width = '100%';
    mole.style.objectFit = 'cover';

    GRID_ARRAY[pick].appendChild(mole); // Appends the newly created image element (mole) as a child of a randomly chosen (using the pick variable) grid-button

    // Next two lines allow for the mole to disappear and add points when clicked
    mole.addEventListener('click', ()=>{moleDown(mole);});
    mole.addEventListener('click', incrementScore);

    // Starts timer for mole to disappear after 2 seconds
    setTimeout(()=>{
        moleDown(mole);
    }, 2000);
}

// Removes mole which was created 
function moleDown(mole) {
    GRID_ARRAY[pick].removeChild(mole);
    if (isGameStarted === true) {
        newMole();
    }
}

// New mole appears after 2 seconds
function newMole() {
    setTimeout(()=>{
        moleUp();
    }, 2000);
}