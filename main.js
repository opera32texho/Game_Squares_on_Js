// тут может находится ваш код
let squares = [];

class Square {
  constructor(x){
    this.y = -25;
    this.x = x;
  }
  step(ctx){
    this.clear(ctx);
    this.y = this.y + 1;
    this.draw(ctx);
  }
  clear(ctx){
    ctx.clearRect(this.x, this.y, 25, 25);
  }
  draw(ctx){
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 25, 25)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

}

let square = new Square(25);
let square1 = new Square(80);
squares.push(square);
squares.push(square);

function animate() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  square.step(ctx);
  square1.step(ctx)
  
  
//   function drawRect(){
//     const takeRandomWithCanvas = Math.floor(Math.random() * Math.floor(615));
//     ctx.beginPath();
//     ctx.fillRect(10, y, 25, 25)
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.closePath();
    
//   }

//  function draw(){
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawRect();
//   y = y + 1;
  
//  }



  // draw();
  requestAnimationFrame(animate);
}

// тут может находится ваш код

document.body.onload = animate;


// -25  to 475

// 5 to 610 
