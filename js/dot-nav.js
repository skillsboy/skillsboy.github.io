{
    let intro = document.querySelector("#intro");
    let about = document.querySelector("#about");
    let projects = document.querySelector("#projects");
    let contact = document.querySelector("#contact");
    let dot0 = document.getElementById("dot-0");
    let dot1 = document.getElementById("dot-1");
    let dot2 = document.getElementById("dot-2");
    let sideDotNavLinks = document.querySelectorAll(".side-dot-nav>a");

    window.addEventListener("resize", resize);

    resize();

    function setActiveDot() {
        if (isInView(projects)) {
            removeActiveDots();
            dot2.classList.add("active");
        } else if (isInView(about)) {
            removeActiveDots();
            dot1.classList.add("active");
        } else if (isInView(intro)) {
            removeActiveDots();
            dot0.classList.add("active");
        }
    }

    function removeActiveDots() {
        sideDotNavLinks.forEach((el) => {
            el.classList.remove("active");
        });
    }

    function isInView(el) {
        const box = el.getBoundingClientRect();
        return box.top < window.innerHeight && box.bottom >= 0;
    }

    function resize() {
        if (window.innerWidth >= 768) {
            window.onscroll = function () {
                setActiveDot();
            };

            setActiveDot();
            return;
        }
        window.onscroll = "";
    }
}
