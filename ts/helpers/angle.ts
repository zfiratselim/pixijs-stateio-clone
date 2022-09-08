import { Coords } from "../interface";
export const returnAngle = (startCoord:Coords,endCoord:Coords)=>Number(Math.atan2(endCoord.y - startCoord.y, endCoord.x - startCoord.x).toFixed(3));