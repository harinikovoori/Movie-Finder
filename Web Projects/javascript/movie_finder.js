const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=47f0371b&s=";
const API_URL_DETAILS = "http://www.omdbapi.com/?apikey=47f0371b&i=";

var search_input = document.getElementById("search-input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function() {
    const query = search_input.value;
    if (query) {
        getMovies(API_URL_SEARCH + query);
    }
});

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    if (respData.Response === "True") {
        showMovies(respData.Search);
    } else {
        card.innerHTML = "<p>No results found</p>";
    }
}

function showMovies(movies) {
    card.innerHTML = "";
    movies.forEach(async function(movie) {
        const movieData = await fetch(API_URL_DETAILS + movie.imdbID);
        const movieDataObj = await movieData.json();
        movie_display(movieDataObj);
    });
}

function movie_display(imovie) {
    const movieElm = document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML = `
    <div class="card">
        <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
        <br>
        <div class="movie-description">
            <div class="movie-title"><b>Title:</b> <span class="value">${imovie.Title}</span></div>
            <div class="movie-title"><b>Rating:</b> <span class="value">${imovie.imdbRating}</span></div>
            <div class="movie-title"><b>Director:</b> <span class="value">${imovie.Director}</span></div>
            <div class="movie-title"><b>Released Date:</b> <span class="value">${imovie.Released}</span></div>
            <div class="movie-title"><b>Genre:</b> <span class="value">${imovie.Genre}</span></div>
        </div>
    </div>
    `;
    card.appendChild(movieElm);
}
