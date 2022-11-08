import {GameObjectBehavior} from "./GameObjectBehavior";
import { GameObject } from "../GameObject";
import {EventDispatcher} from "../../EventDispatcher";
import {GameEvents} from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import {LevelFactory} from "../level/LevelFactory";
import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
import {BaseBrickBehavior} from "./BaseBrickBehavior";
import {BrickBehaviorLevel1} from "../behavior/BrickBehaviorLevel1";
import { GameApplication } from "../../GameApplication";
export class BrickBehaviorLevel2 extends BaseBrickBehavior{
    constructor(gameObjRef: GameObject){
        super(gameObjRef);
    }
    private hitCount: number = 0;
    private levelFactory: LevelFactory;
    private gameViewRef: GameView;
    protected onBrickHit(e:any){

        if(e.brickId === this.gameObjRef.getId()){
            EventDispatcher.getInstance().getDispatcher().once(GameEvents.BRICK_HIT, ()=>{
                console.log("hit")
                const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            const gfx: PIXI.Graphics = new PIXI.Graphics;
            gfx.beginFill(0xFF10F0);
            gfx.lineStyle({width: 1, color:0x000000});
            gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
            gfx.endFill();
            const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(this.gameObjRef);
            this.gameObjRef.unregisterBehavior('brickBehavior');
            this.gameObjRef.unregisterRenderable('brickImg');
            this.gameObjRef.registerRenderable('brickImg', gfx)
            this.gameObjRef.registerBehavior('brickBehavior', brickBehavior1);
            });
            // const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            // const gfx: PIXI.Graphics = new PIXI.Graphics;
            // gfx.beginFill(0xFF10F0);
            // gfx.lineStyle({width: 1, color:0x000000});
            // gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
            // gfx.endFill();
            // const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(this.gameObjRef);
            // this.gameObjRef.unregisterBehavior('brickBehavior');
            // this.gameObjRef.unregisterRenderable('brickImg');
            // this.gameObjRef.registerRenderable('brickImg', gfx)
            // this.gameObjRef.registerBehavior('brickBehavior', brickBehavior1);
            // console.log("still alive");
            // renderable.tint = 0xFF3131;
                    // this.gameObjRef.unregisterBehavior('brickBehavior');
                    // const gfx: PIXI.Graphics = new PIXI.Graphics;
                    //     gfx.beginFill(0xFF10F0);
                    //                 gfx.lineStyle({width: 1, color:0x000000});
                    //                 gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
                    //                 gfx.endFill();
                    //                 this.gameObjRef.unregisterBehavior('brickBehavior');
                    //                 this.gameObjRef.unregisterRenderable('brickImg');
                                    
                    //                 // this.gameObjRef.registerBehavior('brickBehavior', );
                    //                 this.gameObjRef.registerRenderable('brickImg',gfx);
                    //                 const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(e.brickId);
                    //                 this.gameObjRef.registerBehavior('brickBehavior', brickBehavior1);
                    
                    // this.gameObjRef.registerBehavior('brickBehavior', brickBehavior1);


            // EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_1});
            
            // gfx.beginFill(0xffffff);
            //             gfx.lineStyle({width: 1, color:0x000000});
            //             gfx.drawRect(0,0,this.gameObjRef.width,this.gameObjRef.height-1);
            //             gfx.endFill();
            //             const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
            //             const sprite: PIXI.Sprite = new PIXI.Sprite(texture);
                        // .tint =  0xFF10F0;
                        
                        // this.gameObjRef.unregisterRenderable('brickImg');
                        
                        
                        // this.gameObjRef.registerRenderable('brickImg',sprite);
                        
                        
                        // EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_5});
        }
        
        
    }
    // public changeColorBrick1(e: any){
        
    //     const gfx: PIXI.Graphics = new PIXI.Graphics;
    //     gfx.beginFill(0xF6BE00);
    //                 gfx.lineStyle({width: 1, color:0x000000});
    //                 gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
    //                 gfx.endFill();
    //                 gfx.cacheAsBitmap=true;
    //                 this.gameObjRef.unregisterRenderable('brickImg');
    //                 this.gameObjRef.unregisterBehavior('brickBehavior');
    //                 this.gameObjRef.registerBehavior('brickBehavior', );
    //                 this.gameObjRef.registerRenderable('brickImg',gfx);
    //                 const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
    //                 this.gameObjRef.registerBehavior('brickBehavior', );
    // }
    // public changeColorBrick2(e: any){
        
    //     const gfx: PIXI.Graphics = new PIXI.Graphics;
    //     gfx.beginFill(0xff0000);
    //                 gfx.lineStyle({width: 1, color:0x000000});
    //                 gfx.drawRect(0,0,this.gameObjRef.width-1,this.gameObjRef.height-2);
    //                 gfx.endFill();
    //                 gfx.cacheAsBitmap=true;
    //                 this.gameObjRef.unregisterRenderable('brickImg');
    //                 this.gameObjRef.registerRenderable('brickImg',gfx);

    // }
}