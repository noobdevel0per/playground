const matrix = document.getElementById("matrix");

if (matrix) {

    const ctx = matrix.getContext("2d");
    const letters = "01";

    let fontSize = window.innerWidth < 600 ? 12 : 18;
    let columns;
    let drops = [];
    let interval = null;
    let currentSpeed = 60;

    function resizeCanvas() {
        matrix.width = window.innerWidth;
        matrix.height = window.innerHeight;
        fontSize = window.innerWidth < 600 ? 12 : 18;
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

    function startMatrix(speed = 60) {
        clearInterval(interval);
        currentSpeed = speed;
        interval = setInterval(drawMatrix, currentSpeed);
    }

    function updateSpeed(newSpeed) {
        startMatrix(newSpeed);
    }

    resizeCanvas();
    initMatrix();
    startMatrix(60);

    window.addEventListener("resize", () => {
        resizeCanvas();
        initMatrix();
    });

    window.matrixControl = {
        speedUp: () => updateSpeed(25),
        normal: () => updateSpeed(60),
        stop: () => clearInterval(interval)
    };
}
