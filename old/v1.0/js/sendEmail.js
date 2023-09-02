document.getElementById("sendEmail").addEventListener("submit", function (e) {
    e.preventDefault();

    $("#overlay").fadeIn(300);

    $("#overlay").fadeOut(300);
    $("#notification")
        .css("background-color", "red")
        .css("display", "block")
        .text(
            "This option is not available, redirecting to the updated portfolio."
        );

    setTimeout(function () {
        window.location.href = "/";
    }, 5000);
});
