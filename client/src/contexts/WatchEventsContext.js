import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const WatchEventsContext = createContext();

export const WatchEventsProvider = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const [watchEvents, setWatchEvents] = useState([]);

    useEffect(() => {
        if (user) {
            setWatchEvents([...user.movie_watch_events, ...user.tv_show_watch_events]);
        } else {
            setWatchEvents([]);
        }
    }, [user]);

    const addWatchEvent = async (contentId, type, status, rating, notes) => {
        try {
            const response = await fetch(`/${type}s/${contentId}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, rating, notes })
            });

            if (response.ok) {
                const newEvent = await response.json();
                setUser(prevUser => ({
                    ...prevUser,
                    [`${type}_watch_events`]: [...prevUser[`${type}_watch_events`], newEvent]
                }));
            }
        } catch (error) {
            console.error("Error adding watch event:", error);
        }
    };

    return (
        <WatchEventsContext.Provider value={{ watchEvents, addWatchEvent }}>
            {children}
        </WatchEventsContext.Provider>
    );
};
