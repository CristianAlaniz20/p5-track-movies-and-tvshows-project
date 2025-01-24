import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SearchBar({ setResults }) {
    // formik validation schema
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title before searching."),
    })

    const formik = useFormik({
            initialValues : {
                title: ""
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
                // POST request to SearchResults resource
                fetch("/search_results", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then(res => {
                    if (res.status === 200) {
                        res.json()
                        .then(responseSearchResults => setResults(responseSearchResults.results))
                    }
                })
                .catch(error => console.error(error))
            },
        })
    
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='title'>Enter a Title: </label>
                <input
                id='title' 
                name='title'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                />

                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar