const STORAGE_KEY = "movie-ranking-list";

const listEl = document.getElementById("movie-list");
const emptyState = document.getElementById("empty-state");
const formEl = document.getElementById("movie-form");
const titleInput = document.getElementById("movie-title");
const yearInput = document.getElementById("movie-year");
const starInputs = document.querySelectorAll("#rating-input .star");

let currentRating = 0;

function loadMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMovies(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

function renderStars(container, rating, interactive) {
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("viewBox", "0 0 24 24");
    star.setAttribute("width", interactive ? "16" : "16");
    star.setAttribute("height", "16");
    star.setAttribute("fill", "currentColor");
    star.classList.add("star");
    if (i <= rating) star.classList.add("is-filled");
    star.innerHTML = '<polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2"/>';
    container.appendChild(star);
  }
}

function renderMovies() {
  const movies = loadMovies();
  movies.sort((a, b) => b.rating - a.rating);

  listEl.innerHTML = "";

  if (movies.length === 0) {
    listEl.appendChild(emptyState);
    return;
  }

  movies.forEach((movie, index) => {
    const row = document.createElement("div");
    row.className = "movie-row";

    const rank = document.createElement("div");
    rank.className = "movie-row__rank";
    rank.textContent = `#${index + 1}`;

    const body = document.createElement("div");
    body.className = "movie-row__body";
    const title = document.createElement("div");
    title.className = "movie-row__title";
    title.textContent = movie.title;
    const meta = document.createElement("div");
    meta.className = "movie-row__meta";
    meta.textContent = movie.year ? movie.year : "Year unknown";
    body.appendChild(title);
    body.appendChild(meta);

    const stars = document.createElement("div");
    stars.className = "movie-row__stars";
    renderStars(stars, movie.rating, false);

    const del = document.createElement("button");
    del.className = "movie-row__del";
    del.setAttribute("aria-label", "Remove movie");
    del.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    del.addEventListener("click", () => {
      const updated = loadMovies().filter((m) => m.id !== movie.id);
      saveMovies(updated);
      renderMovies();
    });

    row.appendChild(rank);
    row.appendChild(body);
    row.appendChild(stars);
    row.appendChild(del);
    listEl.appendChild(row);
  });
}

starInputs.forEach((star) => {
  star.addEventListener("click", () => {
    currentRating = Number(star.dataset.value);
    starInputs.forEach((s) => {
      s.classList.toggle("is-filled", Number(s.dataset.value) <= currentRating);
    });
  });
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!titleInput.value.trim()) return;

  const movies = loadMovies();
  movies.push({
    id: Date.now(),
    title: titleInput.value.trim(),
    year: yearInput.value.trim(),
    rating: currentRating || 0,
  });
  saveMovies(movies);

  titleInput.value = "";
  yearInput.value = "";
  currentRating = 0;
  starInputs.forEach((s) => s.classList.remove("is-filled"));

  renderMovies();
});

renderMovies();
