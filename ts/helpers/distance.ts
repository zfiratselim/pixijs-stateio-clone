import { Coords } from "../interface";

export const returnDistance =(startCoord:Coords,endCoord:Coords)=> Number(Math.floor(Math.sqrt(Math.pow(endCoord.y - startCoord.y, 2) + Math.pow(endCoord.x - startCoord.x, 2))));