import * as PIXI from "pixi.js";
import { EventDispatcher } from "./EventDispatcher";
import { GameView } from "./views/GameView";
import { GameEvents } from "./GameEvents";
import { StartScreen } from "./views/StartScreen";
import { GameLevelBriefScreen } from "./views/GameLevelBriefScreen";
import { IGameState } from './states/IGameState';
import { EnterState } from "./states/EnterState";
import { ScoreView } from './views/ScoreView';
import { ShopScreen } from './views/ShopScreen';
import { WinScreen } from "./views/WinScreen";
import { NbrBallView } from './views/NbrBallView';
import { Model } from './Model';
import { BrickType } from './game/level/BrickType';
import { EndScreen } from './views/EndScreen';
import { LostState } from "./states/LostState";
import {CollisionManager} from "./CollisionManager";
import { GameLevelBriefState } from "./states/GameLevelBriefState";



export class GameController extends PIXI.Container {

    private endScreen: EndScreen;
    private startScreen: StartScreen;
    private shopScreen: ShopScreen;
    private LevelBriefScreen: GameLevelBriefScreen;
    private winScreen: WinScreen;
    private game: GameView;
    private scoreView: ScoreView;
    private nbrBallView: NbrBallView;
    private currentState: IGameState;
    private gameContainer: PIXI.Container;
    private uiContainer: PIXI.Container;
    private showedGame: boolean = false;
    public inShop:boolean = false;
    private col: CollisionManager;
    private audio = new Audio("./assets/audio/bgMusic.mp3");
    private audio2 = new Audio("./assets/audio/bgMusic2.mp3");
    private brickSound = new Audio("./assets/audio/brickHit.wav");
    
    private lostInteractive: boolean = true;
    public inBrief: boolean = false;
   
    

    constructor() {
        super();
        this.init();
    }

    public changeGameState(newState: IGameState) {
        this.currentState = newState;
    }

    public showStartScreen() {
        this.startScreen.show();
    }

    public hideStartScreen() {
        this.startScreen.hide();
    }
    public showBriefScreen() {
        this.LevelBriefScreen.show();
    }

    public hideBriefScreen() {
        this.LevelBriefScreen.hide();
    }
    public showWinScreen() {
        this.winScreen.show();
    }

    public hideWinScreen() {
        this.winScreen.hide();
    }

    public showShopScreen() {
        this.shopScreen.show();
    }

    public hideShopScreen() {
        this.shopScreen.hide();
    }

    public showEndScreen() {
        this.endScreen.show();
        this.showedGame = false;
    }

    public hideEndScreen() {
        this.endScreen.hide();
    }

