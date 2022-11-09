import {GameObject} from './game/GameObject';
import * as PIXI from 'pixi.js';
import { EventDispatcher } from './EventDispatcher';
import { getEventListeners } from 'events';
import { GameEvents } from './GameEvents';
import {GameObjectBehavior} from './game/behavior/GameObjectBehavior';
import {BrickBehaviorLevels} from "./game/behavior/BrickBehaviorLevels";
import { BrickType } from './game/level/BrickType';
import { ShopScreen } from './views/ShopScreen';
import { Model } from './Model';
import { ScoreView } from './views/ScoreView';
import { stringify } from 'querystring';
import { BallBehavior } from './game/behavior/BallBehavior';
export class CollisionManager {
    private brickList: Array<GameObject> = [];
    private ballRef: GameObject;
    private ball: BallBehavior;
    private power: number = 1;
    public moneyRequired: number =45;

    constructor() {
        this.init();
        
    }

    protected init(){
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.POWER_UP, this.priceUpgrade, this);
        
    }

    public clear(){
        this.brickList = [];
    }

    public priceUpgrade(){
        if(this.moneyRequired<=Model.getInstance().getScore()){
            Model.getInstance().addScore(-this.moneyRequired);
            this.power++;
            let indicator;
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.UPGRADE_PURCHASED,indicator = "power");
            this.moneyRequired *= 2;
        }
        
        return;
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
        if(!this.ballRef ){
            
            return;
        }
        
        const ballRect: PIXI.Rectangle = new PIXI.Rectangle(this.ballRef.x, this.ballRef.y - this.ballRef.height*0.6, this.ballRef.width, this.ballRef.height)
        
        this.brickList.forEach((obj)=>{
           const brickRect: PIXI.Rectangle = new PIXI.Rectangle(obj.x, obj.y, obj.width, obj.height);
           for(let i = 1; i<=this.power; i++){
            if((ballRect.left <=brickRect.right && brickRect.left <=ballRect.right&& ballRect.top <= brickRect.bottom&&brickRect.top <= ballRect.bottom)){
                
               const behavior: GameObjectBehavior = obj.getBehaviorById("brickBehavior");

               let brickType: BrickType;
               if(behavior instanceof BrickBehaviorLevels){
                   switch (behavior.hitCount){
                    case 1:
                        brickType = BrickType.TYPE_1;
                        EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: obj.getId(), brickType: brickType
                        });
                             return;
                    case 2:
                        brickType = BrickType.TYPE_2;
                        break;
                    case 3:
                        brickType = BrickType.TYPE_3;
                        break;
                    case 4:
                        brickType = BrickType.TYPE_4;
                        break;
                    case 5:
                        brickType = BrickType.TYPE_5;
                        break;
                    case 6:
                        brickType = BrickType.TYPE_6;
                        break;
                    case 7:
                        brickType = BrickType.TYPE_7;
                        break;
                    default:
                    return;
                }
            }else {
               return;
            }
               EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: obj.getId(), brickType: brickType
            });
           }

           
           }
        });
        
    }

}