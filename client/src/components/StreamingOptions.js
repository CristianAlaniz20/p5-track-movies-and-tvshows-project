import React, { useState, useEffect } from "react";

function StreamingOptions({ setStreamingOptions }) {
    // selectedServices state
    const [selectedServices, setSelectedServices] = useState([]);

    // streaming services array
    const streaming_services = [
        "Netflix", "Amazon Prime Video", "Disney+", "Hulu", "HBO Max", "Apple TV+", 
        "Peacock", "Paramount+", "YouTube", "Fandango at Home", "Google Play Movies and TV"
    ];

    useEffect(() => {
        // Update the parent component with the current selection of streaming services
        setStreamingOptions(selectedServices.join('|'));
    }, [selectedServices]);

    function handleCheckboxChange(service) {
        setSelectedServices(prevSelected => {
            if (prevSelected.includes(service)) {
                // Remove the service if it's already selected
                return prevSelected.filter(selected => selected !== service);
            } else {
                // Add the service if it's not selected
                return [...prevSelected, service];
            }
        });
    };

    return (
        <div>
            <label>Select all streaming service options for the movie:</label>
            {/* Create a checkbox for every service in streaming service */}
            {streaming_services.map(service => (
                <div key={service} >
                    <label >
                        <input 
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={() => handleCheckboxChange(service)}
                        />
                        {service}
                    </label>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default StreamingOptions;