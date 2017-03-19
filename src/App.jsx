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

    handleEquals(){
        const state = {...this.state};
        state.currentValue = eval(this.state.history.reduce((acc, cur) => cur.concat(acc),'')).toString();
        this.setState(state);        
    }

    handleNumber(number){
        const newState = {...this.state};
        const decimalTest = /\d+\.\d+$/;

        const lastHistoryElement = newState.history.length - 1;
        if(lastHistoryElement === -1 || !newState.history[lastHistoryElement].match(/[\d\.]/)){
            newState.currentValue = 0;
        }

        const newValue = parseFloat(newState.currentValue + number).toString();

        if(lastHistoryElement === -1 || !newState.history[lastHistoryElement].match(/[\d\.]/)){
            newState.history.push(number)
        } else if(newState.currentValue === newState.history[lastHistoryElement]){
            newState.history[lastHistoryElement] = newValue;
        }

        newState.currentValue = newValue.concat(number === '.' && !newValue.match(decimalTest) ? number : "");
        

        this.setState(newState);
    }

    handleOperator(operator){
        const state = {...this.state};

        state.history.push(operator);
        state.currentOperator = operator;

        this.setState(state);
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
                        <Button value="/" handleButtonClick={(op)=>this.handleOperator(op)} />
                        <Button value="7" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="8" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="9" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="*" handleButtonClick={(op)=>this.handleOperator(op)} />
                        <Button value="4" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="5" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="6" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="-" handleButtonClick={(op)=>this.handleOperator(op)} />
                        <Button value="1" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="2" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="3" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="+" handleButtonClick={(op)=>this.handleOperator(op)} />
                        <Button className="doublewide" value="0" handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="." handleButtonClick={(b)=>this.handleNumber(b)} />
                        <Button value="=" handleButtonClick={(e)=>this.handleEquals()} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;