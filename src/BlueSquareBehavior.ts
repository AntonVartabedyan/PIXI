import * as PIXI from 'pixi.js';
import { GameObject } from "./GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameApplication } from './GameApplication';
import { EventDispacher } from './EventDispacher';
import { BallBehavior } from './BallBehavior';
import { check } from 'prettier';


export class BlueSquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity: number = 10;
    private ballObjRef: GameObject;
    private hitBot: boolean = false;
    private hitCircle: boolean = false


    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }
    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true });
        this.gameObjRef.removeChild(this.square);
    }
    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }
    protected init(): void {
        this.createBlueSquare();
    }
    private createBlueSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0f0fff);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }

    public update() {
        if (this.ballObjRef.y + (this.ballObjRef.height / 2) >= this.gameObjRef.y + (this.gameObjRef.height / 2) - 1 && this.ballObjRef.y + (this.ballObjRef.height / 2) <= this.gameObjRef.y + (this.gameObjRef.height / 2) + 1 && !this.hitCircle) {
            this.hitCircle = true;
            EventDispacher.getInstance().getDispacher().emit('updatescore')
            console.log(true);


        }
        if (this.gameObjRef.y + this.gameObjRef.height <= GameApplication.STAGE_HEIGHT && !this.hitBot) {
            this.gameObjRef.y += this.velocity / 5;
            if (this.gameObjRef.y + this.gameObjRef.height >= GameApplication.STAGE_HEIGHT) {

                this.hitCircle = false;
                console.log(false)
            }
        } else {
            this.gameObjRef.y -= this.velocity / 5;
            this.hitBot = true;
            if (this.gameObjRef.y <= 0) {

                this.hitBot = false;
                this.hitCircle = false;
            }

        }
    }
    private checkHit() {
        if (this.ballObjRef.y === this.gameObjRef.y) {
        }
    }
}