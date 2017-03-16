import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Screen extends Component {
    render() {
        return (
            <div id="screen">
                <div className="screen__main">{this.props.screenValue}</div>
                <div className="screen__history">7+4+16</div>
            </div>
        );
    }
}

function Button(props) {
    return (
        <button className={props.className?props.className:""} value={props.value} onClick={() => props.handleButtonClick(props.value)}>
            {props.value}
        </button>
    );
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            currentValue: 0,
            history: []
        }
    }

    handleNumberLogic(state, number){
        console.log(state.currentValue);

        //const decimalTest = /\d+\.$/;
        
        const newValue = parseFloat(state.currentValue + number);
        return {...state, currentValue: newValue};
    }
    handleNumber(number){
        this.setState(this.handleNumberLogic(this.state, number));
    }

    render() {
        return ( 
            <div className="App">
                <div id="container">
                    <Screen screenValue={this.state.currentValue} history={this.state.history} />
                    <div id="buttons">
                        <Button value="AC" handleButtonClick={(b)=>alert(b)} />
                        <button value="+/-">+/-</button>
                        <button value="%">%</button>
                        <button value="/">/</button>
                        <Button value="7" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="8" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="9" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <button value="*">*</button>
                        <Button value="4" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="5" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="6" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <button value="-">-</button>
                        <Button value="1" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="2" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="3" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <button value="+">+</button>
                        <Button className="doublewide" value="0" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="." handleButtonClick={(b)=>this.handleNumber(b)} />
                        <button value="=">=</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;