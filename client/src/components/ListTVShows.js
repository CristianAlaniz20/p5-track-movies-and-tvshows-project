import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ContentContext } from "../contexts/ContentContext";

function ListTVShows({ tvShowList }) {
    const { checkTypeAndSetContent } = useContext(ContentContext) // set current tv show function from ContentContext

    const history = useHistory() // for navigation purposes

    // handle tv show poster being clicked
    const handleTVShowContentClick = (show) => {
        checkTypeAndSetContent(show)
        history.push(`/tv_shows/${show.id}`)
    }

    return (
        <div>
            {/* lists a tv show poster for every tv show in tvShowList */}
            {tvShowList.length > 0 ? tvShowList.map(show => {
                return (
                    <img 
                        key={show.id}
                        src={show.poster_url} 
                        alt={`${show.title} poster`} 
                        onClick={() => handleTVShowContentClick(show)} 
                    />
                )
            }) : <p>No content found for this list. Go to Search Database tab to add content.</p>}
        </div>
    )
}

export default ListTVShows