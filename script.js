window.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("introVideo");
    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const typed = document.getElementById("typed");
    if (!video || !intro || !site || !typed) {
        console.log("Faltan elementos en HTML");
        return;
    }

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

    // PRECARGA BGVIDEO
    const bgVideo = document.getElementById("bgVideo");
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.play().catch(() => {});
    }

    //  INTRO END
    video.addEventListener("ended", () => {
        console.log("TERMINÓ EL VIDEO");
        intro.style.transition = "1s";
        intro.style.opacity = "0";
        setTimeout(() => {
            intro.remove();
            console.log("ELIMINANDO INTRO");
            site.style.visibility = "visible";
            site.style.opacity = "1";
            document.body.style.overflow = "auto";
        }, 1000);
    });

    //  TYPEWRITER
    const text = "";
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

    //  BARRAS
    const bars = document.querySelectorAll(".bar");
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;
        const progress = scrollY / max;
        bars.forEach((bar, index) => {
            const base = 40;
            const extra = 200;
            const offset = index * 15;
            const width = base + (progress * extra) + offset;
            bar.style.width = `${width}px`;
        });
    });

    //  SCROLL REVEAL (ABOUT Y CONTACT)
    const revealSections = document.querySelectorAll('#about, #contact');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    revealSections.forEach(s => observer.observe(s));

    //  SEND MAIL
    window.sendMail = function () {
        const name = document.getElementById('fromName').value;
        const email = document.getElementById('fromEmail').value;
        const msg = document.getElementById('message').value;
        if (!name || !email || !msg) {
            alert('Por favor completa todos los campos.');
            return;
        }
        window.location.href = `mailto:tuemail@gmail.com?subject=Contacto de ${name}&body=${encodeURIComponent(msg)}%0A%0AEmail: ${email}`;
    };

});
