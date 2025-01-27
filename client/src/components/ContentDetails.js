import React from "react";
import { convertStringToAnArray } from "../helpers";

function ContentDetails({ contentObj, jsx }) {
    return (
        <div>
            {/* render content details */}
            <h1>{contentObj.title}</h1>
            <img src={contentObj.poster_url} alt={`${contentObj.title} poster`}/>
            <p>Genre: {contentObj.genre}</p>
            {jsx}
            <p>Released: {contentObj.release_date}</p>
            <p>Description: {contentObj.description}</p>
            <p>Streaming Options:</p>
             <ul>
                {/* lists all streaming options */}
                {convertStringToAnArray(contentObj.streaming_options).map((option, index) => <li key={index}>{option}</li>)}
            </ul>
        </div>
    )
}

export default ContentDetails