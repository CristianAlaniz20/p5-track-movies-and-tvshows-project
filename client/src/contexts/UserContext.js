import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // isAuthenticated state
    const [userMovieWatchEvents, setUserMovieWatchEvents] = useState([])
    const [userTVShowWatchEvents, setUserTVShowWatchEvents] = useState([])
    const [userMovies, setUserMovies] = useState([])
    const [userTVShows, setUserTVShows] = useState([])
    console.log(user)
    console.log(userMovies)
    console.log(userTVShows)

    useEffect(() => {
        // check user session
        const checkSession = async () => {
            try {
                console.log("Hi from refresh page.")
                const response = await fetch('/check_session');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Session check failed", error);
            }
        };

        checkSession();
    }, []);

    // Update userMovies,userTVShows when user changes
    useEffect(() => {
        if (user) {
            setUserMovieWatchEvents(user.movie_watch_events || [])
            setUserTVShowWatchEvents(user.tv_show_watch_events || [])
            setUserMovies(user.movies || []);
            setUserTVShows(user.tv_shows || []);
        } else {
            setUserMovieWatchEvents([]);
            setUserTVShowWatchEvents([]);
            setUserMovies([]);
            setUserTVShows([]);
        }
    }, [user]);

    // login function
    const login = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    // logout function
    const logout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'DELETE',
            });

            if (response.ok) {
                setUser(null);
                setIsAuthenticated(false);
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            isAuthenticated, 
            login, 
            logout,
            userMovies,
            userTVShows,
            setUserMovies,
            setUserTVShows,
            userMovieWatchEvents,
            userTVShowWatchEvents,
            setUserMovieWatchEvents,
            setUserTVShowWatchEvents,
        }}>
            {children}
        </UserContext.Provider>
    );
};
