let score = 0;
let gameActive = true;
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FFD93D',
    '#FF9999', '#99FFCD', '#9999FF', '#FFB366', '#FF99CC', '#99FF99'
];

// Create game over screen
function createGameOverScreen() {
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.innerHTML = `
        <div class="game-over-content">
            <h2>Ballon touched the celling Game Over!</h2>
            <p>Final Score: ${score}</p>
            <button class="btn btn-primary mt-3" onclick="restartGame()">Play Again</button>
        </div>
    `;
    document.querySelector('.game-container').appendChild(gameOver);
}

function restartGame() {
    // Remove game over screen
    const gameOver = document.querySelector('.game-over');
    if (gameOver) gameOver.remove();
    
    // Reset game state
    score = 0;
    gameActive = true;
    document.getElementById('score').textContent = score;
    
    // Remove all existing balloons
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => balloon.remove());
    
    // Start new game
    for(let i = 0; i < 10; i++) {
        setTimeout(() => createBalloon(), i * 300);
    }
}

function createBalloon() {
    if (!gameActive) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.animation = `float ${3 + Math.random() * 2}s infinite ease-in-out`;
    
    const balloonBody = document.createElement('div');
    balloonBody.className = 'balloon-body';
    balloonBody.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const string = document.createElement('div');
    string.className = 'balloon-string';
    
    balloon.appendChild(balloonBody);
    balloon.appendChild(string);
    
    // Random starting position
    balloon.style.left = Math.random() * 90 + 'vw';
    balloon.style.bottom = '-100px';
    
    balloon.onclick = (e) => {
        if (!gameActive) return;
        popBalloon(e, balloon);
        createSparkles(e.clientX, e.clientY);
        setTimeout(() => createBalloon(), Math.random() * 1000);
    };
    
    document.querySelector('.game-container').appendChild(balloon);
    
    // Animate upward
    let position = -100;
    const moveUp = () => {
        if (!gameActive) {
            balloon.remove();
            return;
        }

        position += 0.5;
        balloon.style.bottom = position + 'px';
        
        // Check if balloon reached top (game over condition)
        if (position > window.innerHeight - 100) {
            gameActive = false;
            createGameOverScreen();
            return;
        }
        
        if (position < window.innerHeight + 100) {
            requestAnimationFrame(moveUp);
        } else {
            balloon.remove();
            createBalloon();
        }
    };
    
    requestAnimationFrame(moveUp);
}

function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function popBalloon(e, balloon) {
    const popEffect = document.createElement('div');
    popEffect.className = 'pop-effect';
    popEffect.style.left = e.clientX - 25 + 'px';
    popEffect.style.top = e.clientY - 25 + 'px';
    popEffect.style.backgroundColor = balloon.querySelector('.balloon-body').style.backgroundColor;
    document.body.appendChild(popEffect);
    
    balloon.remove();
    score++;
    document.getElementById('score').textContent = score;
    
    // Play pop sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFhoSDgoOEgoODgoODgoODgoODgYKCgoKCgoKCgoKBgoGCgoGCgYKBgoGCgYOCg4ODg4ODg4OEgoSChIOChIKEgoSChIKEgoOCg4KDgoOCg4KDgoOCgoKCgoKCgoKCgoKCgYKBgoGCgYGBgYGBgYGBgYGBgYGBgYGBgYGBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgQ==');
    audio.play();
    
    setTimeout(() => popEffect.remove(), 500);
}

// Initial balloons
for(let i = 0; i < 10; i++) {
    setTimeout(() => createBalloon(), i * 300);
}