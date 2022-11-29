import Config from '../helpers/config';

export default class GameLoop {
    isGamePaused: Boolean;
    frameId: number | undefined;
    update: Function;
    draw: Function;
    config: Config;
    constructor( update: Function, draw: Function ) {
        this.isGamePaused = false;
        this.update = update;
        this.draw = draw;

        this.config = new Config();

        this.animate = this.animate.bind(this);
        this.frameId = this.animate();
    }

    animate() {
        if (this.isGamePaused) return;
        if (this.frameId) cancelAnimationFrame(this.frameId);
        const frameId = requestAnimationFrame( this.animate );
        if ( ++this.config.step < this.config.maxStep) {
            return;
        }
        this.config.step = 0;

        this.update();
        this.draw();
        return frameId;
    }

    pauseGame() {
        this.isGamePaused = !this.isGamePaused;
        if (!this.isGamePaused) this.frameId = requestAnimationFrame( this.animate );
    }
}
