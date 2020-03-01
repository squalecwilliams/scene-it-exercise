# Scene It App
### Part 2: Creating a Watchlist with localStorage

## Your task :

If you've finished part 1, your Scene It app should be showing movies to the
screen when you enter data into the search bar. Your task for part 2 is to
implement a feature that allows users to save movies to their "watch list".

When you're done, users will be able to press the "add" button on a selected
movie, and then later click on "Go to my watchlist" to see the movies that
they've saved.

Since we're not actually using the OMDB API until part 3, for now there's a file
called data.js that contains some movie data. The search bar will "work", but it
will always show the list of movies in data.js, no matter what you enter into
the search bar.

## Let's do it!
### Step 1 - Set up a click listener on the movies

Now that there are movies showing up underneath the search bar, we can make them
clickable. Just like with the to-do list app, we'll have to attach a click
listener to the "movies-container" div.

1. Revisit your `renderMovies()` function
1. Look in your template literal strings for wherever you're rendering an "add movie" `<button>`  tag.
1. Give these buttons a `onclick` attribute that triggers a function called `saveToWatchlist()`
  - Inject the IMDB id of the movie as the parameter passed in to `saveToWatchlist()` using `${   }` notation
1. Elsewhere in your "document ready" block, define the function `saveToWatchlist(imdbID)`

### Step 2- Implement saveToWatchlist

At this point, the user should be able to trigger our `saveToWatchlist` function
by clicking on the different "Add movie" buttons on the page. For this next
step, we'll be making use of the `localStorage` object so that we can save the
list of movies that the user wants to watch. Later on in step 4, we'll create a
new watchlist.html file where the user can see all the movies they've saved.

1. `saveToWatchlist` has a parameter called imdbID which will tell us which
movie the user clicked on. We'll use it to sift through movieData.js to find the
relevant movie information.
1. In `saveToWatchlist`, create a variable called `movie` which will contain the
rest of this movie's data.
1. We'll use the Array prototype method `find()` to pull the rest of the movie
data from data.js:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
  - Create the variable movie with `var movie`
  - Set it equal to `movieData.find()`
  - Give the find function an anonymous function that takes `currentMovie` as a parameter
  - Have this anonymous function return `currentMovie.imdbID == imdbID`
  - In the end, you'll have
  ```js
    var movie = movieData.find(function(currentMovie){  
      return currentMovie.imdbID == imdbID;
    });
  ```

Whew! We have only a little bit more work to do! Now that the variable `movie`
has the movie information that we want in our watchlist, we need to pull in the
watchlist from `localStorage`, add it to the watchlist, and then save the
watchlist back to `localStorage`.

1. In the next line (still inside `saveToWatchlist`), pull down the watchlist from local storage

  ```js
  var watchlistJSON = localStorage.getItem('watchlist');
  ```

1. Parse the watchlist with JSON
  ```js
  var watchlist = JSON.parse(watchlistJSON);
  ```
1. Use an if-statement to check if the watchlist is `null`
  - If it is `null`, set watchlist to an empty array
  - Try this on your own! Call me over if you're having trouble with this one.
1. Push movie into the watchlist
  ```js
  watchlist.push(movie);
  ```
1. Turn the watchlist back into JSON
  ```js
  watchlistJSON = JSON.stringify(watchlist);
  ```
1. Save the JSONified watchlist back into local storage
  ```js
  localStorage.setItem('watchlist', watchlistJSON);
  ```

And that's it! Now, when you click the add button for any given movie, you
should see it's data saved into local storage under the key "watchlist"!

### Step 3- Create the "My Watchlist" page

Now that we know what movies the user wants to watch, we can give them an
interface to see what movies they've saved.

1. Somewhere in index.html, add a link that says "Go to my watchlist"
  - Have that link navigate to "/watchlist.html"
1. Create a new watchlist.html file
1. Complete this html in a similar style to index.html
  - Have the "Scene It" title at the top
  - Don't include a search bar this time
  - Have a "movies-container" `<div>` to hold the list of saved movies
1. Write a watchlist.js file that does the following:
  - When the page loads, pull the watchlist from `localStorage`
  ```js
  localStorage.getItem('watchlist');
  ```
  - Renders each movie to "movies-container", just like in index.js
  - You can have the movies render exactly like they did in index.js, or you can switch it up!

You'll find that the above ^^ is almost identical to what you did in Part 1! The
only difference is that instead of showing a list of movies from data.js,
you'll be showing a list of movies from `localStorage.getItem('watchlist')`;
