import * as PIXI from "pixi.js";
import State from "./Models/State";
import { returnDistance } from "./helpers/distance";

export default class Game extends PIXI.Application {
private State = new State(this.stage);

constructor() {
    super({
        view: <HTMLCanvasElement>document.querySelector('#canvas'),
        transparent: true,
        antialias:true,
        width:800,
        height:600
    });
    //this.scale = scale;
    this.stage.interactive = true;
    this.startGame();
  }

  startGame() {
    this.ticker.add(delta=>this.update(delta));
    this.State.create({x:200,y:200});
    this.State.create({x:400,y:200},0xDD0000,true);
  }

  update(delta){
    this.State.update();
  }
}

(window as any).content = new Game();