    public showGame(reset: boolean) {

        this.game.show();
        if(!reset){ 
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.NEXT_LEVEL, { level: 1 });
        }
    }

    public showScore() {
        this.scoreView.show();
    }

    public hideScore() {
        this.scoreView.hide();
    }

    public showNbrBall() {
        this.nbrBallView.show();
    }

    public hideNbrBall() {
        this.nbrBallView.hide();
    }

    public hideGame() {
        this.game.hide();
    }

    private init() {
        this.audio.volume = 0.5;
        this.audio2.volume = 0.5;
        this.createContainers();
        this.createViews();
        this.resetGame();
        this.scoreView.setScore(Model.getInstance().getScore());
        this.setInitialGameState();
        this.addKeyUpListener();
        // EventDispatcher.getInstance().getDispatcher().on(GameEvents.GAME_START, this.currentState.gameLevelBrief);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_LOST, this.onBallLost, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIDE, this.checkEndOfLevel, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIT, this.updateScore, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.UPGRADE_PURCHASED, ()=>{
            this.scoreView.setScore(Model.getInstance().getScore());
        });
        // EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIDE, this.updateScore, this);
    }

    private addKeyUpListener() {
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener('keyup', this.onKeyUp);
    }

    private setInitialGameState() {
        this.changeGameState(new EnterState(this));
        this.currentState.gameEnter();
    }


    private createContainers() {
        this.uiContainer = new PIXI.Container();
        this.gameContainer = new PIXI.Container();

        this.addChild(this.uiContainer);
        this.addChild(this.gameContainer);
    }

    private createViews() {
        
        this.shopScreen = new ShopScreen();
        this.addChild(this.shopScreen);
        
        this.game = new GameView();
        this.addChild(this.game);


        this.scoreView = new ScoreView();
        this.addChild(this.scoreView);

        this.nbrBallView = new NbrBallView();
        this.addChild(this.nbrBallView);
        
        this.startScreen = new StartScreen();
        this.addChild(this.startScreen);

        this.endScreen = new EndScreen();
        this.addChild(this.endScreen);

        this.winScreen = new WinScreen();
        this.addChild(this.winScreen);

        this.LevelBriefScreen = new GameLevelBriefScreen();
        this.addChild(this.LevelBriefScreen);

        
    }

    private resetGame() {
        Model.getInstance().resetGame();
        this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());
        
    }

    private updateScore(e: any) {
        switch (e.brickType) {
            case BrickType.TYPE_1:
                Model.getInstance().addScore(1);
                break;
            case BrickType.TYPE_2:
                Model.getInstance().addScore(1);
                break;
            case BrickType.TYPE_3:
                Model.getInstance().addScore(2);
                break;
            case BrickType.TYPE_4:
                Model.getInstance().addScore(2);
                break;
                case BrickType.TYPE_5:
                Model.getInstance().addScore(3);
                break;
                case BrickType.TYPE_6:
                Model.getInstance().addScore(4);
                break;
                case BrickType.TYPE_7:
                Model.getInstance().addScore(2);
                break;
        }
        this.brickSound.volume = 0.3;
        this.brickSound.play();

        this.scoreView.setScore(Model.getInstance().getScore());
    }

    private checkEndOfLevel() {
        
        Model.getInstance().decrementTotalNbrBrick();


        if (Model.getInstance().getTotalNbrBrick() <= 0) {
            Model.getInstance().incrementLevel();
            if(Model.getInstance().getCurrentLevel() > 10){
                this.currentState.gameWon();
            }else{
                this.currentState.gameLevelBrief();
                this.LevelBriefScreen.title.text = "LEVEL "+ Model.getInstance().getCurrentLevel();
                switch(Model.getInstance().getCurrentLevel()){
                    case 2:
                        
                        this.LevelBriefScreen.description.text = "THE CLASSIC";
                        break;
                        case 3:
                        this.LevelBriefScreen.description.text = "GREEN BRICKS MAKE YOUR BALL AND PADDLE FASTER";
                        break;
                        case 4:
                            this.LevelBriefScreen.description.text = "YOU SHOULD CONSIDER BUYING AN UPGRADE";
                        break;
                        case 5:
                            this.LevelBriefScreen.description.text = "IT'S GETTING HARDER";
                        break;
                        case 6:
                            this.LevelBriefScreen.description.text = "AND HARDER";
                        break;
                        case 7:
                            this.LevelBriefScreen.description.text = "AND HARDER";
                        break;
                        case 8:
                            this.LevelBriefScreen.description.text = "SHRINK BRICK";
                        break;
                        case 9:
                            this.LevelBriefScreen.description.text = "THE BRICK BRICK";
                        break;
                        case 10:
                            this.LevelBriefScreen.description.text = "THE FINAL HURDLE";
                        break;
                }
            }
                

            
                
                // Model.getInstance().incrementNbrBall();
                // this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());
                // EventDispatcher.getInstance().getDispatcher().emit(GameEvents.NEXT_LEVEL, { level: Model.getInstance().getCurrentLevel() });
            
           
           
            
        }
    }

    private backgroundMusic(){
        
        this.audio.play();
        this.audio.onended = () => {
            this.audio2.play();
        }
        this.audio2.onended = () => {
            this.backgroundMusic();
        }
    }
    private onKeyUp(e:any) {
        if (this.currentState instanceof EnterState ||
            (this.currentState instanceof LostState && this.lostInteractive)) {
                
                this.backgroundMusic();
                
            this.currentState.gameStart();
            
            EventDispatcher.getInstance().getDispatcher().emit(GameEvents.GAME_START);
            if((e.keyCode === 83 || e.keyCode === 40) && !this.showedGame){
                this.showedGame = true;
                return;
            }
            
        } if(e.keyCode === 83){
            if(!this.inShop){
                this.currentState.gameShop();
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.GAME_SHOP);
            }
            else {
                this.currentState.gameShop();
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.GAME_SHOP_EXIT);
            }
        }
        if(this.inBrief){
            this.hideBriefScreen();
            this.showGame(true);
            this.showNbrBall();
            this.showScore();
                Model.getInstance().incrementNbrBall();
                this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.NEXT_LEVEL, { level: Model.getInstance().getCurrentLevel() });
                this.inBrief = false;
            
        }
        if(e.keyCode === 38){
            console.log("pressed up");
            this.audio.volume +=0.1;
            this.audio2.volume +=0.1;
        }
        if(e.keyCode === 40){
            console.log("pressed down");
            this.audio.volume -=0.1;
            this.audio2.volume -=0.1;
        }
    }

    private onBallLost() {
        Model.getInstance().decrementNbrBall();
        if(Model.getInstance().getTotalNbrBall()<=0){
            this.resetGame();
            this.currentState.gameLost();
            this.lostInteractive = false;
            setTimeout(() => {
                this.lostInteractive = true;
            }, 500);
        }
        this.nbrBallView.setNbrBall(Model.getInstance().getTotalNbrBall());
    }
}