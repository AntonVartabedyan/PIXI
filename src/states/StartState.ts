import { GameController } from "../GameController";
import { Model } from "../Model";
import { GameLevelBriefScreen } from "../views/GameLevelBriefScreen";
import { WinScreen } from "../views/WinScreen";
import { BaseGameState } from "./BaseGameState";
import { LostState } from './LostState';
import { ShopState } from './ShopState';
import { GameLevelBriefState } from './GameLevelBriefState';
import {WinState} from './WinState';

export class StartState extends BaseGameState {

    constructor(controller: GameController) {
        super(controller);
    }
   

    public gameStart(): void {
        this.controllerRef.showGame(false);
        this.controllerRef.showScore();
        this.controllerRef.showNbrBall();
        
    }

    public gameLost(): void {
        this.controllerRef.hideGame();
        this.controllerRef.hideScore();
        this.controllerRef.hideNbrBall();
        
        const newState: LostState = new LostState(this.controllerRef);
        newState.gameLost();
        this.controllerRef.changeGameState(newState);
    }

    public gameShop(): void {
        const newState: ShopState = new ShopState(this.controllerRef);
        newState.gameShop();
        
            
        
    }
    public gameWon(): void {
        const newState: WinState = new WinState(this.controllerRef);
        newState.gameWon();
    }

    public gameLevelBrief(): void {
        const newState: GameLevelBriefState = new GameLevelBriefState(this.controllerRef);
        newState.gameLevelBrief();
    }
}