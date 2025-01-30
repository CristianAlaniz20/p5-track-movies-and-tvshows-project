import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "../components/ContentDetails";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";
import ListWatchEvents from "../components/ListWatchEvents";
import { UserContext } from "../contexts/UserContext";

function TVShowDetails() {
    const { tv_show_id } = useParams(); // tv_show_id url parameter
    const { currentTVShow, setCurrentTVShow } = useContext(ContentContext) // currentMovie state from ContentContext)
    const { user } = useContext(UserContext); // user state from UserContext
    // states and method from WatchEventsContext 
    const { watchedEvents, watchlistEvents, retrieveTVShowsEvents } = useContext(WatchEventsContext)

     useEffect(() => {
            // handle page refresh
            const tvShowId = parseInt(tv_show_id);
    
            if (!currentTVShow || currentTVShow.id !== tvShowId) {
                // Check if tv show exists in UserContext
                const foundTVShow = user?.tv_shows?.find((show) => show.id === tvShowId);
                if (foundTVShow) {
                    setCurrentTVShow(foundTVShow);
                } else {
                    // Fetch tv show from backend if not in UserContext
                    fetch(`/tv_shows/${tvShowId}`)
                        .then((res) => res.json())
                        .then((data) => setCurrentTVShow(data.tv_show))
                        .catch((error) => console.error("Error fetching tv show:", error));
                }
            }
        }, [tv_show_id, user, currentTVShow, setCurrentTVShow]);

    // empty watch event list messsage
    const emptyWatchEventListMessage = "No watch events found for this list."

    useEffect(() => {
        // retrieve tv show events until currentTVShow has a value
        if (currentTVShow) {
            retrieveTVShowsEvents(currentTVShow)
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