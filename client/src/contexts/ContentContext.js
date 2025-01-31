import React, { createContext, useState } from 'react';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentContent, setCurrentContent] = useState(null);

    const searchContent = async (title) => {
        try {
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

    const checkTypeAndSetContent = (contentObj) => {
        console.log(contentObj);
        setCurrentContent(contentObj);
        return contentObj.movie_watch_events || contentObj.tv_show_watch_events;
    };

    return (
        <ContentContext.Provider value={{ searchResults, searchContent, currentContent, setCurrentContent, checkTypeAndSetContent }}>
            {children}
        </ContentContext.Provider>
    );
};
