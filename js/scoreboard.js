const imgElements = document.querySelectorAll('.normalPoints');
const scoreDisplay = document.querySelector('#score')

function incrementScore() {
    const currentScore = parseInt(scoreDisplay.textContent, 10);
    scoreDisplay.textContent = currentScore + 1;
}
imgElements.forEach(img) => {
    img.addEventListener('click', incrementScore);
}