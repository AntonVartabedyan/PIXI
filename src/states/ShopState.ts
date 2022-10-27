import { GameController } from "../GameController";
import { Model } from "../Model";
import { BaseGameState } from "./BaseGameState";
export class ShopState extends BaseGameState {

    constructor(controller: GameController) {
        super(controller);
    }
    
    public gameShop(): void {
        if(this.controllerRef.inShop){
            this.controllerRef.hideShopScreen();
            // this.controllerRef.showGame();
            this.controllerRef.inShop = false;
        }else{
            // this.controllerRef.hideGame();
            this.controllerRef.showShopScreen();
            console.log("activated");
            this.controllerRef.inShop = true;
        }

    }

    public gameStart(): void {
    }

    public gameLost(): void {

    }
}