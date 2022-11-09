import { GameController } from "../GameController";
import { Model } from "../Model";
import { BaseGameState } from "./BaseGameState";
import { GameLevelBriefScreen } from "../views/GameLevelBriefScreen";
import { ShopState } from "./ShopState";
import { WinState } from "./WinState";
export class GameLevelBriefState extends BaseGameState {
     
    constructor(controller: GameController) {
        super(controller);
    }
    
    public gameLevelBrief(): void {
            this.controllerRef.hideGame();
            this.controllerRef.hideNbrBall();
            this.controllerRef.hideScore();
            this.controllerRef.showBriefScreen();
            this.controllerRef.inBrief = true;
            
    }
    public gameShop(): void {
        const newState: ShopState = new ShopState(this.controllerRef);
        newState.gameShop();
        
            
        
    }
    public gameWon(): void {
        const newState: WinState = new WinState(this.controllerRef);
        newState.gameWon();
    }
}