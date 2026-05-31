/* STARFIELD */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
let particles = [];
for (let i = 0; i < 90; i++) {
  particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 });
}
function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,153,204,0.55)";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += 0.4;
    if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawBg);
}
drawBg();

/* MUSIC */
function startMusic() {
  const m = document.getElementById("bgMusic");
  m.volume = 0.3;
  m.play().catch(() => {});
}

/* PIN */
let pin = "";
function press(n) {
  if (pin.length < 4) { pin += n; updateBoxes(); }
}
function updateBoxes() {
  document.querySelectorAll("#boxes span").forEach((b, i) => {
    b.style.background = i < pin.length ? "#ff4d6d" : "rgba(255,255,255,0.1)";
  });
}
function clearPin() { pin = ""; updateBoxes(); }
function checkPin() {
  if (pin === "0502") {
    startMusic();
    go("birthday");
  } else if (pin === "0306") {
    document.getElementById("msg").innerText =
      "Not your birthday Samu 😉 try someone special from Bangalore ❤️";
    clearPin();
  } else {
    document.getElementById("msg").innerText =
      "Incorrect PIN 💭 Hint: birthday of someone special to you";
    clearPin();
  }
}

/* PAGE NAV */
function go(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

/* CAKE DOTS */
(function buildDots() {
  const container = document.getElementById("cakeDots");
  const cols = 7, rows = 4;
  const padX = 20, padY = 18;
  const W = 280, H = 150;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.left = (padX + c * ((W - padX * 2) / (cols - 1))) + "px";
      dot.style.top  = (padY + r * ((H - padY * 2) / (rows - 1))) + "px";
      dot.style.background = (r + c) % 2 === 0 ? "rgba(255,160,200,0.7)" : "rgba(160,200,255,0.7)";
      container.appendChild(dot);
    }
  }
})();

/* BLOW CANDLES */
function blow() {
  document.querySelectorAll(".flame").forEach((f, i) => {
    setTimeout(() => f.classList.add("out"), i * 160);
  });
  setTimeout(() => go("cut"), 1700);
}

/* CAKE CUT */
let knife  = document.getElementById("knife");
let cake   = document.getElementById("cakeImg");
let drag   = false;
let wasCut = false;

knife.addEventListener("mousedown", () => drag = true);
document.addEventListener("mouseup",   () => drag = false);
document.addEventListener("mousemove", e => {
  if (!drag) return;
  knife.style.left = (e.pageX - 45) + "px";
  knife.style.top  = (e.pageY - 45) + "px";
  checkCut();
});
knife.addEventListener("touchstart", e => { drag = true; e.preventDefault(); });
document.addEventListener("touchend",   () => drag = false);
document.addEventListener("touchmove",  e => {
  if (!drag) return;
  const t = e.touches[0];
  knife.style.left = (t.pageX - 45) + "px";
  knife.style.top  = (t.pageY - 45) + "px";
  checkCut();
}, { passive: true });

function checkCut() {
  if (wasCut) return;
  const c = cake.getBoundingClientRect();
  const k = knife.getBoundingClientRect();
  if (k.left < c.right && k.right > c.left && k.top < c.bottom && k.bottom > c.top) {
    wasCut = true; drag = false;
    cake.src = "cake_cut.jpeg";
    document.getElementById("yay").style.display    = "block";
    document.getElementById("nextBtn").style.display = "inline-block";
    launchBalloons();
  }
}

/* BALLOONS */
const BCOLORS = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6bdf","#ff9f43","#a29bfe","#fd79a8"];
function launchBalloons() {
  const box = document.getElementById("balloons");
  box.innerHTML = "";
  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const b = document.createElement("div");
      b.className = "balloon";
      const size = 45 + Math.random() * 30;
      b.style.width    = size + "px";
      b.style.height   = (size * 1.3) + "px";
      b.style.left     = (Math.random() * 91) + "%";
      b.style.background        = BCOLORS[Math.floor(Math.random() * BCOLORS.length)];
      b.style.animationDuration = (3 + Math.random() * 2.5) + "s";
      box.appendChild(b);
      setTimeout(() => b.remove(), 7000);
    }, i * 180);
  }
}

/* QUIZ */
let score = 0;
function startQuiz() { score = 0; go("q1"); }
function correct() { score++; }
function annoyingYes() { alert("Wrong answer 😤 try again"); }
function move(btn) {
  btn.style.position = "fixed";
  btn.style.left = Math.random() * 75 + "%";
  btn.style.top  = Math.random() * 75 + "%";
}
function showResult() {
  let text = "";
  if      (score >= 8) text = "Elite performance 😎 clearly you know me too well";
  else if (score >= 5) text = "Good good 😏 acceptable effort";
  else if (score >= 3) text = "Hmm 🤨 something feels off";
  else                 text = "Very suspicious behavior 😤 investigation needed";
  document.getElementById("result-text").innerHTML = "Score: " + score + "/10<br><br>" + text;
  go("result-page");
}
