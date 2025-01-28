import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // isAuthenticated state

    useEffect(() => {
        // check user session
        const checkSession = async () => {
            try {
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
        <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
