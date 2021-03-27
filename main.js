// тут может находится ваш код

class Square {
  constructor(x) {
    this.y = -25;
    this.x = x;
  }
  step(ctx, game) {
    this.clear(ctx);
    this.y = this.y + 1;
    if(this.y > 510) {
      game.squares.splice(game.squares.indexOf(this, 0), 1);
    } else {
      this.draw(ctx);
    }    
  }
  clear(ctx) {
    ctx.clearRect(this.x, this.y, 25, 25);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 25, 25)
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

}
class Game {

  squares = [];

  animate() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].step(ctx, this);
    }
    requestAnimationFrame(this.animate.bind(this));
  }
  spawnSquare() {
    let takeRandomWithCanvas = Math.floor(Math.random() * Math.floor(615));

    // определяет можно ли поместить новый квадрат на канвас
    function instersectsWith(existingSquare, newSquare) {
      if (existingSquare.x > newSquare.x + 50 || existingSquare.x < newSquare.x - 50) {
        return false;
      }
      return true;
    }
    // квадрат который мы создали и хотим отрисовать
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

    setTimeout(this.spawnSquare.bind(this), Math.floor(10 + Math.random() * Math.floor(990)));
  }


  despawnSquare() {

  }
  run() {
    this.spawnSquare();
    this.animate();
  }

  start() {

  }
  stop() {

  }
}


let game = new Game();

document.body.onload = game.run();


// -25  to 475

// 5 to 610 