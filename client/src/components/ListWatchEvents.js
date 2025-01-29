import React from "react";

function ListWatchEvents({ eventsList=[], emptyWatchEventListMessage }) {
    return (
        <div>
            {eventsList.length > 0 ? eventsList.map(event => {
                return (
                    <div key={`${event.id}-${event.created_at}`}>
                        <h4>Created on: {Date(event.created_at)}</h4>
                        <p>Rating: {"⭐".repeat(event.rating)}</p>
                        <p>Your Notes: {event.notes}</p>
                    </div>
                )
            }) : <p>{emptyWatchEventListMessage}</p>}
        </div>
    )
}

export default ListWatchEvents