
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const lanes = [75, 175, 275];
let player = { x: lanes[1], y: 500, width: 50, height: 50 };
let coins = [];
let obstacles = [];
let score = 0;
let coinCount = 0;
let gameOver = false;
let speed = 2;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    let idx = lanes.indexOf(player.x);
    if (idx > 0) player.x = lanes[idx - 1];
  } else if (e.key === "ArrowRight") {
    let idx = lanes.indexOf(player.x);
    if (idx < lanes.length - 1) player.x = lanes[idx + 1];
  }
});

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoins() {
  ctx.fillStyle = "yellow";
  coins.forEach(c => ctx.fillRect(c.x, c.y, 20, 20));
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, 50, 50));
}

function spawnObjects() {
  if (Math.random() < 0.02) {
    coins.push({ x: lanes[Math.floor(Math.random() * 3)] + 15, y: -20 });
  }
  if (Math.random() < 0.02) {
    obstacles.push({ x: lanes[Math.floor(Math.random() * 3)], y: -50 });
  }
}

function updateObjects() {
  coins.forEach(c => c.y += speed);
  obstacles.forEach(o => o.y += speed);

  // Coin collection
  coins = coins.filter(c => {
    if (c.x < player.x + player.width &&
        c.x + 20 > player.x &&
        c.y < player.y + player.height &&
        c.y + 20 > player.y) {
      coinCount++;
      document.getElementById("coins").textContent = coinCount;
      return false;
    }
    return c.y < canvas.height;
  });

  // Obstacle collision
  for (let o of obstacles) {
    if (player.x < o.x + 50 &&
        player.x + player.width > o.x &&
        player.y < o.y + 50 &&
        player.y + player.height > o.y) {
      gameOver = true;
      alert("Game Over!\nScore: " + score + "\nCoins: " + coinCount);
    }
  }

  obstacles = obstacles.filter(o => o.y < canvas.height);
}

function update() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawCoins();
  drawObstacles();
  spawnObjects();
  updateObjects();

  score++;
  document.getElementById("score").textContent = score;

  if (score % 500 === 0) speed += 0.5;

  requestAnimationFrame(update);
}

update();
