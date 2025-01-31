import React from "react";
import { useHistory } from "react-router-dom";

function ListWatchEvents({ eventsList=[] }) {
    const history = useHistory()

    // On click re route to CreateMovieWatchEvent component and pass event as state
    const handleEditButtonClick = (event) => {
        history.push({
            pathname: event.movie ? `/movies/${event.movie}/events/${event.id}/edit` : `/tv_shows/${event.tv_show}/events/${event.id}/edit`,
            state: { event }, // Pass the event as state
        });
    };

    // re route to confirm deletion page
    const handleDeleteButtonClick = (event) => {
        history.push({ 
            pathname: event.movie ? `/movies/${event.movie}/events/${event.id}/delete` : `/tv_shows/${event.tv_show}/events/${event.id}/delete`,
            state: { event },
        }
    )}

    return (
        <div>
            {eventsList.length > 0 ? eventsList.map(event => {
                return (
                    <div key={`${event.id}-${event.created_at}`}>
                        <h4>Created on: {Date(event.created_at)}</h4>
                        <p>Rating: {"⭐".repeat(event.rating)}</p>
                        <p>Your Notes: {event.notes}</p>

                        <button onClick={() => handleEditButtonClick(event)} >Edit</button>
                        <button onClick={() => handleDeleteButtonClick(event)} >Delete</button>
                    </div>
                )
            }) : <p>No watch events found for this list.</p>}
        </div>
    )
}

export default ListWatchEvents