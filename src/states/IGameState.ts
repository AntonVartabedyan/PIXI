import { GameController } from "../GameController";

export interface IGameState {

    gameStart(): void;

    gameLost(): void;

    gameEnter(): void;

    gameShop(): void;

    gameWon(): void;
    
    gameLevelBrief(): void;
}