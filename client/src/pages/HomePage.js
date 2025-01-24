import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

function HomePage() {
    // search results state
    const [results, setResults] = useState(null)

    return (
        <div>
            <Header />
            <SearchBar setResults={setResults} />
            {/* Checks if anything has been searched */}
            {results ? (
                <SearchResults results={results} />
            ) : (
                <h4>Search for any show you desire!</h4>
            )}
        </div>
    )
}

export default HomePage