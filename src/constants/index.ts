export default class KeysDirections {
    static readonly Up = new KeysDirections("Up", ["KeyW", "ArrowUp"]);
    static readonly Down = new KeysDirections("Down", ["KeyS", "ArrowDown"]);
    static readonly Left = new KeysDirections("Left", ["KeyA", "ArrowLeft"]);
    static readonly Right = new KeysDirections("Right", ["KeyD", "ArrowRight"]);
    static readonly Pause = new KeysDirections("Pause", ["KeyP", "Space"]);

    private constructor(private readonly key: string, public readonly value: string[]) {}

    toString() {
        return this.key;
    }
}
