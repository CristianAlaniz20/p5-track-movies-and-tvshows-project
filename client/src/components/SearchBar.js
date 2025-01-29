import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ContentContext } from "../contexts/ContentContext";

function SearchBar() {
    const { searchContent } = useContext(ContentContext) // searchContent method from ContentContext

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
                searchContent(values.title)
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