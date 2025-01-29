import React, { createContext, useState, useContext } from 'react';

export const WatchEventsContext = createContext();

export const WatchEventsProvider = ({ children }) => {
    const [watchedEvents, setWatchedEvents] = useState([]) // watched events state
    const [watchlistEvents, setWatchlistEvents] = useState([]) // watchlist events state
    const [watchEvents, setWatchEvents] = useState([]); // watch events state

    const retrieveMovieEvents = (movie) => {
        if (Array.isArray(movie.movie_watch_events)) {
            // reset watchEvents and watchlistEvents
            setWatchedEvents([])
            setWatchlistEvents([])

            movie.movie_watch_events.forEach(event => {
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
        } else {
            console.warn("movie_watch_events is not an array or is undefined", movie);
        }
    }

    const retrieveTVShowsEvents = (show) => {
        if (Array.isArray(show.tv_show_watch_events)) {
            // reset watchEvents and watchlistEvents
            setWatchEvents([])
            setWatchEvents([])

            show.tv_show_watch_events.forEach(event => {
                // add events with a status of 'watched' to watchedEvents
                if (event.status === "watched") {
                    setWatchedEvents(prevEvents => [...prevEvents, event])
                // add events with a status of 'watchlist' to watchlistEvents
                }  else if (event.status === "watchlist") {
                    setWatchlistEvents(prevEvents => [...prevEvents, event])
                // handle any exceptions
                } else {
                    console.warn("event status is invalid", event)
                }
            });
        } else {
            console.warn("tv_show_watch_events is not an array or is undefined", show);
        }
    }

    /*const fetchWatchEvents = async () => {
        if (isAuthenticated && user) {
            try {
                // retrieve and add movieEvents and tvShowEvents to watchEvents state
                const movieResponse = await fetch(`/movie_event/user/${user.id}`);
                const tvShowResponse = await fetch(`/tv_show_event/user/${user.id}`);
                if (movieResponse.ok && tvShowResponse.ok) {
                    const movieEvents = await movieResponse.json();
                    const tvShowEvents = await tvShowResponse.json();
                    setWatchEvents([...movieEvents, ...tvShowEvents]);
                }
            } catch (error) {
                console.error("Failed to fetch watch events", error);
            }
        }
    };*/

    const addMovieEvent = async (movieId, rating, notes, status) => {
        try {
            // create and add a movieEvent to the watchEvents state
            const response = await fetch(`/movie_event/${movieId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, notes, status }),
            });

            if (response.ok) {
                const data = await response.json();
                setWatchEvents([...watchEvents, data.watch_event]);
            }
        } catch (error) {
            console.error("Failed to add movie watch event", error);
        }
    };

    const addTVShowEvent = async (tvShowId, rating, notes, status) => {
        try {
            // create and add a tvShowEvent to the watchEvents state
            const response = await fetch(`/tv_show_event/${tvShowId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, notes, status }),
            });

            if (response.ok) {
                const data = await response.json();
                setWatchEvents([...watchEvents, data.watch_event]);
            }
        } catch (error) {
            console.error("Failed to add TV show watch event", error);
        }
    };

    const updateEvent = async (url, id, data) => {
        try {
            // update a watchEvent (for movie and tv show Events)
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                setWatchEvents(watchEvents.map(event =>
                    event.id === id ? updatedEvent.watch_event : event
                ));
            }
        } catch (error) {
            console.error("Failed to update event", error);
        }
    };

    const deleteEvent = async (url, id) => {
        try {
            // delete a watchEvent (for movie and tv show Events)
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWatchEvents(watchEvents.filter(event => event.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete event", error);
        }
    };

    return (
        <WatchEventsContext.Provider value={{
            watchedEvents,
            watchlistEvents,
            retrieveMovieEvents,
            retrieveTVShowsEvents,
            //watchEvents,
            //fetchWatchEvents,
            addMovieEvent,
            addTVShowEvent,
            updateMovieEvent: (id, data) => updateEvent('/movie_event', id, data),
            updateTVShowEvent: (id, data) => updateEvent('/tv_show_event', id, data),
            deleteMovieEvent: (id) => deleteEvent('/movie_event', id),
            deleteTVShowEvent: (id) => deleteEvent('/tv_show_event', id),
        }}>
            {children}
        </WatchEventsContext.Provider>
    );
};
