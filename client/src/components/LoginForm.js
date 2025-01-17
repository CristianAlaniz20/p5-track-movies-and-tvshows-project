import React from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function LogInForm() {
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username."),
        password: yup.string().required("Must enter a password.")
    })

    const formik = useFormik({
        initialValues : {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // POST request to Login resource
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(res => {
                if (res.status == 201) {
                    res.json()
                    // get setUser from Redux context
                    .then(responseUser => setUser(responseUser))
                }
            })
            .catch(error => console.error(error))
        },
    })
        
    return (
        <>
            <h2>User Log In Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input
                id='username' 
                name='username'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                />
                <br />

                <label htmlFor='password'>Password: </label>
                <input
                id='password'
                name='password'
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />
                <br />

                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default LogInForm;