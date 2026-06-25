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

    //  CANVAS SIZE
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    //  AUTOPLAY VIDEO SAFE
    function tryPlayVideo() {
        video.muted = true;
        video.playsInline = true;

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Autoplay bloqueado, esperando interacción");

                const start = () => {
                    video.play();
                    document.removeEventListener("click", start);
                    document.removeEventListener("touchstart", start);
                };

                document.addEventListener("click", start, { once: true });
                document.addEventListener("touchstart", start, { once: true });
            });
        }
    }

    tryPlayVideo();

    //  INTRO END
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

    //  TYPEWRITER
    const text = "Creador multidisciplinario digital (o adicto a la pantalla)";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typed.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    //  SCROLL BUTTON
    window.scrollToProjects = function () {
        document.getElementById("projects").scrollIntoView({
            behavior: "smooth"
        });
    };

    //  MODAL OPEN (GLOBAL)
    window.openModal = function (title, desc, media = []) {

        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modalTitle");
        const modalDesc = document.getElementById("modalDesc");
        const modalMedia = document.getElementById("modalMedia");

        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalMedia.innerHTML = "";

        media.forEach(item => {

            if (item.type === "img") {
                const img = document.createElement("img");
                img.src = item.src;
                modalMedia.appendChild(img);
            }

            if (item.type === "video") {
                const video = document.createElement("video");
                video.src = item.src;
                video.controls = true;
                video.playsInline = true;
                modalMedia.appendChild(video);
            }
        });

        modal.classList.remove("hidden");
    };

    //  MODAL CLOSE (GLOBAL)
    window.closeModal = function () {
        document.getElementById("modal").classList.add("hidden");
    };

    //  PARTICLES
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    //  BARRAS
    const bars = document.querySelectorAll(".bar");

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;

        const progress = scrollY / max; // 0 → 1

        bars.forEach((bar, index) => {

            // cada barra tiene variación distinta
            const base = 40;
            const extra = 200;

            const offset = index * 15;

            const width = base + (progress * extra) + offset;

            bar.style.width = `${width}px`;
        });
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(230,224,214,.35)";

        particles.forEach(p => {
            p.y += p.speed;

            if (p.y > canvas.height) p.y = 0;

            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(animate);
    }

    animate();
});

