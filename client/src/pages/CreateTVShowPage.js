import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ReleaseDate from "../components/ReleaseDate";
import StreamingOptions from "../components/StreamingOptions";
import DisplayErrors from "../components/DisplayErrors";
import { capitalizeAndLowerCaseWords } from "../helpers";

function CreateTVShowPage() {
    // create tv show form validation schema
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title."),
        poster_url: yup.string().required("Must enter a poster url."),
        genre: yup.string().required("Must enter a genre."),
        seasons: yup.number("Must be a number.").required("Must enter number of seasons."),
        description: yup.string().required("Must enter a description."),
        release_date: yup.string().required("Must enter a release date."),
        streaming_options: yup.string().required("Must enter streaming options.")
    })
    
    const formik = useFormik({
        initialValues : {
            title: "",
            poster_url: "",
            genre: "",
            seasons: "",
            description: "",
            release_date: "",
            streaming_options: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // POST request to tv show resource
            fetch("/tv_shows", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(res => {
                if (res.status === 201) {
                    // for test purposes
                    console.log("TV Show Successfully Created!")
                }
            })
            .catch(error => console.error(error))
        },
    })
            
    return (
        <>
            <h2>Create A TV Show Form</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* title input */}
                <label htmlFor='title'>Title: </label>
                <input
                    id='title' 
                    name='title'
                    type="text"
                    onChange={formik.handleChange}
                    value={capitalizeAndLowerCaseWords(formik.values.title)}
                />
                <br />
    
                {/* poster_url input */}
                <label htmlFor='poster_url'>Poster URL: </label>
                <input
                    id='poster_url'
                    name='poster_url'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.poster_url}
                />
                <br />

                {/* genre input */}
                <label htmlFor='genre'>Genre: </label>
                <input
                    id='genre'
                    name='genre'
                    type="text"
                    onChange={formik.handleChange}
                    value={capitalizeAndLowerCaseWords(formik.values.genre)}
                />
                <br />
                    
                {/* seasons input */}
                <label htmlFor='seasons'>Seasons: </label>
                <input
                    id='seasons'
                    name='seasons'
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.seasons}
                />
                <br />

                {/* description input */}
                <label htmlFor='description'>Description: </label>
                <input
                    id='description'
                    name='description'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                <br />

                {/* show dropdown for a month, day, and year and combine into a string */}
                <ReleaseDate setReleaseDate={(date) => formik.setFieldValue('release_date', date) } />
                <br />

                {/* Create a checkbox for every streaming option and combine all checked into a string. */}
                <StreamingOptions setStreamingOptions={(options) => formik.setFieldValue('streaming_options', options)} />
                <br />
    
                <DisplayErrors errors={formik.errors} />

                <button type="submit">Create TV Show</button>
            </form>
        </>
    )
}

export default CreateTVShowPage