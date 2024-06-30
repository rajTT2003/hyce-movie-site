const API_KEY = 'api_key=cee4c96c8b0db2fbb25f4450debdc8aa';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/620705/recommendations?&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const UPCOMING_URL = '/discover/movie?sort_by=primary_release_date.desc&';
const NEW_URL = '/discover/movie?sort_by=popularity.desc&year=2023&'
const NEW_URL_SERIES= '/discover/tv?air_date.lte=2022&sort_by=popularity.desc&'
const LATEST ='/movie/now_playing?&'
const LATEST_SERIES ='https://api.themoviedb.org/3/tv/popular?api_key=cee4c96c8b0db2fbb25f4450debdc8aa&language=en-US&page=1&sort_by=first_air_date.desc';

const UPCOMING_API = BASE_URL + UPCOMING_URL + API_KEY;

const newTray = document.getElementById('new-tray');
const upcomingTray = document.getElementById('upcoming-tray');
const movieTray = document.getElementById('movie-tray');
const latestMoviesTray = document.getElementById('latestMovies-tray');
const latestSeriesTray = document.getElementById('latestSeries-tray');
const movieInfo =document.getElementById('playBox');



//Start of Main page movies
//Getting Recommended Movies




function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

async function showMovies(data) {
  movieTray.innerHTML = '';

  let count = 0; // Track the number of movies generated
  let index = 0; // Track the index of the data array

  // Create rows to display movies
  for (let i = 0; i < Math.ceil(data.length / 4); i++) {
    const movieRow = document.createElement('div');
    movieRow.classList.add('movie-row');
    movieTray.appendChild(movieRow);

    // Add movies to each row
    while (count < 20 && index < data.length) {
      const movie = data[index];
      const { title, poster_path, vote_average, release_date, id } = movie;

      // Skip movies without poster paths
      if (!poster_path) {
        index++;
        continue;
      }

      const movieEl = document.createElement('div');
      movieEl.classList.add('movie-container');

      // Truncate title if needed
      const truncatedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
      const year = release_date.substring(0, 4);
      const rating = vote_average.toFixed(1); // Format rating to one decimal place

      try {
        const movieRuntime = await fetchMovieRuntime(id);

        movieEl.innerHTML = `
          <div>
            <a href="#">
              <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">

              <div class="movie-picture">
                <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
                <div class="overlay">
                  <h4 class="${getColor(vote_average)}">${rating}</h4>
                </div>
              </div>
              <div class="movie-title">
                <h4>${truncatedTitle}</h4>
              </div>
              <div class="movie-info">
                <div class="movie-year">${year}·</div>
                <div class="runtime">${movieRuntime} min</div>
                <div class="type">Movie</div> 
                
              </div>
            </div>
          </a> 
        `;

        movieEl.addEventListener('click', () => {
          const selectedMovie = JSON.stringify(movie);
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.set('movie', selectedMovie);
          const newUrl = 'playPage.html' + '?' + urlParams.toString();
          window.location.href = newUrl;
        });

        movieRow.appendChild(movieEl);

        count++;
        index++;
      } catch (error) {
        console.log('Error:', error);
        index++; // Skip the movie if runtime fetch fails
      }
    }
  }
}

getMovies(API_URL);





async function fetchMovieRuntime(movieId) {
  const apiKey = 'cee4c96c8b0db2fbb25f4450debdc8aa';
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.runtime;
  } catch (error) {
    console.log('Error:', error);
    return 'N/A';
  }
}

//End of Getting Recommended Movies


function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}


//Start of Getting Upcoming Movies


