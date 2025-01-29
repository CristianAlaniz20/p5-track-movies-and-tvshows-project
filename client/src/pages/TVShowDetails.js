import React, { useEffect, useContext } from "react";
import ContentDetails from "../components/ContentDetails";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";
import ListWatchEvents from "../components/ListWatchEvents";

function TVShowDetails() {
    const { currentTVShow } = useContext(ContentContext) // currentMovie state from ContentContext)
    // states and method from WatchEventsContext
    const { watchedEvents, watchlistEvents, retrieveTVShowEvents } = useContext(WatchEventsContext)

    // empty watch event list messsage
    const emptyWatchEventListMessage = "No watch events found for this list."

    useEffect(() => {
        // retrieve tv show events until currentTVShow has a value
        if (currentTVShow) {
            retrieveTVShowEvents(currentTVShow)
        }
    }, [currentTVShow])

    return (
        <div>
            {/* conditionally render tvshow details */}
            {currentTVShow && watchedEvents && watchlistEvents ? (
                <>
                    {/* Displays content details */}
                    <div>
                        <ContentDetails 
                            contentObj={currentTVShow}
                            jsx={<p>Seasons: {currentTVShow.seasons}</p>}
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
                <h1>TV Show is loading...</h1>
            )}
        </div>
    )
}

export default TVShowDetails