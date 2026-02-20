/* ================= MATRIX ================= */

const matrix = document.getElementById("matrix");
const ctx = matrix.getContext("2d");

const letters = "01";
const fontSize = 18;

let columns;
let drops = [];

function resizeCanvas() {
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
}

function initMatrix() {
    columns = Math.floor(matrix.width / fontSize);
    drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, matrix.width, matrix.height);

    ctx.fillStyle = "#09ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

resizeCanvas();
initMatrix();
let matrixInterval = setInterval(drawMatrix, 60);

window.addEventListener("resize", () => {
    resizeCanvas();
    initMatrix();
});

/* ================= LOGIN ================= */

const passwordInput = document.getElementById("password");
const loginLayer = document.querySelector(".login-layer");
const experience = document.querySelector(".experience");
const floatingNav = document.querySelector(".floating-nav");

const correctPassword = "root"; // temporary

passwordInput.addEventListener("keydown", function (e) {
    if (passwordInput.value === correctPassword) {

        // Fade matrix out
        matrix.style.opacity = "0";

        // Stop animation
        clearInterval(matrixInterval);

        // After fade completes
        setTimeout(() => {
            matrix.style.display = "none";
        }, 800);

        loginLayer.classList.add("hidden");
        experience.classList.remove("hidden");
        floatingNav.classList.remove("hidden");
    }

});
