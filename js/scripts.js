const GRID_1 = document.querySelectorAll("button")[3];
const GRID_2 = document.querySelectorAll("button")[4];
const GRID_3 = document.querySelectorAll("button")[5];
const GRID_4 = document.querySelectorAll("button")[6];
const GRID_5 = document.querySelectorAll("button")[7];
const GRID_6 = document.querySelectorAll("button")[8];
const GRID_7 = document.querySelectorAll("button")[9];
const GRID_8 = document.querySelectorAll("button")[10];
const GRID_9 = document.querySelectorAll("button")[11];
const GRID_ARRAY = [
  GRID_1,
  GRID_2,
  GRID_3,
  GRID_4,
  GRID_5,
  GRID_6,
  GRID_7,
  GRID_8,
  GRID_9,
];
console.log(GRID_ARRAY);
// Declared all the grid-button variables for the buttons, and then put them inside of an array
const clickForPoints = document.querySelectorAll(".normalPoints");
const scoreTitle = document.querySelector(".score");
const scoreDisplay = document.querySelector("#score");
const scoreCon = document.querySelector(".score-container");
const gameContainer = document.querySelector(".game-container");
const btnsContainer = document.querySelector("#buttons-container");
const theGameTitle = document.querySelector("#gameTitle");
const instructions = document.querySelector("#instructions-container");
const backBtn = document.querySelector("#goBackBtnContainer");
const timerCon = document.querySelector(".timer-container");
const timerTitle = document.querySelector(".timer");
const timerDisplay = document.querySelector("#timer");
const theGameOverImage = document.querySelector(".gameOverImage");
const theGameOverMessage = document.querySelector("#gameOverMessage");
const startedSound = document.querySelector('#startedSound');
const countDownSound = document.querySelector('#countDownSound');
const moleExtraSound = document.querySelector('#moleExtraSound')
const moleClickSound = document.querySelector('#moleClickSound');
const gameOverScreenSound = document.querySelector('#gameOverScreenSound');
const gameOverBtnSound = document.querySelector('#gameOverBtnSound');
const teaseSound = document.querySelector('#teaseSound');
const emptyBoxSound = document.querySelector('#emptyBoxSound');
const bombSound = document.querySelector('#bombSound');

let pick; // Declared global variable for random number generator
let pickExtra;
let mole;
let moleExtra;
let moleTimeout;
let moleExtraTimeout;
let moleExtraCount = 0;
let gameStarted = false;
let countDownInterval;
let teaseSoundCounter = 0;

backBtn.style.display = "none";
theGameOverImage.style.display = "none";
theGameOverMessage.style.display = "none";

startedSound.style.display = "none";
startedSound.volume = 0.02;
countDownSound.style.display = "none";
countDownSound.volume = 0.02;
moleExtraSound.style.display = "none";
moleExtraSound.volume = 0.02;
moleClickSound.style.display = "none";
moleClickSound.volume = 0.02;
gameOverScreenSound.style.display = "none";
gameOverScreenSound.volume = 0.02;
gameOverBtnSound.style.display = "none";
gameOverBtnSound.volume = 0.005;
teaseSound.style.display = "none";
teaseSound.volume = 0.02;
emptyBoxSound.style.display = "none";
emptyBoxSound.volume = 0.005;
bombSound.style.display = "none";
bombSound.volume = ".05"

/////////SOUNDS/////////////////////////////////////////////////////
function startGameMusic() {
  startedSound.play();
}
function stopStartGameMusic() {
  startedSound.currentTime = 0;
  startedSound.pause();
}

function playCountDownSound() {
  // countDownSound.currentTime = 0;
  countDownSound.play();
}
function startCountDownSound() {
  countDownInterval = setInterval(playCountDownSound, 1000); // Play the sound every second
}
function stopCountDownSound() {
  clearInterval(countDownInterval);
  countDownSound.pause()
  countDownSound.currentTime = 0;
}

function startMoleExtraSound() {
  moleExtraSound.play();
}

function startMoleClickSound() {
  moleClickSound.play();
}

function startGameOverScreenSound() {
  gameOverScreenSound.play();
}

function startGameOverBtnSound() {
  gameOverBtnSound.play();
}

function startTeaseSound() {
  teaseSound.play();
}

function startEmptyBoxSound() {
  emptyBoxSound.play();
}

