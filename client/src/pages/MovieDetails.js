import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../helpers";
import ContentDetails from "../components/ContentDetails";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";
import ListWatchEvents from "../components/ListWatchEvents";
import { UserContext } from "../contexts/UserContext";

function MovieDetails() {
    // Contexts
    const { user } = useContext(UserContext)
    const { watchedEvents, watchlistEvents } = useContext(WatchEventsContext) 
    const { currentContent, checkTypeAndSetContent } = useContext(ContentContext) 

    // url routing and parameteres
    const { movie_id } = useParams(); // tv_show_id url parameter

    // empty watch event list messsage
    const emptyWatchEventListMessage = "No watch events found for this list."

    useEffect(() => {
        // handle page refresh
        const movieId = parseInt(movie_id);

        if (!currentContent || currentContent.id !== movieId) {
            // Check if movie exists in UserContext
            const foundMovie = user?.movies?.find((movie) => movie.id === movieId);
            if (foundMovie) {
                checkTypeAndSetContent(foundMovie);
            } else {
                // Fetch movie from backend if not in UserContext
                fetch(`/movies/${movieId}`)
                    .then((res) => res.json())
                    .then((data) => checkTypeAndSetContent(data.movie))
                    .catch((error) => console.error("Error fetching movie:", error));
            }
        }
    }, [movie_id, user, currentContent, checkTypeAndSetContent]);

    return (
        <div>
            {/* conditionally render movie details */}
            {currentContent && watchedEvents && watchlistEvents ? (
                <>
                    {/* Displays content details */}
                    <div>
                        <ContentDetails 
                            contentObj={currentContent}
                            jsx={<p>Duration: {convertMinutesToHoursAndMinutes(currentContent.duration)}</p>}
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