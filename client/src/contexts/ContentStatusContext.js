import React, { useState, createContext, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const ContentStatusContext = createContext()

export const ContentStatusProvider = ({ children }) => {
    const [watchedMovies, setWatchedMovies] =  useState([]) // watched movies state
    const [watchlistMovies, setWatchlistMovies] = useState([]) // watchlist movies state
    const [watchedTVShows, setWatchedTVShows] = useState([]) // watched tv shows state
    const [watchlistTVShows, setWatchlistTVShows] = useState([]) // watchlist tv shows state
    const { userMovies, userTVShows } = useContext(UserContext) // user state from UserContext

    // Effect for Movies
    useEffect(() => {
        if (!userMovies) return;

        const newWatchedMovies = [];
        const newWatchlistMovies = [];

        userMovies.forEach(movie => {
            const mostRecentEvent = movie.movie_watch_events.reduce((latest, current) => 
                new Date(latest.created_at) > new Date(current.created_at) ? latest : current
            );

            if (mostRecentEvent.status === "watched") {
                newWatchedMovies.push(movie);
            } else {
                newWatchlistMovies.push(movie);
            }
        });

        setWatchedMovies(newWatchedMovies);
        setWatchlistMovies(newWatchlistMovies);
    }, [userMovies]); 
    
    // Effect for TV Shows
    useEffect(() => {
        if (!userTVShows) return;

        const newWatchedTVShows = [];
        const newWatchlistTVShows = [];

        userTVShows.forEach(show => {
            const mostRecentEvent = show.tv_show_watch_events.reduce((latest, current) => 
                new Date(latest.created_at) > new Date(current.created_at) ? latest : current
            );

            if (mostRecentEvent.status === "watched") {
                newWatchedTVShows.push(show);
            } else {
                newWatchlistTVShows.push(show);
            }
        });

        setWatchedTVShows(newWatchedTVShows);
        setWatchlistTVShows(newWatchlistTVShows);
    }, [userTVShows]); 

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