function startBombSound() {
  bombSound.play();
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function incrementScore(points) {
  if (!gameStarted) {
    return;
  }
  const currentScore = parseInt(scoreDisplay.textContent, 10);
  scoreDisplay.textContent = currentScore + points;
  clearflashRed();
  scoreCon.style.borderColor = "green";
  scoreCon.style.backgroundColor = "darkgreen";
  scoreDisplay.style.color = "yellow";
  scoreDisplay.style.fontSize = "35px";
  scoreTitle.style.color = "yellow";
  scoreTitle.style.marginBottom = "0";
  setTimeout(() => {
    scoreCon.style.borderColor = "black";
    scoreCon.style.backgroundColor = "white";
    scoreDisplay.style.color = "black";
    scoreDisplay.style.fontSize = "25px";
    scoreTitle.style.color = "black";
    scoreTitle.style.marginBottom = "8px";
  }, 500);
}
let flashRed;
function decreaseScore(event) {
  if (!gameStarted) {
    return;
  }
  const currentScore = parseInt(scoreDisplay.textContent, 10);

  if (currentScore > 0) {
    if (scoreCon.style.borderColor !== "green") {
      flashRed = setTimeout(() => {
        scoreCon.style.borderColor = "red";
        scoreDisplay.style.color = "red";
        scoreDisplay.style.fontSize = "35px";
        scoreTitle.style.color = "red";
        scoreTitle.style.marginBottom = "0";
        setTimeout(() => {
          scoreCon.style.borderColor = "black";
          scoreDisplay.style.color = "black";
          scoreDisplay.style.fontSize = "25px";
          scoreTitle.style.color = "black";
          scoreTitle.style.marginBottom = "8px";
        }, 500);
      }, 0);
    }
    scoreDisplay.textContent = currentScore - 5;
    const clickedElement = event.target;
    const isMoleOrEmptyBox = clickedElement.tagName.toLowerCase() !== 'img';

    if (isMoleOrEmptyBox) {
      scoreDisplay.textContent = currentScore - 5;
      if ((currentScore - 5) % 5 === 0) {
        startEmptyBoxSound();
      }
    }
  }
  event.stopPropagation(); //this built in function stops the click form propagating further.
}

function restartScoreboard() {
  startGameOverBtnSound();
  alert(
    "Your total score is " +
    scoreDisplay.textContent +
    " points. Thank you for playing!"
  ); //alert showing point total when game ends
  clearMoleTimeout();
  clearMoleExtraTimeout();

  scoreDisplay.textContent = "0";
  gameStarted = false;
}
function scoreStart() {
  gameStarted = true;
}
function goBackBtnPress() {
  scoreDisplay.textContent = "0"; // wheb time runs out score goes back to 0
  gameContainer.style.display = "block";
  btnsContainer.style.display = "block";
  instructions.style.display = "block";
  theGameTitle.style.display = "block";
  timerCon.style.display = "block";
  scoreCon.style.display = "block";
  backBtn.style.display = "none";
  theGameOverMessage.style.display = "none";
  theGameOverImage.style.display = "none";
}
// clickForPoints.forEach((img) => {img.addEventListener('click', incrementScore);});
// Commented out the above code since images will be created later on
document
  .querySelector("#endGameBtn")
  .addEventListener("click", restartScoreboard);
document.querySelector("#startGameBtn").addEventListener("click", scoreStart);
gameContainer.addEventListener("click", decreaseScore);
document.querySelector("#goBackBtn").addEventListener("click", goBackBtnPress);
///////////////////////////////////////////////////////////////////ROUND TIMER////////////////////////////////////////////////////////////////////////
//added event listeners and deleted onclick from html. below, 'on' is deleted only 'click' is inputed to parameter. same with any other event with 'on'. for example onmouseup would be mouseup.
document.querySelector("#endGameBtn").addEventListener("click", endGame);
document.querySelector("#startGameBtn").addEventListener("click", startGame);
const timerSpan = document.querySelector("#timer");

let timer;
let timeLeft = 60;
let isGameStarted = false;

function endGame() {
  clearInterval(timer);
  clearTimeout(startTeaseSound);
  clearBombUpTimeout();
  timerSpan.innerHTML = 60;
  isGameStarted = false;

  // Remove any remaining regular mole
  if (GRID_ARRAY[pick] && GRID_ARRAY[pick].firstChild) {
    while (GRID_ARRAY[pick].firstChild) {
      GRID_ARRAY[pick].removeChild(GRID_ARRAY[pick].firstChild);
    }
  }
  // Remove any remaining extra mole
  if (GRID_ARRAY[pickExtra] && GRID_ARRAY[pickExtra].firstChild) {
    while (GRID_ARRAY[pickExtra].firstChild) {
      GRID_ARRAY[pickExtra].removeChild(GRID_ARRAY[pickExtra].firstChild);
    }
  }

  // Reset picks to null or undefined
  pick = null;
  pickExtra = null;

  // Clear the timeouts for both regular mole and extra mole
  clearMoleTimeout();
  clearMoleExtraTimeout();
  stopStartGameMusic()
  stopCountDownSound()

  pick = 10; // Reset the pick to a number outside the range of the Array
  timerCon.style.color = "black";
  timerCon.style.borderColor = "black";
  timerDisplay.style.fontSize = "25px";
  timerTitle.style.marginBottom = "8px";
  moleExtraCount = 0; //reset mole extra so that it shows up if start game was pressed again
}

function startGame() {
  if (isGameStarted) {
    return; //if the game has already started, dont reset or start again unless end game is pressed.
  }
  //clears any existing timer to avoid multiple intervals running.
  clearInterval(timer);
  //reset time left for a new game
  timeLeft = 60;
  //resets the timer display to 60 for a new start.
  timerSpan.innerHTML = timeLeft;
  //starts the interval to update the timer every second.
  timer = setInterval(updateTimer, 1000);
  isGameStarted = true; //indicates the game has started
  //if we call updateTimer here again it will cause timer to decrease by 1 second immedieatly upon starting giving player 59 seconds because timelLeft - 1.
  //updateTimer();
  moleUp(); // Begins the cycle of the moles appearing
  moleExtraUp();
  bombUp();
  startGameMusic()

}
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--; // changed to decrement the value for cleaner code
    timerSpan.innerHTML = timeLeft;
  } else {
    gameOver();
  }
  if (timeLeft < 11 && timeLeft > 0) {
    timerCon.style.color = "red";
    timerCon.style.borderColor = "red";
    timerDisplay.style.fontSize = "35px";
    timerTitle.style.marginBottom = "0";
  } else if (timeLeft < 12 && timeLeft > 0) {
    startCountDownSound()
  } else if (timeLeft === 0) {
    stopCountDownSound()
  }
}
function gameOver() {
  endGame();
  clearMoleTimeout();
  clearMoleExtraTimeout();
  startGameOverScreenSound();
  clearTimeout(startTeaseSound);
  gameContainer.style.display = "none";
  btnsContainer.style.display = "none";
  instructions.style.display = "none";
  theGameTitle.style.display = "none";
  timerCon.style.display = "none";
  scoreCon.style.display = "none";
  backBtn.style.display = "block";
  theGameOverImage.style.display = "block";
  theGameOverMessage.style.display = "block";
  theGameOverMessage.innerHTML =
    "You've earned " + scoreDisplay.textContent + " points";
  //no need to reset the timerSpan here as endGame already sets it to 60. this was why it was glitching and not stopping with end game when start is pressed twice i think.
  //timerSpan.innerHTML = 60;
}
// New functions here
//mole appear
function moleUp() {

  clearMoleTimeout();
  mole = document.createElement("img"); // Creates new image element inside the DOM
  pick = Math.floor(Math.random() * GRID_ARRAY.length); // Assigns pick variable to a random number to be indexed inside the Array
  GRID_ARRAY[pick].appendChild(mole); // Appends the newly created image element (mole) as a child of a randomly chosen (using the pick variable) grid-button
  console.log(pick); // For debugging purposes, can be removed
  // This code block assigns CSS values to the new image element
  // Original Mole Image https://img.freepik.com/free-vector/little-mole-white-background_1308-93097.jpg?w=1060&t=st=1707271894~exp=1707272494~hmac=f945d34661b36cefc82f58d69c9fd50c5243faa3cd7c3264cb4ea93765d3c16b
  mole.src = "https://media.tenor.com/7jL7Lot_3HAAAAAi/the-little-mole.gif";
  mole.style.height = "100%";
  mole.style.width = "100%";
  mole.style.objectFit = "cover";
  if (teaseSoundCounter < 3) {
    setTimeout(startTeaseSound, Math.random() * 300);
    teaseSoundCounter++;
  }


  // Next two lines allow for the mole to disappear and add points when clicked
  mole.addEventListener("click", () => {
    moleDown(mole);
    incrementScore(10);
    startMoleClickSound()
  });
  mole.addEventListener("click", clearflashRed);
  // Starts timer for mole to disappear after 2 seconds
  setTimeout(() => {
    moleDown();
  }, 700);
}
//mole dissapear
// Removes mole which was created
/*function moleDown() {
    GRID_ARRAY[pick].removeChild(mole);
    if (isGameStarted === true) {
        newMole();
    }
}*/
function moleDown() {
  // Check if there is a mole in the button represented by GRID_ARRAY[pick]
  if (GRID_ARRAY[pick]) {
    //removed .firstChild to remove syntax error after adding endScreen.
    while (GRID_ARRAY[pick].firstChild) {
      GRID_ARRAY[pick].removeChild(GRID_ARRAY[pick].firstChild);
    }
  }
  // After removing the mole, you can continue with any other logic
  if (isGameStarted === true) {
    newMole();
  }
}
// New mole appears after 2 seconds

