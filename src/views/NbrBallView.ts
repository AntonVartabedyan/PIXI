import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from '../EventDispatcher';
import { GameEvents } from '../GameEvents';
import { BrickType } from '../game/level/BrickType';

export class NbrBallView extends BaseView {

    private label: PIXI.Text;
    private nbrBallText: PIXI.Text;

    constructor() {
        super();
    }
    public addLeadingZeros(num: number, totalLength: number) {
        return String(num).padStart(totalLength, "0");
      }

    public setNbrBall(ball: number) {
            this.nbrBallText = new PIXI.Text(`Balls: ${this.addLeadingZeros(ball, 2)}`, {
              fontSize: 40,
              fontFamily: "Minecraft",
              fill: 0xffffff,
            });
            this.nbrBallText.resolution = 2;
            this.nbrBallText.anchor.set(0.5);
            this.nbrBallText.x = GameApplication.STAGE_WIDTH*0.1;
            this.nbrBallText.y = GameApplication.STAGE_HEIGHT*0.95;
            this.addChild(this.nbrBallText);
    }

    protected init() {
        super.init();

        
    }
}
