import React, { useState, useEffect } from 'react';
import DropdownOption from './DropdownOption';

function ReleaseDate({ setReleaseDate }) {
    // month, day, and year states
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    // months array
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    // create a range between two numbers
    function range(start, end, step = 1) {
        const output = [];
        for (let i = start; i < end; i += step) {
          output.push(i);
        }
        return output;
      }

    // awaits for month, day, and year to have a value before setting release date
    useEffect(() => {
        if (month && day && year) {
            const formattedDate = `${month} ${day} ${year}`;
            setReleaseDate(formattedDate);
        }
    }, [month, day, year]);

    return (
        <div>
        <label>Release Date:</label>
        {/* Create an option for every month in months */}
        <select onChange={(e) => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            {months.map(month => <DropdownOption key={month} optionValue={month} />)}
        </select>
        {/* Create an option for every number in day range */}
        <select onChange={(e) => setDay(e.target.value)}>
            <option value="">Select Day</option>
            {range(1, 31).map(day => <DropdownOption key={day} optionValue={day} />)}
        </select>
        {/* Create an option for every number in year range */}
        <select onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {range(1800, 2025).map(year => <DropdownOption key={year} optionValue={year}/>)}
        </select>
        </div>
    )
}

export default ReleaseDate;