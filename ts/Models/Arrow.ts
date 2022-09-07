import * as PIXI from "pixi.js";
import { Coords } from "../interface";

export default class Arrow {
    private stage
    constructor(stage){
        this.stage = stage;
    }

    create(coords:Coords){
        const tail = this.createTail();
        tail.x=coords.x;
        tail.y=coords.y
        this.stage.addChild(tail);
        return tail;
    }
    createHead(){

    }

    createTail(){
        const Tail = PIXI.Sprite.from(`../images/state.png`);
        Tail.anchor.set(.5,0);
        Tail.width=10;
        Tail.height=50;
        Tail.tint=0x999999;
        return Tail
    }
}