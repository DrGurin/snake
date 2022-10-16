export default class Score {
    score: number;
    scoreBlock: Element | null;
    constructor( scoreBlock: string, score: number = 0 ) {

        this.scoreBlock = document.querySelector( scoreBlock );
        this.score = score;

        this.draw();

    }

    incScore() {
        this.score++;
        this.draw();
    }

    setToZero() {
        this.score = 0;
        this.draw();
    }

    draw() {
        if (!this.scoreBlock) return;
        this.scoreBlock.innerHTML = `${this.score}`;
    }
}
