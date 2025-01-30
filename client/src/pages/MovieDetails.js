import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../helpers";
import ContentDetails from "../components/ContentDetails";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";
import ListWatchEvents from "../components/ListWatchEvents";
import { UserContext } from "../contexts/UserContext";

function MovieDetails() {
    const { movie_id } = useParams(); // movie_id url parameter
    const { currentMovie, setCurrentMovie } = useContext(ContentContext) // currentMovie state from ContentContext)
    const { user } = useContext(UserContext); // user state from UserContext
    // states and method from WatchEventsContext
    const { watchedEvents, watchlistEvents, retrieveMovieEvents } = useContext(WatchEventsContext)

    useEffect(() => {
        // handle page refresh
        const movieId = parseInt(movie_id);

        if (!currentMovie || currentMovie.id !== movieId) {
            // Check if movie exists in UserContext
            const foundMovie = user?.movies?.find((m) => m.id === movieId);
            if (foundMovie) {
                setCurrentMovie(foundMovie);
            } else {
                // Fetch movie from backend if not in UserContext
                fetch(`/movies/${movieId}`)
                    .then((res) => res.json())
                    .then((data) => setCurrentMovie(data.movie))
                    .catch((error) => console.error("Error fetching movie:", error));
            }
        }
    }, [movie_id, user, currentMovie, setCurrentMovie]);

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