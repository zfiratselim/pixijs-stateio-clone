import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import { returnAngle } from "../helpers/angle";
import { returnDistance } from "../helpers/distance";
import { Coords } from "../interface";

export default class Arrow {
    private arrows:Sprite[]=[];
    private stage;

    constructor(stage){
        this.stage = stage;
    }
    destroy(coord:Coords) {
        
        const arrow = this.arrows.find(arrow=>arrow.x==coord.x&&arrow.y==coord.y);
        if(arrow){
            arrow.parent.removeChild(arrow);
            this.arrows.splice(this.arrows.indexOf(arrow),1);
        }
    }
    create(coords:Coords){
        const tail = this.createTail();
        tail.x=coords.x;
        tail.y=coords.y
        this.stage.addChild(tail);
        this.arrows.push(tail);
        return tail;
    }
    createHead(){

    }
    getArrows = () => this.arrows;
    createTail(){
        const Tail = PIXI.Sprite.from(`../images/state.png`);
        Tail.anchor.set(.5,0);
        Tail.width=10;
        Tail.height=0;
        Tail.tint=0xff1a74;
        return Tail
    }

    update(){
        this.arrows.forEach(arrow => {
            this.stage.on('pointermove', e => {
                if(!arrow){
                    return
                }
                    const angle = returnAngle(arrow, e.data.global)
                    const distance = returnDistance(arrow, e.data.global);

                    arrow.height = distance > 10 ? distance - 10 : 10;
                    arrow.rotation = angle - (Math.PI / 2);
                
            });
        })
    }
}