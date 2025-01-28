import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
    const { setUser } = useContext(UserContext) // setter function for user state

    function handleLogoutClick() {
        // DELETE request to Logout Resource
        fetch("/logout", { method: "DELETE" })
        .then(res => {
            if (res.status === 200) {
                setUser(null)
            }
        })
        .catch(error => console.error(error))
    }

    // NavBar CSS styling
    const NavBarStyling = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    }

    return (
        <nav style={NavBarStyling}>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to='/create_movie' >
                <button>Create Movie</button>
            </Link>
            <Link to='/create_tv_show' >
                <button>Create TV Show</button>
            </Link>

            <button onClick={handleLogoutClick} >Logout</button>
        </nav>
    )
}

export default NavBar