import React, { Component } from 'react';
import './App.css';
import Screen from './Screen'
import Button from './Button'

class App extends Component {
    constructor(){
        super();
        this.state = {
            currentValue: 0,
            history: ['0']
        }
    }

    isOperator(candidate){
        return !this.isDigitOrEquals(candidate);
    }
    isDigitOrEquals(candidate){
        return this.isDigit(candidate) || candidate === '=';
    }
    isDigit(candidate){
        return candidate.match(/[\d.]/);
    }

    lastElement(history){
        const lastHistoryElement = history.length - 1;
        return history[lastHistoryElement];
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

        let lastHistoryElement = state.history.length - 1;
        if(!this.isDigit(state.history[lastHistoryElement])){
            state.currentValue = 0;
        }
        if(state.history[lastHistoryElement] === '='){
            state.currentValue = 0;
            state.history = ['0'];
            lastHistoryElement = 0;
        }

        const newValue = parseFloat(state.currentValue + number).toString();

        if(!this.isDigit(state.history[lastHistoryElement])){
            state.history.push(number)
        } else if(state.currentValue === state.history[lastHistoryElement] || '0' === state.history[lastHistoryElement]){
            state.history[lastHistoryElement] = newValue;
        }

        state.currentValue = newValue.concat(number === '.' && !newValue.match(decimalTest) ? number : "");
        this.setState(state);
    }

    handleOperator(operator){
        const state = {...this.state};

        if(this.isOperator(this.lastElement(state.history))){
            state.history[state.history.length - 1] = operator;
        } else{
            state.history.push(operator);
        }
        this.setState(state);
    }

    handleClear(){
        const state = {...this.state};

        const lastElement = this.lastElement(state.history);
        if(lastElement === '0' || this.isOperator(lastElement)){
            state.history = ['0'];
        }
        else{
            state.history[state.history.length - 1] = '0';
        }
        state.currentValue = '0';

        this.setState(state);
    }

    render() {
        return ( 
            <div className="App">
                <div id="container">
                    <Screen screenValue={this.state.currentValue} history={this.state.history} />
                    <div id="buttons">
                        <Button value="C" handleButtonClick={(b)=>this.handleClear()} />
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