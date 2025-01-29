import React, { createContext, useState } from 'react';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]); // search results state
    const [currentMovie, setCurrentMovie] = useState({}); // current movie state
    const [currentTVShow, setCurrentTVShow] = useState({}); // current tv show state

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

    return (
        <ContentContext.Provider value={{
            searchResults,
            searchContent,
            currentMovie,
            currentTVShow,
            setCurrentMovie,
            setCurrentTVShow,
        }}>
            {children}
        </ContentContext.Provider>
    );
};
