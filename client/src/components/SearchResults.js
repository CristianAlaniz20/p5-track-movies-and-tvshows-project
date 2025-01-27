import React from "react";
import Content from "./Content";
import { useHistory } from "react-router-dom";

function SearchResults({ results }) {
    const history = useHistory()

    // reroute to createMoviePage component
    const handleCreateMovieClick = () => history.push('/create_movie')
    // reroute to createTVShowPage component
    const handleCreateTVShowClick = () => history.push('/create_tv_show')

    return (
        <div>
            {results.length > 0 ? (
                // maps each result inside of the results list
                results.map(result => <Content key={`${result.title}-${result.release_date}`} result={result} />)
            ) : (
                <div>
                    <h4>Sorry, no content was found matching that title.</h4>
                    <p>If you wish to add that content, select an option below.</p>
                    <button onClick={handleCreateMovieClick} >Create Movie</button>
                    <button onClick={handleCreateTVShowClick} >Create TV Show</button>
                </div>
            )}
        </div>
    )
}

export default SearchResults