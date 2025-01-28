import React, { createContext, useState } from 'react';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    //const [movies, setMovies] = useState([]); // movies state
    //const [tvShows, setTvShows] = useState([]); // tv shows state
    const [searchResults, setSearchResults] = useState([]); // search results state

    const searchContent = async (title) => {
        try {
            // search for movies and tv shows that match title 
            const response = await fetch('/search_results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.results);
            }
        } catch (error) {
            console.error("Failed to search content", error);
        }
    };

    /*const fetchMovies = async () => {
        try {
            const response = await fetch('/movie');
            if (response.ok) {
                const data = await response.json();
                setMovies(data);
            }
        } catch (error) {
            console.error("Failed to fetch movies", error);
        }
    };

    const fetchTVShows = async () => {
        try {
            const response = await fetch('/tv_show');
            if (response.ok) {
                const data = await response.json();
                setTvShows(data);
            }
        } catch (error) {
            console.error("Failed to fetch TV shows", error);
        }
    };*/

    return (
        <ContentContext.Provider value={{
            //movies,
            //tvShows,
            searchResults,
            searchContent,
            //fetchMovies,
            //fetchTVShows,
        }}>
            {children}
        </ContentContext.Provider>
    );
};
