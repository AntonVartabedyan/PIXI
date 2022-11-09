import { GameController } from "../GameController";
import { Model } from "../Model";
import { BaseGameState } from "./BaseGameState";
export class WinState extends BaseGameState {

    constructor(controller: GameController) {
        super(controller);
    }
    
    public gameWon(): void {
            this.controllerRef.hideGame();
            this.controllerRef.hideNbrBall();
            this.controllerRef.hideScore();
            this.controllerRef.showWinScreen();

    }
}