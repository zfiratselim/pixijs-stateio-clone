import * as PIXI from "pixi.js";

export interface Coords{
    x:number,
    y:number
}

export interface CenterOfState extends PIXI.Sprite{
    shake:()=>void;
}

export interface StateInt extends PIXI.Sprite{
    fire:()=>void;
    haveArrow:boolean
}