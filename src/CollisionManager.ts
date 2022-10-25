import {GameObject} from './game/GameObject';
import * as PIXI from 'pixi.js';
import { EventDispatcher } from './EventDispatcher';
import { getEventListeners } from 'events';
import { GameEvents } from './GameEvents';
import {GameObjectBehavior} from './game/behavior/GameObjectBehavior';
import {BrickBehaviorLevel1} from "./game/behavior/BrickBehaviorLevel1";
import {BrickBehaviorLevel2} from "./game/behavior/BrickBehaviorLevel2";
import {BrickBehaviorLevel3} from "./game/behavior/BrickBehaviorLevel3";
import {BrickBehaviorLevel4} from "./game/behavior/BrickBehaviorLevel4";
import {BrickBehaviorLevel5} from "./game/behavior/BrickBehaviorLevel5";
import { BrickType } from './game/level/BrickType';
// import Bri
export class CollisionManager {
    private brickList: Array<GameObject> = [];
    private ballRef: GameObject;

    constructor() {
        
    }

    public clear(){
        this.brickList = [];
    }

    public unregisterBrickObject(brickId: string){
        this.brickList.forEach((obj,i)=>{
            if(obj.getId()===brickId){
                this.brickList.splice(i,1);
                return;
            }
        })
        
    }

    public registerBrickObject(gameObj: GameObject){
     this.brickList.push(gameObj)       
    }

    public registerBall(GameObj: GameObject){
        this.ballRef = GameObj;
    }

    public update(){
        if(!this.ballRef){
            return;
        }
        const ballRect: PIXI.Rectangle = new PIXI.Rectangle(this.ballRef.x, this.ballRef.y - this.ballRef.height*0.55, this.ballRef.width, this.ballRef.height)
        
        this.brickList.forEach((obj)=>{
           const brickRect: PIXI.Rectangle = new PIXI.Rectangle(obj.x+obj.width*0.1, obj.y, obj.width, obj.height); // this.ballRef.x-this.ballRef.width*0.5, this.ballRef.y - this.ballRef.width*0.5, this.ballRef.width, this.ballRef.height

           if((ballRect.left <=brickRect.right && brickRect.left <=ballRect.right&& ballRect.top <= brickRect.bottom&&brickRect.top <= ballRect.bottom)){
               const behavior: GameObjectBehavior = obj.getBehaviorById("brickBehavior");

               let brickType: BrickType;
               if(behavior instanceof BrickBehaviorLevel1){
                   brickType = BrickType.TYPE_1;
                   console.log("TYPE 1");
               }else if(behavior instanceof BrickBehaviorLevel2){
                brickType = BrickType.TYPE_2;
            }else if(behavior instanceof BrickBehaviorLevel3){
                brickType = BrickType.TYPE_3;
            }else if(behavior instanceof BrickBehaviorLevel4){
                brickType = BrickType.TYPE_4;
            }else if(behavior instanceof BrickBehaviorLevel5){
                brickType = BrickType.TYPE_5;
            }
               
               EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: obj.getId(), brickType: brickType
            });
           }
        });
        
    }
}