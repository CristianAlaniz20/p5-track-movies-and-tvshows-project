import React, { useContext } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { WatchEventsContext } from "../contexts/WatchEventsContext";

function DeleteWatchEvent() {
    const {movie_id} = useParams()
    const {tv_show_id} = useParams()
    const { deleteEvent } = useContext(WatchEventsContext)
    const location = useLocation()
    const history = useHistory()
    const event = location.state.event // Get event from navigation state
    const idType = event.movie ? movie_id : tv_show_id
    
    // calls deleteEvent function 
    const handleYesClick = () => deleteEvent(event)
    
    // re routes to content page
    const handleNoClick = () => {
        const path = event.movie ? `movies/${idType}` : `tv_shows/${idType}`
        history.push(path)
    }

    return (
        <div>
            <div>
                <h4>Created on: {Date(event.created_at)}</h4>
                <p>Rating: {"⭐".repeat(event.rating)}</p>
                <p>Your Notes: {event.notes}</p>
            </div>
            
            <p>Are you sure you want to delete this watch event?</p>
            <br />

            <button onClick={handleYesClick}>YES</button>
            <button onClick={handleNoClick} >NO</button>
        </div>
    )
}

export default DeleteWatchEvent