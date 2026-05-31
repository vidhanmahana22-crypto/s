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
    go("birthday");
  } else if (pin === "0306") {
    document.getElementById("msg").innerText =
      "Not your birthday Samu 😉 try someone special from Bangalore ❤️";
    clearPin();
  } else {
    // hint for any other wrong pin
    document.getElementById("msg").innerText =
      "Incorrect PIN 💭 Hint: it's the birthday of someone special to you";
    clearPin();
  }
}

/* ── PAGE NAV ── */
function go(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ── CAKE DOTS (stay inside cake bounds) ── */
(function buildDots() {
  const container = document.getElementById("cakeDots");
  const cols = 7, rows = 4;
  const padX = 20, padY = 18;
  const W = 260, H = 140;
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

/* ── BLOW CANDLES — only flames fade, candle colors stay ── */
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
});

function checkCut() {
  if (wasCut) return;
  const c = cake.getBoundingClientRect();
  const k = knife.getBoundingClientRect();
  if (k.left < c.right && k.right > c.left && k.top < c.bottom && k.bottom > c.top) {
    wasCut = true;
    drag   = false;
    cake.src = "cake_cut.jpeg";
    document.getElementById("yay").style.display     = "block";
    document.getElementById("nextBtn").style.display  = "inline-block";
    launchBalloons();
  }
}

/* ── BALLOONS ── */
const COLORS = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6bdf","#ff9f43","#a29bfe","#fd79a8"];
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
      b.style.background        = COLORS[Math.floor(Math.random() * COLORS.length)];
      b.style.animationDuration = (3 + Math.random() * 2.5) + "s";
      box.appendChild(b);
      setTimeout(() => b.remove(), 7000);
    }, i * 180);
  }
}
