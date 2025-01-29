import React, { useEffect, useContext } from "react";
import { convertMinutesToHoursAndMinutes } from "../helpers";
import ContentDetails from "../components/ContentDetails";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";
import ListWatchEvents from "../components/ListWatchEvents";

function MovieDetails() {
    const { currentMovie } = useContext(ContentContext) // currentMovie state from ContentContext)
    // states and method from WatchEventsContext
    const { watchedEvents, watchlistEvents, retrieveMovieEvents } = useContext(WatchEventsContext)

    // empty watch event list messsage
    const emptyWatchEventListMessage = "No watch events found for this list."

    useEffect(() => {
        // retrieve movie events until currentMovie has a value
        if (currentMovie) {
            retrieveMovieEvents(currentMovie)
        }
    }, [currentMovie])

    return (
        <div>
            {/* conditionally render movie details */}
            {currentMovie && watchedEvents && watchlistEvents ? (
                <>
                    {/* Displays content details */}
                    <div>
                        <ContentDetails 
                            contentObj={currentMovie}
                            jsx={<p>Duration: {convertMinutesToHoursAndMinutes(currentMovie.duration)}</p>}
                        />
                    </div>
                    {/* Displays watched events */}
                    <div>
                        <h2>Watched Events</h2>
                        <ListWatchEvents eventsList={watchedEvents} emptyWatchEventListMessage={emptyWatchEventListMessage} />
                    </div>
                    {/* Displays watched events */}
                    <div>
                        <h2>Watchlist Events</h2>
                        <ListWatchEvents eventsList={watchlistEvents} emptyWatchEventListMessage={emptyWatchEventListMessage} />
                    </div>
                </>
            ) : (
                <h1>Movie is loading...</h1>
            )}
        </div>
    )
}

export default MovieDetails