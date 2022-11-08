import { GameController } from "../GameController";
import { IGameState } from "./IGameState";
import { GameLevelBriefScreen } from "../views/GameLevelBriefScreen";

export class BaseGameState implements IGameState {
  protected controllerRef: GameController;
  constructor(controller: GameController) {
    this.controllerRef = controller;
  }

  public gameStart(): void {}

  public gameLost(): void {}

  public gameEnter(): void {}

  public gameShop(): void {}

  public gameWon(): void {}
  
  public gameLevelBrief(): void {};
}
