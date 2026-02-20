const API_KEY = "3d601a0f2244be709ccf717ace04f9bd";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const grid = document.getElementById("moviesGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const trendingBtn = document.getElementById("trendingBtn");
const clearBtn = document.getElementById("clearBtn");
const modal = document.getElementById("movieModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

window.addEventListener("DOMContentLoaded", getTrending);

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) searchMovies(query);
});

trendingBtn.addEventListener("click", getTrending);

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
});

async function getTrending() {
    try {
        const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await res.json();

        displayMovies(data.results);
    } catch (error) {
        showError("FAILED TO LOAD TRENDING MOVIES ⚠");
    }
}

async function searchMovies(query) {
    try {
        const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await res.json();

        displayMovies(data.results);
    } catch (error) {
        showError("API ERROR – CONNECTION FAILED ⚠");
    }
}

function showError(message) {
    grid.innerHTML = `
        <div class="no-results">
            ${message}
        </div>
    `;
}

function getRatingColor(rating) {
    if (rating >= 7) return "#00ff88";
    if (rating >= 5) return "#ffcc00";
    return "#ff4444";
}

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (!query) {
        getTrending();
        return;
    }

    searchMovies(query);
});
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) searchMovies(query);
    }
});

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    getTrending();
});


function displayMovies(movies) {
    grid.innerHTML = "";

    if (!movies || movies.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                NO RESULTS FOUND ⚠
            </div>
        `;
        return;
    }

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <div class="rating" style="color:${getRatingColor(movie.vote_average)}">
                ⭐ ${movie.vote_average} / 10
                <br>
                🗳 ${movie.vote_count} votes
            </div>
        `;

        card.addEventListener("click", () => openModal(movie.id));

        grid.appendChild(card);
    });

    // If all movies had no poster and nothing rendered
    if (grid.innerHTML === "") {
        grid.innerHTML = `
            <div class="no-results">
                NO VISUAL RESULTS AVAILABLE ⚠
            </div>
        `;
    }
}

async function openModal(movieId) {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const movie = await res.json();

    modalContent.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}">
        <div>
            <h2>${movie.title}</h2>
            <p><strong>Release:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
            <p style="margin-top:15px;">${movie.overview}</p>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}