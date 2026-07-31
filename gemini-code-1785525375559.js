// Wait for the HTML document to fully load before running code
document.addEventListener("DOMContentLoaded", () => {
    
    // Grab elements from our HTML document
    const fixButton = document.getElementById("fix-circuit-btn");
    const gameDisplay = document.getElementById("game-display");
    const scoreDisplay = document.getElementById("game-score");

    let score = 0;
    let isConnected = false;

    // Add an event listener for when the user clicks the circuit button
    fixButton.addEventListener("click", () => {
        isConnected = !isConnected; // Toggle state

        if (isConnected) {
            gameDisplay.textContent = "Circuit Status: Live! ⚡🟢 (Power flowing smoothly)";
            gameDisplay.style.borderColor = "#2a9d8f";
            fixButton.textContent = "Disconnect Circuit";
            
            // Increase score each time successfully connected
            score++;
            scoreDisplay.textContent = `Score: ${score} successful connections`;
        } else {
            gameDisplay.textContent = "Circuit Status: Offline 🔴 (Open switch)";
            gameDisplay.style.borderColor = "#48cae4";
            fixButton.textContent = "Connect Circuit";
        }
    });

});