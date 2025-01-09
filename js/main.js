const API_URL =
  "https:api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");

getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data.results);
  showMovie(data.results);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovie(movies) {
  main.innerHTML = ``;
  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
    <img src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
        </div>
        <div class="overview">
          <h3>${title}<small>overview</small></h3>
          <p>
          ${overview}
          </p>
        </div>`;

    main.appendChild(movieElement);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "greeen";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
