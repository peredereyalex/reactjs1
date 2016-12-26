import * as React from 'react';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

export const SearchListing = React.createClass({
    getInitialState() {
        return {
            search: ToolbarStore.search,
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.data.update, this.dataUpdated);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            search: ToolbarStore.search,
        });
    },
    handleChange(e){
        ToolbarStore.search = e.target.value;
        ToolbarStore.trigger(ToolbarStore.events.data.update);
    },
    render() {
        return (
            <div className="topbar__form">
                <input className="topbar__search"
                    value={this.state.search}
                    type="text"
                    placeholder="Search listings..."
                    onChange={this.handleChange}/>
                <i className="topbar__ico topbar__ico_search"></i>
            </div>
        );
    }
})
