import React, { useState } from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function LoginPage({ setIsloggedIn }) {
    const [hasAccount, setHasAccount] = useState(true)

    const handleHasAccountButtonClick = () => setHasAccount(!hasAccount)

    return (
        <div>
            <Header />
            {hasAccount ? (
                <>
                    <LoginForm setIsloggedIn={setIsloggedIn} />
                    <br />
                    <p>Don't have an account?</p>
                    <button onClick={handleHasAccountButtonClick}>Create An Account</button>
                </>
            ) : (
                <>
                    <SignupForm />
                    <br />
                    <p>Already have an account?</p>
                    <button onClick={handleHasAccountButtonClick}>Go to Log In</button>
                </>
            )}
        </div>
    )
}

export default LoginPage