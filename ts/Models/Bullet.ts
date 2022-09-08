import * as PIXI from "pixi.js";
import { returnAngle } from "../helpers/angle";
import { returnDistance } from "../helpers/distance";
import { BulletDetails, BulletInt, Coords } from "../interface";

export default class Bullet {
    private stage;
    private bullets:BulletInt[]=[];
    private bulletsDetails:BulletDetails={} as BulletDetails;
    private countdown:number=0;
    constructor(stage){
        this.stage = stage;
    }
    
    getBullets = ()=> this.bullets;
    getDetails = ()=> this.bulletsDetails;

    create(coords:Coords, rotation:number, color = 0x999999){
        const Bullet:BulletInt = PIXI.Sprite.from(`../images/circle.png`) as BulletInt;
        Bullet.width = 7;
        Bullet.height = 7;
        Bullet.x = coords.x;
        Bullet.y = coords.y;
        Bullet.anchor.set(.5);
        Bullet.tint = color;
        Bullet.rotation = rotation
        this.stage.addChild(Bullet);
        this.bullets.push(Bullet);
        return Bullet;
    }

    fire(bulletCount:number, startCoord:Coords, endCoord:Coords, color){
        this.bulletsDetails.bulletCount = bulletCount;
        this.bulletsDetails.startCoord = startCoord;
        this.bulletsDetails.endCoord = endCoord;
        this.bulletsDetails.color = color;
    }

    update(){
        this.countdown--;
        if(this.bulletsDetails && this.bulletsDetails.bulletCount > 0 && this.countdown < 0){
            this.countdown=10;
            const rotation = returnAngle(this.bulletsDetails.startCoord,this.bulletsDetails.endCoord);
            this.create(this.bulletsDetails.startCoord, rotation, this.bulletsDetails.color);
            this.bulletsDetails.bulletCount--;
        }
        this.bullets.forEach(bullet => {
            bullet.x += Math.cos(bullet.rotation) * 1;
            bullet.y += Math.sin(bullet.rotation) * 1;
        })
    }
}