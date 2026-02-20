document.addEventListener("DOMContentLoaded", function () {

    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            alert("Product detail preview coming soon.");
        });
    });

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");

    if (toggle) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }

});