import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import { WatchEventsContext } from "../contexts/WatchEventsContext";

function MovieWatchEventForm() {
    const { addMovieEvent, updateMovieEvent } = useContext(WatchEventsContext) // add and update watch events functions
    const location = useLocation(); 
    const event = location.state?.event || null; // Get event from navigation state
    const { movie_id } = useParams()
    
    // form schema validation
    const formSchema = yup.object().shape({
        rating: yup.number().optional("Rating is optional"),
        notes: yup.string().optional("Notes are optional."),
        status: yup.string().required("Must enter a status.")
    })

    const formik = useFormik({
        initialValues : {
            rating: event?.rating || "",
            notes: event?.notes || "",
            status: event?.status || "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // conditionally render a callback function
            event ? updateMovieEvent(event.movie, values) : addMovieEvent(movie_id, values.rating, values.notes, values.status)
        }
    })

    return (
        <div>
            {/* conditionally render header */}
            {event ? <h1>Edit Movie Watch Event Form</h1> : <h1>Create Movie Watch Event Form</h1>}
            <form onSubmit={formik.handleSubmit} >
                {/* show 5 stars for user rating */}
                <label htmlFor='rating'>Rating: </label>
                <input
                    id='rating' 
                    name='rating'
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                />
                <br />

                {/* user notes description */}
                <label htmlFor='notes'>Notes: </label>
                <input
                    id='notes' 
                    name='notes'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.notes}
                />
                <br />

                {/* show dropdown  */}
                <label htmlFor='status'>Status: </label>
                <input
                    id='status' 
                    name='status'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                />
                <br />

                {/* Show validation schema requirements */}
                <DisplayErrors errors={formik.errors} />

                {/* conditionally render submit button */}
                {event ? 
                    <button type="submit" >Update Movie Watch Event</button> :
                    <button type="submit" >Create Movie Watch Event</button>
                }
            </form>
        </div>
    )
}

export default MovieWatchEventForm