import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ContentContext } from "../contexts/ContentContext";
import { WatchEventsContext } from "../contexts/WatchEventsContext";

function ListTVShows({ tvShowList }) {
    const { checkTypeAndSetContent } = useContext(ContentContext) // set current tv show function from ContentContext
    const { setWatchEvents } = useContext(WatchEventsContext)

    const history = useHistory() // for navigation purposes

    // handle tv show poster being clicked
    const handleTVShowContentClick = (show) => {
        const events = checkTypeAndSetContent(show)
        setWatchEvents(events)
        history.push(`/tv_shows/${show.id}`)
    }

    return (
        <div>
        {/* Lists a movie poster for every movie in movieList */}
        {tvShowList.length > 0 ? (
            tvShowList.map(show => (
                <img 
                    key={show.id} 
                    src={show.poster_url} 
                    alt={`${show.title} poster`} 
                    onClick={() => handleTVShowContentClick(show)} 
                    style={{ cursor: "pointer" }}
                />
            ))
        ) : (
            <p>No content found for this list. Go to Search Database tab to add content.</p>
        )}
    </div>
    )
}

export default ListTVShows