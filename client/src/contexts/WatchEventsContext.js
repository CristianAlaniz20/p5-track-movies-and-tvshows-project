import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const WatchEventsContext = createContext();

export const WatchEventsProvider = ({ children }) => {
    const [watchEvents, setWatchEvents] = useState([]); // watch events state
    const [watchedEvents, setWatchedEvents] = useState([]) // watched events state
    const [watchlistEvents, setWatchlistEvents] = useState([]) // watchlist events state
    const { setUserMovieWatchEvents, setUserTVShowWatchEvents } = useContext(UserContext)
    console.log(watchEvents)

    // seperates watchEvents into watchedEvents and watchlistEvents
    useEffect(() => {
        if (watchEvents) {
            // reset watchEvents and watchlistEvents
            setWatchedEvents([])
            setWatchlistEvents([])

            watchEvents.forEach(event => {
                // add events with a status of 'watched' to watchedEvents
                if (event.status === "watched") {
                    setWatchedEvents(prevEvents => [...prevEvents, event])
                // add events with a status of 'watchlist' to watchlistEvents
                } else if (event.status === "watchlist") {
                    setWatchlistEvents(prevEvents => [...prevEvents, event])
                // handle any exceptions
                } else {
                    console.warn("event status is invalid", event)
                }
            });
        }
    }, [watchEvents])

    const addMovieEvent = async (movieId, rating, notes, status) => {
        try {
            // create and add a movieEvent to the watchEvents state
            const response = await fetch(`/movies/${movieId}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, notes, status }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserMovieWatchEvents((prevUserMovieWatchEvents) => [...prevUserMovieWatchEvents, data.watch_event])
                setWatchEvents([...watchEvents, data.watch_event]);
            }
        } catch (error) {
            console.error("Failed to add movie watch event", error);
        }
    };

    const addTVShowEvent = async (tvShowId, rating, notes, status) => {
        try {
            // create and add a tvShowEvent to the watchEvents state
            const response = await fetch(`/tv_shows/${tvShowId}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, notes, status }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserTVShowWatchEvents((prevUserTVShowWatchEvents) => [...prevUserTVShowWatchEvents, data.watch_event])
                setWatchEvents([...watchEvents, data.watch_event]);
            }
        } catch (error) {
            console.error("Failed to add TV show watch event", error);
        }
    };

    const updateMovieEvent = async (movieId, values, eventId) => {
        try {
            // update a watchEvent (for movie and tv show Events)
            const response = await fetch(`/movies/${movieId}/events/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const updatedEvent = await response.json();

                // Update userMovieWatchEvents state
                setUserMovieWatchEvents(prevEvents =>
                    prevEvents.map(event => 
                        event.id === updatedEvent.watch_event.id ? updatedEvent.watch_event : event
                    )
                );

                // Update watchEvents state
                setWatchEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === updatedEvent.watch_event.id ? updatedEvent.watch_event : event
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update event", error);
        }
    };

    const updateTVShowEvent = async (tvShowId, values, eventId) => {
        try {
            // update a watchEvent (for movie and tv show Events)
            const response = await fetch(`/tv_shows/${tvShowId}/events/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                
                // Update userTVShowWatchEvents state
                setUserTVShowWatchEvents(prevEvents =>
                    prevEvents.map(event => 
                        event.id === updatedEvent.watch_event.id ? updatedEvent.watch_event : event
                    )
                );

                // Update watchEvents state
                setWatchEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === updatedEvent.watch_event.id ? updatedEvent.watch_event : event
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update event", error);
        }
    };

    const deleteEvent = async (event) => {
        try {
            const url = event.movie 
                ? `/movies/${event.movie}/events/${event.id}` 
                : `/tv_shows/${event.tv_show}/events/${event.id}`;
    
            const response = await fetch(url, { method: 'DELETE' });
    
            if (response.ok) {
                // Remove the event from watchEvents state
                setWatchEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
    
                if (event.movie) {
                    // Remove from userMovieWatchEvents state
                    setUserMovieWatchEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
                } else {
                    // Remove from userTVShowWatchEvents state
                    setUserTVShowWatchEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
                }
            }
        } catch (error) {
            console.error("Failed to delete event", error);
        }
    };

    return (
        <WatchEventsContext.Provider value={{
            watchedEvents,
            watchlistEvents,
            watchEvents,
            setWatchEvents,
            addMovieEvent,
            addTVShowEvent,
            updateMovieEvent,
            updateTVShowEvent,
            deleteEvent,
        }}>
            {children}
        </WatchEventsContext.Provider>
    );
};
