import { World } from "./world";

export class MouseEventHandler {
    private world: World;
    private isMovingViewport: boolean = false;

    public constructor(world: World) {
        this.world = world;
        //window.addEventListener("mouseenter", this.handleClickEvent);
        //window.addEventListener("mouseleave", this.handleClickEvent);
        window.addEventListener("mousemove", this.handleClickEvent);
        window.addEventListener("mousedown", this.handleClickEvent);
        window.addEventListener("mouseup", this.handleClickEvent);
    }

    public handleClickEvent(e: MouseEvent) {
        e.preventDefault();
        const handler: MouseEventHandler = (<World>(<any>window).world).mouseEventHandler;
        switch (e.type) {
            case 'mousedown':
                handler.startMovingViewport();
                break;
            case 'mouseup':
                handler.stopMovingViewport();
                break;
            case 'mousemove':
                handler.moveViewport(e);
                break;
        }
    }

    public moveViewport(e: MouseEvent): void {
        if (!this.isMovingViewport) {
            return;
        }
        this.world.windowOffset.x -= e.movementX;
        if (this.world.windowOffset.x < 0) {
            this.world.windowOffset.x = 0;
        }
        const maxX = Math.max(0, (this.world.width - this.world.canvas.width));
        if (this.world.windowOffset.x > maxX) {
            this.world.windowOffset.x = maxX;
        }
        this.world.windowOffset.y -= e.movementY;
        if (this.world.windowOffset.y < 0) {
            this.world.windowOffset.y = 0;
        }
        const maxY = Math.max(0, (this.world.height - this.world.canvas.height));
        if (this.world.windowOffset.y > maxY) {
            this.world.windowOffset.y = maxY;
        }
    }
    
    private startMovingViewport = () => {
        this.isMovingViewport = true;
    }

    private stopMovingViewport = () => {
        this.isMovingViewport = false;
    }
}