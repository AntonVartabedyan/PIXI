import * as PIXI from "pixi.js";
export class SoundManager {
    public static audio = new Audio("./assets/audio/bgMusic.mp3");
    public static audio2 = new Audio("./assets/audio/bgMusic2.mp3");
    public static brickSound = new Audio("./assets/audio/brickHit.wav");
    public static paddleHitSound = new Audio("./assets/audio/paddleHit.wav");
    public static WallHitSound = new Audio("./assets/audio/wallHit.wav");
}
