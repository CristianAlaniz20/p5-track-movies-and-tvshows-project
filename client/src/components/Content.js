import React from "react";
import { useHistory } from "react-router-dom";

function Content({ result }) {
    const history = useHistory()

    // reroute to MovieDetails component
    const handleMovieImageClick = () => history.push(`/movie/${result.id}`)
    // reroute to TVShowDetails component
    const handleTVShowImageClick = () => history.push(`/tv_show/${result.id}`)

    return (
        <>
            {/* checks if result has a duration attribute to differentiate between a Movie and TV Show */}
            {result.duration ? (
                <img src={result.poster_url} alt={`${result.title} poster`} onClick={handleMovieImageClick} />
            ) : (
                <img src={result.poster_url} alt={`${result.title} poster`} onClick={handleTVShowImageClick} />
            )}
        </>
    )
}

export default Content