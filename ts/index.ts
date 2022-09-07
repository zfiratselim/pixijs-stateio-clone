import * as PIXI from "pixi.js";
import State from "./Models/State";
import Bullet from "./Models/Bullet";
import Arrow from "./Models/Arrow";
import { CenterOfState } from "./interface";

export default class Game extends PIXI.Application {
private State = new State(this.stage);
private Bullet = new Bullet(this.stage);
private Arrow = new Arrow(this.stage);
constructor() {
    super({
        view: <HTMLCanvasElement>document.querySelector('#canvas'),
        transparent: true,
        antialias:true,
        width:800,
        height:600
    });
    //this.scale = scale;
    this.startGame();
  }

  startGame() {
    this.ticker.add(delta=>this.update(delta));
    const state = this.State.create({x:200,y:200});
    const state2 = this.State.create({x:400,y:200},0xDD0000);
    const Bullet = this.Bullet.create({x:380,y:200});
    const arrow = this.Arrow.create({x:400,y:200})
  }

  update(delta){
  }
}

(window as any).content = new Game();