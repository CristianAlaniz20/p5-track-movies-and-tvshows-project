import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../helpers";
import ContentDetails from "../components/ContentDetails";

function MovieDetails() {
    const { movie_id } = useParams() // Access the movie_id from the route
    const history = useHistory() // re routes
    const [movie, setMovie]  = useState(null) // movie state

    useEffect(() => {
        // GET request to backend MovieResource
        fetch(`/movie/${movie_id}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Error fetching movie")
            }
        })
        .then(resMovie => setMovie(resMovie.movie))
        .catch(error => console.error(error))
    }, [movie_id])

    // re routes to CreateMovieWatchEvent component
    const handleAddToWatchlistClick = () => history.push(`/add_to_movie_list/${movie.id}`)

    return (
        <div>
            {/* conditionally render movie details after movie response */}
            {movie ? (
                <>
                    <ContentDetails 
                        contentObj={movie}
                        jsx={<p>Duration: {convertMinutesToHoursAndMinutes(movie.duration)}</p>}
                    />
                    <button onClick={handleAddToWatchlistClick} >Add To Watchlist</button>
                </>
            ) : (
                <h1>Movie is loading...</h1>
            )}
        </div>
    )
}

export default MovieDetails