function newMole() {
  // Clear any existing timeout before setting a new one
  clearTimeout(moleTimeout);

  moleTimeout = setTimeout(() => {
    moleUp();
  }, 2000);
}
// Function to clear the timeout if needed.
function clearMoleTimeout() {
  clearTimeout(moleTimeout);
}
function clearflashRed() {
  clearTimeout(flashRed);
}

// EXTRA POINTS MOLE///////////////////////////////////////

function clearMoleExtraTimeout() {
  clearTimeout(moleExtraTimeout);
}

function moleExtraUp() {
  clearMoleExtraTimeout();
  if (moleExtraCount < 2) {
    moleExtraTimeout = setTimeout(() => {
      moleExtra = document.createElement("img");
      do {
        pickExtra = Math.floor(Math.random() * GRID_ARRAY.length);
      } while (pickExtra === pick); // Repeat until pickExtra is different from pick so they dont appear on the same button.

      GRID_ARRAY[pickExtra].appendChild(moleExtra);

      moleExtra.src =
        "https://media0.giphy.com/media/lgPVnjdVYshd8MfhYR/giphy.gif?cid=ecf05e47dqrj2z0dhck74b7jgex6y2dxv9z31tgr283077sj&ep=v1_gifs_related&rid=giphy.gif&ct=s";
      moleExtra.style.height = "100%";
      moleExtra.style.width = "100%";
      moleExtra.style.objectFit = "cover";

      moleExtra.addEventListener("click", () => {
        moleExtraDown();
        incrementScore(35);
        startMoleExtraSound()
      });

      moleExtra.addEventListener("click", clearflashRed);

      moleExtraTimeout = setTimeout(() => {
        moleExtraDown();
      }, 1000);
    }, Math.random() * 30000); // Random delay between 0 and 30000 milliseconds (30 seconds) to make moleExtra appear at seperate times rather than one after the other.
    moleExtraCount++; // Increment extra mole appearance count. decleared moleExtraCount and init to 0 to keep track of mole so that mole extra appears twice and stops
  }
}

