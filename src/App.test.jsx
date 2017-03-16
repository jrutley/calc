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
});