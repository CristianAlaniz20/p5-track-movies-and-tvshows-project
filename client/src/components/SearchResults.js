import React from "react";
import Content from "./Content";

function SearchResults({ results }) {
    return (
        <div>
            {results.length > 0 ? (
            // maps each result inside of the results list
            results.map(result => <Content key={`${result.title}-${result.release_date}`} result={result} />)
        ) : (
            <h4>Sorry, no content was found matching that title.</h4>
        )}
        </div>
    )
}

export default SearchResults