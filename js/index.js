const timelineMoreInfoBtn = document.querySelectorAll(".timeline__more-info-btn");

timelineMoreInfoBtn.forEach(element => {
    element.addEventListener("click", function (e) {
        this.previousElementSibling.classList.remove("timeline__responsibilities--collapsed");
        this.remove();
    });
});