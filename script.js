const video = document.getElementById("bg-video");
const soundBtn = document.getElementById("soundBtn");
const card = document.querySelector(".card");
const clock = document.getElementById("clock");
const subtitle = document.querySelector(".subtitle");
const buttons = document.querySelectorAll(".btn");

/* ========================= */
/* SOUND BUTTON */
/* ========================= */

soundBtn.addEventListener("click", async () => {

    try{

        if(video.paused){
            await video.play();
        }

        video.muted = !video.muted;

        soundBtn.innerHTML = video.muted
            ? '<i class="fa-solid fa-volume-xmark"></i>'
            : '<i class="fa-solid fa-volume-high"></i>';

    }catch(e){

        console.log(e);

    }

});

/* ========================= */
/* TRY AUTOPLAY */
/* ========================= */

window.addEventListener("load", async ()=>{

    try{

        await video.play();

    }catch(e){

        console.log("Autoplay blocked.");

    }

});

/* ========================= */
/* DIGITAL CLOCK */
/* ========================= */

function updateClock(){

    const now = new Date();

    let h = now.getHours().toString().padStart(2,"0");
    let m = now.getMinutes().toString().padStart(2,"0");
    let s = now.getSeconds().toString().padStart(2,"0");

    clock.textContent = `${h}:${m}:${s}`;

}

updateClock();

setInterval(updateClock,1000);

/* ========================= */
/* CARD 3D */
/* ========================= */

document.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    card.style.transform =
    `perspective(1000px)
     rotateY(${x}deg)
     rotateX(${-y}deg)
     translateY(-5px)`;

});

document.addEventListener("mouseleave",()=>{

    card.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

/* ========================= */
/* BUTTON GLOW */
/* ========================= */

buttons.forEach(btn=>{

    btn.addEventListener("mousemove",(e)=>{

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,.35),
        rgba(255,255,255,.08))`;

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.background =
        "rgba(255,255,255,.08)";

    });

});

/* ========================= */
/* TYPING EFFECT */
/* ========================= */

const text = "Website Developer";

subtitle.innerHTML = "";

let i = 0;

function typing(){

    if(i < text.length){

        subtitle.innerHTML += text.charAt(i);

        i++;

        setTimeout(typing,70);

    }

}

typing();

/* ========================= */
/* CARD FADE */
/* ========================= */

card.animate([
    {
        opacity:0,
        transform:"translateY(40px) scale(.95)"
    },
    {
        opacity:1,
        transform:"translateY(0px) scale(1)"
    }
],{

    duration:1000,
    easing:"ease-out",
    fill:"forwards"

});

/* ========================= */
/* FLOATING EFFECT */
/* ========================= */

let floating = 0;

setInterval(()=>{

    floating += 0.03;

    card.style.marginTop =
    Math.sin(floating) * 6 + "px";

},16);