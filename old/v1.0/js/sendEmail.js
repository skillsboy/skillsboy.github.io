document.getElementById("sendEmail").addEventListener("submit", function (e) {
    e.preventDefault();

    $("#overlay").fadeIn(300);

    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    fetch("https://script.google.com/macros/s/AKfycbyAaIQOPRoE7FyrJ-Rhav5x4ioaKEFFqRCYezcayDD48xaJlvhG8mmRkOc9TkKqaMXhXw/exec", {
        method: "POST",
        body: JSON.stringify({ email, message })
    })
        .then(response => response.json())
        .then(data => {
            if (data.result !== "success") {
                setTimeout(function () {
                    $("#overlay").fadeOut(300);
                    $("#notification")
                        .css("background-color", "red")
                        .css("display", "block")
                        .text("Email not sent... Please try again.");

                    setTimeout(function () {
                        $("#notification").css("display", "none");
                    }, 5000);
                }, 500);

                return;
            }

            setTimeout(function () {
                $("#overlay").fadeOut(300);

                $("#notification")
                    .css("background-color", "green")
                    .css("display", "block")
                    .text("Email sent! I will be in touch asap.");

                setTimeout(function () {
                    $("#notification").css("display", "none");
                }, 5000);
            }, 500);


        })
        .catch(error => {
            setTimeout(function () {
                $("#overlay").fadeOut(300);
                $("#notification")
                    .css("background-color", "red")
                    .css("display", "block")
                    .text("Email not sent... Please try again.");

                setTimeout(function () {
                    $("#notification").css("display", "none");
                }, 5000);
            }, 500);
        });
});