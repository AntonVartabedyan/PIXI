import * as PIXI from "pixi.js";
import { BaseView } from './BaseView';
import { GameEvents } from "../GameEvents";
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from "../EventDispatcher";
import { ShopScreen } from "./ShopScreen";
export class ShopRectangle extends BaseView{
    // constructor(){
        // super();
    // }
    public ShopRectangle(moveX:number,moveY:number,lineX: number,lineY:number, rectX:number,rectY:number,rectW:number,rectH:number,text:string, count: number){
        this.createLine(moveX,moveY,lineX,lineY);
        this.createRect(rectX,rectY,rectW,rectH,text,count);
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
          fontSize: 25,
          fill: 0xffffff,
        });
        squareText.resolution = 2;
        squareText.anchor.set(0.5);
        squareText.x = sprite.width*0.3+squareText.width/4;
        squareText.y = sprite.height/2;
        sprite.addChild(squareText);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.UPGRADE_PURCHASED,()=>{
          if(text === "Power: "){
            count *=2;
          }else if(text === "Size: "){
            count = Math.round(1.75*count);
          }else if(text === "Length: "){
            count = Math.round(1.6*count);
          }
          else if(text === "Speed: "){
            count = Math.round(1.5*count);
          }
          squareText.text = text + count;
        });
        
        
      }
}