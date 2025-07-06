
let points = 0;
let bonusClaimed = false;
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("points")) {
    points = parseInt(localStorage.getItem("points"));
    document.getElementById("points").textContent = "Apke total points hain: " + points;
  }
});

function spin() {
  const spinner = document.getElementById("spinner");
  const angle = Math.floor(Math.random() * 360) + 720;
  spinner.style.transition = "transform 4s ease-out";
  spinner.style.transform = "rotate(" + angle + "deg)";

  const reward = Math.floor(Math.random() * 30) + 5;
  points += reward;
  localStorage.setItem("points", points);
  setTimeout(() => {
    document.getElementById("points").textContent = "Apke total points hain: " + points;
  }, 4000);
}

function claimBonus() {
  const lastClaim = localStorage.getItem("lastBonus");
  const now = Date.now();
  if (!lastClaim || now - lastClaim > 86400000) {
    const bonus = 20;
    points += bonus;
    localStorage.setItem("points", points);
    localStorage.setItem("lastBonus", now);
    document.getElementById("points").textContent = "Apke total points hain: " + points;
    document.getElementById("bonus-status").textContent = "🎉 Bonus added: " + bonus + " points!";
  } else {
    document.getElementById("bonus-status").textContent = "⛔ Bonus already claimed. Try again in 24 hours.";
  }
}
