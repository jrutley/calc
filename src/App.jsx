import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return ( 
            <div className = "App">
                <div id="container">
                    <div id="screen"></div>
                    <div id="buttons">
                        <button value="AC">AC</button>
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