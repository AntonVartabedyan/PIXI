import { GameObject } from "./GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import * as PIXI from "PIXI.js";
import { BallBehavior } from "./BallBehavior";
import { GameApplication } from "./GameApplication";
import { Game } from "./Game";

export class SquareBehavior extends GameObjectBehavior {
  private square: PIXI.Sprite;
  private velocity: number = 10;
  private ballObjRef: GameObject;
  public hitSquare: boolean = false;
  public wasHit: boolean = false;
  public ballX: number;

  constructor(gameObjRef: GameObject) {
    super(gameObjRef);
  }

  public setBallObjRef(gameObj: GameObject) {
    this.ballObjRef = gameObj;
  }


  public destroy() {
    this.square.destroy({ texture: true, baseTexture: true });
    this.gameObjRef.removeChild(this.square);
  }
  protected init(): void {
    this.createSquare();
  }
  private createSquare() {
    const gfx: PIXI.Graphics = new PIXI.Graphics();
    gfx.beginFill(0xff00dff);
    gfx.drawRect(0, 0, 100, 100);
    gfx.endFill();

    const texture: PIXI.Texture =
      GameApplication.getApp().renderer.generateTexture(gfx);
    this.square = new PIXI.Sprite(texture);

    this.gameObjRef.addChild(this.square);
  }
  public update(delta: number) {
    if (this.gameObjRef.x > this.ballX) {
      this.gameObjRef.x += this.velocity / 5;
    }
    else if (this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x) {
      this.ballX = this.ballObjRef.x;
    }
  }
}
