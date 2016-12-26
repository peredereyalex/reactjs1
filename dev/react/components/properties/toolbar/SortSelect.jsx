import * as React from 'react';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

export const SortSelect = React.createClass({
    getInitialState() {
        return {
            visible: false
        };
    },
    componentDidMount() {
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
    },
    hide(){
        this.setState({
            visible: false
        });
    },
    setSort(type, order, name){
        ToolbarStore.sort = {
            type: type,
            order: order,
            name: name
        };
        ToolbarStore.trigger(ToolbarStore.events.data.update);
        ToolbarStore.trigger(ToolbarStore.events.all.hide);
    },
    render() {
        return (
            <div className="topbar__block-wrap">
                <div className={(this.state.visible) ? "topbar__block topbar__block_sort topbar__block_sort-active topbar__block_opened" : "topbar__block topbar__block_sort"}
                     onClick={(event)=> {
                         event.stopPropagation();
                         var v = this.state.visible;
                         ToolbarStore.trigger(ToolbarStore.events.all.hide);
                         this.setState({visible: !v});
                     }}>
                    <span className="topbar__block-title">{this.props.sort.name}</span>
                </div>
                <div className={(this.state.visible) ? "filter sort filter_opened" : "filter sort"}>
                    <span   onClick={ (event) => this.setSort("id", "desc", "Default Sort")}
                            className="sort__item">Default Sort</span>
                    <span   onClick={ (event) => this.setSort("date_sort", "desc", "Newest")}
                            className="sort__item">Newest</span>
                    <span   onClick={ (event) => this.setSort("date_sort", "asc", "Oldest")}
                            className="sort__item">Oldest</span>
                    <span   onClick={ (event) => this.setSort("price", "asc", "Price (low to high)")}
                            className="sort__item">Price (low to high)</span>
                    <span   onClick={ (event) => this.setSort("price", "desc", "Price (high to low)")}
                            className="sort__item">Price (high to low)</span>
                    <span   onClick={ (event) => this.setSort("sqft", "asc", "Area Sq Ft (low to high)")}
                            className="sort__item">Area Sq Ft (low to high)</span>
                    <span   onClick={ (event) => this.setSort("sqft", "desc", "Area Sq Ft (high to low)")}
                            className="sort__item">Area Sq Ft (high to low)</span>
                </div>
            </div>
        );
    }
})
