import { BaseView } from "./BaseView";
import * as PIXI from "pixi.js";
import { GameApplication } from "../GameApplication";
import { GameEvents } from "../GameEvents";
import { EventDispatcher } from "../EventDispatcher";
import { BrickType } from "../game/level/BrickType";

export class ScoreView extends BaseView {
  private scoreTextBG: PIXI.Graphics;
  private scoreText: PIXI.Text;

  constructor() {
    super();
  }
  private addLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, "0");
  }

  public setScore(score: number) {
    // this.scoreText.lineStyle({ width: 2, color: 0xffffff });
    // this.scoreText.style.lineHeight = 60;
    this.scoreTextBG = new PIXI.Graphics();
    this.scoreTextBG.lineStyle({ width: 2, color: 0xffffff });
    this.scoreTextBG.beginFill(0x000000);
    this.scoreTextBG.drawRect(0, 0, 250, 50);
    this.scoreTextBG.endFill();
    this.scoreTextBG.cacheAsBitmap = true;
    this.scoreTextBG.x = GameApplication.STAGE_WIDTH * 0.01;
    this.scoreTextBG.y = GameApplication.STAGE_HEIGHT * 0.9;
    this.addChild(this.scoreTextBG);
    this.scoreText = new PIXI.Text(`SCORE: ${this.addLeadingZeros(score, 3)}`, {
      fontSize: 40,
      fontFamily: "Minecraft",
      fill: 0xffffff,
    });
    this.scoreText.resolution = 2;
    this.scoreText.anchor.set(0.5);
    this.scoreText.x = this.scoreTextBG.width / 2;
    this.scoreText.y = this.scoreTextBG.height / 2;

    this.scoreTextBG.addChild(this.scoreText);
  }

  protected init() {
    super.init();
  }
}
