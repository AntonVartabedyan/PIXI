import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import {BaseBrickBehavior} from "./BaseBrickBehavior";
import * as PIXI from 'pixi.js';
import {BrickBehaviorLevel4} from "../behavior/BrickBehaviorLevel4";
export class BrickBehaviorLevel5 extends BaseBrickBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    
    protected  onBrickHit(e:any){
        
        if(e.brickId === this.gameObjRef.getId()){
            const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            renderable.tint = 0xFFF300;
            this.gameObjRef.unregisterBehavior('brickBehavior');
            const brickBehavior4: BrickBehaviorLevel4 = new BrickBehaviorLevel4(this.gameObjRef);
            this.gameObjRef.registerBehavior('brickBehavior', brickBehavior4);
            // EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_3});
            
            // const gfx: PIXI.Graphics = new PIXI.Graphics;
            // gfx.beginFill(0x39ff14);
            //             gfx.lineStyle({width: 1, color:0x000000});
            //             gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
            //             gfx.endFill();
            //             gfx.cacheAsBitmap=true;
            // this.gameObjRef
            // this.gameObjRef.unregisterBehavior('brickBehavior');
                        // this.gameObjRef.unregisterRenderable('brickImg');
                        
                        // this.gameObjRef.registerRenderable('brickImg',gfx);
                        // const brickBehavior3: BrickBehaviorLevel3 = new BrickBehaviorLevel3(this.gameObjRef);
                        // this.gameObjRef.registerBehavior('brickBehavior', brickBehavior3);
                        
        }
        
        
        
    }
}