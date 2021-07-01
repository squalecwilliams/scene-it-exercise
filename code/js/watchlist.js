const OMDB_API_KEY =  'e68f7d70'



$(document).ready( function () {

    var items = localStorage.getItem('watchlist')
    var itemsToJSON = JSON.parse(items)

    console.log(itemsToJSON)


    function buildWatchlistHTML (watchlist) {
        
        const watchlistHTML = watchlist.map(currentMovie => {
            
            
            
            
            $('#watchlistContainer').append( `
            <div class='movie'>
                <img src='${currentMovie.Poster}' style='height:444px;width:300px;'>
                <div class='txt'>
                    <div class='actual-txt'>
                        <h5>${currentMovie.Title}</h5>
                        <h7 class='date'><b>${currentMovie.Year}</b></h7>
                    </div>
                </div>
            </div>
            `)

            return currentMovie
        })
    
        
    }

    buildWatchlistHTML(itemsToJSON)
})


