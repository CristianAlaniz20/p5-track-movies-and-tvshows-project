import React, { useState, createContext, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const ContentStatusContext = createContext()

export const ContentStatusProvider = ({ children }) => {
    const [watchedMovies, setWatchedMovies] =  useState([]) // watched movies state
    const [watchlistMovies, setWatchlistMovies] = useState([]) // watchlist movies state
    const [watchedTVShows, setWatchedTVShows] = useState([]) // watched tv shows state
    const [watchlistTVShows, setWatchlistTVShows] = useState([]) // watchlist tv shows state
    const { user } = useContext(UserContext) // user state from UserContext

    useEffect(() => {
        if (user) {
          // Perform the operations only when user data is available
            user.movies.forEach(movie => {
                // get most recent event via event.created_at attribute
                const mostRecentEvent = movie.movie_watch_events.reduce((latest, current) => {
                return new Date(latest.created_at) > new Date(current.created_at) ? latest : current;
                });
        
                if (mostRecentEvent.status === 'watched') {
                setWatchedMovies(prevMovies => [...prevMovies, movie]);
                } else {
                setWatchlistMovies(prevMovies => [...prevMovies, movie]);
                }
            });
    
            user.tv_shows.forEach(show => {
                // get most recent event via event.created_at attribute
                const mostRecentEvent = show.tv_show_watch_events.reduce((latest, current) => {
                return new Date(latest.created_at) > new Date(current.created_at) ? latest : current;
                });
        
                if (mostRecentEvent.status === 'watched') {
                setWatchedTVShows(prevShows => [...prevShows, show]);
                } else {
                setWatchlistTVShows(prevShows => [...prevShows, show]);
                }
            });
        }
    }, [user]);

    return (
        <ContentStatusContext.Provider value={{
            watchedMovies,
            watchlistMovies,
            watchedTVShows,
            watchlistTVShows,
        }} >
        {children}
        </ContentStatusContext.Provider>
    )
}