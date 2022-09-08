import * as PIXI from "pixi.js";
import { returnDistance } from "../helpers/distance";
import { shake } from "../helpers/shaking";
import { StateInt, CenterOfState, Coords } from "../interface";
import Arrow from "./Arrow";
import Bullet from "./Bullet";

export default class State {
    private states:StateInt[]=[];
    private stage;
    private Arrow;
    private Bullet;
    constructor(stage){
        this.stage = stage;
        this.Arrow = new Arrow(this.stage);
        this.Bullet = new Bullet(this.stage)
    }

    create(coords:Coords,color = 0x999999,owner=false){
        const state:StateInt = PIXI.Sprite.from(`../images/state.png`) as StateInt;
        state.width = 100;
        state.height = 100;
        state.x = coords.x;
        state.y = coords.y;
        state.anchor.set(.5);
        state.tint = color;
        state.haveArrow = false;
        state.health = 20;
        state.interactive = true;
        state.buttonMode = true;
        if(owner){
            state.on('pointerdown',() => this.onClickState(state));
        }else{
            state.on('pointerdown',() => this.fire(state))
        }

        const centerCirle:CenterOfState = this.createCenter();
        state.addChild(centerCirle);
        this.stage.addChild(state);
        this.states.push(state);
        return state;
    }
    deleteArrows(){
        const Arrows = this.Arrow.getArrows();
        Arrows.forEach(arrow=>this.Arrow.destroy(arrow));
    }
    fire(enemieState:StateInt){
        this.deleteArrows();
        let statesHaveArrow:StateInt[]=[];
        this.states.forEach(state=>{
            if(state.haveArrow){
                statesHaveArrow.push(state);
                state.haveArrow=false;
                this.Bullet.fire(10,state,enemieState, 0xFF0000);
            }
        });
        
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
        const center:CenterOfState = PIXI.Sprite.from("../images/circle.png") as CenterOfState;
        center.width = 25;
        center.height = 25;
        center.anchor.set(.5);
        center.shake = ()=> shake(center);
        return center;
    }
    calculateCollision(){
        const bullets = this.Bullet.getBullets();
        const bulletsDetails=this.Bullet.getDetails();
        if(bullets.length<0){
            return
        }
        bullets.forEach(bullet => {
            if(returnDistance(bullet, bulletsDetails.endCoord) < 12.5){
                bullet.parent.removeChild(bullet);
                bullets.splice(bullets.indexOf(bullet),1);
                const enemieState = this.states.find(state=>state.x==bulletsDetails.endCoord.x&&state.y==bulletsDetails.endCoord.y);
                (enemieState.children[0] as CenterOfState).shake();
                enemieState.health--;
            }
        })
    }
    calculateHealth(){
        this.states.forEach(state => {
           if(state.health>-1) state.alpha=1/20*state.health;
        })
    }
    update(){
        this.Arrow.update();
        this.Bullet.update();
        this.calculateCollision();
        this.calculateHealth();
    }
}