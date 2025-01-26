import React from "react";

function DisplayErrors({ errors }) {
    return (
      <div>
        {Object.keys(errors).map((key) => (
          <div key={key} style={{ color: 'red' }}>
            {errors[key]}
          </div>
        ))}
      </div>
    );
}

export default DisplayErrors