import * as React from 'react';
import { browserHistory } from 'react-router';

import { ToolbarStore } from '../../stores/ToolbarStore.jsx';
import { PropertyStore } from '../../stores/PropertyStore.jsx';
import { PropertiesStore } from '../../stores/PropertiesStore.jsx';
import { MapStore } from '../../stores/MapStore.jsx';

import { Detail } from './Detail.jsx';

export const PropertyPage = React.createClass({
    getInitialState() {
        return {
            filter: ToolbarStore.filter,
            sort: ToolbarStore.sort,
            properties: PropertiesStore.items,
            item: PropertyStore.item
        };
    },
    componentDidMount() {
        MapStore.show();

        this.setState({
            filter: ToolbarStore.filter,
            sort: ToolbarStore.sort,
            properties: PropertiesStore.items,
            item: PropertyStore.item
        });
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.dataUpdated);
        PropertyStore.getById(this.props.params.propertyId);
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.dataUpdated);
    },
    componentWillReceiveProps(nextProps){
        PropertyStore.getById(nextProps.params.propertyId);
    },
    dataUpdated(){
        this.setState({
            filter: ToolbarStore.filter,
            properties: PropertiesStore.items,
            item: PropertyStore.item
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
                <section className="map-wrap">
                    <div className="view-wrap">
                        <Detail item={this.state.item} items={properties}/>
                    </div>
                </section>
            </div>

        );
    }
})
