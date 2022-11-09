import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import {BaseBrickBehavior} from "./BaseBrickBehavior";
import * as PIXI from 'pixi.js';
import { GameApplication } from "../../GameApplication";
import { LevelFactory } from "../level/LevelFactory";
export class BrickBehaviorLevels extends BaseBrickBehavior{
    public hitCount: number = 7;
    private hitCountCeramic:number =  0;
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    protected  onBrickHit(e:any){

        if(e.brickId === this.gameObjRef.getId()){
            const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
           
            switch (this.hitCount){
                case 0:
                    
                    break;
                case 1:
                    EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_1});
                    
                    break;
                case 2:
                    renderable.tint = 0xFF3131;
                    
                    break;
                case 3:
                    renderable.tint = 0x4D4DFF;
                    
                    break;
                case 4:
                    renderable.tint = 0x39ff14;
                    
                    break;
                case 5:
                    renderable.tint = 0xFFF300;
                   
                    break;
                case 6:
                    const gfx: PIXI.Graphics = new PIXI.Graphics;
                    gfx.beginFill(0xffffff);
                    gfx.lineStyle({width: 1, color:0x000000});
                    gfx.drawRect(0,0,this.gameObjRef.width/2,this.gameObjRef.height-1);
                    gfx.endFill();
                    
                    const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
                    const sprite: PIXI.Sprite = new PIXI.Sprite(texture);
                    sprite.tint = 0xFF10F0;
                    this.gameObjRef.unregisterRenderable('brickImg');
                    this.gameObjRef.registerRenderable('brickImg', sprite);
                    
                break;
                case 7:
                    this.hitCountCeramic++;
                    if(this.hitCountCeramic < 8){
                        if(this.hitCountCeramic > 5){
                            const sprite: PIXI.Sprite = PIXI.Sprite.from('./assets/sprites/brickBroken2.png');
                        
                        
                            sprite.width = this.gameObjRef.width;
                            sprite.height = this.gameObjRef.height;
                            this.gameObjRef.unregisterRenderable('brickImg');
                            this.gameObjRef.registerRenderable('brickImg', sprite);
                        }
                        else if(this.hitCountCeramic >= 2){
                            const sprite: PIXI.Sprite = PIXI.Sprite.from('./assets/sprites/brickBroken.png');
                        
                        
                            sprite.width = this.gameObjRef.width;
                            sprite.height = this.gameObjRef.height;
                            this.gameObjRef.unregisterRenderable('brickImg');
                            this.gameObjRef.registerRenderable('brickImg', sprite);
                        }

                        return;
                    }else{
                        const gfx: PIXI.Graphics = new PIXI.Graphics;
                        gfx.beginFill(0xffffff);
                        gfx.lineStyle({width: 1, color:0x000000});
                        gfx.drawRect(0,0,this.gameObjRef.width,this.gameObjRef.height);
                        gfx.endFill();
                        
                        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
                        const sprite: PIXI.Sprite = new PIXI.Sprite(texture);
                        sprite.tint = 0xffffff;
                        this.gameObjRef.unregisterRenderable('brickImg');
                        this.gameObjRef.registerRenderable('brickImg', sprite);
                        break;
                    }
                    
                
            }
            this.hitCount--;
        }
        
    }
}