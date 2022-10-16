export default class Canvas {
    element: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null | undefined;

    constructor( container:HTMLElement | null ) {
        this.element = document.createElement( "canvas" );
        if (!this.element) return;
        this.context = this.element.getContext( "2d" );
        this.element.width = 320;
        this.element.height = 400;
        if (!container) return;
        container.appendChild( this.element );
    }

}
