const API_KEY = 'api_key=cee4c96c8b0db2fbb25f4450debdc8aa';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';




async function searchSuggestion(query){
    const QUERY_URL = BASE_URL + '/search/multi?'+ API_KEY + `&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
    try {
        const response = await fetch(QUERY_URL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movies and series:', error);
        return [];
    }
}

function displaySearchSuggestions(suggestions){
    const MAX_SUGGESTIONS = 6;
    const searchSuggestions = document.getElementById('searchSuggestions');
    searchSuggestions.innerHTML = '';

    if(suggestions.length === 0){
        searchSuggestions.style.display = 'none';
        return;
    }

    const limitedSuggestions = suggestions.slice(0, MAX_SUGGESTIONS);

    limitedSuggestions.forEach((suggestion) => {
        if(!suggestion.poster_path){
            return;
        }
        const suggestionItem = document.createElement('li');
        const suggestionLink = document.createElement('a');
        const suggestionImage = document.createElement('img');
        suggestionImage.src = `https://image.tmdb.org/t/p/w200/${suggestion.poster_path}`;
        suggestionImage.alt = suggestion.title || suggestion.name;
        suggestionImage.style.width = '40px'; // Adjust the width as needed
        suggestionImage.style.height = '100%';
        suggestionImage.style.marginRight = '10px';

        const suggestionTitle = document.createElement('span');
        suggestionTitle.textContent = suggestion.title || suggestion.name;
        suggestionTitle.style.fontWeight = 'bold';
        suggestionTitle.style.textAlign = 'center';
        suggestionTitle.style.fontSize = '15px';
        suggestionTitle.style.whiteSpace = 'nowrap';
        suggestionTitle.style.overflow = 'hidden';
        suggestionTitle.style.textOverflow = 'ellipsis';
        suggestionTitle.style.Width = '99%';

        if (suggestionTitle.textContent.length > 30) {
            suggestionTitle.textContent = suggestionTitle.textContent.slice(0, 30) + '...';
        }
      
        suggestionLink.appendChild(suggestionImage);
        suggestionLink.appendChild(suggestionTitle);
        suggestionItem.appendChild(suggestionLink);
        searchSuggestions.appendChild(suggestionItem);
    


    });
    searchSuggestions.style.display = 'block';
}  


async function handleSearchInput(event){
    const searchInput = event.target.value.trim();
    const searchSuggestions = document.getElementById('searchSuggestions');
    const suggestionContainer = document.querySelector('.searchSuggestionContainer');

    if (searchInput === ''){
        searchSuggestions.innerHTML = '';
        searchSuggestions.style.display = 'none';
        return;
    }
    const suggestions = await searchSuggestion(searchInput);
    displaySearchSuggestions(suggestions);

    suggestionContainer.style.display = 'block';
}

//Search Input Event Listener
const searchInput = document.querySelector('.search');
searchInput.addEventListener('input', handleSearchInput);












// Function to get query parameter from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get movieId or seriesId from the URL
const movieId = getQueryParam('movieId');
const seriesId = getQueryParam('seriesId');

// Use either movieId or seriesId to fetch details
if (movieId) {
    // Fetch movie details using movieId
    fetchMovieDetails(movieId);
} else if (seriesId) {
    // Fetch series details using seriesId
    fetchSeriesDetails(seriesId);
} else {
    console.error('No movieId or seriesId found in the URL');
}

// Function to fetch and display movie details
async function fetchMovieDetails(movieId) {
    const MOVIE_DETAILS_URL = BASE_URL + `/movie/${movieId}?` + API_KEY;

    try {
        const response = await fetch(MOVIE_DETAILS_URL);
        const data = await response.json();
        const details = await extractDetails(data);
        displayDetails(details);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Function to fetch and display series details
async function fetchSeriesDetails(seriesId) {
    const SERIES_DETAILS_URL = BASE_URL + `/tv/${seriesId}?` + API_KEY;

    try {
        const response = await fetch(SERIES_DETAILS_URL);
        const data = await response.json();
        const details = await extractDetails(data);
        displayDetails(details);
    } catch (error) {
        console.error('Error fetching series details:', error);
    }
}

async function extractDetails(data) {
    const { title, name, poster_path, vote_average, release_date, first_air_date, overview, id, media_type, genres } = data;

    // Check if poster_path is defined before building the image URL
    const posterUrl = poster_path ? IMG_URL + poster_path : 'path_to_default_image';

    // Check if vote_average is defined before using toFixed
    const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

    let detailsType;
    let releaseDate;

    if (media_type === 'movie') {
        detailsType = 'movie';
        releaseDate = release_date ? formatDate(release_date) : 'N/A';
    } else if (media_type === 'tv') {
        detailsType = 'series';
        releaseDate = first_air_date ? formatDate(first_air_date) : 'N/A';
    } else {
        detailsType = 'N/A';
        releaseDate = 'N/A';
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Log information for debugging
    console.log('Release Date:', release_date);
    console.log('First Air Date:', first_air_date);
    console.log('Formatted Release Date:', releaseDate);

    // Format the genres
    const formattedGenres = genres ? genres.map(genre => genre.name).join(' | ') : 'N/A';

    const details = {
        title: title || name || 'N/A',  // Use title for movies, name for series
        posterUrl,
        rating,
        releaseDate,
        overview,
        id,
        type: detailsType,
        category: formattedGenres
    };

    return details;
}






// Function to display details on the page

function displayDetails(details) {
    // Get HTML elements
    const imgContainer = document.querySelector('.imgContainer img');
    const titleContainer = document.querySelector('.titleContainer h2');
    const ratingContainer = document.querySelector('.ratingContainer h4');
    const releaseDateContainer = document.querySelector('.releaseDateContainer h4');
    const categoryContainer = document.querySelector('.categoryCcntainer h4');
    const descriptionContainer = document.querySelector('.descriptionContainer');

    // Update HTML content with the details
    // Update HTML content with the details
    imgContainer.src = details.posterUrl;
    titleContainer.textContent = details.title;
    ratingContainer.innerHTML = `<i class="fa-solid fa-ticket"></i> ${details.rating}`;
    releaseDateContainer.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${details.releaseDate}`;
    categoryContainer.innerHTML = `<i class="fa-solid fa-list"></i> ${details.category}`;
    descriptionContainer.textContent = details.overview;

    // Log details type to console
    console.log(`Details type: ${details.type}`);
}


// Call the fetchMovieOrSeriesDetails function when the page loads
document.addEventListener('DOMContentLoaded', fetchMovieOrSeriesDetails);
