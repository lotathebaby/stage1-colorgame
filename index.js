const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("options");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let colors = [];
let targetColor = "";
let score = 0;

// Function to generate a random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to set up the game
function setupGame(resetScore = false) {
    colors = Array.from({ length: 6 }, generateRandomColor);
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    
    colorBox.style.backgroundColor = targetColor;
    optionsContainer.innerHTML = "";
    
    colors.forEach(color => {
        const button = document.createElement("button");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");
        button.addEventListener("click", () => checkGuess(color));
        optionsContainer.appendChild(button);
    });

    gameStatus.textContent = "";

    // Reset score if a new game is started
    if (resetScore) {
        score = 0;
        scoreDisplay.textContent = score;
    }
}

// Function to check the user's guess
function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        score++;
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        scoreDisplay.textContent = score;

        // Automatically start a new round after a short delay
        setTimeout(setupGame, 1000); 
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
    }
}

// Event listener for the New Game button
newGameButton.addEventListener("click", () => setupGame(true));

// Initialize the game
setupGame();
