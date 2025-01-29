import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Dashboard = () => {
    const { user } = useContext(UserContext);

    // Provide default empty arrays to avoid undefined errors
    const movie_watch_events = user?.movie_watch_events || [];
    const tv_show_watch_events = user?.tv_show_watch_events || [];

    const renderEventCard = (event) => {
        const { movie, status, notes, rating } = event;
        return (
            <div className="card">
                {movie && movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} className="poster" />
                ) : (
                    <div>No Image Available</div>
                )}
                <h3>{movie?.title || "Unknown Title"}</h3>
                <p>Genre: {movie?.genre || "Unknown Genre"}</p>
                <p>Status: {status}</p>
                <p>Rating: {"⭐".repeat(rating)}</p>
                <p>Notes: {notes || "No notes yet"}</p>
                <button>Edit</button>
                <button>Mark as Watched</button>
                <button>Delete</button>
            </div>
        );
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Welcome, {user?.username || "Guest"}!</h1>
                <p>You have {movie_watch_events.length} movies and {tv_show_watch_events.length} shows to track.</p>
            </header>
            <main>
                <div className="filters">
                    {/* Add filters like status and type */}
                </div>
                <div className="events-grid">
                    {movie_watch_events.map(renderEventCard)}
                    {tv_show_watch_events.map((watch_event) => renderEventCard(watch_event))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;