
const KeysCombinations = {
    Up: ["KeyW", "ArrowUp"],
    Down: ["KeyS", "ArrowDown"],
    Left: ["KeyA", "ArrowLeft"],
    Right: ["KeyD", "ArrowRight"],
    Pause: ["KeyP", "Space"],
}
let scoreBlock;
let frameId = null;
let score = 0;
let isGamePaused = false;
const snakeSpeedByDefault = 4;

const config = {
    step: 0,
    maxStep: snakeSpeedByDefault,
    sizeCell: 16,
    sizeBerry: 16 / 4,
}

const snake = {
    x: 160,
    y: 160,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3,
}

let berry = {
    x: 0,
    y: 0,
}


let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");

function gameLoop() {
    if (isGamePaused) return;
    frameId = requestAnimationFrame( gameLoop );
    if ( ++config.step < config.maxStep) return;
    config.step = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBerry();
    drawSnake();
}

function startGame(isNew = false) {
    const confirmationMsg = isNew ? 'Are you ready for the game?' : "Don't eat yourself! Restart game?";
    const confirmation = confirm(confirmationMsg);
    if (!confirmation) window.close();
    isGamePaused = false;
    drawScore();
    randomPositionBerry();
    if (frameId) cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame( gameLoop );
};
startGame(true);

function pauseGame() {
    isGamePaused = !isGamePaused;
    if (!isGamePaused) frameId = requestAnimationFrame( gameLoop );
}

function drawSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    // todo бордер
    snake.tails.unshift( { x: snake.x, y: snake.y } );

    if ( snake.tails.length > snake.maxTails ) {
        snake.tails.pop();
    }

    snake.tails.forEach( function(el, index){
        if (index == 0) {
            context.fillStyle = "#FA0556";
        } else {
            context.fillStyle = "#A00034";
        }
        context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

        if ( el.x === berry.x && el.y === berry.y ) {
            snake.maxTails++;
            incScore();
            randomPositionBerry();
        }

        for( let i = index + 2; i < snake.tails.length; i++ ) {

            if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
                refreshGame(false);
            }

        }

    } );
}

function collisionBorder() {
    if (snake.x < 0) {
        snake.x = canvas.width - config.sizeCell;
    } else if ( snake.x >= canvas.width ) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - config.sizeCell;
    } else if ( snake.y >= canvas.height ) {
        snake.y = 0;
    }
}
function refreshGame(newGame = true) {
    snake.x = 160;
    snake.y = 160 ;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;
    score = 0;
    startGame();
}

function drawBerry() {
    context.beginPath();
    context.fillStyle = "#A00034";
    context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
    context.fill();
}

function randomPositionBerry() {
    berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
    berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}

function incScore() {
    score++;
    drawScore();
}

function drawScore() {
    scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
    let head = snake.tails[0];
    let neck = snake.tails[1];
    if ( !isGamePaused && KeysCombinations.Up.includes(e.code) ) {
        if (head.y !== neck.y ) return;
        snake.dy = -config.sizeCell;
        snake.dx = 0;
    } else if ( !isGamePaused && KeysCombinations.Left.includes(e.code) ) {
        if (head.y === neck.y ) return;
        snake.dx = -config.sizeCell;
        snake.dy = 0;
    } else if ( !isGamePaused && KeysCombinations.Down.includes(e.code) ) {
        if (head.y !== neck.y ) return;
        snake.dy = config.sizeCell;
        snake.dx = 0;
    } else if ( !isGamePaused && KeysCombinations.Right.includes(e.code) ) {
        if (head.y === neck.y ) return;
        snake.dx = config.sizeCell;
        snake.dy = 0;
    } else if ( KeysCombinations.Pause.includes(e.code) ) {
        pauseGame();
    }

});
