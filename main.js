// тут может находится ваш код
const squareHeight = 20;
const squareWidth = 20;
const maxHeightOfPlatfrom = 480;


class Square {
  constructor(x) {
    this.y = -25;
    this.x = x;
    this.color = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    function getRandomFloat(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    this.randomNumberOfStep = getRandomFloat(1, 3);
  }

  step(ctx, game) {
    this.clear(ctx);
    
    this.y = this.y + this.randomNumberOfStep;
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
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}


class Game {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  animation = true;
  squares = [];
  count = 0;
  animate() {

    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].step(this.ctx, this);
    }
    requestAnimationFrame(this.animate.bind(this));
  }
  spawnSquare() {
    if (!this.animation) {
      return false;
    }
    let takeRandomWithCanvas = Math.floor(Math.random() * Math.floor(590));

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
    setTimeout(this.spawnSquare.bind(this), Math.floor(10 + Math.random() * Math.floor(990)));
  }
  //Получить координаты квадратиков в реальном времени
  //По клику сверять координаты мышки и квадрата по которому кликнул 
  //Удалять квадрат из массива
  fieldClick(e) {
    for (let i = 0; i < this.squares.length; i++) {

      if (e.clientX >= this.squares[i].x && e.clientX <= this.squares[i].x + 30 && e.clientY >= this.squares[i].y && e.clientY <= this.squares[i].y + 30) {
        this.count++;
        this.squares[i].clear(this.ctx);
        this.squares.splice(this.squares.indexOf(this.squares[i], 0), 1);
        document.querySelector('#score').innerHTML = `${this.count}`;
        break;
      }
    }
  }

  despawnSquare() {
    let callback = function (e) {
      this.fieldClick(e);
    };
    document.querySelector('canvas').onclick = callback.bind(this);
  }
  run() {
    document.querySelector('#score').innerHTML = `${this.count = 0}`;
    this.animation = true;
    this.spawnSquare();
    this.animate();
    this.despawnSquare();

  }

  stop() {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].clear(this.ctx);
    }

    this.squares = [];
    this.animation = false;
  }
}

document.body.onload = function () {
  let game = new Game();

  document.querySelector('#start').onclick = function () {
    game.run();
  }
  document.querySelector('#stop').onclick = function () {
    game.stop();
  }
}
