const bootLines = [

"Inicializando T.U.L.A...",
"Conectando a servidores...",
"Cargando archivos clasificados...",
"Acceso autorizado...",
"",
"SISTEMA LISTO"

];

const bootText = document.getElementById("bootText");

const video = document.getElementById("introVideo")

const intro = document.getElementById("intro")

const site = document.getElementById("site")

let line = 0;

video.addEventListener("ended", ()=>{

    intro.style.transition = "1s";
    intro.style.opacity = "0";

    setTimeout(()=>{
        intro.remove();

        site.style.visibility = "visible";
        site.style.opacity = "1";

        document.body.style.overflow = "auto";
    },1000);
})


function boot(){

    if(line < bootLines.length){

        bootText.innerHTML +=
        bootLines[line] + "\n";

        line++;

        setTimeout(boot,500);

    }else{

        setTimeout(()=>{

            document.getElementById("bootScreen")
            .style.display="none";

            document.getElementById("site")
            .style.display="block";

            typeWriter();

        },1000);
    }
}

boot();

const text =
"GAME DEVELOPER • 3D ARTIST • UI DESIGNER";

let i = 0;

function typeWriter(){

    if(i < text.length){

        document.getElementById("typed")
        .innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter,50);
    }
}

function scrollToProjects(){

    document.getElementById("projects")
    .scrollIntoView({
        behavior:"smooth"
    });
}

const canvas =
document.getElementById("particles");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const particles = [];

for(let i=0;i<100;i++){

    particles.push({

        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,

        size:Math.random()*2,

        speed:
        Math.random()*0.5 + 0.1
    });
}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle="#00ff88";

    particles.forEach(p=>{

        p.y += p.speed;

        if(p.y > canvas.height)
            p.y = 0;

        ctx.fillRect(
            p.x,
            p.y,
            p.size,
            p.size
        );
    });

    requestAnimationFrame(animate);
}

animate();