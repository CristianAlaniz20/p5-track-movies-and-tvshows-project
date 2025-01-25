import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

function HomePage() {
    // search results state
    const [results, setResults] = useState(null)
    // filter selection state
    const [filter, setFilter] = useState("all")

    // sets the filter every time a different option is selected
    function handleSelectChange(event) {
        setFilter(event.target.value)
    }

    // filters the results 
    const filteredResults = results ? results.filter(result => {
        switch (filter) {
            case "movies":
                return !!result.duration
            case "tv shows":
                return !!result.seasons
            default:
                return true
        }
    }) : [];

    return (
        <div>
            <Header />
            <SearchBar setResults={setResults} />
            {/* dropdown for filtration */}
            <label htmlFor="search-filter">Filter: </label>
            <select name="search-filter" value={filter} onChange={handleSelectChange}>
                <option value="all">all</option>
                <option value="movies">movies</option>
                <option value="tv shows">tv shows</option>
            </select>
            {/* Checks if anything has been searched */}
            {results ? (
                <SearchResults results={filteredResults} />
            ) : (
                <h4>Search for any show you desire!</h4>
            )}
        </div>
    )
}

export default HomePage