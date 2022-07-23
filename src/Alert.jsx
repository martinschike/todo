import React, { useEffect } from "react";


const Alert = ({ type, msg, alertMessage, list }) => {

useEffect(() => {
    const timeout = setTimeout(() => {
        alertMessage()
    }, 3000)
    return () => clearTimeout(timeout)
}, [list]);

    return (
        <p className={`alert alert-${type}`}>
            {msg}
        </p>
    );
};


export default Alert;