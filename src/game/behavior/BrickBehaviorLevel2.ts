import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import {LevelFactory} from "../level/LevelFactory";
import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
export class BrickBehaviorLevel2 extends GameObjectBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    private hitCount: number = 0;
    private levelFactory: LevelFactory;
    private gameViewRef: GameView;
public destroy(){
    EventDispatcher.getInstance().getDispatcher().removeListener(GameEvents.BRICK_HIT, this.onBrickHit, this);
}

    protected init() {
        
            EventDispatcher.getInstance().getDispatcher().addListener(GameEvents.BRICK_HIT, this.onBrickHit, this);
        
    }
    private onBrickHit(e:any){

        if(e.brickId === this.gameObjRef.getId()){
            this.hitCount++;
            if(this.hitCount==1){
                this.gameObjRef.changeColorBrick1(e);
            }
            else if(this.hitCount==2){
                this.gameObjRef.changeColorBrick2(e);
            }
            else if(this.hitCount==3){
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_2});
            }
            
            
            
        }
        
        
    }
}