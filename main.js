const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controller__color");
const range = document.querySelector(".range__bar");
const mode = document.querySelector(".btn__mode");
const clear = document.querySelector(".btn__clear")
const save = document.querySelector(".btn__save")
let painting = false;
let fill = false;
ctx.fillStyle="white";
ctx.fillRect(0,0,600,600);
ctx.lineWidth=2.5;
ctx.strokeStyle="black";

function paintStop(){
    painting=false;
}
function paintStart(){
    if(fill==false){
        painting=true;
    } 
}
function paintFill(){
    if(fill){
        ctx.fillRect(0,0,600,600);
    }
}
function mouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function changeColor(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle=ctx.strokeStyle;
}
function changeRange(event){
    ctx.lineWidth = event.target.value;
}
function changeMode(event){
    if(fill===true){
        fill=false;
        mode.innerText="Fill";
    }else{
        fill=true;
        mode.innerText="Paint";
    }
}
function paintClear(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,600,600);
    ctx.fillStyle=ctx.strokeStyle;
}
function rightClick(event){
    event.preventDefault();
}
function saveImage(){
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "Skan_Painter 🎨"
    link.click();
}
if (canvas){
    canvas.addEventListener("mousemove",mouseMove);
    canvas.addEventListener("mousedown",paintStart);
    canvas.addEventListener("mouseup",paintStop);
    canvas.addEventListener("mouseleave",paintStop);
    canvas.addEventListener("click",paintFill);
    clear.addEventListener("click",paintClear);
    canvas.addEventListener("contextmenu",rightClick);
}
if(range){
    range.addEventListener("input",changeRange);
}
if(mode){
    mode.addEventListener("click",changeMode);
}
if(save){
    save.addEventListener("click",saveImage);
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));
