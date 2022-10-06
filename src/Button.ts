import { random } from "gsap";
import * as PIXI from "PIXI.js";
import { GameApplication } from './GameApplication';
// import ButtonFunc from "./OnClick"

export class Button extends PIXI.Container {
    public background: PIXI.Sprite;
    public text: PIXI.Text;
    public label: string;


    constructor(label: string) {
        super();
        this.label = label;
        this.init();
    }

    private init() {

        this.createBackground();
        this.interactive = true;
        this.onPointerDown = this.onPointerDown.bind(this);
        this.setInteractiveCallbacks();
        this.createText();
    }

    private setInteractiveCallbacks() {
        this.addListener('pointerdown', this.onPointerDown);
    }

    private createBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawRoundedRect(0, 0, 200, 40, 40);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.background = new PIXI.Sprite(texture);
        this.addChild(this.background);
    }

    private createText() {
        this.text = new PIXI.Text(this.label, {
            fontFamily: 'Minecraft',
            fontSize: 35,
            fill: 0xffff00
        });
        this.text.anchor.set(0.5);
        this.text.x = this.background.width / 2;
        this.text.y = this.background.height / 2;
        this.addChild(this.text);
    }

    protected onPointerDown() {

    }
}