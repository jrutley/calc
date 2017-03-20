import React, { Component } from 'react';

function Button(props) {
    return (
        <button className={props.className?props.className:""} value={props.value} onClick={() => props.handleButtonClick(props.value)}>
            {props.value}
        </button>
    );
}

export default Button;