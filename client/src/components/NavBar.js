import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
    const { logout } = useContext(UserContext) // logout function from UserContext

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
            <Link to="/search_database">
                <button>Search Database</button>
            </Link>
            <Link to='/movies/new' >
                <button>Create Movie</button>
            </Link>
            <Link to='/tv_shows/new' >
                <button>Create TV Show</button>
            </Link>

            <button onClick={() => logout()} >Logout</button>
        </nav>
    )
}

export default NavBar