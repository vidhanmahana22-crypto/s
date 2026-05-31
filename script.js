/* ── STARFIELD (dark pages only) ── */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
let particles = [];
for (let i = 0; i < 150; i++)) {
  particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 });
}
function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,153,204,0.8)";
  particles.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    p.y += 0.4;
    if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawBg);
}
drawBg();

/* canvas visibility — only show behind dark pages */
function updateCanvas(pageEl) {
  canvas.style.display = pageEl.classList.contains("dark-page") ? "block" : "none";
}

/* ── MUSIC ── */
function startMusic() {
  const m = document.getElementById("bgMusic");
  m.volume = 0.3;
  m.play().catch(() => {});
}

/* ── PIN ── */
let pin = "";
function press(n) {
  if (pin.length < 4) { pin += n; updateBoxes(); }
}
function updateBoxes() {
  document.querySelectorAll("#boxes span").forEach((b, i) => {
    b.style.background = i < pin.length ? "#e75480" : "white";
  });
}
function clearPin() { pin = ""; updateBoxes(); }
function checkPin() {
  if (pin === "0502") {
    startMusic(); go("birthday");
  } else if (pin === "0306") {
    document.getElementById("msg").innerText = "Not your birthday Samu 😉 try someone special from Bangalore ❤️";
    clearPin();
  } else {
    document.getElementById("msg").innerText = "Incorrect PIN 💭 Hint: birthday of someone special to you";
    clearPin();
  }
}

/* ── PAGE NAV ── */
function go(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
  updateCanvas(target);
  window.scrollTo(0, 0);
}

/* init — hide canvas on pink start page */
updateCanvas(document.getElementById("loginPage"));

/* ── CAKE DOTS ── */
(function buildDots() {
  const container = document.getElementById("cakeDots");
  const cols = 7, rows = 4, padX = 20, padY = 18, W = 280, H = 150;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.left = (padX + c * ((W - padX * 2) / (cols - 1))) + "px";
      dot.style.top  = (padY + r * ((H - padY * 2) / (rows - 1))) + "px";
      dot.style.background = (r + c) % 2 === 0 ? "#f9a8c9" : "#a8d4f9";
      container.appendChild(dot);
    }
  }
})();

/* ── BLOW CANDLES ── */
function blow() {
  document.querySelectorAll(".flame").forEach((f, i) => {
    setTimeout(() => f.classList.add("out"), i * 160);
  });
  setTimeout(() => go("cut"), 1700);
}

/* ── CAKE CUT ── */
let knife  = document.getElementById("knife");
let cake   = document.getElementById("cakeImg");
let drag   = false;
let wasCut = false;

knife.addEventListener("mousedown", e => { drag = true; e.preventDefault(); });
document.addEventListener("mouseup", () => drag = false);
document.addEventListener("mousemove", e => {
  if (!drag) return;
  const area = document.querySelector(".cut-area").getBoundingClientRect();
  knife.style.left = (e.clientX - area.left - 45) + "px";
  knife.style.top  = (e.clientY - area.top  - 45) + "px";
  checkCut();
});
knife.addEventListener("touchstart", e => { drag = true; e.preventDefault(); });
document.addEventListener("touchend", () => drag = false);
document.addEventListener("touchmove", e => {
  if (!drag) return;
  const t = e.touches[0];
  const area = document.querySelector(".cut-area").getBoundingClientRect();
  knife.style.left = (t.clientX - area.left - 45) + "px";
  knife.style.top  = (t.clientY - area.top  - 45) + "px";
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

/* ── BALLOONS ── */
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

/* ── QUIZ ── */
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
