
let points = 0;
let lastBonusTime = 0;

function spin() {
  const spinner = document.getElementById('spinner');
  const deg = 360 * 5 + Math.floor(Math.random() * 360);
  spinner.style.transform = `rotate(${deg}deg)`;

  const reward = Math.floor(Math.random() * 10) + 1;
  points += reward;

  document.getElementById("points").innerText = "Apke total points hain: " + points;
}

function claimBonus() {
  const now = Date.now();
  const bonusAmount = Math.floor(Math.random() * 20) + 10;

  if (now - lastBonusTime > 86400000) {
    points += bonusAmount;
    lastBonusTime = now;
    document.getElementById("bonus-status").innerText = "You got bonus: " + bonusAmount;
    document.getElementById("points").innerText = "Apke total points hain: " + points;
  } else {
    document.getElementById("bonus-status").innerText = "Bonus already claimed. Try again in 24 hours.";
  }
}
