function main(){
    let canvas = document.getElementById("canvas1");
    //get DPI
    let dpi = window.devicePixelRatio;
    fix_dpi(canvas, dpi);
    //drawTree(canvas.width/2, canvas.height/2, -90, 5, 10);
    //drawTree(canvas.width/2, canvas.height/2, -135, 5, 10);
    /*drawSymmetryTree(canvas.width/2, canvas.height/2, -90, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, 90, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, 0, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, 180, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, -45, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, -135, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, 45, 20, 5);
    drawSymmetryTree(canvas.width/2, canvas.height/2, 135, 20, 5);
    drawRandomSymmetryTree(canvas.width/2, canvas.height/2, -90, 5, 3);*/
    //drawRandomSymmetryTree(canvas.width/2, canvas.height/2, 90, 5, 3);

}
function fix_dpi(c, devicePixelRatio) {
    let canvas = c;
    let dpi = devicePixelRatio;
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    console.log(canvas.offsetWidth);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
    console.log(canvas.width + " " + canvas.height);
   
    }

function drawTree(x1, y1, angle1, length1, index1){
    let index = index1;
    if(index === 0){
        return;
    }
    let x = x1;
    let y = y1;
    let angle = angle1;
    let newX = x + Math.cos(angle*Math.PI/180)*length1*index;
    let newY = y + Math.sin(angle*Math.PI/180)*length1*index;
    drawLine(x, y, newX, newY, "canvas1");
    index--;
    setTimeout(function(){
        if(Math.random() < 0.8){
        drawTree(newX, newY, angle-getRandomIntInclusive(5,40), getRandomIntInclusive(2,10), index);
        drawTree(newX, newY, angle+getRandomIntInclusive(5,40), getRandomIntInclusive(2,10), index);
        }else{
            drawTree(newX, newY, angle-getRandomIntInclusive(5,30), getRandomIntInclusive(2,10), index);
            drawTree(newX, newY, angle+getRandomIntInclusive(5,30), getRandomIntInclusive(2,10), index);
            drawTree(newX, newY, angle+getRandomIntInclusive(5,30), getRandomIntInclusive(2,10), index);
        }
    }, 200);

}

function drawSymmetryTree(x1, y1, angle1, length1, index1){
    let index = index1;
    if(index === 0){
        return;
    }
    let x = x1;
    let y = y1;
    let angle = angle1;
    let newX = x + Math.cos(angle*Math.PI/180)*length1;
    let newY = y + Math.sin(angle*Math.PI/180)*length1;
    drawLine(x, y, newX, newY, "canvas1");
    index--;
    setTimeout(function(){
        drawSymmetryTree(newX, newY, angle-20, 20, index);
        drawSymmetryTree(newX, newY, angle+20, 20, index); 
    }, 200);

}

function drawRandomSymmetryTree(x1, y1, angle1, length1, index1){
    let index = index1;
    if(index === 0){
        return;
    }
    let x = x1;
    let y = y1;
    let length = getRandomIntInclusive(10,40);
    let randomAngle = getRandomIntInclusive(5,20);
    let angle = angle1;
    let newX = x + Math.cos(angle*Math.PI/180)*length1;
    let newY = y + Math.sin(angle*Math.PI/180)*length1;
    let newY2 = y + Math.sin(-angle*Math.PI/180)*length1;
    drawLine(x, y, newX, newY, "canvas1");
    drawLine(x, y, newX, newY2, "canvas1");
    index--;
    setTimeout(function(){
        drawRandomSymmetryTree(newX, newY, angle-randomAngle, length, index);
        drawRandomSymmetryTree(newX, newY, angle+randomAngle, length, index); 
    }, 1000);

}

function drawLine(x1, y1, x2, y2, canvasID){
    let canvas = document.getElementById(canvasID);
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000"; 
    ctx.lineCap = "round";
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
 
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }