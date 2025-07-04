
let points = parseInt(localStorage.getItem('points') || '0');
let lastBonusTime = parseInt(localStorage.getItem('lastBonusTime') || '0');
const pointsDisplay = document.getElementById("points");
pointsDisplay.innerText = "Apke total points hain: " + points;

function spin() {
  const reward = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
  points += reward;
  localStorage.setItem('points', points);
  document.getElementById("spinner").style.transform = "rotate(" + (360 * 4 + reward * 6) + "deg)";
  pointsDisplay.innerText = "Apke total points hain: " + points;
}

function claimBonus() {
  const now = Date.now();
  if (now - lastBonusTime > 86400000) {
    points += 100;
    lastBonusTime = now;
    localStorage.setItem('points', points);
    localStorage.setItem('lastBonusTime', lastBonusTime);
    document.getElementById("bonus-status").innerText = "🎉 Bonus mil gaya! +100 points";
    pointsDisplay.innerText = "Apke total points hain: " + points;
  } else {
    document.getElementById("bonus-status").innerText = "⛔ Bonus already claimed. Try again in 24 hours.";
  }
}

document.getElementById("withdraw-form").onsubmit = function (e) {
  e.preventDefault();
  alert("Withdraw request submitted!");
};
