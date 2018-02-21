import React from 'react'

const Alert = (props) => {
    return (
        <div className="Alert-container">
            <span className="Alert-closebtn" onClick={props.handleCancelAlert}>
                &times;
        </span>
            <p className="Alert-message"> {props.message} </p>
        </div>
    )
}

export default Alert;
