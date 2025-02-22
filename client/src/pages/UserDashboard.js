import React from "react";
import ListMovies from "../components/ListMovies";
import ListTVShows from "../components/ListTVShows";
import useContentStatus from "../contexts/useContentStatus";

function UserDashboard() {
    // watched and watchlist lists for movies and tv shows from ContentStatusContext
    const { watchedMovies, watchlistMovies, watchedTVShows, watchlistTVShows } = useContentStatus()
    
    return (
        <div>
            <div>
                {/* Display watched movies */}
                <h2>Watched Movies</h2>
                <ListMovies movieList={watchedMovies} />
            </div>

            <div>
                {/* Display watchlist movies */}
                <h2>Watchlist Movies</h2>
                <ListMovies movieList={watchlistMovies} />
            </div>
            
            <div>
                {/* Display watched tv shows */}
                <h2>Watched TV Shows</h2>
                <ListTVShows tvShowList={watchedTVShows} />
            </div>

            <div>
                {/* Display watchlist tv shows */}
                <h2>Watchlist TV Shows</h2>
                <ListTVShows tvShowList={watchlistTVShows} />
            </div>
        </div>
    )
}

export default UserDashboard