import { GameObject } from '../GameObject';
import { GameObjectBehavior } from './GameObjectBehavior';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../../GameApplication';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import {BallBehavior} from './BallBehavior';
import { BrickType } from '../level/BrickType';
import { throws } from 'assert';
import { Model } from '../../Model';
import { runInThisContext } from 'vm';

export class PaddleBehavior extends GameObjectBehavior {

    public VELOCITY: number = 15;
    private direction: number = 0;
    private paddleImg: PIXI.Sprite;
    public justHit: boolean = false;
    public timeoutId: NodeJS.Timeout;
    private inShop: boolean = false;
    private paddleVel: number;
    private paddleTint: number;
    private remaining: number = 5000;
    private start: number;
    private length: number;
    private lengthMoneyReq: number = 35;
    private speedMoneyReq: number = 30;
    private paddleVelocity: number = 15;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public update(deltaTime: number) {
        if(this.direction === 1) {
            this.moveRight(deltaTime);
            return;
        }

        if(this.direction === -1) {
            this.moveLeft(deltaTime);
            return;
        }
    }

    protected init() {
        this.paddleImg = this.gameObjRef.getRenderableById("paddleImg") as PIXI.Sprite;
        this.setInitialPosition();
        this.length = this.paddleImg.width;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIT, this.onBrickHit  , this);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_LOST, this.checkBallLost, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.NEXT_LEVEL, ()=>{
            this.setInitialPosition();
            this.VELOCITY = this.paddleVelocity;
        this.paddleImg.width = this.length;
        }, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.GAME_SHOP, this.inGameShop  , this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.GAME_SHOP_EXIT, this.outGameShop  , this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.LENGTH_UP, this.lengthUp  , this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.SPEED_UP, this.speedUp  , this);
    }

    private lengthUp(){
        if(this.lengthMoneyReq<=Model.getInstance().getScore()){
            Model.getInstance().addScore(-this.lengthMoneyReq);
            this.length +=15;
            this.paddleImg.width +=15;
            let indicator;
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.UPGRADE_PURCHASED, indicator = "length");
            this.lengthMoneyReq = Math.round(1.6*this.lengthMoneyReq);
        }
    }
    private speedUp(){
        if(this.speedMoneyReq<=Model.getInstance().getScore()){
            Model.getInstance().addScore(-this.speedMoneyReq);
            this.paddleVelocity += 5;
            this.VELOCITY += 5;
            let indicator;
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.UPGRADE_PURCHASED, indicator = "speed");
            this.speedMoneyReq = Math.round(1.5*this.speedMoneyReq);
        }
    }
    private checkBallLost(){
        clearTimeout(this.timeoutId);
        this.VELOCITY = this.paddleVelocity;
        this.paddleImg.tint = 0xffffff;
        this.paddleImg.width = this.length;
        this.remaining = 5000;
        
    }

    private inGameShop(){
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.remaining -= Date.now() - this.start;
        
        
        
        this.paddleTint = this.paddleImg.tint;
        this.paddleVel = this.VELOCITY;
        this.paddleImg.tint = 0x000000;
        this.VELOCITY = 0;
        this.inShop = true;
    }
    private outGameShop(){
        if (this.timeoutId) {
            return;
        }
        
        this.start =  new Date().getTime();
        this.timeoutId = setTimeout(()=> {
            this.VELOCITY = this.paddleVelocity;
            this.paddleImg.tint = 0xffffff;
        }, this.remaining);
        this.paddleImg.tint = this.paddleTint;
        this.VELOCITY = this.paddleVel;
        this.inShop = false;
    }

    private setInitialPosition() {
        this.gameObjRef.x = (GameApplication.STAGE_WIDTH * 0.5) - (this.gameObjRef.width * 0.5);
        this.gameObjRef.y = GameApplication.STAGE_HEIGHT * 0.8;
        clearTimeout(this.timeoutId);
                this.remaining = 5000;
    }

    private onKeyUp(e: any) {
        switch(e.code) {
            case "ArrowRight":
                if(this.direction === 1) {
                    this.direction = 0;
                }
                break;
            case "ArrowLeft":
                if(this.direction === -1) {
                    this.direction = 0;
                }
                break;
        }
    }

    private onKeyDown(e: any) {
        if(this.direction !== 0) {
            return;
        }

        switch(e.code) {
            case "ArrowRight":
                this.direction = 1;
                break;
            case "ArrowLeft":
                this.direction = -1;
                break;
        }
    }

    private moveLeft(deltaTime: number) {
        if(!this.gameObjRef.isActive()) {
            return;
        }

        if(this.gameObjRef.x - this.VELOCITY > 0) {
            this.gameObjRef.x -= this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = 0;
        }
    }

    private moveRight(deltaTime: number) {
        if(!this.gameObjRef.isActive()) {
            return;
        }

        if(this.gameObjRef.x + this.gameObjRef.width + this.VELOCITY < GameApplication.STAGE_WIDTH) {
            this.gameObjRef.x += this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = GameApplication.STAGE_WIDTH - this.gameObjRef.width;
        }
    }
    public onBrickHit(e: any) {


        if(e.brickType === BrickType.TYPE_3) {
            this.start =  new Date().getTime();
            this.VELOCITY += 5;
            this.paddleImg.width += 20;
            if(this.timeoutId){
                clearTimeout(this.timeoutId);
                this.remaining = 5000;
            }
            this.timeoutId = setTimeout(() => {
                this.VELOCITY = this.paddleVelocity;
                this.paddleImg.width = this.length;
            }, 5000);
            
        }
    }
}