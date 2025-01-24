import React from "react";

function Content({ result }) {
    // converts minutes integer to hours and minutes string
    function convertMinutesToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return `${hours} hour(s) and ${remainingMinutes} minute(s)`
    }

    // converts a streaming options string into an array
    function convertStringToAnArray(string) {
        const streaming_options_array = string.split("|")
        return streaming_options_array
    }

    // takes in the jsx that is different and includes it into the rest of the intended return
    function renderCommonDetailsWithDifference(jsx) {
        return (
            <div>
                <img src={result.poster_url} alt={`${result.title} poster`}/>
                    <h3>{result.title}</h3>
                    <p>Genre: {result.genre}</p>
                    {jsx}
                    <p>Released: {result.release_date}</p>
                    <p>Description: {result.description}</p>
                    <p>Streaming Options:</p>
                    <ul>
                        {/* lists all streaming options */}
                        {convertStringToAnArray(result.streaming_options).map((option, index) => <li key={index}>{option}</li>)}
                    </ul>
            </div>
        )
    }

    return (
        <>
            {/* checks if result has a duration attribute to differentiate between a Movie and TV Show */}
            {result.duration ? (
                renderCommonDetailsWithDifference(<p>Duration: {convertMinutesToHoursAndMinutes(result.duration)}</p>)
            ) : (
                renderCommonDetailsWithDifference(<p>Seasons: {result.seasons}</p>)
            )}
        </>
    )
}

export default Content