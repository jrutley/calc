import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Screen extends Component {
    render() {
        return (
            <div id="screen">
                <div className="screen__main">456</div>
                <div className="screen__history">7+4+16</div>
            </div>
        );
    }
}

function Button(props) {
    return (
        <button value={props.value} onClick={() => props.handleButtonClick(props.value)}>
            {props.value}
        </button>
    );
}

class App extends Component {
    render() {
        return ( 
            <div className="App">
                <div id="container">
                    <Screen />
                    <div id="buttons">
                        <Button value="AC" handleButtonClick={(b)=>alert(b)} />
                        <button value="+/-">+/-</button>
                        <button value="%">%</button>
                        <button value="/">/</button>
                        <button value="7">7</button>
                        <button value="8">8</button>
                        <button value="9">9</button>
                        <button value="*">*</button>
                        <button value="4">4</button>
                        <button value="5">5</button>
                        <button value="6">6</button>
                        <button value="-">-</button>
                        <button value="1">1</button>
                        <button value="2">2</button>
                        <button value="3">3</button>
                        <button value="+">+</button>
                        <button className="doublewide" value="0">0</button>
                        <button value=".">.</button>
                        <button value="=">=</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;