import Config from '../helpers/config';
import { BerryType } from '../types';
import Score from "./score";

const setupDefaultValues = (ctx: Snake) => {
    ctx.x = 160;
    ctx.y = 160;
    ctx.dx = ctx.config.sizeCell;
    ctx.dy = 0;
    ctx.tails = [];
    ctx.maxTails = 3;
    ctx.head = { x: 0, y: 0 };
    ctx.neck = { x: 0, y: 0 };
}
export default class Snake {
    config: Config;
    x: number;
    y: number;
    dx: number;
    dy: number;
    tails: { x: number, y: number }[];
    maxTails: number;
    head: { x: number, y: number };
    neck: { x: number, y: number };

    constructor(){

        this.config = new Config();
        this.x = 160;
        this.y = 160;
        this.dx = this.config.sizeCell;
        this.dy = 0;
        this.tails = [];
        this.maxTails = 3;
        this.head = { x: 0, y: 0 };
        this.neck = { x: 0, y: 0 };
        console.log({head: this.head, neck: this.neck});
    }

    update( berry: BerryType, score:Score, canvasElement:HTMLCanvasElement | null ) {
        if (!canvasElement) return;
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0) {
            this.x = canvasElement.width - this.config.sizeCell;
        } else if ( this.x >= canvasElement.width ) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = canvasElement.height - this.config.sizeCell;
        } else if ( this.y >= canvasElement.height ) {
            this.y = 0;
        }

        this.tails.unshift( { x: this.x, y: this.y } );

        if ( this.tails.length > this.maxTails ) {
            this.tails.pop();
        }

        this.tails.forEach( (el, index) => {

            if ( el.x === berry.x && el.y === berry.y ) {
                this.maxTails++;
                score.incScore();
                berry.randomPosition();
            }

            for( let i = index + 1; i < this.tails.length; i++ ) {

                if ( el.x == this.tails[i].x && el.y == this.tails[i].y ) {
                    this.death();
                    score.setToZero();
                    berry.randomPosition();
                }
            }
        } );
        this.head = this.tails[0];
        this.neck = this.tails[1];

    }

    draw(context:CanvasRenderingContext2D) {

        this.tails.forEach( (el, index) => {
            if (index == 0) {
                context.fillStyle = "#FA0556";
            } else {
                context.fillStyle = "#A00034";
            }
            context.fillRect( el.x, el.y, this.config.sizeCell, this.config.sizeCell );
        } );

    }

    death() {
        setupDefaultValues(this);
    }

    moveUp() {
        if (this.head?.y !== this.neck?.y ) return;
        this.dy = -this.config.sizeCell;
        this.dx = 0;
    }
    moveDown() {
        if (this.head?.y !== this.neck?.y ) return;
        this.dy = this.config.sizeCell;
        this.dx = 0;
    }
    moveRight() {
        if (this.head?.y === this.neck?.y ) return;
        this.dx = this.config.sizeCell;
        this.dy = 0;
    }
    moveLeft() {
        if (this.head?.y === this.neck?.y ) return;
        this.dx = -this.config.sizeCell;
        this.dy = 0;
    }

}
