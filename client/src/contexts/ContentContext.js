import React, { createContext, useState, useContext } from 'react';
import { WatchEventsContext } from './WatchEventsContext';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]); // search results state
    const [currentContent, setCurrentContent] = useState({}) // current content state
    const { setWatchEvents } = useContext(WatchEventsContext) // setter function from WatchEventsContext

    // sets currentContent state and sets WatchEvents state based on the type of content received
    const checkTypeAndSetContent = (contentObj) => {
        // checks if contentObj is a movie
        if (contentObj.duration) {
            setCurrentContent(contentObj)
            setWatchEvents(contentObj.movie_watch_events)
        // checks if contentObj is a tv show
        } else if (contentObj.seasons) {
            setCurrentContent(contentObj)
            setWatchEvents(contentObj.tv_show_watch_events)
        } else {
            console.warn("content is missing an attribute", contentObj)
        }
    }

    // searches Movie and TV Show database for any content matching a title
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
            currentContent,
            checkTypeAndSetContent,
        }}>
            {children}
        </ContentContext.Provider>
    );
};
