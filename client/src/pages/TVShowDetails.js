import React,  { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ContentDetails from "../components/ContentDetails";

function TVShowDetails() {
    const { tv_show_id } = useParams() // Access the tv_show_id from the route
    const history = useHistory() // re routes
    const [tvshow, setTVShow] = useState(null) // movie state

    useEffect(() => {
        // GET request to backend TVShowResource
        fetch(`/tv_show/${tv_show_id}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Error fetching tv show")
            }
        })
        .then(resTVShow => setTVShow(resTVShow.tv_show))
        .catch(error => console.error(error))
    }, [tv_show_id])

    // re routes to CreatTVShowWatchEvent component
    const handleAddToWatchlistClick = () => history.push(`/add_to_tv_show_list/${tvshow.id}`)

    return (
        <div>
            {/* conditionally render tvshow details after loading */}
            {tvshow ? (
                <>
                    <ContentDetails 
                        contentObj={tvshow}
                        jsx={<p>Seasons: {tvshow.seasons}</p>}
                    />
                    <button onClick={handleAddToWatchlistClick} >Add To Watchlist</button>
                </>
            ) : (
                <h1>TV Show is loading...</h1>
            )}
        </div>
    )
}

export default TVShowDetails