import React, { useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { ContentContext } from "../contexts/ContentContext";

function SearchDatabase() {
    const { searchResults } = useContext(ContentContext) // searchResults state from ContentContext
    const [filter, setFilter] = useState("all") // filter selection state

    // sets the filter every time a different option is selected
    function handleSelectChange(event) {
        setFilter(event.target.value)
    }

    // filters the results 
    const filteredResults = searchResults ? searchResults.filter(result => {
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
            <SearchBar />
            {/* dropdown for filtration */}
            <label htmlFor="search-filter">Filter: </label>
            <select name="search-filter" value={filter} onChange={handleSelectChange}>
                <option value="all">all</option>
                <option value="movies">movies</option>
                <option value="tv shows">tv shows</option>
            </select>
            {/* Checks if anything has been searched */}
            {searchResults ? (
                <SearchResults results={filteredResults} />
            ) : (
                <h4>Search for any show you desire!</h4>
            )}
        </div>
    )
}

export default SearchDatabase