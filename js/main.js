document.addEventListener("DOMContentLoaded", function () {
    const status = document.querySelector(".system-status");


    const buttons = document.querySelectorAll(".main-btn");
    document.body.classList.add("loaded");

    buttons.forEach(btn => {

        // Magnetic hover
        btn.addEventListener("mousemove", e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0,0)";

            // Reset matrix speed
            if (window.matrixControl) {
                window.matrixControl.normal();
            }
        });

        // Speed up matrix on hover
        btn.addEventListener("mouseenter", () => {
            if (window.matrixControl) {
                window.matrixControl.speedUp();
            }
        });

        // Page transition
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.style.opacity = "0";

            setTimeout(() => {
                window.location.href = this.href;
            }, 400);
        });
        btn.addEventListener("mouseenter", () => {
            if (status) {
                if (btn.textContent.trim() === "01") {
                    status.textContent = "> Option 1...";
                } else {
                    status.textContent = "> Access E-commerce website...";
                }

            }
        });

        btn.addEventListener("mouseleave", () => {
            if (status) status.textContent = "";
        });

    });





});
