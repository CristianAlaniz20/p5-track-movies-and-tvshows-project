import React, { useContext } from "react";
import { useHistory } from "react-router-dom"; // Changed from useHistory (deprecated)
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext"; // Added WatchEventsContext

function ListMovies({ movieList }) {
    const { checkTypeAndSetContent } = useContext(ContentContext); // Set current movie in ContentContext
    const { setWatchEvents } = useContext(WatchEventsContext); // Update global watch events
    const history = useHistory(); // Use history for navigation

    const handleMovieContentClick = (movie) => {
        const events = checkTypeAndSetContent(movie);
        setWatchEvents(events);
        history.push(`/movies/${movie.id}`); 
    };

    return (
        <div>
            {/* Lists a movie poster for every movie in movieList */}
            {movieList.length > 0 ? (
                movieList.map(movie => (
                    <img 
                        key={movie.id} 
                        src={movie.poster_url} 
                        alt={`${movie.title} poster`} 
                        onClick={() => handleMovieContentClick(movie)} 
                        style={{ cursor: "pointer" }}
                    />
                ))
            ) : (
                <p>No content found for this list. Go to Search Database tab to add content.</p>
            )}
        </div>
    );
}

export default ListMovies;