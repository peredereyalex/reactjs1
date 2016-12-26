import * as React from 'react';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

export const TypeView = React.createClass({
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
    setView(type){
        ToolbarStore.type = type;
        ToolbarStore.trigger(ToolbarStore.events.data.update);
        ToolbarStore.trigger(ToolbarStore.events.all.hide);
    },
    render() {
        return (
            <div className="topbar__block-wrap">
                <div className={(this.state.visible) ? "topbar__block topbar__block_visibility topbar__block_visibility-active topbar__block_opened" : "topbar__block topbar__block_visibility"}
                     onClick={(event)=> {
                         event.stopPropagation();
                         var v = this.state.visible;
                         ToolbarStore.trigger(ToolbarStore.events.all.hide);
                         this.setState({visible: !v});
                     }}>
                    <span className="topbar__block-title">Type view</span>
                </div>
                <div className={(this.state.visible) ? "filter visibility filter_opened" : "filter visibility"}>
                    <span
                        onClick={ (event) => this.setView("map")}
                        className={(this.props.type=="map") ? "visibility__item visibility__item_map visibility__item_active" : "visibility__item visibility__item_map"}>
                        Map view
                    </span>
                    <span
                        onClick={(event) => this.setView("list")}
                        className={(this.props.type=="list") ? "visibility__item visibility__item_list visibility__item_active" : "visibility__item visibility__item_list"}>
                        List view
                    </span>
                    <span
                        onClick={(event) => this.setView("grid")}
                        className={(this.props.type=="grid") ? "visibility__item visibility__item_grid visibility__item_active" : "visibility__item visibility__item_grid"}>
                        Grid view
                    </span>
                    <span
                        onClick={(event) => this.setView("list_map")}
                        className={(this.props.type=="list_map") ? "visibility__item visibility__item_list-map visibility__item_active" : "visibility__item visibility__item_list-map"}>
                        List/map view
                    </span>
                </div>
            </div>
        );
    }
})
