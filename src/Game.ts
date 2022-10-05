import * as PIXI from 'PIXI.js';
import { GameObject } from "./GameObject";
import { BallBehavior } from "./BallBehavior";
import { SquareBehavior } from "./SquareBehavior";
import { Button1 } from "./Button1";
import { GameApplication } from "./GameApplication";
import { Button2 } from "./Button2";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { throws } from 'assert';

export class Game extends PIXI.Container {
  private gameObjects: Map<string, GameObject>;
  private ticker: PIXI.Ticker;

  private gameObjectContainer: PIXI.Container;
  private uiContainer: PIXI.Container;

  private changeBehaviorBtn: Button1;
  private initBehaviorBtn: Button2;

  private ballGameObj: GameObject;
  private ballBehavior: BallBehavior;
  constructor() {
    super();
    this.init();
  }
  private init() {
    this.createTicker();
    this.createGameObjList();
    this.createGameObjContainer();
    this.createUIContainer();
    this.createButton();
    this.createGameObject();
  }
  private createGameObjList() {
    this.gameObjects = new Map<string, GameObject>();
  }
  private createGameObjContainer() {
    this.gameObjectContainer = new PIXI.Container();
    this.addChild(this.gameObjectContainer);
  }
  private createUIContainer() {
    this.uiContainer = new PIXI.Container();
    this.addChild(this.uiContainer);
  }
  private createButton() {
    this.changeBehaviorBtn = new Button1("Change Behavior");

    this.changeBehaviorBtn.x = 400;
    this.changeBehaviorBtn.y =
      GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 10;
    this.changeBehaviorBtn
      .getDispacher()
      .addListener("changeBtnUp", this.onChangeBtnUp, this);
    this.initBehaviorBtn = new Button2("Initial Behavior");
    this.initBehaviorBtn.x = 180;
    this.initBehaviorBtn.y =
      GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 10;
    this.initBehaviorBtn
      .getDispacher()
      .addListener("initBtnUp", this.onInitBtnUp, this);

    this.uiContainer.addChild(this.changeBehaviorBtn);
    this.uiContainer.addChild(this.initBehaviorBtn);
  }
  private createTicker() {
    this.ticker = new PIXI.Ticker();
    this.ticker.add(this.update, this);
    this.ticker.start();
  }
  private createGameObject() {
    this.createBallGameObj();
    this.createSquareGameObj();
    this.getSquare();
  }
  private createBallGameObj() {
    this.ballGameObj = new GameObject("gameObj1");
    // const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
    // ballGameObj.addBehavior(ballBehavior)

    this.ballGameObj.x = 100;
    this.ballGameObj.y = 100;
    this.addgameObject(this.ballGameObj);

    this.ballBehavior = new BallBehavior(this.ballGameObj);

    this.ballGameObj.addBehavior("ballBehavior", this.ballBehavior);

    // this.gameObjects.push(ballGameObj)
  }

  private createSquareGameObj() {
    const squareGameObj: GameObject = new GameObject("gameObj2");
    // const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
    // ballGameObj.addBehavior(ballBehavior)

    squareGameObj.x = 500;
    squareGameObj.y = 100;
    this.addgameObject(squareGameObj);

    const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
    squareBehavior.setBallObjRef(this.getGameObjById("gameObj1"));

    squareGameObj.addBehavior("squareBehavior", squareBehavior);

    // this.gameObjects.push(ballGameObj)
  }
  public getSquare() {
    this.ballBehavior.setSquareObjRef(this.getGameObjById("gameObj2"))
  }
  private addgameObject(gameObj: GameObject) {
    this.gameObjectContainer.addChild(gameObj);
    this.gameObjects.set(gameObj.getId(), gameObj);
  }

  private update(delta: number) {
    this.gameObjects.forEach((gameObj) => {
      gameObj.update(delta);
    });
  }

  private getGameObjById(id: string): GameObject {
    if (!this.gameObjects.has(id)) {
      return null;
    }
    return this.gameObjects.get(id);
  }

  private onInitBtnUp() {
    // console.log('init clicked')
    //set behavior in button clicked
    const gameObj: GameObject = this.getGameObjById("gameObj1");

    if (!gameObj) {
      console.log("init fail");
      return;
    }
    gameObj.removeBehavior("ballBehavior");
    const squareBehavior: SquareBehavior = new SquareBehavior(gameObj);
    return gameObj.addBehavior("squareBehavior", squareBehavior);
  }
  private onChangeBtnUp() {
    const gameObj: GameObject = this.getGameObjById("gameObj1");
    if (!gameObj) {
      console.log("change clicked");
      return;
    }
    gameObj.removeBehavior("squareBehavior");
    const ballBehavior: BallBehavior = new BallBehavior(gameObj);
    // const ballBehavior;
    gameObj.addBehavior("ballBehavior", ballBehavior);
  }
  private onInitBtnDown() { }
}
