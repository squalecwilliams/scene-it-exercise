var movs

const OMDB_API_KEY =  'e68f7d70'


const saveToWatchlist = (ID) => {
    // let resultDataRetrieved = localStorage.getItem('resultData')
    // let resultDataJSON = JSON.parse(resultDataRetrieved)

    var movie = movs.find((currentMovie) => (currentMovie.imdbID === ID))
    console.log(movie)
    
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    
    console.log(watchlist)

    
    
    if(watchlist[0] === null){
        watchlist = []
    }

    watchlist.forEach((el, index) => {
        if(el.imdbID === movie.imdbID){
            watchlist.splice(index, 1)
        }
    })

    watchlist.push(movie)
    
    console.log('aaron: ', watchlist)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
    console.log(watchlist)

    document.getElementById('moviesContainer').innerHTML = buildMoviesHTML(movs)
}

const removeFromWatchlist = (ID) => {
    // let resultDataRetrieved = localStorage.getItem('resultData')
    // let resultDataJSON = JSON.parse(resultDataRetrieved)

    var movie = movs.find((currentMovie) => (currentMovie.imdbID === ID))
    console.log(movie)
    
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)

    watchlist.forEach(el => {
        if(el.imdbID === movie.imdbID){
            watchlist.splice(watchlist.indexOf(el), 1)
        }
    })

    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
    console.log(watchlist)

    document.getElementById('moviesContainer').innerHTML = buildMoviesHTML(movs)

}

 const buildMoviesHTML = (movies) => {

    const resultData = movies
    resultDataStored = JSON.stringify(resultData)
    localStorage.setItem('resultData', resultDataStored)

    
    var bool;
    
    const moviesHTML = movies.map(currentMovie => {
        bool = false
        let watchlistJSON = localStorage.getItem('watchlist')
        let watchlist = JSON.parse(watchlistJSON)
        console.log(watchlistJSON)
        console.log(watchlist)
        watchlist.filter(x => !null)
        console.log(watchlist)

        watchlist.forEach(el => {
            if(el !== null){
                //console.log('start compare', el.imdbID, currentMovie.imdbID)
                if(el.imdbID === currentMovie.imdbID){
                    //console.log('movies are equal')
                    bool = true
                }
            }
        })
        
        //console.log('end compare')
        
        if(bool){
            return `
                <div class='movie'>
                    <img src='${currentMovie.Poster}' style='height:444px;width:300px;'>
                    <div class='txt'>
                        <div class='actual-txt'>
                            <h5>${currentMovie.Title}</h5>
                            <h7 class='date'><b>${currentMovie.Year}</b></h7>
                        </div>
                    <button class='remove-button' type='button' onclick='removeFromWatchlist("${currentMovie.imdbID}")'>Remove!</button>
                    </div>
                </div>
            `
        } else{

            return `
            <div class='movie'>
                <img src='${currentMovie.Poster}' style='height:444px;width:300px;'>
                <div class='txt'>
                    <div class='actual-txt'>
                        <h5>${currentMovie.Title}</h5>
                        <h7 class='date'><b>${currentMovie.Year}</b></h7>
                    </div>
                <button class='add-button' type='button' onclick='saveToWatchlist("${currentMovie.imdbID}")'>Add!</button>
                </div>
            </div>
            `
        }
        

    })

    
    return moviesHTML.join('')
    
}




// function init(){

    
//     //document.getElementById('moviesContainer').innerHTML = buildMoviesHTML(movieData)
// }

// document.addEventListener('DOMContentLoaded', init)

function submitSearchForm (evt) {
    evt.preventDefault()

    let searchString = document.querySelector('.search-bar').value
    console.log(searchString)
    let URLEncodedSearchString = encodeURIComponent(searchString)
    console.log(URLEncodedSearchString)
    const queryString = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + '&s=' + URLEncodedSearchString
    console.log(queryString)
    axios.get(queryString).then(function (response) {
        console.log('here is the response from the OMDB API:')
        console.log(response.data)
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

        movs = response.data.Search
        moviesContainer.innerHTML = buildMoviesHTML(response.data.Search)

    })


    
}


document.getElementById("moviesSearchForm").addEventListener('submit', submitSearchForm)
