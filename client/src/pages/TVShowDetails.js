import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "../components/ContentDetails";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";
import ListWatchEvents from "../components/ListWatchEvents";
import { UserContext } from "../contexts/UserContext";
//import { useWatchEventContext } from "../contexts/DummyWatchedContext";
function TVShowDetails() {
    // Contexts
    const { user } = useContext(UserContext)
    const { watchedEvents, watchlistEvents } = useContext(WatchEventsContext) 
    const { currentContent, checkTypeAndSetContent } = useContext(ContentContext) 

    // url routing and parameteres
    const { tv_show_id } = useParams(); // tv_show_id url parameter

    // empty watch event list messsage
    const emptyWatchEventListMessage = "No watch events found for this list."

    //const {wacthEventState, dispatchWactEvent} = useWatchEventContext();
    //console.log("All Satate", wacthEventState);
    useEffect(() => {
        // handle page refresh
        const tvShowId = parseInt(tv_show_id);
    
        if (!currentContent || currentContent.id !== tvShowId) {
            // Check if tv show exists in UserContext
            const foundTVShow = user?.tv_shows?.find((show) => show.id === tvShowId);
            if (foundTVShow) {
                checkTypeAndSetContent(foundTVShow);
            } else {
                // Fetch tv show from backend if not in UserContext
                fetch(`/tv_shows/${tvShowId}`)
                    .then((res) => res.json())
                    .then((data) => checkTypeAndSetContent(data.tv_show))
                    .catch((error) => console.error("Error fetching tv show:", error));
            }
        }
    }, [tv_show_id, user, currentContent, checkTypeAndSetContent]);

    return (
        <div>
            {/* conditionally render tvshow details */}
            {currentContent && watchedEvents && watchlistEvents ? (
                <>
                    {/* Displays content details */}
                    <div>
                        <ContentDetails 
                            contentObj={currentContent}
                            jsx={<p>Seasons: {currentContent.seasons}</p>}
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