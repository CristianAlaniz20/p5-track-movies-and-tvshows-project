import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";

function CreateTVShowWatchEvent() {
    const { tv_show_id } = useParams() // Access the tv_show_id from the route

    // form schema validation
    const formSchema = yup.object().shape({
        rating: yup.number().optional("Rating is optional"),
        notes: yup.string().optional("Notes are optional."),
        status: yup.string().required("Must enter a status.")
    })

    const formik = useFormik({
        initialValues : {
            rating: "",
            notes: "",
            status: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // POST request to TVShowEvent resource
            fetch(`/tv_show_event/${tv_show_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(res => {
                if (res.status === 201) {
                    console.log("TV Show Watch Event Sucessfully created!")
                    return res.json()
                } else {
                    console.log("Error while trying to create TV Show Watch Event.")
                }
            })
            .then(resTVShowEvent => console.log(resTVShowEvent))
            .catch(error => console.error(error))
        }
    })

    return (
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

            <button type="submit" >Create TV Show Watch Event</button>
        </form>
    )
}

export default CreateTVShowWatchEvent