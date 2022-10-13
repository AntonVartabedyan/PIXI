import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
export class BrickBehaviorLevel1 extends GameObjectBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }

    protected init() {
        EventDispatcher.getInstance().getDispatcher().addListener(GameEvents.BRICK_HIT, this.onBrickHit, this);

    }
    private onBrickHit(e:any){

        if(e.brickId === this.gameObjRef.getId()){
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId()});
        }
    }
}