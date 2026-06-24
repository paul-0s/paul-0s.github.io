window.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("introVideo");
    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const typed = document.getElementById("typed");
    const canvas = document.getElementById("particles");

    if (!video || !intro || !site || !typed || !canvas) {
        console.log("Faltan elementos en HTML");
        return;
    }

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 🔥 INTRO VIDEO SAFE
    video.addEventListener("ended", () => {

        intro.style.transition = "1s";
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.remove();

            site.style.visibility = "visible";
            site.style.opacity = "1";

            document.body.style.overflow = "auto";
        }, 1000);
    });

    // 🔥 TEXT TYPING
    const text = "GAME DEVELOPER • 3D ARTIST • UI DESIGNER";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typed.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // 🔥 BUTTON GLOBAL (IMPORTANTE)
    window.scrollToProjects = function () {
        document.getElementById("projects").scrollIntoView({
            behavior: "smooth"
        });
    };

    // 🔥 PARTICLES SAFE
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff88";

        particles.forEach(p => {
            p.y += p.speed;
            if (p.y > canvas.height) p.y = 0;

            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(animate);
    }

    animate();
});