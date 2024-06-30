document.addEventListener('DOMContentLoaded', function(){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    const API_KEY = 'api_key=cee4c96c8b0db2fbb25f4450debdc8aa';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const RECOMMENDED = '/movie/678512/recommendations?';
    const RECOMMENDED_SERIES = '/tv/84958/recommendations?';
    const UPCOMING_MOVIES = `/discover/movie?sort_by=primary_release_date.desc&`;
    const UPDATED_SERIES = '/tv/popular?language=en-US&page=1&';
    //const API_URL = BASE_URL + '/movie/620705/recommendations?&' + API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const LATEST = '/movie/now_playing?&';
    const LATEST_URL = BASE_URL + LATEST + API_KEY;
    const RECOMMENDED_URL = BASE_URL + RECOMMENDED + API_KEY;
    const RECOMMENDED_SERIES_URL = BASE_URL + RECOMMENDED_SERIES + API_KEY;
    const UPCOMING_URL = BASE_URL + UPCOMING_MOVIES + API_KEY;
    const UPDATED_SERIES_URL = BASE_URL + UPDATED_SERIES + API_KEY;
    
    //const bigShowcaseContainer = document.querySelector('.bigShowcaseContainer');

    //GETTING LATEST MOVIES 
    function getLatestMovies(latest_url){
        fetch(latest_url)
        .then(res => res.json())
        .then(data =>{
            console.log(data.results);
            latestMovies(data.results);
        })
        .catch(error => {
            console.log('Error', error)
        });
    }

    getLatestMovies(LATEST_URL);//Function Call
    
    async function latestMovies(data){
        let index = 0;

        const bigShowcaseContainer = document.querySelector('.bigShowcaseContainer');
        const lastestMovie = data[index];
        const { title, poster_path, vote_average, release_date, overview, id} = lastestMovie;

        while(!poster_path){
            index++;
        }

        const truncatedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
        const year = release_date.substring(0, 4);
        const rating = vote_average.toFixed(1);

        try{
           const runtime =  await fetchMovieRuntime(id);
           const category = await fetchMovieCategory(id);
           bigShowcaseContainer.innerHTML = `
                    <div id="quality1">
                    <h5>HD</h5>
                </div>
                <div class="posterContainer1">
                    <img src="${IMG_URL+poster_path}" alt="${title}" id="poster-image">
                </div>
                <div id="genre1">
                    <h5>${category}</h5>
                </div>
                <div class="movieDetails1">
                    <div class="titleContainer1">
                            <h2>${truncatedTitle}</h2>
                    </div>
                    <div class="subDetails1">
                        <div id="rating1">
                            <h5><i class="fa-solid fa-ticket"></i> ${rating}</h5>
                        </div>
                        <div id="releaseDate1">
                            <h5><i class="fa-solid fa-calendar-days"></i> ${year} </h5>
                        </div>
                        <div id="runtime1">
                            <h5><i class="fa-solid fa-clock"></i> ${runtime}min</h5>
                        </div>
                    </div>
                </div>
                <div id="description1">
                    <h5>${overview} </div>
           `;
             // Showcase 1 Container
        while (!data[index]?.poster_path) {
            index++;
        }

        const showcase1Container = document.querySelector('.showCase1');
        const showcase1Movie = data[index+1];
        const { title: showcase1Title, poster_path: showcase1PosterPath, vote_average: showcase1VoteAverage, release_date: showcase1ReleaseDate, id: showcase1Id } = showcase1Movie;

        const showcase1TruncatedTitle = showcase1Title.length > 30 ? showcase1Title.substring(0, 30) + '...' : showcase1Title;
        const showcase1Year = showcase1ReleaseDate.substring(0, 4);
        const showcase1Rating = showcase1VoteAverage.toFixed(1);
        const showcase1Runtime = await fetchMovieRuntime(showcase1Id);
        const showcase1Category = await fetchMovieCategory(showcase1Id);

        showcase1Container.innerHTML = `
            <div id="posterContainer2">
                <img src="${IMG_URL + showcase1PosterPath}" alt="${showcase1Title}" id="poster-image2">
                <div id="quality2">
                    <h5>HD</h5>
                </div>
            </div>
            <div class="movieDetails2">
                <div class="titleContainer2">
                    <h2>${showcase1TruncatedTitle}</h2>
                </div>
                <div class="subDetails2">
                    <div id="rating2">
                        <h5><i class="fa-solid fa-ticket"></i> ${showcase1Rating}</h5>
                    </div>
                    <div id="releaseDate2">
                        <h5><i class="fa-solid fa-calendar-days"></i> ${showcase1Year}</h5>
                    </div>
                    <div id="runtime2">
                        <h5><i class="fa-solid fa-clock"></i> ${showcase1Runtime}min</h5>
                    </div>
                </div>
                <div id="genre2">
                    <h5>${showcase1Category}</h5>
                </div>
            </div>
        `;
            // Showcase 2 Container
        while (!data[index]?.poster_path) {
            index++;
        }

        const showcase2Container = document.querySelector('.showCase2');
        const showcase2Movie = data[index+2];
        const { title: showcase2Title, poster_path: showcase2PosterPath, vote_average: showcase2VoteAverage, release_date: showcase2ReleaseDate, id: showcase2Id } = showcase2Movie;

        const showcase2TruncatedTitle = showcase2Title.length > 30 ? showcase2Title.substring(0, 30) + '...' : showcase2Title;
        const showcase2Year = showcase2ReleaseDate.substring(0, 4);
        const showcase2Rating = showcase2VoteAverage.toFixed(1);
        const showcase2Runtime = await fetchMovieRuntime(showcase2Id);
        const showcase2Category = await fetchMovieCategory(showcase2Id);

        showcase2Container.innerHTML = `
            <div id="posterContainer2">
                <img src="${IMG_URL + showcase2PosterPath}" alt="${showcase2Title}" id="poster-image2">
                <div id="quality2">
                    <h5>HD</h5>
                </div>
            </div>
            <div class="movieDetails2">
                <div class="titleContainer2">
                    <h2>${showcase2TruncatedTitle}</h2>
                </div>
                <div class="subDetails2">
                    <div id="rating2">
                        <h5><i class="fa-solid fa-ticket"></i> ${showcase2Rating}</h5>
                    </div>
                    <div id="releaseDate2">
                        <h5><i class="fa-solid fa-calendar-days"></i> ${showcase2Year}</h5>
                    </div>
                    <div id="runtime2">
                        <h5><i class="fa-solid fa-clock"></i> ${showcase2Runtime}min</h5>
                    </div>
                </div>
                <div id="genre2">
                    <h5>${showcase2Category}</h5>
                </div>
            </div>
        `;


            // Showcase 3 Container
        while (!data[index]?.poster_path) {
            index++;
        }

        const showcase3Container = document.querySelector('.showCase3');
        const showcase3Movie = data[index+3];
        const { title: showcase3Title, poster_path: showcase3PosterPath, vote_average: showcase3VoteAverage, release_date: showcase3ReleaseDate, id: showcase3Id } = showcase3Movie;

        const showcase3TruncatedTitle = showcase3Title.length > 30 ? showcase3Title.substring(0, 30) + '...' : showcase3Title;
        const showcase3Year = showcase3ReleaseDate.substring(0, 4);
        const showcase3Rating = showcase3VoteAverage.toFixed(1);
        const showcase3Runtime = await fetchMovieRuntime(showcase3Id);
        const showcase3Category = await fetchMovieCategory(showcase3Id);

        showcase3Container.innerHTML = `
            <div id="posterContainer2">
                <img src="${IMG_URL + showcase3PosterPath}" alt="${showcase3Title}" id="poster-image2">
                <div id="quality2">
                    <h5>HD</h5>
                </div>
            </div>
            <div class="movieDetails2">
                <div class="titleContainer2">
                    <h2>${showcase3TruncatedTitle}</h2>
                </div>
                <div class="subDetails2">
                    <div id="rating2">
                        <h5><i class="fa-solid fa-ticket"></i> ${showcase3Rating}</h5>
                    </div>
                    <div id="releaseDate2">
                        <h5><i class="fa-solid fa-calendar-days"></i> ${showcase3Year}</h5>
                    </div>
                    <div id="runtime2">
                        <h5><i class="fa-solid fa-clock"></i> ${showcase3Runtime}min</h5>
                    </div>
                </div>
                <div id="genre2">
                    <h5>${showcase3Category}</h5>
                </div>
            </div>
        `;


        }
        catch{
            console.log('Error:', error);
            index++; 
        }

   
    }

    async function fetchMovieRuntime(movieId){
        const MOVIE_URL = BASE_URL + `/movie/${movieId}?` + API_KEY;
        try{
            const response = await fetch(MOVIE_URL);
            const data = await response.json();
            return data.runtime
        }
        catch(error){
            console.log('Error',error);
            return 'N/A';
        }
    }

    async function fetchMovieCategory(movieId) {
        const MOVIE_URL = BASE_URL + `/movie/${movieId}?` + API_KEY;
    
        try {
            const response = await fetch(MOVIE_URL);
            const data = await response.json();
            if (data.genres && data.genres.length > 0) {
                const categories = data.genres.map(genre => genre.name).join(' | ');
                return categories;
            } else {
                return 'N/A';
            }
        } catch (error) {
            console.log('Error', error);
            return 'N/A';
        }
    }
    
   
    

  
    function getRecommendedMovies(recommended_url) {
        fetch(recommended_url)
            .then(res => res.json())
            .then(data => {
                console.log(data.results);
                recommendedMovies(data.results);
            })
            .catch(error => {
                console.log('Error', error);
            });
    }
    
    async function recommendedMovies(data) {
        let count = 0;
        let index = 0;
        const movieContainer = document.querySelector('.movieContainer');
    
        while (count < 25 && index < data.length) {
            const recommendedMovie = data[index];
    
            // Check if recommendedMovie is undefined
            if (!recommendedMovie) {
                console.error('Recommended movie not found at index:', index);
                return;
            }
    
            const { title, poster_path, vote_average, release_date, overview, id } = recommendedMovie;
    
            if (!poster_path) {
                index++;
                continue;
            }
    
            const truncatedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
            const year = release_date.substring(0, 4);
    
            try {
                const movieRuntime = await fetchMovieRuntime(id);
    
                // Create HTML content for the movie item
                const movieItemHTML = `
                    <div class="movieItem" id ="movie" data-movie-id="${id}">
                        <div class="movieImg">
                            <img src="${IMG_URL + poster_path}" alt="movieIMG">
                        </div>
                        <div class="movieTitle">
                            <h2>${truncatedTitle}</h2>
                        </div>
                        <hr>
                        <div class="movieDetails3">
                            <div class="year">
                                <p>${year}</p>
                            </div>
                            <div class="runtime3">
                                <p>${movieRuntime}min</p>
                            </div>
                            <div class="type">
                                <p>Movie</p>
                            </div>
                        </div>
                    </div>
                `;
    
                // Append the HTML content to the container
                movieContainer.innerHTML += movieItemHTML;
    
                count++;
                index++;
            } catch (error) {
                console.log('Error fetching movie runtime:', error);
            }
        }
    
        // Add a single click event listener to the movie container using event delegation
        movieContainer.addEventListener('click', (event) => {
            const clickedMovie = event.target.closest('.movieItem');
    
            if (clickedMovie) {
                const movieId = clickedMovie.dataset.movieId;
                window.location.assign(`playPage.html?movieId=${movieId}`);
            }
        });
    }
    
    // Call the function with your recommended URL
    getRecommendedMovies(RECOMMENDED_URL);
    


      function getRecommendedSeries(recommended_series_url){
        fetch(recommended_series_url)
        .then(res => res.json())
        .then(data =>{
            console.log(data.results);
            recommendedSeries(data.results);
        })
        .catch(error => {
            console.log('Error', error)
        });
    }
    
// Add a new function to fetch series details including the number of seasons and episodes
async function fetchSeriesDetails(seriesId) {
    const SERIES_DETAILS_URL = BASE_URL + `/tv/${seriesId}?` + API_KEY;

    try {
        const response = await fetch(SERIES_DETAILS_URL);
        const data = await response.json();
        const { number_of_seasons, last_episode_to_air } = data;

        return {
            numberOfSeasons: number_of_seasons,
            latestSeason: last_episode_to_air ? last_episode_to_air.season_number : 'N/A',
            latestEpisode: last_episode_to_air ? last_episode_to_air.episode_number : 'N/A'
        };
    } catch (error) {
        console.log('Error fetching series details:', error);
        return {
            numberOfSeasons: 'N/A',
            latestSeason: 'N/A',
            latestEpisode: 'N/A'
        };
    }
}

// Add event listener to series container
const seriesContainer = document.querySelector('.seriesContainer');

seriesContainer.addEventListener('click', (event) => {
    const clickedSeries = event.target.closest('.seriesItem');

    if (clickedSeries) {
        const seriesId = clickedSeries.dataset.seriesId;
        window.location.assign(`playPage.html?seriesId=${seriesId}`);
    }
});

async function recommendedSeries(data) {
    let count = 0;
    let index = 0;
    const seriesContainer = document.querySelector('.seriesContainer');

    while (count < 25 && index < data.length) {
        const recommendedSeries = data[index];

        if (!recommendedSeries || !recommendedSeries.name || !recommendedSeries.poster_path) {
            index++;
            continue;
        }

        const { name, poster_path, vote_average, first_air_date, id } = recommendedSeries;

        if (!poster_path) {
            index++;
            continue;
        }

        const truncatedName = name.length > 30 ? name.substring(0, 30) + '...' : name;
        const year = first_air_date.substring(0, 4);

        try {
            // Fetch series details inside the loop
            const seriesDetails = await fetchSeriesDetails(id);

            // Create HTML content for the series item
            const seriesItemHTML = `
                <div class="seriesItem" id="series" data-series-id="${id}">
                    <div class="seriesImg">
                        <img src="${IMG_URL + poster_path}" alt="seriesIMG">
                    </div>
                    <div class="seriesTitle">
                        <h2>${truncatedName}</h2>
                    </div>
                    <hr>
                    <div class="seriesDetails3">
                        <div class="year">
                            <p>${year} &centerdot;</p>
                        </div>
                        <div class="runtime3">
                            <p>S${seriesDetails.latestSeason}E${seriesDetails.latestEpisode}</p>
                        </div>
                        <div class="type">
                            <p>Series</p>
                        </div>
                    </div>
                </div>
            `;

            // Append the HTML content to the container
            seriesContainer.innerHTML += seriesItemHTML;

            count++;
            index++;
        } catch (error) {
            console.log('Error fetching series details:', error);
            index++; // Increment index even in case of an error to avoid an infinite loop
        }
    }
}

// Use the updated function to fetch recommended series
getRecommendedSeries(RECOMMENDED_SERIES_URL);

    




        var movieButton = document.getElementById('movieButton');
        movieButton.classList.add('active');
        document.getElementById('seriesButton').addEventListener('click', function () {
            var movieButton = document.getElementById('movieButton');
            var seriesButton = document.getElementById('seriesButton');
            var movieContainer = document.querySelector('.movieContainer');
            var seriesContainer = document.querySelector('.seriesContainer');
        
            movieButton.classList.remove('active');
            seriesButton.classList.add('active');
            movieContainer.style.display = "none";
            seriesContainer.style.display = "flex";
        });
        
        document.getElementById('movieButton').addEventListener('click', function () {
            var seriesButton = document.getElementById('seriesButton');
            var movieButton = document.getElementById('movieButton');
            var movieContainer = document.querySelector('.movieContainer');
            var seriesContainer = document.querySelector('.seriesContainer');
        
            seriesButton.classList.remove('active');
            movieButton.classList.add('active');
            seriesContainer.style.display = "none";
            movieContainer.style.display = "flex";
        });
        
        
        function getUpcomingMovies(upcoming_url){
            fetch(upcoming_url)
            .then(res => res.json())
            .then(data =>{
                console.log(data.results);
                upcomingMovies(data.results);
            })
            .catch(error => {
                console.log('Error', error)
            });
        }
        async function upcomingMovies(data) {
            let count = 0;
            let index = 0;
            const movieContainer = document.querySelector('.upcomingMoviesContainer');
        
            while (count < 10 && index < data.length) {
                const upcomingMovie = data[index];
        
                if (!upcomingMovie || !upcomingMovie.title || !upcomingMovie.poster_path || !upcomingMovie.release_date) {
                    index++;
                    continue;
                }
        
                const { title, poster_path, release_date, id } = upcomingMovie;
        
                const truncatedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
                const year = release_date.substring(0, 4);
        
                try {
                    // const movieRuntime = await fetchMovieRuntime(id);
        
                    // Create HTML content for the movie item
                    const movieItemHTML = `
                        <div id="upcomingMovie">
                            <div class="posterContainer3">
                                <img src="${IMG_URL + poster_path}" alt="poster" >
                            </div>
                            <div class="movieDetails4">
                                <div class="titleContainer3">
                                    <h2>${truncatedTitle}</h2>
                                </div>
                                <div class="releaseDateContainer">
                                    <p>Release: ${release_date}</p>
                                </div>
                            </div> 
                        </div>
                    `;
        
                    // Append the HTML content to the container
                    movieContainer.innerHTML += movieItemHTML;
        
                    count++;
                    index++;
                } catch (error) {
                    console.log('Error fetching movie runtime:', error);
                }
            }
        }
        
          getUpcomingMovies(UPCOMING_URL);



          function getUpdatedSeries(update_url){
            fetch(update_url)
            .then(res => res.json())
            .then(data =>{
                console.log(data.results);
                updatedSeries(data.results);
            })
            .catch(error => {
                console.log('Error', error)
            });
        }


async function updatedSeries(data) {
    let count = 0;
    let index = 0;
    const seriesContainer = document.querySelector('.updateSeriesContainer');

    while (count < 10 && index < data.length) {
        const updatedSeries = data[index];

        if (!updatedSeries || !updatedSeries.name || !updatedSeries.poster_path) {
            index++;
            continue;
        }

        const { name, poster_path, id } = updatedSeries;

        if (!poster_path) {
            index++;
            continue;
        }

        const truncatedName = name.length > 30 ? name.substring(0, 30) + '...' : name;

        try {
            // Fetch series details inside the loop
            const seriesDetails = await fetchSeriesDetails(id);

            // Create HTML content for the series item
            const seriesItemHTML = `
                <div id="updatedSeries">
                    <div class="posterContainer3">
                        <img src="${IMG_URL + poster_path}" alt="poster">
                    </div>
                    <div class="seriesDetails">
                        <div class="titleContainer3">
                            <h2>${truncatedName}</h2>
                        </div>
                        <div class="episodeContainer">
                            <p>S${seriesDetails.latestSeason} E${seriesDetails.latestEpisode}</p>
                        </div>
                    </div> 
                </div>
            `;

            // Append the HTML content to the container
            seriesContainer.innerHTML += seriesItemHTML;

            count++;
            index++;
        } catch (error) {
            console.log('Error fetching series details:', error);
            index++; // Increment index even in case of an error to avoid an infinite loop
        }
    }
}

// Use the updated function to fetch updated series
getUpdatedSeries(UPDATED_SERIES_URL);




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


//end of search




        





});



