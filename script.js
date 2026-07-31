// --- Feature 1: Change Background Vibe ---
const colorBtn = document.getElementById('color-btn');
const body = document.body;

// List of fun background colors to cycle through
const colors = ['#0f172a', '#14532d', '#581c87', '#701a75'];
let colorIndex = 0;

colorBtn.addEventListener('click', function() {
    colorIndex = (colorIndex + 1) % colors.length;
    body.style.backgroundColor = colors[colorIndex];
});


// --- Feature 2: Click the Target Mini-Game ---
const startGameBtn = document.getElementById('start-game-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 5;
let gameInterval;
let isPlaying = false;

startGameBtn.addEventListener('click', function() {
    // Prevent spamming the button while game is active
    if (isPlaying) return;

    // Reset game state
    isPlaying = true;
    score = 0;
    timeLeft = 5;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startGameBtn.textContent = "Click Fast!";

    // Start countdown timer
    gameInterval = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            isPlaying = false;
            startGameBtn.textContent = "Play Again!";
            alert(`Game Over! Your final score was ${score} clicks! 🎉`);
        }
    }, 1000);
});

// Increase score every time the button is clicked during the game
startGameBtn.addEventListener('click', function() {
    if (isPlaying) {
        score++;
        scoreDisplay.textContent = score;
    }
});
