export default class Config {
    step: number;
    maxStep: number;
    sizeCell: number;
    sizeBerry: number;

    constructor() {
        this.step = 0;
        this.maxStep = 6;
        this.sizeCell = 16;
        this.sizeBerry = this.sizeCell / 4;

    }
}
