import { GameController } from "../GameController";
import { BaseGameState } from "./BaseGameState";
import { StartState } from './StartState';
import { GameLevelBriefState } from "./GameLevelBriefState";

export class EnterState extends BaseGameState {

    constructor(controller: GameController) {
        super(controller);
    }

    public gameStart(): void {
        this.controllerRef.hideStartScreen();
        // const newState: StartState = new StartState(this.controllerRef);
        // newState.gameStart();
        const newState: GameLevelBriefState = new GameLevelBriefState(this.controllerRef);
        newState.gameLevelBrief();
        this.controllerRef.changeGameState(newState);
        
    }

    public gameEnter(): void {
        this.controllerRef.showStartScreen();
        
    }
}