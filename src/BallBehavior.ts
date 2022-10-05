import { GameObjectBehavior } from "./GameObjectBehavior";
import * as PIXI from 'PIXI.js';
import { GameApplication } from "./GameApplication";

import { GameObject } from "./GameObject";
import { SquareBehavior } from "./SquareBehavior";
import { Game } from "./Game";

export class BallBehavior extends GameObjectBehavior {
  private ball: PIXI.Sprite;
  private velocity: number = 10;
  private keyPressed: boolean = false;
  private squareObjRef: GameObject
  //   public hitSquare: boolean = false;

  constructor(gameObjRef: GameObject) {
    super(gameObjRef);
  }

  public setSquareObjRef(gameObj: GameObject) {
    this.squareObjRef = gameObj;
  }


  public destroy() {
    this.ball.destroy({ texture: true, baseTexture: true });
    this.gameObjRef.removeChild(this.ball);
  }

  protected init(): void {
    this.createBall();
    this.setKeyCallbackEvent();
  }

  private setKeyCallbackEvent() {
    this.onKeyDown = this.onKeyDown.bind(this);
    window.addEventListener("keydown", this.onKeyDown);
  }

  private createBall() {
    const gfx: PIXI.Graphics = new PIXI.Graphics();
    gfx.beginFill(0xffffff);
    gfx.drawCircle(0, 0, 20);
    gfx.endFill();

    const texture: PIXI.Texture =
      GameApplication.getApp().renderer.generateTexture(gfx);
    this.ball = new PIXI.Sprite(texture);

    this.gameObjRef.addChild(this.ball);
  }

  public update(delta: number) {
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
    }
  }
  public ReturnBallX(): number {
    return this.gameObjRef.x;
  }

  private onKeyDown(e: any) {
    if (e.code === "Space") {
      this.keyPressed = true;

    }
  }
}
