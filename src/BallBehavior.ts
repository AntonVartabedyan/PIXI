import * as PIXI from 'pixi.js';
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameApplication } from './GameApplication';
import { GameObject } from "./GameObject";

export class BallBehavior extends GameObjectBehavior {
    private ball: PIXI.Sprite;
    private velocity: number = 10;
    public keyPressed: boolean = false;
    public squareObjRef: GameObject;
    public bluesquareObjRef: GameObject;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public setSquareObjRef(gameObj: GameObject) {
        this.squareObjRef = gameObj;
    }
    public setBlueSquareObjRef(gameObj: GameObject) {
        this.bluesquareObjRef = gameObj;
        console.log(this.bluesquareObjRef)
    }


    public destroy() {
        this.ball.destroy({ texture: true, baseTexture: true });
        this.gameObjRef.removeChild(this.ball);
    }

    protected init(): void {
        this.createBall();
        this.setKeycallbackEvent();
    }
    private setKeycallbackEvent() {
        this.onKeyUp = this.onKeyUp.bind(this);
        window.addEventListener('keypress', this.onKeyUp);

    }
    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawCircle(0, 0, 20);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.ball);
    }
    public BallRef() {
        const ballObjRef = this.gameObjRef;
        return ballObjRef;
    }



    public update(delta: number) {
        // if (this.gameObjRef.y + (this.gameObjRef.height / 2) >= this.bluesquareObjRef.y + (this.bluesquareObjRef.height / 2)) {

        // }

        if (!this.keyPressed || this.gameObjRef.x + this.gameObjRef.width >= this.squareObjRef.x) {
            this.keyPressed = false
            return;
        }
        else if (
            this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta <
            GameApplication.getApp().view.width
        ) {
            this.gameObjRef.x += this.velocity * delta;
        } else {
            this.gameObjRef.x =
                GameApplication.getApp().view.width - this.gameObjRef.width;
            this.keyPressed = false
        }
    }

    private onKeyUp(e: KeyboardEvent) {
        if (e.code === 'Space') {
            this.keyPressed = true;


        }
    }
}