import * as PIXI from "pixi.js";
import { BaseView } from './BaseView';
import { GameApplication } from '../GameApplication';
import { ShopState } from "../states/ShopState";
import { GameController } from "../GameController";
import { BallBehavior } from "../game/behavior/BallBehavior";
import { CollisionManager } from "../CollisionManager";
import { EventDispatcher } from "../EventDispatcher";
import { GameEvents } from "../GameEvents";
export class ShopScreen extends BaseView{
    private title: PIXI.Text;
  private description: PIXI.Text;
  private gfxBall: PIXI.Graphics;
  private gfxPaddle: PIXI.Graphics;
  private updatedButton: string;
  private powerCount: number = 45;
  private sizeCount: number = 40;
  private lengthCount: number = 35;
  private speedCount: number = 30;

  constructor() {
    super();
  }

  protected init() {
    super.init();
    this.createShop();
    
  }

  protected createBackground() {
    this.background = new PIXI.Graphics();
    this.background.lineStyle({ width: 2, color: 0xffffff });
    this.background.beginFill(0x000000);
    this.background.drawRect(
      0,
      0,
      GameApplication.STAGE_WIDTH,
      GameApplication.STAGE_HEIGHT
    );
    this.background.endFill();
    this.addChild(this.background);
  }
  private createShop() {
    this.powerCount = 45;
    this.sizeCount= 40;
    this.lengthCount= 35;
    this.speedCount= 30;
    this.gfxBall = new PIXI.Graphics();
    this.gfxBall.beginFill(0xffffff);
    this.gfxBall.drawCircle(this.background.width/2, this.background.height/2, 50);
    this.background.addChild(this.gfxBall);
    this.gfxPaddle = new PIXI.Graphics();
    this.gfxPaddle.beginFill(0xffffff);
    this.gfxPaddle.drawRoundedRect(this.background.width/2-this.gfxBall.width, this.background.height/2+this.gfxBall.height/2, 200, 30, 30);
    this.gfxPaddle.endFill();
    this.background.addChild(this.gfxPaddle);
    this.createLine(this.background.width/2,this.background.height/2,280,200);
    this.createRect(80,150,200,50, "Power: ", this.powerCount);
    this.createLine(this.background.width/2,this.background.height/2,530,200);
    this.createRect(530,200,200,50 , "Size: ", this.sizeCount);
    this.createLine(this.background.width/2, this.background.height/2+this.gfxBall.height/2,280,450);
    this.createRect(80,400,200,50 , "Length: ", this.lengthCount);
    this.createLine(this.background.width/2, this.background.height/2+this.gfxBall.height/2,530,450);
    this.createRect(530,450,200,50 , "Speed: ", this.speedCount);
    this.title = new PIXI.Text("Upgrades shop!", {
      fontFamily: "Minecraft",
      fontSize: 40,
      fill: 0xffffff,
    });
    this.title.resolution = 2;
    this.title.anchor.set(0.5);
    this.title.x = GameApplication.STAGE_WIDTH/2;
    this.title.y = this.title.height;
    this.addChild(this.title);
  }
  private createLine(moveX:number,moveY:number,lineX: number,lineY:number){
    let gfxLine: PIXI.Graphics;
    gfxLine = new PIXI.Graphics();
    gfxLine.beginFill(0xffffff);
    gfxLine.lineStyle(3,0xffffff);
    gfxLine.moveTo(moveX,moveY);
    gfxLine.lineTo(lineX,lineY);
    this.background.addChild(gfxLine);
  }
  private createRect(rectX:number,rectY:number,rectW:number,rectH:number,text:string, count: number){
    
    let gfxSquare: PIXI.Graphics = new PIXI.Graphics();
    gfxSquare.lineStyle(2,0xffffff)
    gfxSquare.beginFill(0x000000);
    gfxSquare.drawRect(0,0,rectW,rectH);
    gfxSquare.endFill();
    
   
    const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfxSquare);
    let sprite:PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.x = rectX;
    sprite.y = rectY;
    sprite.interactive = true;
    
    sprite.addListener("click", ()=> {
      if(text === "Power: "){
        EventDispatcher.getInstance().getDispatcher().emit(GameEvents.POWER_UP)
      }
      if(text === "Size: "){
        EventDispatcher.getInstance().getDispatcher().emit(GameEvents.SIZE_UP)
      }
      if(text === "Length: "){
        EventDispatcher.getInstance().getDispatcher().emit(GameEvents.LENGTH_UP)
      }
      if(text === "Speed: "){
        EventDispatcher.getInstance().getDispatcher().emit(GameEvents.SPEED_UP)
      }
      
    });
    this.background.addChild(sprite);
    let squareText: PIXI.Text = new PIXI.Text(text+count, {
      fontFamily: "Minecraft",
      fontSize: 24,
      fill: 0xffffff,
    });
    squareText.resolution = 2;
    squareText.anchor.set(0.5);
    squareText.x = sprite.width*0.3+squareText.width/4;
    squareText.y = sprite.height/2;
    sprite.addChild(squareText);
    EventDispatcher.getInstance().getDispatcher().on(GameEvents.UPGRADE_PURCHASED,(indicator)=>{
      if(text === "Power: " && indicator == "power"){
        count *=2;
        squareText.text = text + count;
      }
      else if(text === "Size: "&& indicator == "size"){
        this.sizeCount = Math.round(1.75*this.sizeCount);
        squareText.text = text + this.sizeCount;
      }else if(text === "Length: "&& indicator == "length"){
        this.lengthCount = Math.round(1.6*this.lengthCount);
        squareText.text = text + this.lengthCount;
      }
      else if(text === "Speed: "&& indicator == "speed"){
        this.speedCount = Math.round(1.5*this.speedCount);
        squareText.text = text + this.speedCount;
      }
      
    });
    
    
  }
  }