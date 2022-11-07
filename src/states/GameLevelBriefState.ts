import { GameController } from "../GameController";
import { Model } from "../Model";
import { BaseGameState } from "./BaseGameState";
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
}