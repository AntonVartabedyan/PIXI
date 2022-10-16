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
            this.nbrBallText.x = this.background.width/2;
            this.nbrBallText.y = this.background.height/2;
            this.background.addChild(this.nbrBallText);
    }
    protected createBackground(){
    this.background = new PIXI.Graphics();
    this.background.lineStyle({ width: 2, color: 0xffffff });
    this.background.beginFill(0x000000);
    this.background.drawRect(0, 0, 250, 50);
    this.background.endFill();
    this.background.cacheAsBitmap = true;
    this.background.x = GameApplication.STAGE_WIDTH*0.01;
    this.background.y = GameApplication.STAGE_HEIGHT*0.9;
    this.addChild(this.background);
  }

    protected init() {
        super.init();

        
    }
}
