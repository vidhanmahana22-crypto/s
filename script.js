/* ── PIN ── */
let pin = "";

function press(n) {
  if (pin.length < 4) {
    pin += n;
    update();
  }
}
function update() {
  let boxes = document.querySelectorAll("#boxes span");
  boxes.forEach((b, i) => {
    b.style.background = i < pin.length ? "black" : "white";
  });
}
function clearPin() {
  pin = "";
  update();
}
function checkPin() {
  if (pin === "0502") {
    go("birthday");
  } else if (pin === "0306") {
    document.getElementById("msg").innerText =
      "Not your birthday Samu 😉 try someone special from Bangalore ❤️";
    clearPin();
  } else {
    document.getElementById("msg").innerText = "Wrong PIN";
    clearPin();
  }
}

/* ── PAGE NAV ── */
function go(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ── CAKE DOTS (FIX 1: drawn inside cake bounds) ── */
(function buildDots() {
  const container = document.getElementById("cakeDots");
  const cols = 7, rows = 4;
  const padX = 15, padY = 15;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      // spread evenly inside cake (260×140 minus padding)
      dot.style.left = (padX + c * ((260 - padX * 2) / (cols - 1))) + "px";
      dot.style.top  = (padY + r * ((140 - padY * 2) / (rows - 1))) + "px";
      dot.style.transform = "translate(-50%, -50%)";
      if ((r + c) % 2 === 0) dot.style.background = "pink";
      else dot.style.background = "lightblue";
      container.appendChild(dot);
    }
  }
})();

/* ── BLOW CANDLES (FIX 2: only flame fades, candle color stays) ── */
function blow() {
  const flames = document.querySelectorAll(".flame");
  flames.forEach((f, i) => {
    setTimeout(() => f.classList.add("out"), i * 120);
  });
  setTimeout(() => go("cut"), 1400);
}

/* ── CAKE CUT ── */
let knife = document.getElementById("knife");
let cake  = document.getElementById("cakeImg");
let drag  = false;

knife.onmousedown = () => drag = true;
document.onmouseup = () => drag = false;
document.onmousemove = (e) => {
  if (!drag) return;
  knife.style.left = e.pageX - 40 + "px";
  knife.style.top  = e.pageY - 40 + "px";
  let c = cake.getBoundingClientRect();
  let k = knife.getBoundingClientRect();
  if (k.left < c.right && k.right > c.left && k.top < c.bottom && k.bottom > c.top) {
    cut();
  }
};

// Touch support
knife.ontouchstart = (e) => { drag = true; e.preventDefault(); };
document.ontouchend = () => drag = false;
document.ontouchmove = (e) => {
  if (!drag) return;
  const t = e.touches[0];
  knife.style.left = t.pageX - 40 + "px";
  knife.style.top  = t.pageY - 40 + "px";
  let c = cake.getBoundingClientRect();
  let k = knife.getBoundingClientRect();
  if (k.left < c.right && k.right > c.left && k.top < c.bottom && k.bottom > c.top) {
    cut();
  }
};

let wasCut = false;
function cut() {
  if (wasCut) return;
  wasCut = true;
  cake.src = "cake_cut.jpeg";
  document.getElementById("yay").style.display = "block";
  document.getElementById("nextBtn").style.display = "inline-block";
  drag = false;
  launchBalloons(); // FIX 3
}

/* ── BALLOONS (FIX 3) ── */
const balloonColors = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6bdf","#ff9f43","#a29bfe"];

function launchBalloons() {
  const container = document.getElementById("balloons");
  container.innerHTML = "";
  const count = 18;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const b = document.createElement("div");
      b.className = "balloon";
      b.style.left = Math.random() * 95 + "%";
      b.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      b.style.animationDuration = (2.5 + Math.random() * 2) + "s";
      b.style.animationDelay = "0s";
      b.style.width  = (45 + Math.random() * 25) + "px";
      b.style.height = (60 + Math.random() * 25) + "px";
      container.appendChild(b);
      // remove after animation
      setTimeout(() => b.remove(), 5000);
    }, i * 180);
  }
}
