import { BADHINTS } from "dns";
import * as PIXI from "PIXI.js";
import { text } from "stream/consumers";
import { Button } from "./Button";
import { ButtonFunc } from "./OnClick";

export class GameApplication extends PIXI.Application {
    public text: PIXI.Text;
    public winText: PIXI.Text;
    public static STAGE_WIDTH: number = 800;
    public static STAGE_HEIGHT: number = 600;
    public count: number = 0
    private static app: GameApplication;
    public mainContainer: PIXI.Container;

    constructor() {
        super(GameApplication.getAppOptions());
        this.init();
    }

    public static getApp(): GameApplication {
        return this.app;
    }

    private init() {
        GameApplication.app = this;
        this.mainContainer = new PIXI.Container();
        this.loader = new PIXI.Loader();
        this.loader.onComplete.add(this.onLoadComplete, this);

        // this.myCallBack() = this.myCallback.bind(this);
        window.onload = () => {
            const gameContainer: HTMLCanvasElement = document.getElementById("gameContainer") as HTMLCanvasElement;
            gameContainer.appendChild(this.view);
            this.stage.addChild(this.mainContainer);

            this.resizeCanvas();
            this.loadAssets();
            this.showText();
            this.createButton();
            this.createContainers();
            this.WinCheck();

            this.view.style.position = 'absolute';
            this.view.style.left = '50%';
            this.view.style.top = '50%';
            this.view.style.transform = 'translate3d( -50%, -50%, 0 )';
        };
    }

    private static getAppOptions() {
        return {
            backgroundColor: 0x989c99,
            width: GameApplication.STAGE_WIDTH,
            height: GameApplication.STAGE_HEIGHT,
        }
    }

    private resizeCanvas(): void {
        this.onResize();

        window.addEventListener('resize', this.onResize);
    }

    private onResize() {
        this.renderer.resize(GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
    }

    private loadAssets() {

        // Load sunshine image

        // Load siren

    }
    public showText() {
        // show some text
        this.text = new PIXI.Text('The clicking game', {
            fontFamily: 'Minecraft',
            fontSize: 45,
            fill: 0xffff00
        });
        this.text.anchor.set(-0.5, 0);
        this.mainContainer.addChild(this.text)
    }
    private WinCheck() {

        this.winText = new PIXI.Text('You win!', {
            fontFamily: 'Minecraft',
            fontSize: 75,
            fill: 0xffff00,
        });
        this.winText.anchor.set(-0.9, -2.9);
        console.log(this.count);

    }
    public createButton() {
        const btn: ButtonFunc = new ButtonFunc("Click me");
        this.mainContainer.addChild(btn);
        btn.addListener('pointerdown', () => {
            this.count++;
            const clickReq: number = 15;
            if (this.count === clickReq) {

                this.mainContainer.removeChild(this.text);
                this.mainContainer.addChild(this.winText);
                this.mainContainer.removeChild(btn);
            }
        });

    }





    private createContainers() {

    }



    private onLoadComplete() {

    }

}