import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
import { GameObject } from '../GameObject';
import { GameApplication } from '../../GameApplication';
import { BrickType } from './BrickType';
import { Model } from '../../Model';
import {BrickBehaviorLevel1} from "../behavior/BrickBehaviorLevel1";
import {BrickBehaviorLevel2} from "../behavior/BrickBehaviorLevel2";
import {BrickBehaviorLevel3} from "../behavior/BrickBehaviorLevel3";
import {BrickBehaviorLevel4} from "../behavior/BrickBehaviorLevel4";
import {BrickBehaviorLevel5} from "../behavior/BrickBehaviorLevel5";
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';

export class LevelFactory extends PIXI.Container {

    public bricks: Array<GameObject>;
    private gameViewRef: GameView;
    private brickTop: number = 100;

    constructor(gameViewRef: GameView) {
        super();

        this.gameViewRef = gameViewRef;
        this.init();
    }

    public getNextLevel(level: number): Array<GameObject> {
        if (level <= 10) {
            return this.getLevel(level);
        }

        else if (level > 10) {
            return this.getLevel(level);
        }
    }

    private getLevel(difficulty: number): Array<GameObject> {
        let nbrBrickHorizontal: number;
        let nbrBrickVertical: number;
        let brickWidth: number;
        let brickHeight: number;
        const startPos: number = 2;
        this.bricks = [];

        if (difficulty === 1) {
            console.log("level 1");
            nbrBrickHorizontal = 3;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const brick: GameObject = this.brickFactory(1,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }

        if (difficulty === 2) {
            console.log("level 2");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const targetDifficulty:number = Math.random() <= 0.6 ? 1 : 2 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 3) {
            console.log("level 3");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.3){
                        targetDifficulty = 1; 
                    }else if(rand<=0.6){
                        targetDifficulty = 2; 
                    }else if(rand>0.6) {
                        targetDifficulty = 3;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 4) {
            console.log("level 4");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.3){
                        targetDifficulty = 4; 
                    }else if(rand<=0.6){
                        targetDifficulty = 2; 
                    }else if(rand>0.6) {
                        targetDifficulty = 3;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 5) {
            console.log("level 5");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.1){
                        targetDifficulty = 5; 
                    }else if(rand<=0.6){
                        targetDifficulty = 3; 
                    }else if(rand>0.6) {
                        targetDifficulty = 4;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 6) {
            console.log("level 6");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    let targetDifficulty:number;
                    if(i == nbrBrickVertical-1){
                        targetDifficulty = 6;
                    }else{
                        const rand: number = Math.random();
                    
                        if(rand<=0.3){
                            targetDifficulty = 4; 
                        }else if(rand<=0.6){
                            targetDifficulty = 3; 
                        }else if(rand>0.6) {
                            targetDifficulty = 2;
                        }
                    }
                   
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    // EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIT, (brickId, brickType)=>{
                        // if(brickId.brickType == "TYPE_6"){
                            
                            // console.log(i, j, this.bricks)
                            // if(brickId.brickId.slice(5, 7) == i*nbrBrickHorizontal+j){
                            //     let targetDifficulty = 5;
                            //     const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                            //     const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                            //     brick.x = coord.x;
                            //     brick.y = coord.y;
                            //     this.bricks.push(brick);
                            // }
                            
                            // const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                            // console.log(brickId.width);
                            // const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                            // const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                            // this.bricks.push(brick)
                        // }
                    // })
                    this.bricks.push(brick);
                }
            }
            
            return this.bricks;
        }
        if (difficulty === 7) {
            console.log("level 7");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.3){
                        targetDifficulty = 5; 
                    }else if(rand<=0.6){
                        targetDifficulty = 4; 
                    }else if(rand>0.6) {
                        targetDifficulty = 3;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 8) {
            console.log("level 8");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.3){
                        targetDifficulty = 6; 
                    }else if(rand<=0.6){
                        targetDifficulty = 5; 
                    }else if(rand>0.6) {
                        targetDifficulty = 4;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 9) {
            console.log("level 9");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.3){
                        targetDifficulty = 7; 
                    }else if(rand<=0.6){
                        targetDifficulty = 6; 
                    }else if(rand>0.6) {
                        targetDifficulty = 5;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }
        if (difficulty === 10) {
            console.log("level 10");
            nbrBrickHorizontal = 5;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for (let i = 0; i < nbrBrickVertical; i++) {
                for (let j = 0; j < nbrBrickHorizontal; j++) {
                    const rand: number = Math.random();
                    let targetDifficulty:number;
                    if(rand<=0.6){
                        targetDifficulty = 7; 
                    }else if(rand>0.6) {
                        targetDifficulty = 6;
                    }
                    // const targetDifficulty:number = Math.random() <= 0.3 ? 1 : Math.random() <= 0.6 ? 2 : 3; 
                    const brick: GameObject = this.brickFactory(targetDifficulty,brickWidth, brickHeight);
                    const coord: PIXI.Point = this.getBrickPosition(j,i,brickWidth, brickHeight);
                    brick.x = coord.x;
                    brick.y = coord.y;
                    // brick.x = j === 0 ? j*brickWidth + startPos :j*brickWidth;
                    // brick.y = (i*brickHeight)+this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }

        return this.bricks;
    }

    private getBrickPosition(x: number, y: number, width: number, height: number): PIXI.Point{
        const coord: PIXI.Point = new PIXI.Point();
        const startPos: number = 2;

        coord.x = x === 0 ? x*width + startPos :x*width;
        coord.y = (y*height)+this.brickTop;
        return coord;
    }

    private init() {
        this.bricks = [];
    }

    private brickFactory(difficulty: number, width: number, height: number): GameObject {
        const brick: GameObject = new GameObject(this.gameViewRef);
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
                    gfx.lineStyle({width: 1, color:0x000000});
                    gfx.drawRect(0,0,width,height);
                    gfx.endFill();
                    
                    const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
                    const sprite: PIXI.Sprite = new PIXI.Sprite(texture);
                    brick.registerRenderable('brickImg',sprite);

        switch (difficulty) {
            case 1:
                {
                   
                    // sprite.tint = 0xFF10F0;
                    const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    // brickBehavior1.hitCount = Math.round(Math.random()*4)
                    // switch (brickBehavior1.hitCount){
                    //     case 0:
                    //         sprite.tint = 0xFF10F0;
                    //         break;
                    //     case 1:
                    //         sprite.tint = 0xFFF300;
                    //         break;
                    //     case 2:
                    //         sprite.tint = 0x39ff14;
                    //         break;
                    //     case 3:
                    //         sprite.tint = 0x4D4DFF;
                    //         break;
                    //     case 4:
                    //         sprite.tint = 0xFF3131;
                    //         break;
                    // }
                    brickBehavior1.hitCount = 1;
                    sprite.tint = 0xFF3131;
                    brick.registerBehavior("brickBehavior", brickBehavior1)
                }
                break;
            case 2:
                {
                    const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brickBehavior1.hitCount = 2;
                    sprite.tint = 0x4D4DFF;
                    
                    brick.registerBehavior("brickBehavior", brickBehavior1);
                }
                break;
            case 3:
                {
                    const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brickBehavior1.hitCount = 3;
                    sprite.tint = 0x39ff14;
                    
                    brick.registerBehavior("brickBehavior", brickBehavior1);
                    
                }
            break;
            case 4:
                    {
                    const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brickBehavior1.hitCount = 4;
                    sprite.tint = 0xFFF300;
                    brick.registerBehavior("brickBehavior", brickBehavior1);
                    
                    }
            break;
            case 5:
                    {
                    const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brickBehavior1.hitCount = 5;
                    sprite.tint = 0xFF10F0;
                    
                    brick.registerBehavior("brickBehavior", brickBehavior1);
                    
                    }
            break;
            case 6:{
                const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brickBehavior1.hitCount = 6;
                    sprite.tint = 0xffffff;
                    
                    brick.registerBehavior("brickBehavior", brickBehavior1);
                }
            break;
            case 7:
                {
                const brickBehavior1: BrickBehaviorLevel1 = new BrickBehaviorLevel1(brick);
                    brickBehavior1.hitCount = 7;
                    sprite.tint = 0xC47926;
                    
                    brick.registerBehavior("brickBehavior", brickBehavior1);
                }
            break;
        }
        return brick;
    }
}