document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
    const passwordInput = document.getElementById("password");
    const errorText = document.getElementById("error");
    const correctPassword = "root";


    passwordInput.addEventListener("keydown", function (e) {

        errorText.classList.remove("active");
        errorText.textContent = "";

        if (e.key === "Enter") {

            if (passwordInput.value === correctPassword) {

                window.location.href = "main.html";

            } else {

                errorText.textContent = "ACCESS DENIED";
                errorText.classList.add("active");
                passwordInput.value = "";

            }

        }

    });

});
