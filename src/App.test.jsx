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
        expect(app.state.currentOperator).toEqual("+");
    })
    it('takes the latest operator', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('+');
        app.handleOperator('-');
        expect(app.state.currentValue).toEqual("5");
        expect(app.state.currentOperator).toEqual("-");
    })
    it('number times number', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('*');
        app.handleNumber('6');
        expect(app.state.currentValue).toEqual("6");
    })
    it.skip('number plus number equals', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('*');
        app.handleNumber('5');
        app.handleOperator('=');
        expect(app.state.currentValue).toEqual("25");
    })
    it.skip('number divide number equals', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('/');
        app.handleNumber('5');
        app.handleOperator('=');
        expect(app.state.currentValue).toEqual("1");
    })
    it.skip('equals repeats last operation', () => {
        const app = mount(<App />).instance();
        app.handleNumber('5');
        app.handleOperator('+');
        app.handleNumber('5');
        app.handleOperator('=');
        app.handleOperator('=');
        expect(app.state.currentValue).toEqual("15");
        expect(app.state.currentOperator).toEqual("+"); // needed for repeating =
    })    
});

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
});