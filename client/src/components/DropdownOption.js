import React from "react";

function DropdownOption({ optionValue }) {
    return (
        <option value={optionValue}>{optionValue}</option>
    )
}

export default DropdownOption