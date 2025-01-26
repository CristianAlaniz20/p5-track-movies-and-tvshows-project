import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ReleaseDate from "../components/ReleaseDate";
import StreamingOptions from "../components/StreamingOptions";
import DisplayErrors from "../components/DisplayErrors";

function CreateMoviePage() {
    // // Capitalize the first letter and lowercase the rest for every word in a string
    function capitalizeAndLowerCaseWords(str) {
        return str
          // Split the string into an array of words
          .split(' ')             
          // Capitalize the first letter and lowercase the rest
          .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ) 
          // Join the words back into a single string
          .join(' ')          
      }

    const formSchema = yup.object().shape({
            title: yup.string().required("Must enter a title."),
            poster_url: yup.string().required("Must enter a poster url."),
            genre: yup.string().required("Must enter a genre."),
            duration: yup.number("Must be a number.").required("Must enter a duration."),
            description: yup.string().required("Must enter a description."),
            release_date: yup.string().required("Must enter a release date."),
            streaming_options: yup.string().required("Must enter streaming options.")
        })
    
        const formik = useFormik({
            initialValues : {
                title: "",
                poster_url: "",
                genre: "",
                duration: "",
                description: "",
                release_date: "",
                streaming_options: ""
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
                // POST request to movie resource
                fetch("/movie", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then(res => {
                    if (res.status === 201) {
                        // for test purposes
                        console.log("Movie Successfully Created!")
                    }
                })
                .catch(error => console.error(error))
            },
        })
            
        return (
            <>
                <h2>Create A Movie Form</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor='title'>Title: </label>
                    <input
                    id='title' 
                    name='title'
                    type="text"
                    onChange={formik.handleChange}
                    value={capitalizeAndLowerCaseWords(formik.values.title)}
                    />
                    <br />
    
                    <label htmlFor='poster_url'>Poster URL: </label>
                    <input
                    id='poster_url'
                    name='poster_url'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.poster_url}
                    />
                    <br />

                    <label htmlFor='genre'>Genre: </label>
                    <input
                    id='genre'
                    name='genre'
                    type="text"
                    onChange={formik.handleChange}
                    value={capitalizeAndLowerCaseWords(formik.values.genre)}
                    />
                    <br />
                    
                    <label htmlFor='duration'>Duration In Minutes: </label>
                    <input
                    id='duration'
                    name='duration'
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.duration}
                    />
                    <br />

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

                    <button type="submit">Create Movie</button>
                </form>
            </>
        )
}

export default CreateMoviePage