// тут может находится ваш код
const squareHeight = 25;
const squareWidth = 25;
const maxHeightOfPlatfrom = 480;


class Square {
  constructor(x) {
    this.y = -25;
    this.x = x;
  }
  step(ctx, game) {
    this.clear(ctx);
    this.y = this.y + 1;
    if (this.y > maxHeightOfPlatfrom + squareHeight) {
      game.squares.splice(game.squares.indexOf(this, 0), 1);
    } else {
      this.draw(ctx);
    }
  }
  clear(ctx) {
    ctx.clearRect(this.x, this.y, squareWidth, squareHeight);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, squareWidth, squareHeight)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

}


class Game {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  squares = [];

  animate() {
    

    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].step(this.ctx, this);
    }
    requestAnimationFrame(this.animate.bind(this));
  }
  spawnSquare() {
    let takeRandomWithCanvas = Math.floor(Math.random() * Math.floor(615));
    function instersectsWith(existingSquare, newSquare) {
      if (existingSquare.x > newSquare.x + 30 || existingSquare.x < newSquare.x - 30) {
        return false;
      }
      return true;
    }
    let square = new Square(takeRandomWithCanvas);
    let intersects = false;

    for (let i = 0; i < this.squares.length; i++) {
      if (instersectsWith(this.squares[i], square)) {
        intersects = true;
        break;
      }
    }
    if (intersects == false) {
      this.squares.push(square);
    }
    // console.log(this.squares);
    setTimeout(this.spawnSquare.bind(this), Math.floor(10 + Math.random() * Math.floor(990)));
  }
  //Получить координаты квадратиков в реальном времени
  //По клику сверять координаты мышки и квадрата по которому кликнул 
  //Удалять квадрат из массива
  fieldClick(e){
    
    for (let i = 0; i < this.squares.length; i++) {
        if (e.clientX >= this.squares[i].x && e.clientX <= this.squares[i].x + 30 && e.clientY >= this.squares[i].y && e.clientY <= this.squares[i].y + 30){
          this.squares[i].clear(this.ctx);
          this.squares.splice(this.squares.indexOf(this.squares[i], 0), 1);
        }
    }
  
  }

  despawnSquare() {
    let callback = function(e) {
      this.fieldClick(e);
    };
    document.querySelector('canvas').onclick = callback.bind(this);
  }
  run() {
    this.spawnSquare();
    this.animate();
    this.despawnSquare();
  }

  start() {

  }
  stop() {

  }
  

}

//


let game = new Game();

document.body.onload = game.run();

// function test() {
//   asd.onclick = function(){
//     alert('asd');
//   }
// }

// class Test1 {
//   name = 'Shit';
// }

// class Test2 {
//   name = 'Fuck';
// }

// function printName() {
//   alert(this.name);
// }

// let obj1 = new Test1();
// let obj2 = new Test2();

// printName();

// let printTest1Name = printName.bind(obj1);
// let printTest2Name = printName.bind(obj2);

// printTest1Name();
// printTest2Name();



// -25  to 475

// 5 to 610 