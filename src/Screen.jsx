import React, { Component } from 'react';

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

export default Screen;