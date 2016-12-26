import * as React from 'react';

import { SavedSearchStore } from '../../../stores/SavedSearchStore.jsx';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';

export const SavedSearch = React.createClass({
    getInitialState() {
        return {
            items: [],
            name: SavedSearchStore.name,
            visible: false,
            focus: false
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
        SavedSearchStore.bind(SavedSearchStore.events.data.update, this.dataUpdated);
        SavedSearchStore.getList();
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
        SavedSearchStore.unbind(SavedSearchStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: SavedSearchStore.items,
            name: SavedSearchStore.name,
        });
    },
    hide(){
        if(!this.state.focus)
            this.setState({
                visible: false
            });
    },
    handleToggle(event){
        event.stopPropagation();
        if(!UserStore.token){
            PopupStore.show("auth");
            ToolbarStore.trigger(ToolbarStore.events.all.hide);
        }else{
            var v = this.state.visible;
            ToolbarStore.trigger(ToolbarStore.events.all.hide);
            this.setState({visible: !v});
        }
    },
    handleFocus(e){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: true
        });
    },
    handleBlur(e){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: false
        });
        this.hide();
    },
    handleChange(e){
        SavedSearchStore.name = e.target.value;
        this.dataUpdated();
    },
    handleAdd(e){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: true
        });
        if(SavedSearchStore.name.trim().length < 1)
            return;

        SavedSearchStore.add();
    },
    handleDelete(e, id){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: true
        });
        SavedSearchStore.delete(id);
    },
    render() {
        var items = this.state.items.map(function(item){
            return (
                <span key={item.id} className="box__item" onClick={ (e) => SavedSearchStore.getProperties(item.id) }>
                    {item.name}
                    <i className="box__garbage" onClick={(e) => this.handleDelete(e, item.id)}></i>
                </span>
            );
        }.bind(this));
        return (
            <div className="topbar__block-wrap">
                <div className={(this.state.visible) ? "topbar__block topbar__block_saved-search topbar__block_saved-search-active topbar__block_opened" : "topbar__block topbar__block_saved-search"}
                     onClick={this.handleToggle}>
                    <span className="topbar__block-title">Saved Search</span>
                </div>
                <div className={(this.state.visible) ? "filter box filter_opened" : "filter box"}>
                    <div className="box__search">
                        <input type="text"
                            className="box__search-input"
                            placeholder="Enter name for save"
                            value={this.state.name}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            onFocus={this.handleFocus}/>
                        <div className="box__plus" onClick={this.handleAdd}></div>
                    </div>
                    <div className="box__list">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
})
