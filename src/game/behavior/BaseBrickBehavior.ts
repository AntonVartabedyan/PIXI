import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
export class BaseBrickBehavior extends GameObjectBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    
    
        protected init() {
            
                EventDispatcher.getInstance().getDispatcher().addListener(GameEvents.BRICK_HIT, this.onBrickHit, this);
            
        }
        public destroy(){
            EventDispatcher.getInstance().getDispatcher().removeListener(GameEvents.BRICK_HIT, this.onBrickHit, this);
        }
        protected onBrickHit(e:any){
        }
}