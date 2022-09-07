import * as PIXI from "pixi.js";
import { shake } from "../helpers/shaking";
import { StateInt, CenterOfState, Coords } from "../interface";

export default class State {
    private stage;
    constructor(stage){
        this.stage=stage;
    }

    create(coords:Coords,color = 0x999999){
        const state:StateInt = PIXI.Sprite.from(`../images/state.png`) as StateInt;
        state.width = 100;
        state.height = 100;
        state.x = coords.x;
        state.y = coords.y;
        state.anchor.set(.5);
        state.tint = color;
    
        const centerCirle:CenterOfState = this.createCenter();
        state.addChild(centerCirle);
        this.stage.addChild(state);
        return state;
    }

    createCenter(){
        const sprite:CenterOfState = PIXI.Sprite.from("../images/state.png") as CenterOfState;
        sprite.width=25;
        sprite.height=25;
        sprite.anchor.set(.5);
        sprite.shake=()=>shake(sprite);
        return sprite;
    }
}