import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
export class BrickBehaviorLevel1 extends GameObjectBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }

public destroy(){
    EventDispatcher.getInstance().getDispatcher().removeListener(GameEvents.BRICK_HIT, this.onBrickHit, this);
}

    protected init() {
        
            EventDispatcher.getInstance().getDispatcher().addListener(GameEvents.BRICK_HIT, this.onBrickHit, this);
        
    }
    private onBrickHit(e:any){

        if(e.brickId === this.gameObjRef.getId()){
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_1});
            
            
        }
        
    }
}