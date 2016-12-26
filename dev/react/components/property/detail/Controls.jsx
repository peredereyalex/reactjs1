import * as React from 'react';

import { browserHistory, Link } from 'react-router';

import { PropertiesStore } from '../../../stores/PropertiesStore.jsx';

export const ControlsArrows = React.createClass({

    render() {


        return (
        	<div className="controls">
                <span onClick={this.goBack}
                    className="controls__back">{(PropertiesStore.items.length > 0) ? "Back to result" : "Back to Home page"}</span>
                <div className="controls__arrows" style={{display: (PropertiesStore.items.length > 0) ? "block" : "none"}}>
                    {navigationLeft}
                    {current+1}/{count}
                    {navigationRight}
                </div>
                <span
                    onClick={this.changeWindowState}
                    className="controls__size"></span>
            </div>
        );
    }
})
