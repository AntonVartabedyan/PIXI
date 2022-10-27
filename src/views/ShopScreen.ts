import * as PIXI from "pixi.js";
import { BaseView } from './BaseView';
import { GameApplication } from '../GameApplication';
import { ShopState } from "../states/ShopState";
export class ShopScreen extends BaseView{
    private title: PIXI.Text;
  private description: PIXI.Text;
  private gfxBall: PIXI.Graphics;
  private gfxPaddle: PIXI.Graphics;
  private powerCount:number=1;
  private sizeCount: number = 1;
  private speedCount: number = 1;
  private lengthCount: number = 1;

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
    this.background.cacheAsBitmap = true;
    this.addChild(this.background);
  }
  private createShop() {
    
    // this.title = new PIXI.Text("ITS THE SHOP BABY!", {
    //   fontFamily: "Minecraft",
    //   fontSize: 40,
    //   fill: 0xffffff,
    // });
    // this.title.resolution = 2;
    // this.title.anchor.set(0.5);
    // this.title.x = GameApplication.STAGE_WIDTH / 2;
    // this.title.y = GameApplication.STAGE_HEIGHT * 0.45;
    // this.addChild(this.title);
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
    this.createRect(80,150,200,50, "Power: ", this.clickPower);
    this.createLine(this.background.width/2,this.background.height/2,530,200);
    this.createRect(530,200,200,50 , "Size: ", this.clickSize);
    this.createLine(this.background.width/2, this.background.height/2+this.gfxBall.height/2,280,450);
    this.createRect(80,400,200,50 , "Length: ", this.clickLength);
    this.createLine(this.background.width/2, this.background.height/2+this.gfxBall.height/2,530,450);
    this.createRect(530,450,200,50 , "Speed: ", this.clickSpeed);
    

    // this.description = new PIXI.Text("PRESS ANY KEY TO START", {
    //   fontFamily: "Minecraft",
    //   fontSize: 25,
    //   fill: 0xffffff,
    // });
    // this.description.resolution = 2;
    // this.description.anchor.set(0.5);
    // this.description.x = GameApplication.STAGE_WIDTH / 2;
    // this.description.y = this.gfx.y + 50;
    // this.addChild(this.description);
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
  private createRect(rectX:number,rectY:number,rectW:number,rectH:number,text:string, func: ()=>void){
    let gfxSquare: PIXI.Graphics = new PIXI.Graphics();
    gfxSquare.lineStyle(2,0xffffff)
    gfxSquare.beginFill(0x000000);
    gfxSquare.drawRect(0,0,rectW,rectH);
    gfxSquare.endFill();
    // gfxSquare.x = rectX;
    // gfxSquare.y = rectY;
    const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfxSquare);
    let sprite:PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.x = rectX;
    sprite.y = rectY;
    sprite.interactive = true;
    sprite.addListener("click", func)
    this.background.addChild(sprite);
    let squareText: PIXI.Text = new PIXI.Text(text, {
      fontFamily: "Minecraft",
      fontSize: 25,
      fill: 0xffffff,
    });
    squareText.resolution = 2;
    squareText.anchor.set(0.5);
    squareText.x = sprite.width*0.3;
    squareText.y = sprite.height/2;
    sprite.addChild(squareText);

  }
  private clickPower(){
    
    this.powerCount+=1;
    console.log(this.powerCount,"powerClicked");
  }
  private clickSize(){
    
    this.sizeCount++;
    console.log(this.sizeCount,"SizeClicked");
  }
  private clickLength(){
    
    this.lengthCount++;
    console.log(this.lengthCount,"LengthClicked");
  }
  private clickSpeed(){
    
    this.speedCount++
    console.log(this.speedCount, "Speed count");
  }
}