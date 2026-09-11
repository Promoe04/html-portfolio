const dayEl = document.getElementById("cd-days");
const hourEl = document.getElementById("cd-hours");
const minEl = document.getElementById("cd-mins");
const secEl = document.getElementById("cd-secs");
const dateInput = document.getElementById("party-date");
const setDateBtn = document.getElementById("set-date-btn");
const confettiBtn = document.getElementById("confetti-btn");

const STORAGE_KEY = "birthday-invite-date";

let targetDate = getStoredDate() || getDefaultDate();
dateInput.value = toLocalInputValue(targetDate);

function getDefaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  d.setHours(19, 0, 0, 0);
  return d;
}

function getStoredDate() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? new Date(raw) : null;
}

function toLocalInputValue(date) {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const now = new Date();
  let diff = targetDate - now;

  if (diff <= 0) {
    dayEl.textContent = "0";
    hourEl.textContent = "00";
    minEl.textContent = "00";
    secEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);
  const secs = Math.floor(diff / 1000);

  dayEl.textContent = days;
  hourEl.textContent = pad(hours);
  minEl.textContent = pad(mins);
  secEl.textContent = pad(secs);
}

setDateBtn.addEventListener("click", () => {
  if (!dateInput.value) return;
  targetDate = new Date(dateInput.value);
  localStorage.setItem(STORAGE_KEY, targetDate.toISOString());
  tick();
});

function burstConfetti() {
  const colors = ["#7c5cff", "#22d3ee", "#ff5da2", "#facc15", "#4ade80"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 6;
    piece.style.position = "fixed";
    piece.style.top = "-10px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.width = size + "px";
    piece.style.height = size + "px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.zIndex = "999";
    piece.style.pointerEvents = "none";
    piece.style.opacity = "0.9";
    document.body.appendChild(piece);

    const duration = 2200 + Math.random() * 1400;
    const rotate = Math.random() * 720 - 360;

    piece.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        { transform: `translateY(100vh) rotate(${rotate}deg)`, opacity: 0.9 },
      ],
      { duration, easing: "ease-in" }
    );

    setTimeout(() => piece.remove(), duration);
  }
}

confettiBtn.addEventListener("click", burstConfetti);

tick();
setInterval(tick, 1000);
