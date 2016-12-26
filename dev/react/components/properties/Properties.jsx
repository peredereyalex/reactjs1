import * as React from 'react';
import { browserHistory } from 'react-router';

import { ToolbarStore } from '../../stores/ToolbarStore.jsx';
import { PropertiesStore } from '../../stores/PropertiesStore.jsx';
import { MapStore } from '../../stores/MapStore.jsx';

import { Toolbar } from './Toolbar.jsx';

import { Grid } from './view/Grid.jsx';
import { List } from './view/List.jsx';
import { ListMap } from './view/ListMap.jsx';

export const Properties = React.createClass({
    getInitialState() {
        return {
            type: ToolbarStore.type,
            sort: ToolbarStore.sort,
            filter: ToolbarStore.filter,
            search: ToolbarStore.search,
            properties: PropertiesStore.items,
        };
    },
    componentDidMount() {
        MapStore.show();

        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.data.update, this.dataUpdated);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.dataUpdated);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.data.update, this.dataUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.dataUpdated);
    },
    dataUpdated(){
        if(PropertiesStore.items.length==0)
            browserHistory.push("/");
        this.setState({
            type: ToolbarStore.type,
            sort: ToolbarStore.sort,
            filter: ToolbarStore.filter,
            search: ToolbarStore.search,
            properties: PropertiesStore.items,
        });
    },
    render() {
        var properties = this.state.properties;

        properties = properties.filter(function(property) {
            return  parseInt(property.price) > parseInt(this.state.filter.price[0]) &&
                    parseInt(property.price) < parseInt(this.state.filter.price[1]) &&
                    parseInt(property.sqft) > parseInt(this.state.filter.sqft[0]) &&
                    parseInt(property.sqft) < parseInt(this.state.filter.sqft[1]);
        }.bind(this));
        if(parseInt(this.state.filter.type)!=0){
            properties = properties.filter(function(property) {
                return  parseInt(property.type_id) == parseInt(this.state.filter.type)
            }.bind(this));
        }

        if(this.state.search.length>0){
            properties = properties.filter(function(property) {
                return property.title.toLowerCase().includes(this.state.search.toLowerCase()) || property.subtitle.toLowerCase().includes(this.state.search.toLowerCase())
            }.bind(this));
        }

        if(this.state.sort.order=="asc"){
            properties.sort(function(a, b) {
                return parseInt(a[this.state.sort.type]) - parseInt(b[this.state.sort.type]);
            }.bind(this));
        }else{
            properties.sort(function(b, a) {
                return parseInt(a[this.state.sort.type]) - parseInt(b[this.state.sort.type]);
            }.bind(this));
        }

        return (
            <div style={{position: "relative"}}>
                <Toolbar/>
                <section className="map-wrap">
                    <div className="view-wrap">
                        <div className="view">
                            <List type={this.state.type} items={properties}/>
                            <Grid type={this.state.type} items={properties}/>
                            <ListMap type={this.state.type} items={properties}/>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
})
