import React, { useState } from "react";
import Header from "../components/Header";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

function LoginPage() {
    const [hasAccount, setHasAccount] = useState(true)

    const handleHasAccountButtonClick = () => setHasAccount(!hasAccount)

    return (
        <div>
            <Header />
            {hasAccount ? (
                <>
                    <LogInForm />
                    <br />
                    <p>Don't have an account?</p>
                    <button onClick={handleHasAccountButtonClick}>Create An Account</button>
                </>
            ) : (
                <>
                    <SignUpForm />
                    <br />
                    <p>Already have an account?</p>
                    <button onClick={handleHasAccountButtonClick}>Go to Log In</button>
                </>
            )}
        </div>
    )
}

export default LoginPage