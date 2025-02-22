import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm() {
    // formik validation schema
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
            // POST request to Signup Resource
            fetch("/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values, null, 2),
            })
            .then(res => {
                if (res.status === 201) {
                    res.json()
                    console.log("Successfully signed up!")
                    //.then(responseUser => setUser(responseUser))
                } 
            })
            .catch(error => console.error(error))
          },
        })
    
    return (
        <>
            <h2>User Sign Up Form</h2>
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

                <button type="submit">Sign Up</button>
        </form>
      </>
    )
}

export default SignupForm