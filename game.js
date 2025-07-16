
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = { x: 175, y: 500, width: 50, height: 100 };
let obstacle = { x: Math.random() * 350, y: 0, width: 50, height: 100 };
let score = 0;
let coins = 0;
let level = 1;
let speed = 4;
let gameOver = false;

document.addEventListener("keydown", moveCar);

function moveCar(e) {
  if (e.key === "ArrowLeft" && car.x > 0) car.x -= 25;
  if (e.key === "ArrowRight" && car.x < canvas.width - car.width) car.x += 25;
}

function drawCar() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacle() {
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updateLevel() {
  if (score >= 30) {
    level = 4; speed = 7;
  } else if (score >= 20) {
    level = 3; speed = 6;
  } else if (score >= 10) {
    level = 2; speed = 5;
  }
  document.getElementById("level").textContent = "Level: " + level;
}

function update() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacle();

  obstacle.y += speed;
  if (obstacle.y > canvas.height) {
    obstacle.y = -100;
    obstacle.x = Math.random() * 350;
    score++;
    coins++;
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("coins").textContent = "Coins: " + coins;
  }

  updateLevel();

  if (car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.height + car.y > obstacle.y) {
    gameOver = true;
    alert("Game Over!\nScore: " + score + "\nCoins: " + coins + "\nLevel: " + level);
  }

  requestAnimationFrame(update);
}

update();
