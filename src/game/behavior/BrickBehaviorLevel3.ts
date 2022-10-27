import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import {BaseBrickBehavior} from "./BaseBrickBehavior";
import * as PIXI from 'pixi.js';
import {BrickBehaviorLevel2} from "../behavior/BrickBehaviorLevel2";
export class BrickBehaviorLevel3 extends BaseBrickBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    
    protected  onBrickHit(e:any){
        
        if(e.brickId === this.gameObjRef.getId()){
            // EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_3});
            const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            renderable.tint = 0x4D4DFF;
            this.gameObjRef.unregisterBehavior('brickBehavior');
            const brickBehavior2: BrickBehaviorLevel2 = new BrickBehaviorLevel2(this.gameObjRef);
            this.gameObjRef.registerBehavior('brickBehavior', brickBehavior2);
            // const gfx: PIXI.Graphics = new PIXI.Graphics;
            // gfx.beginFill(0x4D4DFF);
            //             gfx.lineStyle({width: 1, color:0x000000});
            //             gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
            //             gfx.endFill();
            //             gfx.cacheAsBitmap=true;
            // this.gameObjRef.unregisterBehavior('brickBehavior');
            //             this.gameObjRef.unregisterRenderable('brickImg');
                        
            //             this.gameObjRef.registerRenderable('brickImg',gfx);
            //             const brickBehavior2: BrickBehaviorLevel2 = new BrickBehaviorLevel2(this.gameObjRef);
            //             this.gameObjRef.registerBehavior('brickBehavior', brickBehavior2);
                        
        }
        
        
        
    }
}