import { GameController } from "../GameController";
import { Model } from "../Model";
import { BaseGameState } from "./BaseGameState";
export class ShopState extends BaseGameState {

    constructor(controller: GameController) {
        super(controller);
    }

    public gameShop(): void {
        this.controllerRef.hideGame();
        console.log("shop");
    }

    public gameStart(): void {

    }

    public gameLost(): void {

    }
}