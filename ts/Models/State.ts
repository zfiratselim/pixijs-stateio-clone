import * as PIXI from "pixi.js";
import { shake } from "../helpers/shaking";
import { StateInt, CenterOfState, Coords } from "../interface";
import Arrow from "./Arrow";

export default class State {
    private stage;
    private Arrow;
    constructor(stage){
        this.stage = stage;
        this.Arrow = new Arrow(this.stage);
    }

    create(coords:Coords,color = 0x999999){
        const state:StateInt = PIXI.Sprite.from(`../images/state.png`) as StateInt;
        state.width = 100;
        state.height = 100;
        state.x = coords.x;
        state.y = coords.y;
        state.anchor.set(.5);
        state.tint = color;
        state.haveArrow=false;
        state.interactive = true;
        state.buttonMode = true;
        state.on('pointerdown', ()=>this.onClickState(state));

        const centerCirle:CenterOfState = this.createCenter();
        state.addChild(centerCirle);
        this.stage.addChild(state);
        return state;
    }
    onClickState(state:StateInt){
        if(state.haveArrow){
            state.haveArrow=false;
            this.Arrow.destroy(state);
        }else{
            state.haveArrow=true;
            this.Arrow.create(state);
        }
      
    }
    createCenter(){
        const center:CenterOfState = PIXI.Sprite.from("../images/state.png") as CenterOfState;
        center.width = 25;
        center.height = 25;
        center.anchor.set(.5);
        center.shake = ()=> shake(center);
        return center;
    }
    update(){
        this.Arrow.update();
    }
}