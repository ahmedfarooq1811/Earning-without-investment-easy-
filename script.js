let points = 0;
let lastBonusTime = localStorage.getItem("lastBonusTime") || 0;
let spinner = document.getElementById("spinner");

function spin() {
  const angle = Math.floor(Math.random() * 360);
  const reward = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
  spinner.style.transition = "transform 2s ease-out";
  spinner.style.transform = "rotate(" + angle + "deg)";
  setTimeout(() => {
    points += reward;
    document.getElementById("points").innerText = "Apke total points hain: " + points;
    alert("You won " + reward + " points!");
  }, 2000);
}

function claimBonus() {
  let now = Date.now();
  if (now - lastBonusTime > 86400000) {
    let bonus = 50;
    points += bonus;
    document.getElementById("points").innerText = "Apke total points hain: " + points;
    document.getElementById("bonus-status").innerText = "Bonus claimed: " + bonus + " points!";
    lastBonusTime = now;
    localStorage.setItem("lastBonusTime", now);
  } else {
    document.getElementById("bonus-status").innerText = "⛔ Bonus already claimed. Try again in 24 hours.";
  }
}

function guestLogin() {
  let name = document.getElementById("guestName").value.trim();
  if (name !== "") {
    alert("Welcome, " + name + "!");
  } else {
    alert("Please enter your name.");
  }
}