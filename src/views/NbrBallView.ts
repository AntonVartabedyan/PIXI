import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from '../EventDispatcher';
import { GameEvents } from '../GameEvents';
import { BrickType } from '../game/level/BrickType';

export class NbrBallView extends BaseView {

    private label: PIXI.Text;
    private nbrBallText: PIXI.Text;

    constructor() {
        super();
    }

    public setNbrBall(ball: number) {
        
    }

    protected init() {
        super.init();

        
    }
}