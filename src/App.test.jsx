import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <App/> , div);
});

describe('number entry', () => {
    const div = document.createElement('div');
    var app = new App();
    it('handles entering positive numbers', () => {
        let state = app.handleNumberLogic(app.state, '5');
        state = app.handleNumberLogic(state, '5');
        expect(state.currentValue).toEqual(55);
    })
    it.skip('ignores decimal at end', () => {
        let state = app.handleNumberLogic(app.state, '5');
        state = app.handleNumberLogic(state, '.');
        expect(state.currentValue).toEqual(5);
    })
    it.skip('ignores any second decimal point', () => {
        let state = app.handleNumberLogic(app.state, '5');
        state = app.handleNumberLogic(state, '.');
        state = app.handleNumberLogic(app.state, '1');
        state = app.handleNumberLogic(state, '.');
        state = app.handleNumberLogic(state, '2');
        expect(state.currentValue).toEqual(5.12);
    })
    it.skip('adds a zero at the front if decimal is first', () => {
        let state = app.handleNumberLogic(state, '.');
        state = app.handleNumberLogic(app.state, '1');
        expect(state.currentValue).toEqual(0.1);
    })
});