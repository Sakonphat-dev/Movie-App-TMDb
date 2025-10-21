const apiKey = "2f305920b5206ba82aff1b8e2a0f2384";

const yearSelect = document.getElementById("year");
const moviesDiv = document.getElementById("movies");

async function getMovies(year) {
  moviesDiv.innerHTML = "<p>⏳ กำลังโหลด...</p>";

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=th&page=1&sort_by=popularity.desc&year=${year}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      moviesDiv.innerHTML = "<p>ไม่พบหนังในปีนี้</p>";
      return;
    }

    showMovies(data.results);
  } catch (err) {
    moviesDiv.innerHTML = `<p>เกิดข้อผิดพลาดในการดึงข้อมูล (${err.message})</p>`;
  }
}

function showMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    const img = document.createElement("img");
    img.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";
    img.alt = (movie.title || movie.name || "Movie") + " poster";

    const title = document.createElement("h3");
    title.textContent = movie.title || movie.name || "ไม่มีชื่อเรื่อง";

    
    const rating = document.createElement("p");
    const score =
      typeof movie.vote_average === "number"
        ? movie.vote_average.toFixed(1)
        : "—";
    rating.innerHTML = `⭐ ${score} / 10`;
    rating.style.color = "#ffcc00";
    rating.style.marginTop = "6px";
    rating.style.fontWeight = "bold";

    movieCard.appendChild(img);
    movieCard.appendChild(title);
    movieCard.appendChild(rating);
    moviesDiv.appendChild(movieCard);
  });
}


getMovies(2025);


yearSelect.addEventListener("change", () => {
  getMovies(yearSelect.value);
});
