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

    const updateWatchEvent = async (eventId, contentId, type, status, rating, notes) => {
        try {
            const response = await fetch(`/${type}s/${contentId}/events/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, rating, notes })
            });

            if (response.ok) {
                const updatedEvent = await response.json();

                // Update user state to reflect new event details
                setUser(prevUser => ({
                    ...prevUser,
                    [`${type}_watch_events`]: prevUser[`${type}_watch_events`].map(event =>
                        event.id === updatedEvent.watch_event.id ? updatedEvent.watch_event : event
                    )
                }));
            }
        } catch (error) {
            console.error("Error updating watch event:", error);
        }
    };

    const deleteWatchEvent = async (eventId, contentId, type) => {
        try {
            const response = await fetch(`/${type}s/${contentId}/events/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUser(prevUser => ({
                    ...prevUser,
                    [`${type}_watch_events`]: prevUser[`${type}_watch_events`].filter(event => event.id !== eventId)
                }));
            }
        } catch (error) {
            console.error("Error deleting watch event:", error);
        }
    };

    return (
        <WatchEventsContext.Provider value={{
            watchEvents,
            addWatchEvent,
            updateWatchEvent,
            deleteWatchEvent
        }}>
            {children}
        </WatchEventsContext.Provider>
    );
};