function moleExtraDown() {
  if (GRID_ARRAY[pickExtra]) {
    while (GRID_ARRAY[pickExtra].firstChild) {
      GRID_ARRAY[pickExtra].removeChild(GRID_ARRAY[pickExtra].firstChild);
    }
  }

  if (isGameStarted === true) {
    newMoleExtra();
  }
}

function newMoleExtra() {
  clearMoleExtraTimeout();

  moleExtraTimeout = setTimeout(() => {
    moleExtraUp();
  }, 2000);
}

// BOMB MOLE///////////////////////////////////////

let bomb;
let bombUpTimeout;
let bombDownTimeout;
let pickBomb;
let delay;

function bombUp() {
  delay = ((Math.random() * 40) + 10) * 1000;

  bombUpTimeout = setTimeout(() => {

    bomb = document.createElement("img");

    bomb.src = "https://media.tenor.com/QOJvSboMRAgAAAAj/bobm-bomb.gif";
    bomb.style.objectFit = "cover";
    bomb.style.height = "100%";
    bomb.style.width = "100%";

    do {
      pickBomb = Math.floor(Math.random() * GRID_ARRAY.length)
    } while (pickBomb === pick || pickBomb === pickExtra);

    GRID_ARRAY[pickBomb].appendChild(bomb);

    bombDownTimeout = setTimeout(() => {
      bombDown();
    }, 1000);

    bomb.addEventListener('click', () => {
      clearBombDownTimeout();
      startBombSound();
      bombDown();
      gameOver();
    });

  }, delay);
}
function bombDown() {
  while (GRID_ARRAY[pickBomb].firstChild) {
    GRID_ARRAY[pickBomb].removeChild(bomb);
  }
}
function clearBombDownTimeout() {
  clearTimeout(bombDownTimeout);
}
function clearBombUpTimeout() {
  clearTimeout(bombUpTimeout);
}


