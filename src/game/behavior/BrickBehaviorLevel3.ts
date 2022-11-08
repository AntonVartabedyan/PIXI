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

    public destroy(){
    }
    
    protected  onBrickHit(e:any){
        
        if(e.brickId === this.gameObjRef.getId()){
            
            const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            renderable.tint = 0x4D4DFF;
            this.gameObjRef.unregisterBehavior('brickBehavior');
            const brickBehavior2: BrickBehaviorLevel2 = new BrickBehaviorLevel2(this.gameObjRef);
            this.gameObjRef.registerBehavior('brickBehavior', brickBehavior2);
            
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_3});
        }
        
        
        
    }
}