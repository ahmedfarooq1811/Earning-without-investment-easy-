
let points = 0;
let bonusClaimed = false;
const bonusAmount = 50;

function spin() {
  const spinner = document.getElementById('spinner');
  const degree = 3600 + Math.floor(Math.random() * 360);
  spinner.style.transform = `rotate(${degree}deg)`;

  const reward = Math.floor(Math.random() * 50) + 5;
  points += reward;

  setTimeout(() => {
    document.getElementById('points').innerText = `Apke total points hain: ${points}`;
    alert(`You won ${reward} points!`);
  }, 3000);
}

function claimBonus() {
  const lastBonus = localStorage.getItem('lastBonusTime');
  const now = new Date().getTime();
  if (!lastBonus || now - lastBonus > 86400000) {
    points += bonusAmount;
    document.getElementById('points').innerText = `Apke total points hain: ${points}`;
    document.getElementById('bonus-status').innerText = `Bonus added: ${bonusAmount} points!`;
    localStorage.setItem('lastBonusTime', now);
  } else {
    document.getElementById('bonus-status').innerText = "⛔ Bonus already claimed. Try again in 24 hours.";
  }
}
