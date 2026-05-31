let pin="";

function press(n){
  if(pin.length<4){
    pin+=n;
    update();
  }
}

function update(){
  let boxes=document.querySelectorAll("#boxes span");
  boxes.forEach((b,i)=>{
    b.style.background = i < pin.length ? "black" : "white";
  });
}

function clearPin(){
  pin="";
  update();
}

function checkPin(){
  if(pin==="0502"){
    go("birthday");
  }
  else if(pin==="0306"){
    document.getElementById("msg").innerText =
      "Not your birthday Samu 😉 try someone special from Bangalore ❤️";
    clearPin();
  }
  else{
    document.getElementById("msg").innerText =
      "Wrong PIN";
    clearPin();
  }
}

function go(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* blow candles */
function blow(){
  document.querySelectorAll(".candle").forEach(c=>{
    c.style.opacity="0.2";
  });

  setTimeout(()=>go("cut"),1000);
}

/* cake cut */
let knife=document.getElementById("knife");
let cake=document.getElementById("cakeImg");

let drag=false;

knife.onmousedown=()=>drag=true;
document.onmouseup=()=>drag=false;

document.onmousemove=(e)=>{
  if(!drag) return;

  knife.style.left=e.pageX-40+"px";
  knife.style.top=e.pageY-40+"px";

  let c=cake.getBoundingClientRect();
  let k=knife.getBoundingClientRect();

  if(k.left<c.right && k.right>c.left){
    cut();
  }
}

function cut(){
  cake.src="cake_cut.jpeg";
  document.getElementById("yay").style.display="block";
  document.getElementById("nextBtn").style.display="inline-block";
  drag=false;
}
