import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Screen extends Component {
    render() {
        return (
            <div id="screen">
                <div className="screen__main">{this.props.screenValue}</div>
                <div className="screen__history">{this.props.history.filter(x=>x!=='=')}</div>
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
            history: ['0']
        }
    }

    isDigitOrEquals(candidate){
        return this.isDigit(candidate) || candidate === '=';
    }
    isDigit(candidate){
        return candidate.match(/[\d.]/);
    }

    handleEquals(){
        const state = {...this.state};
        const lastHistoryElement = state.history.length - 1;
        if(!this.isDigitOrEquals(state.history[lastHistoryElement]) && lastHistoryElement >= 1){
            state.history.push(state.history[lastHistoryElement - 1]);
        }
        if(lastHistoryElement >= 2 && state.history[lastHistoryElement] === '='){
            state.history = state.history.concat(state.history.slice(-3, -1));
        }
        state.history.push('=');
        state.currentValue = eval(state.history.filter(h=>h !== '=').reduceRight((acc, cur) => cur.concat(acc),'')).toString();
        this.setState(state);        
    }

    handleNumber(number){
        const state = {...this.state};
        const decimalTest = /\d+\.\d+$/;

        const lastHistoryElement = state.history.length - 1;
        if(lastHistoryElement === -1 || !this.isDigit(state.history[lastHistoryElement])){
            state.currentValue = 0;
        }

        const newValue = parseFloat(state.currentValue + number).toString();

        console.log(`Number ${number} newValue ${newValue}`);
        console.log(`lastHistoryElement ${lastHistoryElement} state.history[lastHistoryElement] ${state.history[lastHistoryElement]}`);

        if(lastHistoryElement === -1 || !this.isDigit(state.history[lastHistoryElement])){
            state.history.push(number)
        } else if(state.currentValue === state.history[lastHistoryElement] || '0' === state.history[lastHistoryElement]){
            state.history[lastHistoryElement] = newValue;
        }

        state.currentValue = newValue.concat(number === '.' && !newValue.match(decimalTest) ? number : "");
        

        this.setState(state);
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