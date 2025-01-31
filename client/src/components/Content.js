import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ContentContext } from "../contexts/ContentContext";

function Content({ result }) {
    const history = useHistory()
    const { checkTypeAndSetContent } = useContext(ContentContext)

    // reroute to MovieDetails component
    const handleMovieImageClick = (result) => {
        checkTypeAndSetContent(result)
        history.push(`/movies/${result.id}`)
    }
    // reroute to TVShowDetails component
    const handleTVShowImageClick = (result) => {
        checkTypeAndSetContent(result)
        history.push(`/tv_shows/${result.id}`)
    }

    return (
        <>
            {/* checks if result has a duration attribute to differentiate between a Movie and TV Show */}
            {result.duration ? (
                <img src={result.poster_url} alt={`${result.title} poster`} onClick={() => handleMovieImageClick(result)} />
            ) : (
                <img src={result.poster_url} alt={`${result.title} poster`} onClick={() => handleTVShowImageClick(result)} />
            )}
        </>
    )
}

export default Content