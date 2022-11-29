import Config from '../helpers/config';
import { getRandomInt } from "../helpers";
import Canvas from "./canvas";
import {BerryType} from "../types";

export default class Berry implements BerryType {
    constructor( canvas:Canvas ) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;

        this.config = new Config();
        this.randomPosition();

    }

    draw(context:CanvasRenderingContext2D) {

        context.beginPath();
        context.fillStyle = "#A00034";
        context.arc( this.x + (this.config.sizeCell / 2 ), this.y + (this.config.sizeCell / 2 ), this.config.sizeBerry, 0, 2 * Math.PI );
        context.fill();

    }

    randomPosition() {
        this.x = getRandomInt( 0, this.canvas.element.width / this.config.sizeCell ) * this.config.sizeCell;
        this.y = getRandomInt( 0, this.canvas.element.height / this.config.sizeCell ) * this.config.sizeCell;
    }

    canvas: any;
    config: Config;
    x: number;
    y: number;

}
