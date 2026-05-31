/* STARFIELD */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,153,204,0.6)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += 0.4;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(draw);
}
draw();

/* MUSIC */
function startMusic() {
  const m = document.getElementById("bgMusic");
  m.volume = 0.3;
  m.play().catch(() => {});
}

/* PIN */
let pin = "";

function press(n) {
  if (pin.length < 4) pin += n;
}

function clearPin() {
  pin = "";
}

function checkPin() {
  if (pin === "0502") {
    startMusic();
    go("birthday");
  }
}

/* RESET FIX (NO GHOST CANDLES) */
let wasCut = false;

function resetPinkPages() {
  document.querySelectorAll(".flame").forEach(f => f.classList.remove("out"));

  wasCut = false;

  const cakeImg = document.getElementById("cakeImg");
  if (cakeImg) cakeImg.src = "cake.jpeg";

  document.getElementById("yay")?.style.setProperty("display", "none");
  document.getElementById("nextBtn")?.style.setProperty("display", "none");

  document.getElementById("balloons").innerHTML = "";
}

/* PAGE NAV */
function go(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const el = document.getElementById(id);
  el.classList.add("active");

  if (["birthday", "candles", "cut"].includes(id)) {
    resetPinkPages();
  }

  updateCanvas(el);
}

/* STARFIELD CONTROL */
function updateCanvas(pageEl) {
  const darkPages = [
    "quiz","q1","q2","q3","q4","q5","q6","q7","q8","q9","q10",
    "result-page","moon","feel","message","poem"
  ];

  canvas.style.display = darkPages.includes(pageEl.id) ? "block" : "none";
}

/* BLOW */
function blow() {
  document.querySelectorAll(".flame").forEach(f => f.classList.add("out"));
  setTimeout(() => go("cut"), 1500);
}

/* CAKE CUT */
let drag = false;
let knife = document.getElementById("knife");
let cake = document.getElementById("cakeImg");

document.addEventListener("mousemove", e => {
  if (!drag) return;

  const area = document.querySelector(".cut-area").getBoundingClientRect();

  knife.style.left = e.clientX - area.left + "px";
  knife.style.top = e.clientY - area.top + "px";
});

knife?.addEventListener("mousedown", () => drag = true);
document.addEventListener("mouseup", () => drag = false);
