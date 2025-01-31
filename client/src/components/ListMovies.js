import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ContentContext } from "../contexts/ContentContext";

function ListMovies({ movieList }) {
    const { checkTypeAndSetContent } = useContext(ContentContext) // set current movie function from ContentContext

    const history = useHistory() // for navigation purposes

    // handle movie poster being clicked
    const handleMovieContentClick = (movie) => {
        checkTypeAndSetContent(movie)
        history.push(`/movies/${movie.id}`)
    }

    return (
        <div>
            {/* lists a movie poster for every movie in movieList */}
            {movieList.length > 0 ? movieList.map(movie => {
                return (
                    <img 
                        key={movie.id} 
                        src={movie.poster_url} 
                        alt={`${movie.title} poster`} 
                        onClick={() => handleMovieContentClick(movie)} 
                    />
                )
            }) : <p>No content found for this list. Go to Search Database tab to add content.</p> }
        </div>
    )
}

export default ListMovies