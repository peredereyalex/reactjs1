import * as React from 'react';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';

export const FavoriteList = React.createClass({
    getInitialState() {
        return {
            visible: false,
            items: FavoriteStore.items
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
        FavoriteStore.bind(FavoriteStore.events.data.update, this.dataUpdated);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
        FavoriteStore.unbind(FavoriteStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: FavoriteStore.items
        });
    },
    hide(){
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
    render() {
        var items = this.state.items.map(function(item) {
            var span = "";
            if(parseInt(item.id)==0){
                span = <span
                    key={item.id}
                    onClick={(e)=>PopupStore.show("favorite")}
                    className="heart__item"
                    data-count={item.count}>
                    {item.name}
                </span>
            }else{
                span = <span
                    key={item.id}
                    onClick={(e) => FavoriteStore.getProperties(item.id)}
                    className="heart__item"
                    data-count={item.count}>
                    {item.name}
                </span>
            }
            return span;
        })
        return (
            <div className="topbar__block-wrap">
                <div className={(this.state.visible) ? "topbar__block topbar__block_heart topbar__block_heart-active topbar__block_opened" : "topbar__block topbar__block_heart"}
                     onClick={this.handleToggle}>
                </div>
                <div className={(this.state.visible) ? "filter heart filter_opened" : "filter heart"}>
                    {/* <div className="heart__search">
                        <i className="box__search-ico"></i>
                        <input type="text" className="heart__search-input" placeholder="Search collections..."/>
                    </div> */}
                    <div className="heart__list">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
})
