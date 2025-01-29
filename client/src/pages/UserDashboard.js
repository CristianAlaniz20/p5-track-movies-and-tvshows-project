import React, { useContext } from "react";
import { ContentStatusContext } from "../contexts/ContentStatusContext";
import ListMovies from "../components/ListMovies";
import ListTVShows from "../components/ListTVShows";

function UserDashboard() {
    // watched and watchlist lists for movies and tv shows from ContentStatusContext
    const { watchedMovies, watchlistMovies, watchedTVShows, watchlistTVShows } = useContext(ContentStatusContext)
    // empty content list message
    const emptyContentListMessage = "No content found for this list. Go to Search tab to add content."
    
    return (
        <div>
            <div>
                {/* Display watched movies */}
                <h2>Watched Movies</h2>
                <ListMovies movieList={watchedMovies} emptyContentListMessage={emptyContentListMessage} />
            </div>

            <div>
                {/* Display watchlist movies */}
                <h2>Watchlist Movies</h2>
                <ListMovies movieList={watchlistMovies} emptyContentListMessage={emptyContentListMessage} />
            </div>
            
            <div>
                {/* Display watched tv shows */}
                <h2>Watched TV Shows</h2>
                <ListTVShows tvShowList={watchedTVShows} emptyContentListMessage={emptyContentListMessage} />
            </div>

            <div>
                {/* Display watchlist tv shows */}
                <h2>Watchlist TV Shows</h2>
                <ListTVShows tvShowList={watchlistTVShows} emptyContentListMessage={emptyContentListMessage} />
            </div>
        </div>
    )
}

export default UserDashboard