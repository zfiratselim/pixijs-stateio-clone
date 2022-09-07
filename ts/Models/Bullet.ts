import * as PIXI from "pixi.js";
import { Coords } from "../interface";

export default class Bullet {
    private stage
    constructor(stage){
        this.stage = stage;
    }

    create(coords:Coords,color = 0x999999){
        const Bullet = PIXI.Sprite.from(`../images/state.png`);
        Bullet.width = 7;
        Bullet.height = 7;
        Bullet.x = coords.x;
        Bullet.y = coords.y;
        Bullet.anchor.set(.5);
        Bullet.tint = color;
        this.stage.addChild(Bullet);
        return Bullet;
    }
}