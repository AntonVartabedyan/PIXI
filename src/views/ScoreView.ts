import { BaseView } from "./BaseView";
import * as PIXI from "pixi.js";
import { GameApplication } from "../GameApplication";
import { GameEvents } from "../GameEvents";
import { EventDispatcher } from "../EventDispatcher";
import { BrickType } from "../game/level/BrickType";

export class ScoreView extends BaseView {
  private scoreText: PIXI.Text;

  constructor() {
    super();
  }
  public addLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, "0");
  }

  public setScore(score: number) {
    
    this.scoreText = new PIXI.Text(`SCORE: ${this.addLeadingZeros(score, 3)}`, {
      fontSize: 40,
      fontFamily: "Minecraft",
      fill: 0xffffff,
    });
    this.scoreText.resolution = 2;
    this.scoreText.anchor.set(0.5);
    this.scoreText.x = this.background.width / 2;
    this.scoreText.y = this.background.height / 2;

    this.background.addChild(this.scoreText);
  }

  

  protected init() {
    super.init();
  }
  protected createBackground(){
    this.background = new PIXI.Graphics();
    this.background.lineStyle({ width: 2, color: 0xffffff });
    this.background.beginFill(0x000000);
    this.background.drawRect(0, 0, 250, 50);
    this.background.endFill();
    this.background.cacheAsBitmap = true;
    this.background.x = GameApplication.STAGE_WIDTH * 0.99-this.background.width;
    this.background.y = GameApplication.STAGE_HEIGHT * 0.9;
    this.addChild(this.background);
  }
}
