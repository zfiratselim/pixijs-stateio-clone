export function shake(center){
    [
       { x:1,y:1, rotate:0 },
       { x:-1,y:-2, rotate:-1 },
       { x:-3,y:0, rotate:1 },
       { x:3,y:2, rotate:0 },
       { x:1,y:-1, rotate:1 },
       { x:-1,y:2, rotate:-1 },
       { x:-3,y:1, rotate:0 },
       { x:3,y:1, rotate:-1 },
       { x:-1,y:-1, rotate:1 },
       { x:1,y:2, rotate:0 },
       { x:1,y:-2, rotate:-1 }
    ].forEach((e,i)=>{
        setTimeout(()=>{
        center.x=e.x;
        center.y=e.y;
        center.rotate=e.rotate;
        },i*50)
    })
}