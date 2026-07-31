document.addEventListener("DOMContentLoaded", () => {
    const gameDisplay = document.getElementById("game-display");
    const challengePrompt = document.getElementById("challenge-prompt");
    const scoreDisplay = document.getElementById("game-score");
    const timerDisplay = document.getElementById("game-timer");
    const actionButtons = document.getElementById("action-buttons");

    let score = 0;
    let timeLeft = 15;
    let timerInterval = null;
    let isPlaying = false;
    let currentCorrectAction = "";

    // Array of possible circuit failure scenarios
    const scenarios = [
        {
            problem: "Warning: High voltage spike detected coming from the grid!",
            correct: "Install Resistor",
            options: ["Install Resistor", "Remove Ground", "Boost Capacitance"]
        },
        {
            problem: "Fault: Current is leaking directly to chassis metal frame!",
            correct: "Fix Short-Circuit",
            options: ["Add More Power", "Fix Short-Circuit", "Disconnect Battery"]
        },
        {
            problem: "The LED indicator light is completely dark and unresponsive.",
            correct: "Replace Blown Fuse",
            options: ["Replace Blown Fuse", "Paint the Wire", "Cool Down Room"]
        },
        {
            problem: "Logic gate is floating with no stable high/low reference state.",
            correct: "Add Pull-Up Resistor",
            options: ["Shake Breadboard", "Add Pull-Up Resistor", "Cut All Wires"]
        }
    ];

    const startBtn = document.getElementById("start-game-btn");
    startBtn.addEventListener("click", startGame);

    function startGame() {
        if (isPlaying) return;
        isPlaying = true;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        nextRound();
    }

    function nextRound() {
        if (timeLeft <= 0) return;
        
        // Pick a random scenario
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        currentCorrectAction = scenario.correct;

        gameDisplay.style.borderColor = "var(--highlight)";
        gameDisplay.innerHTML = `Status: Analyzing Fault ⚠️<br><span id="challenge-prompt" style="font-size: 0.95rem; color: #fff;">${scenario.problem}</span>`;

        // Shuffle options so they aren't always in the same order
        const shuffledOptions = [...scenario.options].sort(() => Math.random() - 0.5);

        // Render dynamic buttons
        actionButtons.innerHTML = "";
        shuffledOptions.forEach(option => {
            const btn = document.createElement("button");
            btn.classList.add("btn");
            btn.textContent = option;
            btn.addEventListener("click", () => handleChoice(option));
            actionButtons.appendChild(btn);
        });

        // Start or reset the countdown timer if not already running
        if (!timerInterval) {
            timeLeft = 20;
            timerInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `Time Left: ⏱️ ${timeLeft}s`;

                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        }
    }

    function handleChoice(selectedOption) {
        if (!isPlaying) return;

        if (selectedOption === currentCorrectAction) {
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            gameDisplay.style.borderColor = "var(--accent-green)";
            gameDisplay.innerHTML = `Status: Success! 🟢<br><span style="font-size: 0.9rem; color: var(--accent-green);">Fixed properly! +10 pts</span>`;
            
            setTimeout(() => {
                if (isPlaying) nextRound();
            }, 800);
        } else {
            timeLeft = Math.max(0, timeLeft - 3); // Penalty for wrong guess
            gameDisplay.style.borderColor = "#e76f51";
            gameDisplay.innerHTML = `Status: Faulty Fix! 🔴<br><span style="font-size: 0.9rem; color: #e76f51;">Wrong component! (-3s penalty)</span>`;
            
            setTimeout(() => {
                if (isPlaying) nextRound();
            }, 1000);
        }
    }

    function endGame() {
        isPlaying = false;
        clearInterval(timerInterval);
        timerInterval = null;

        gameDisplay.style.borderColor = "#e76f51";
        gameDisplay.innerHTML = `Game Over! ⚡<br><span style="font-size: 0.95rem; color: var(--text-color);">Final Score: ${score} points. Great engineering effort!</span>`;

        actionButtons.innerHTML = "";
        const restartBtn = document.createElement("button");
        restartBtn.id = "start-game-btn";
        restartBtn.classList.add("btn");
        restartBtn.textContent = "Play Again";
        restartBtn.addEventListener("click", startGame);
        actionButtons.appendChild(restartBtn);
        timerDisplay.textContent = `Time Left: ⏱️ 20s`;
    }
});