function getUpcomingMovies(upcoming_url) {
  fetch(upcoming_url)
    .then(res => res.json())
    .then(data => {
      showUpcomingMovies(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function showUpcomingMovies(data) {
  upcomingTray.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, release_date } = movie;
    if (!poster_path) {
      // Skip movie if poster_path is not available
      return;
    }
    const movieEl = document.createElement('div');
    movieEl.classList.add('upcoming-container');
    const year = release_date.substring(0, 4);
    const truncatedTitle = title.length > 15 ? title.substring(0, 15) + '...' : title;
    movieEl.innerHTML = `
      <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
      <div class="upcoming-picture">
        <img src="${IMG_URL + poster_path}" alt="${title}">
      </div>
      <div class="upcoming-title">
        <h4 class="text-upcoming">${truncatedTitle}</h4>
      </div>
      <div class="upcoming-info">
        <div class="upcoming-year">${year}</div>
      </div>
    `;

    upcomingTray.appendChild(movieEl);
  });
}

getUpcomingMovies(BASE_URL + UPCOMING_URL + API_KEY);
//End of Getting Upcoming Movies


//Start of Getting latest movies

function getNewMovies(new_url) {
  fetch(new_url)
    .then(res => res.json())
    .then(data => {
      showNewMovies(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


function showNewMovies(data) {
  newTray.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, release_date } = movie;
    if (!poster_path) {
      // Skip movie if poster_path is not available
      return;
    }
    const movieEl = document.createElement('div');
    movieEl.classList.add('new-container');
    const year = release_date.substring(0, 4);
    const truncatedTitle = title.length > 15 ? title.substring(0, 15) + '...' : title;
    movieEl.innerHTML = `
      <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
      <div class="new-picture">
        <img src="${IMG_URL + poster_path}" alt="${title}">
      </div>
      <div class="new-title">
        <h4 class="text-new">${truncatedTitle}</h4>
      </div>
      <div class="new-info">
        <div class="new-year">${year}</div>
      </div>
    `;

    newTray.appendChild(movieEl);
  
  });
}
getNewMovies(BASE_URL + NEW_URL + API_KEY);

//End of Getting New Movies




const urlParams = new URLSearchParams(window.location.search);
const selectedMovie = JSON.parse(urlParams.get('movie'));
const selectedSeries = JSON.parse(urlParams.get('series'));

if (selectedMovie) {
  const { name, poster_path, vote_average, release_date, backdrop_path, overview,id, title,first_air_date } = selectedMovie;
  document.getElementById('movieTitle').textContent = name || title;
  document.getElementById('moviePoster').src = IMG_URL + poster_path;
  document.getElementById('backdropPoster').src = IMG_URL + backdrop_path;

  // Limit overview to 75 words and add ellipsis if needed
  const limitedOverview = limitWords(overview, 75);
  document.getElementById('overview').textContent = limitedOverview;

  document.getElementById('release_date').textContent = release_date || first_air_date;
  document.getElementById('rating').textContent = vote_average.toFixed(1);

  // Retrieve the runtime for the selected movie
  fetchMovieRuntime(id)
    .then(runtime => {
      document.getElementById('runtime').textContent = runtime !== null ? `${runtime} min` : 'N/A';
    })
    .catch(error => {
      console.log('Error:', error);
      document.getElementById('runtime').textContent = 'N/A';
    });

  // Retrieve the file ID for the selected movie
  const login = 'd2de7b9531a0984ad347';
  const key = 'wgV9XgqB1MIlxD';
  const folder = 'Ue7rIWly2Bg';
  fetch(`https://api.streamtape.com/file/listfolder?login=${login}&key=${key}&folder=${folder}`)
    .then(response => response.json())
    .then(data => {
      let linkid;
      for (const file of data.result.files) {
        if (file.name === selectedMovie.title) {
          linkid = file.linkid;
          break;
        }
      }
      if (linkid) {
        // Generate the embedded URL
        const embeddedURL = `https://streamtape.com/e/${linkid}`;

        // Update the movie player container with the embedded iframe URL
        const moviePlayer = document.getElementById('movie-player');
        moviePlayer.src = embeddedURL;
      } else {
        console.log('Link ID not found for the selected movie.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Get trailer for the movie
  getTrailer(id)
    .then(trailerKey => {
      const trailerContainer = document.getElementById('trailer-container');
      if (trailerKey) {
        const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
        const iframe = document.createElement('iframe');
        iframe.src = trailerUrl;
        iframe.allowFullscreen = true;
        iframe.frameBorder = '0';
        trailerContainer.appendChild(iframe);
      } else {
        trailerContainer.textContent = 'Trailer not available';
      }
    })
    .catch(error => {
      console.log('Error:', error);
      trailerContainer.textContent = 'Failed to load trailer';
    });
}else if (selectedSeries) {
  const { name, poster_path, vote_average, first_air_date, backdrop_path, overview, id, title } = selectedSeries;
  document.getElementById('movieTitle').textContent = name || title;
  document.getElementById('moviePoster').src = IMG_URL + poster_path;
  document.getElementById('backdropPoster').src = IMG_URL + backdrop_path;

  // Limit overview to 75 words and add ellipsis if needed
  const limitedOverview = limitWords(overview, 75);
  document.getElementById('overview').textContent = limitedOverview;

  document.getElementById('release_date').textContent = first_air_date;
  document.getElementById('rating').textContent = vote_average.toFixed(1);

  // Retrieve the runtime for the selected series
  fetchSeriesRuntime(id)
    .then(runtime => {
      document.getElementById('runtime').textContent = runtime !== null ? `${runtime} min` : 'N/A';
    })
    .catch(error => {
      console.log('Error:', error);
      document.getElementById('runtime').textContent = 'N/A';
    });

  // Retrieve the file ID for the selected series
  const login = 'd2de7b9531a0984ad347';
  const key = 'wgV9XgqB1MIlxD';
  const folder = 'Ue7rIWly2Bg';
  searchStreamtape(selectedSeries.title)
    .then(linkid => {
      if (linkid) {
        // Generate the embedded URL
        const embeddedURL = `https://streamtape.com/e/${linkid}`;

        // Update the movie player container with the embedded iframe URL
        const moviePlayer = document.getElementById('movie-player');
        moviePlayer.src = embeddedURL;
      } else {
        console.log('Link ID not found for the selected series.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Get trailer for the series
  getTrailer(id)
    .then(trailerKey => {
      const trailerContainer = document.getElementById('trailer-container');
      if (trailerKey) {
        const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
        const iframe = document.createElement('iframe');
        iframe.src = trailerUrl;
        iframe.allowFullscreen = true;
        iframe.frameBorder = '0';
        trailerContainer.appendChild(iframe);
      } else {
        trailerContainer.textContent = 'Trailer not available';
      }
    })
    .catch(error => {
      console.log('Error:', error);
      trailerContainer.textContent = 'Failed to load trailer';
    });
} else {
  console.log('No movie or series selected.');
}

// Function to limit the number of words in a string and add ellipsis if needed
function limitWords(text, wordLimit) {
  const words = text.trim().split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

// Function to fetch the movie or series runtime from TMDB API
async function fetchMovieRuntime(movieId) {
  const apiKey = 'cee4c96c8b0db2fbb25f4450debdc8aa';
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.runtime) {
      return data.runtime;
    }
    return null;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

// Function to fetch the series runtime from TMDB API
async function fetchSeriesRuntime(tvId) {
  const apiKey = 'cee4c96c8b0db2fbb25f4450debdc8aa';
  const url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.episode_run_time && data.episode_run_time.length > 0) {
      return data.episode_run_time[0];
    }
    return null;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

// Function to search Streamtape for a series title
async function searchStreamtape(seriesTitle) {
  const login = 'd2de7b9531a0984ad347';
  const key = 'wgV9XgqB1MIlxD';
  const folder = 'Ue7rIWly2Bg';
  const response = await fetch(`https://api.streamtape.com/file/listfolder?login=${login}&key=${key}&folder=${folder}`);
  const data = await response.json();

  for (const file of data.result.files) {
    if (file.name.toLowerCase().includes(seriesTitle.toLowerCase())) {
      return file.linkid;
    }
  }

  return null;
}

// Function to get the trailer for the movie or series
function getTrailer(movieId) {
  const apiKey = 'cee4c96c8b0db2fbb25f4450debdc8aa';
  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  return fetch(trailerUrl)
    .then(response => response.json())
    .then(data => {
      const trailers = data.results.filter(trailer => trailer.type === 'Trailer');
      if (trailers.length > 0) {
        return trailers[0].key;
      }
      return null;
    })
    .catch(error => {
      console.log('Error:', error);
      return null;
    });
}

















//Start of Getting latest Movies

function getLatestMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results)
      showLatestMovies(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

async function showLatestMovies(data) {
  latestMoviesTray.innerHTML = '';

  for (let i = 0; i < Math.ceil(data.length / 4); i++) {
    const movieRow = document.createElement('div');
    movieRow.classList.add('movie-row');
    latestMoviesTray.appendChild(movieRow);

    const moviesInRow = data.slice(i * 4, (i + 1) * 4);
    for (let j = 0; j < moviesInRow.length; j++) {
      const { title, poster_path, vote_average, release_date, id } = moviesInRow[j];
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie-container');

      try {
        const movieRuntime = await fetchMovieRuntime(id);
        const truncatedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
        const year = release_date.substring(0, 4);

        movieEl.innerHTML = `
          <div>
            <a href="#">
              <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
              <div class="movie-picture">
                <img src="${IMG_URL+poster_path}" alt="${title}">
                <div class="overlay">
                  <h4 class="${getColor(vote_average)}">${vote_average}</h4>
                </div>
              </div>
              <div class="movie-title">
                <h4>${truncatedTitle}</h4>
              </div>
              <div class="movie-info">
                <div class="movie-year">${year} ·</div>
                <div class="runtime">${movieRuntime}min</div>
                <div class="type">Movie</div>
              </div>
            </a>
          </div>
        `;

        movieEl.addEventListener('click', () => {
          const selectedMovie = JSON.stringify(moviesInRow[j]);
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.set('movie', selectedMovie);
          const newUrl = 'playPage.html' + '?' + urlParams.toString();
          window.location.href = newUrl;
        });

        movieRow.appendChild(movieEl);
      } catch (error) {
        console.log('Error:', error);
      }
    }
  }
}

async function fetchMovieRuntime(movieId) {
  const apiKey = 'cee4c96c8b0db2fbb25f4450debdc8aa';
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.runtime;
  } catch (error) {
    console.log('Error:', error);
    return 'N/A';
  }
}

getLatestMovies(BASE_URL + LATEST + API_KEY);


//End of Getting Latest Movies








// Start of Getting Latest series
function getLatestSeries(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showLatestSeries(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

async function showLatestSeries(data) {
  const latestSeriesTray = document.getElementById('latestSeries-tray');
  latestSeriesTray.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    const series = data[i];
    const { name, poster_path, vote_average, first_air_date, id, last_episode_to_air } = series;

    // Skip series without poster paths
    if (!poster_path) {
      continue;
    }

    const seriesEl = document.createElement('div');
    seriesEl.classList.add('movie-container');

    // Truncate title if needed
    const truncatedTitle = name.length > 30 ? name.substring(0, 30) + '...' : name;
    const year = first_air_date.substring(0, 4);
    const rating = vote_average.toFixed(1); // Format rating to one decimal place

    try {
      const { numberOfSeasons, numberOfEpisodes } = await fetchSeriesDetails(id);
      seriesEl.innerHTML = `
        <div>
          <a href="#">
            <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
            <div class="movie-picture">
              <img src="${IMG_URL+poster_path}" alt="${name}">
              <div class="overlay">
                <h4 class="${getColor(vote_average)}">${rating}</h4>
              </div>
            </div>
            <div class="movie-title">
              <h4>${truncatedTitle}</h4>
            </div>
            <div class="movie-info">
            
              <div class="movie-year" id="series-year">${year}·</div>
              <div class="seasons-episodes">
            <p>
              S${numberOfSeasons} E${numberOfEpisodes}
            </p>
            
            </div>
              <div class="type-series">Series</div>
            </div>
          </a>
        </div>
      `;
    } catch (error) {
      console.log('Error:', error);
      seriesEl.innerHTML = `
        <div>
          <a href="#">
            <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
            <div class="movie-picture">
              <img src="${IMG_URL+poster_path}" alt="${name}">
              <div class="overlay">
                <h4 class="${getColor(vote_average)}">${rating}</h4>
              </div>
            </div>
            <div class="movie-title">
              <h4>${truncatedTitle}</h4>
            </div>
            <div class="movie-info">
              <div class="movie-year">${year}</div>
              <div class="seasons-episodes">
              Seasons: N/A | Episodes: N/A
            </div>
              <div class="type-series">Series</div>
             
            </div>
          </a>
        </div>
      `;
    }

    seriesEl.addEventListener('click', () => {
      const selectedSeries = JSON.stringify(series);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('series', selectedSeries);
      const newUrl = 'playPage.html' + '?' + urlParams.toString();
      window.location.href = newUrl;
    });

    latestSeriesTray.appendChild(seriesEl);
  }
}

// End of Getting Latest series

// Start of Getting Series details for Episode count
async function fetchSeriesDetails(seriesId) {
  const apiKey = 'cee4c96c8b0db2fbb25f4450debdc8aa';
  const seriesUrl = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}`;

  try {
    const response = await fetch(seriesUrl);
    const data = await response.json();

    const numberOfSeasons = data.number_of_seasons;
    const numberOfEpisodes = data.number_of_episodes;

    return {
      numberOfSeasons,
      numberOfEpisodes
    };
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}
// End of Getting Series details for Episode count

getLatestSeries(LATEST_SERIES);








// Start of getting Genre list

const GENRES_API = 'https://api.themoviedb.org/3/genre/movie/list?api_key=cee4c96c8b0db2fbb25f4450debdc8aa&language=en-US';
const SERIES_GENRES_API = 'https://api.themoviedb.org/3/genre/tv/list?api_key=cee4c96c8b0db2fbb25f4450debdc8aa&language=en-US';

// Fetch movie genres from API
const fetchMovieGenres = fetch(GENRES_API).then(response => response.json());

// Fetch TV series genres from API
const fetchSeriesGenres = fetch(SERIES_GENRES_API).then(response => response.json());

// Combine movie and TV series genres when both requests are fulfilled
Promise.all([fetchMovieGenres, fetchSeriesGenres])
  .then(data => {
    const movieGenres = data[0].genres;
    const seriesGenres = data[1].genres;
    const genreDropdownMenu = document.getElementById('genre-dropdown-menu');

    createGenres(movieGenres, seriesGenres, genreDropdownMenu);
    const urlParams = new URLSearchParams(window.location.search);
    const genreId = urlParams.get('genre');
    const page = parseInt(urlParams.get('page')) || 1;
    loadMoviesByGenre(genreId, page);
  })
  .catch(error => {
    console.log('Error:', error);
  });

function createGenres(movieGenres, seriesGenres, dropdownMenu) {
  const combinedGenres = combineGenres(movieGenres, seriesGenres);

  for (let i = 0; i < combinedGenres.length; i++) {
    const genre = combinedGenres[i];

    const genreItem = document.createElement('a');
    genreItem.href = '#';
    genreItem.textContent = genre.name;
    genreItem.addEventListener('click', () => {
      const page = 1; // Reset page to 1 when selecting a new genre
      loadMoviesByGenre(genre.id, page);
      window.location.href = 'morePage.html?genre=' + genre.id; // Redirect to morePage.html with selected genre
    });

    dropdownMenu.appendChild(genreItem);
  }
}

function loadMoviesByGenre(genreId, page = 1) {
  // Construct the API URL with the selected genreId and page number
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=cee4c96c8b0db2fbb25f4450debdc8aa&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`;

  // Fetch movies based on the API URL
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      // Display movies in the more-tray
      displayMovies(movies);
      // Display pagination
      displayPagination(data.page, data.total_pages, genreId);
      // Add event listener to movie containers
      addMovieContainerListeners(movies);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayMovies(movies) {
  const moreTray = document.getElementById('more-tray');
  moreTray.innerHTML = '';

  let html = '';

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    if (i % 5 === 0) {
      html += '<div class="movie-row">';
    }

    html += `
      <a href="#">
        <div class="movie-container">
          <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
          <div class="movie-picture">
            <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'css/images/placeholder.png'}" alt="${movie.title}">
            <div class="movie-rating">${movie.vote_average}</div>
          </div>
          <div class="movie-title">
            <h4 class="title-text">${movie.title}</h4>
          </div>
          <div class="movie-info">
            <div class="movie-year">${movie.release_date ? movie.release_date.substring(0, 4) : ''}</div>
            <div class="movie-time">${movie.runtime ? `${movie.runtime} min` : ''}</div>
            <div class="type">Movie</div>
          </div>
          <div class="overview">${movie.overview}</div>
        </div>
      </a>
    `;

    if ((i + 1) % 5 === 0 || i === movies.length - 1) {
      html += '</div>';
    }
  }
  moreTray.innerHTML = html;
}

function addMovieContainerListeners(movies) {
  const movieContainers = document.getElementsByClassName('movie-container');

  for (let i = 0; i < movieContainers.length; i++) {
    const movieContainer = movieContainers[i];
    const movie = movies[i];

    movieContainer.addEventListener('click', () => {
      const selectedMovie = JSON.stringify(movie);

      if (window.location.pathname.includes('playPage.html')) {
        // If on playPage.html, set the URL parameter and reload the page
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('movie', selectedMovie);
        const newUrl = 'playPage.html' + '?' + urlParams.toString();
        window.location.href = newUrl;
      } else {
        // If on index.html, navigate to playPage.html with the URL parameter
        window.location.href = 'playPage.html' + '?movie=' + encodeURIComponent(selectedMovie);
      }
    });
  }
}

// Update the event listener for moreTray
series.addEventListener('click', () => {
  const selectedSeries = JSON.stringify(series);

  if (window.location.pathname.includes('playPage.html')) {
    // If on playPage.html, set the URL parameter and reload the page
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('series', selectedSeries);
    const newUrl = 'playPage.html' + '?' + urlParams.toString();
    window.location.href = newUrl;
  } else {
    // If on index.html, navigate to playPage.html with the URL parameter
    window.location.href = 'playPage.html' + '?series=' + encodeURIComponent(selectedSeries);
  }
});

function combineGenres(movieGenres, seriesGenres) {
  const combinedGenres = [];

  for (let i = 0; i < movieGenres.length; i++) {
    const movieGenre = movieGenres[i];
    const combinedGenre = {
      id: movieGenre.id,
      name: movieGenre.name,
      type: 'movie'
    };

    combinedGenres.push(combinedGenre);
  }

  for (let i = 0; i < seriesGenres.length; i++) {
    const seriesGenre = seriesGenres[i];
    const existingGenre = combinedGenres.find(genre => genre.id === seriesGenre.id);

    if (existingGenre) {
      existingGenre.type = 'both';
    } else {
      const combinedGenre = {
        id: seriesGenre.id,
        name: seriesGenre.name,
        type: 'tv'
      };

      combinedGenres.push(combinedGenre);
    }
  }

  return combinedGenres;
}

function displayPagination(currentPage, totalPages, genreId) {
  const pageContainer = document.getElementById('pageContainer');
  pageContainer.innerHTML = '';

  const maxPageButtons = 5; // Maximum number of page buttons to show
  const pageRange = Math.min(maxPageButtons, totalPages); // Adjust the page range if there are fewer pages than maxPageButtons
  const halfRange = Math.floor(pageRange / 2);

  let startPage = currentPage - halfRange;
  let endPage = currentPage + halfRange;

  if (totalPages <= maxPageButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageButtons;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxPageButtons + 1;
    }
  }

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';

  if (currentPage > 1) {
    const prevButton = createPaginationButton('Prev', currentPage - 1, genreId);
    paginationContainer.appendChild(prevButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPaginationButton(i, i, genreId, currentPage);
    paginationContainer.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = createPaginationButton('Next', currentPage + 1, genreId);
    paginationContainer.appendChild(nextButton);
  }

  pageContainer.appendChild(paginationContainer);
}

function createPaginationButton(text, page, genreId, currentPage) {
  const button = document.createElement('button');
  button.className = 'pagination-button';
  button.textContent = text;

  if (typeof page === 'number') {
    button.addEventListener('click', () => loadMoviesByGenre(genreId, page));

    if (page === currentPage) {
      button.classList.add('active');
    }
  }

  return button;
}

function loadMoviesFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const genreId = urlParams.get('genre');
  const page = parseInt(urlParams.get('page')) || 1;

  if (genreId && page) {
    loadMoviesByGenre(genreId, page);
  }
}

function updateURL(genreId, page) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('genre', genreId);
  urlParams.set('page', page);
  history.replaceState(null, null, '?' + urlParams.toString());
}

function loadMoviesByGenre(genreId, page = 1) {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=cee4c96c8b0db2fbb25f4450debdc8aa&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
      displayPagination(data.page, data.total_pages, genreId);
      addMovieContainerListeners(movies);
      updateURL(genreId, page);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayMovies(movies) {
  const moreTray = document.getElementById('more-tray');
  moreTray.innerHTML = '';

  let html = '';

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    if (i % 4 === 0) {
      html += '<div class="movie-row">';
    }

    html += `
      <a href="#">
        <div class="movie-container">
          <img class="playbuttons" src="css/images/playbutton.png" alt="playbutton">
          <div class="movie-picture">
            <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'css/images/placeholder.png'}" alt="${movie.title}">
            <div class="movie-rating">${movie.vote_average}</div>
          </div>
          <div class="movie-title">
            <h4 class="title-text">${movie.title}</h4>
          </div>
          <div class="movie-info">
            <div class="movie-year">${movie.release_date ? movie.release_date.substring(0, 4) : ''}</div>
            <div class="movie-time">${movie.runtime ? `${movie.runtime} min` : ''}</div>
            <div class="type">Movie</div>
          </div>
          <div class="overview">${movie.overview}</div>
        </div>
      </a>
    `;

    if ((i + 1) % 4 === 0 || i === movies.length - 1) {
      html += '</div>';
    }
  }
  moreTray.innerHTML = html;
}

// Call loadMoviesFromURL when the page is loaded to check for genre and page parameters in the URL
window.addEventListener('load', loadMoviesFromURL);


























const THE_KEY = 'cee4c96c8b0db2fbb25f4450debdc8aa'; // Replace with your TMDb API key

// Function to search for movies and series
async function searchMovieAndSeries(query) {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${THE_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies and series:', error);
    return [];
  }
}

// Function to display search suggestions
function displaySearchSuggestions(suggestions) {
  const MAX_SUGGESTIONS = 10;
  const searchSuggestions = document.getElementById('search-suggestions');
  searchSuggestions.innerHTML = '';

  if (suggestions.length === 0) {
    searchSuggestions.style.display = 'none';
    return;
  }

  const limitedSuggestions = suggestions.slice(0, MAX_SUGGESTIONS);

  limitedSuggestions.forEach((suggestion) => {
    if (!suggestion.poster_path) {
      return; // Skip suggestions without a poster image
    }

    const suggestionItem = document.createElement('li');
    const suggestionLink = document.createElement('a');
    suggestionLink.href = `playPage.html?movie=${encodeURIComponent(JSON.stringify(suggestion))}`;

    const suggestionImage = document.createElement('img');
    suggestionImage.src = `https://image.tmdb.org/t/p/w200/${suggestion.poster_path}`;
    suggestionImage.alt = suggestion.title || suggestion.name;
    suggestionImage.style.width = '30px'; // Adjust the width as needed
    suggestionImage.style.height = 'auto';
    suggestionImage.style.marginRight = '10px';

    const suggestionTitle = document.createElement('span');
    suggestionTitle.textContent = suggestion.title || suggestion.name;
    suggestionTitle.style.fontWeight = 'bold';
    suggestionTitle.style.textAlign = 'center';
    suggestionTitle.style.fontSize = '12px';
    suggestionTitle.style.whiteSpace = 'nowrap';
    suggestionTitle.style.overflow = 'hidden';
    suggestionTitle.style.textOverflow = 'ellipsis';
    suggestionTitle.style.maxWidth = '200px'; // Adjust the max width as needed

    if (suggestionTitle.textContent.length > 30) {
      suggestionTitle.textContent = suggestionTitle.textContent.slice(0, 30) + '...';
    }

    suggestionLink.appendChild(suggestionImage);
    suggestionLink.appendChild(suggestionTitle);
    suggestionItem.appendChild(suggestionLink);
    searchSuggestions.appendChild(suggestionItem);

    // Add click event listener to each suggestion
    suggestionItem.addEventListener('click', () => {
      window.location.href = suggestionLink.href;
    });
  });

  searchSuggestions.style.display = 'block';
}

// Function to handle search input
// Function to handle search input
async function handleSearchInput(event) {
  const searchInput = event.target.value.trim();
  const searchSuggestions = document.getElementById('search-suggestions');
  const movieContainer = document.getElementById('search-container');

  if (searchInput === '') {
    searchSuggestions.innerHTML = '';
    searchSuggestions.style.display = 'none';
    return;
  }

  const suggestions = await searchMovieAndSeries(searchInput);
  displaySearchSuggestions(suggestions);

  // Show the movie container when there are search suggestions
  movieContainer.style.display = 'block';
}


// Function to handle search submit
async function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search').value.trim();

  if (searchInput === '') {
    return;
  }

  // Encode the search query for the URL
  const encodedQuery = encodeURIComponent(searchInput);

  // Redirect to the searchResults.html with the search query as a parameter
  window.location.href = `searchResults.html?query=${encodedQuery}`;
}

// Add event listener to handle search input
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleSearchInput);

// Add event listener to handle search submit
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleSearchSubmit);

// Assuming you have a movieContainer element
const movieContainer = document.getElementById('search-container');

// Add a click event listener to the movieContainer
movieContainer.addEventListener('click', () => {
  // Code to be executed when the movieContainer is clicked
  console.log('Movie container clicked!');
  // You can perform any actions or logic here
});

// Function to initialize the movie page
function initializeMoviePage() {
  // Assuming you have HTML elements for the movie details
  const movieTitleElement = document.getElementById('movieTitle');
  const moviePosterElement = document.getElementById('moviePoster');
  const backdropPosterElement = document.getElementById('backdropPoster');
  const overviewElement = document.getElementById('overview');
  const releaseDateElement = document.getElementById('release_date');
  const ratingElement = document.getElementById('rating');

  // Get the selected movie from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const movieParam = urlParams.get('movie');
  const selectedMovie = JSON.parse(decodeURIComponent(movieParam));

  // Use the selected movie object to populate the page with its information
  if (selectedMovie) {
    const { title, poster_path, vote_average, release_date, backdrop_path, overview } = selectedMovie;
    movieTitleElement.textContent = title;
    moviePosterElement.src = `https://image.tmdb.org/t/p/w200/${poster_path}`;
    backdropPosterElement.src = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
    overviewElement.textContent = overview;
    releaseDateElement.textContent = `Release Date: ${release_date}`;
    ratingElement.textContent = `Rating: ${vote_average}`;

    // ...perform additional actions or logic with the selected movie...
  }
}

// Call the initializeMoviePage function when the playPage is loaded
initializeMoviePage();










