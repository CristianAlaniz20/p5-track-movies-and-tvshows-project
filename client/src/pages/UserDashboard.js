import React, { useContext } from "react";
import { ContentStatusContext } from "../contexts/ContentStatusContext";

function UserDashboard() {
    // watched and watchlist lists for movies and tv shows
    const { watchedMovies, watchlistMovies, watchedTVShows, watchlistTVShows } = useContext(ContentStatusContext)
    
    const emptyContentListMessage = "No content found for this list. Go to Search tab to add content."
    
    return (
        <div>
            <div>
                {/* Display watched movies */}
                <h2>Watched Movies</h2>
                {watchedMovies.length > 0 ? watchedMovies.map(movie => {
                    return <img src={movie.poster_url} alt={`${movie.title} poster`} key={movie.id} />
                }) : <p>{emptyContentListMessage}</p> }
            </div>
            <div>
                {/* Display watchlist movies */}
                <h2>Watchlist Movies</h2>
                {watchlistMovies.length > 0 ? watchlistMovies.map(movie => {
                    return <img src={movie.poster_url} alt={`${movie.title} poster`} key={movie.id} />
                }) : <p>{emptyContentListMessage}</p>}
            </div>
            <div>
                {/* Display watched tv shows */}
                <h2>Watched TV Shows</h2>
                {watchedTVShows.length > 0 ? watchedTVShows.map(show => {
                    return <img src={show.poster_url} alt={`${show.title} poster`} key={show.id} />
                }) : <p>{emptyContentListMessage}</p>}
            </div>
            <div>
                {/* Display watchlist tv shows */}
                <h2>Watchlist TV Shows</h2>
                {watchlistTVShows.length > 0 ? watchlistTVShows.map(show => {
                    return <img src={show.poster_url} alt={`${show.title} poster`} key={show.id} />
                }) : <p>{emptyContentListMessage}</p>}
            </div>
        </div>
    )
}

export default UserDashboard