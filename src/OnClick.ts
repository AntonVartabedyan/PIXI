import * as PIXI from "PIXI.js";
import { Button } from "./Button";
import { GameApplication } from "./GameApplication";

export class ButtonFunc extends Button {

    public count: number = 0;
    private winText: PIXI.Text;
    private win: string = "You Win!";


    constructor(text2: string) {
        super(text2)

        this.func();
        this.setInteractiveCallbacksFunc();
        this.PointerDownFunc();
    }

    private setInteractiveCallbacksFunc() {
        this.addListener('pointerdown', this.PointerDownFunc);
    }
    private func() {

        this.onPointerDown = this.onPointerDown.bind(this);
        this.interactive = true;

        this.x = Math.random() * (GameApplication.STAGE_WIDTH - this.background.width);
        this.y = Math.random() * (GameApplication.STAGE_HEIGHT - this.background.height);
    }
    private PointerDownFunc() {
        this.x = Math.random() * (GameApplication.STAGE_WIDTH - this.background.width);
        this.y = Math.random() * (GameApplication.STAGE_HEIGHT - this.background.height);
        var x = Math.round(0xffffff * Math.random()).toString(16);
        var y = (6 - x.length);
        var z = "000000";
        var z1 = z.substring(0, y);
        var color: any = "0x" + z1 + x;
        this.background.tint = color, false;

    }
}