import React, { useContext } from "react";
import { convertStringToAnArray, convertMinutesToHoursAndMinutes } from "../helpers";
import { ContentContext } from "../contexts/ContentContext";

function ContentDetails() {
    const { currentContent } = useContext(ContentContext) 

    return (
        <div>
            {/* render content details */}
            <h1>{currentContent.title}</h1>
            <img src={currentContent.poster_url} alt={`${currentContent.title} poster`}/>
            <p>Genre: {currentContent.genre}</p>
            {/* condtionally renders duration for movies or seasons for tv shows */}
            {currentContent.duration ? 
                <p>Duration: {convertMinutesToHoursAndMinutes(currentContent.duration)}</p> : 
                <p>Seasons: {currentContent.seasons}</p>
            }
            <p>Released: {currentContent.release_date}</p>
            <p>Description: {currentContent.description}</p>
            <p>Streaming Options:</p>
             <ul>
                {/* lists all streaming options */}
                {convertStringToAnArray(currentContent.streaming_options).map((option, index) => <li key={index}>{option}</li>)}
            </ul>
        </div>
    )
}

export default ContentDetails