import Canvas from "./canvas";
import GameLoop from "./gameLoop";
import Snake from "./snake";
import Score from "./score";
import Berry from "./berry";
import {BerryType} from "../types";
import KeysCombinations from "../constants";

export class Game {
    canvas: Canvas | null | undefined;
    snake: Snake;
    berry: BerryType;
    score: Score;
    gameLoop: GameLoop;
    constructor( container: HTMLElement | null ) {
        this.canvas = new Canvas( container );
        this.snake = new Snake();
        this.berry = new Berry( this.canvas );
        this.score = new Score( ".game-score .score-count", 0 );
        this.gameLoop = new GameLoop( this.update.bind(this), this.draw.bind(this) );

        this.control();

    }

    update() {
        if (!this.canvas) return;
        this.snake.update( this.berry, this.score, this.canvas.element );
    }

    draw() {
        if (!this.canvas?.context || !this.canvas?.element) return;
        this.canvas.context.clearRect( 0, 0, this.canvas.element.width, this.canvas.element.height );

        this.snake.draw( this.canvas.context );
        this.berry.draw( this.canvas.context );
    }

    control() {

        document.addEventListener("keydown",  (e: KeyboardEvent) => {
            if ( !this.gameLoop.isGamePaused && KeysCombinations.Up.value.includes(e.code) ) {
                this.snake.moveUp();
            } else if ( !this.gameLoop.isGamePaused && KeysCombinations.Left.value.includes(e.code) ) {
                this.snake.moveLeft();
            } else if ( !this.gameLoop.isGamePaused && KeysCombinations.Down.value.includes(e.code) ) {
                this.snake.moveDown();
            } else if ( !this.gameLoop.isGamePaused && KeysCombinations.Right.value.includes(e.code) ) {
                this.snake.moveRight();
            } else if ( KeysCombinations.Pause.value.includes(e.code) ) {
                this.gameLoop.pauseGame();
            }
        });

    }

}

// new Game( document.querySelector(".canvas-wrapper") );
