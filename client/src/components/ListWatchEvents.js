import React from "react";
import { useHistory } from "react-router-dom";

function ListWatchEvents({ eventsList=[], emptyWatchEventListMessage }) {
    const history = useHistory()

    // On click re route to CreateMovieWatchEvent component and pass event as state
    const handleEditButtonClick = (event) => {
        history.push({
            pathname: `/edit-watch-event/${event.id}`,
            state: { event }, // Pass the event as state
        });
    };

    return (
        <div>
            {eventsList.length > 0 ? eventsList.map(event => {
                return (
                    <div key={`${event.id}-${event.created_at}`}>
                        <h4>Created on: {Date(event.created_at)}</h4>
                        <p>Rating: {"⭐".repeat(event.rating)}</p>
                        <p>Your Notes: {event.notes}</p>

                        <button onClick={() => handleEditButtonClick(event)} >Edit</button>
                    </div>
                )
            }) : <p>{emptyWatchEventListMessage}</p>}
        </div>
    )
}

export default ListWatchEvents