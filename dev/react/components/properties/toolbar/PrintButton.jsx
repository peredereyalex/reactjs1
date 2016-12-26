import * as React from 'react';

export const PrintButton = React.createClass({
    handleClick(e){
        e.preventDefault();
        window.print();
    },
    render() {
        return (
            <i onClick={this.handleClick} className="topbar__ico topbar__ico_print"></i>
        );
    }
})
