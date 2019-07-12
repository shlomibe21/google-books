import React from 'react';

import './ErrorMessages.css';

function ErrorMessage(props) {
    let msg =  props.error;
    if(msg === "User Rate Limit Exceeded. Please sign up") {
        msg = "Rate Limit Exceeded. Please try again in a few minutes!";
    }
    if(msg === "Not Found") {
        msg = "Error: System couldn't find the requested books!";
    }

    return (
        <div className="error-message">{msg}</div>
    );
}

export default ErrorMessage;