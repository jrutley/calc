import React from 'react';
import App from './App';
import { mount } from 'enzyme';

describe('operator entry', () => {
    it('first addition no second number', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('+');
        expect(app.state.currentValue).toEqual("5");
        expect(app.state.history).toEqual(["5", "+"]);
    })
    it('takes the latest operator', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('+');
        app.handleOperator('-');
        expect(app.state.currentValue).toEqual("5");
        expect(app.state.history).toEqual(['5', '-']);
    })
    it('number times number', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('*');
        app.handleNumber('6');
        expect(app.state.history).toEqual(["5", "*", "6"]);
        expect(app.state.currentValue).toEqual("6");
    })
    it('number plus number equals', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('*');
        app.handleNumber('5');
        app.handleEquals();
        expect(app.state.currentValue).toEqual("25");
    })
    it('number subtract number equals', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('-');
        app.handleNumber('1');
        app.handleEquals();
        expect(app.state.history).toEqual(["5", "-", "1", "="]);
        expect(app.state.currentValue).toEqual("4");
    })
    it('number divide number equals', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('/');
        app.handleNumber('5');
        app.handleEquals();
        expect(app.state.currentValue).toEqual("1");
    })
    it('equals repeats last operation', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('+');
        app.handleNumber('5');
        app.handleEquals();
        app.handleEquals();
        expect(app.state.currentValue).toEqual("15");
    })    
    it('equals repeats last operation on single number', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('+');
        app.handleEquals();
        expect(app.state.currentValue).toEqual("10");
    })
});

describe('clear button', () => {
    it.skip('clears on click', ()=>{
        // TODO
    })
    it.skip('c to clear the current number', ()=>{
        // TODO
    })
})

describe('number entry', () => {
    it('handles entering positive numbers', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleNumber('5');
        expect(app.state.currentValue).toEqual("55");
    })
    it('ignores decimal at end', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleNumber('.');
        expect(app.state.currentValue).toEqual("5.");
    })
    it('ignores any second decimal point', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleNumber('.');
        app.handleNumber('1');
        app.handleNumber('.');
        app.handleNumber('2');
        expect(app.state.currentValue).toEqual("5.12");
    })
    it('adds a zero at the front if decimal is first', () => {
        const app = mount(<App />).instance();
        app.handleNumber('.');
        app.handleNumber('1');
        expect(app.state.currentValue).toEqual("0.1");
    })
    it('adds a zero at the front if decimal is first and shows in history', () => {
        const app = mount(<App />).instance();
        app.handleNumber('.');
        app.handleNumber('1');
        expect(app.state.history[0]).toEqual("0.1");
    })
    it.skip('after an equals followed by a number, clear the history', ()=>{
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleNumber('+');
        app.handleNumber('5');
        app.handleEquals();
        app.handleNumber('6');
        expect(app.state.history[0]).toEqual("6");
        expect(app.state.currentValue).toEqual("6");
    })
});