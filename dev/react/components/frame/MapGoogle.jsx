import * as React from 'react';
import { browserHistory } from 'react-router';

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

import { PropertiesStore } from '../../stores/PropertiesStore.jsx';
import { PropertyStore } from '../../stores/PropertyStore.jsx';
import { MapStore } from '../../stores/MapStore.jsx';
import { ToolbarStore } from '../../stores/ToolbarStore.jsx';
import { FilterStore } from '../../stores/FilterStore.jsx';

export const MapGoogle = React.createClass({
    getInitialState() {
        return {
            items: PropertiesStore.items,
            item: PropertyStore.item,
            visible: MapStore.visible,
            sort: ToolbarStore.sort,
            filter: ToolbarStore.filter,
        };
    },
    componentDidMount() {
        this.dataUpdated();

        MapStore.bind(MapStore.events.data.update, this.dataUpdated);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.dataUpdated);
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);
        ToolbarStore.bind(ToolbarStore.events.data.update, this.dataUpdated);

    },
    componentWillUnmount() {
        MapStore.unbind(MapStore.events.data.update, this.dataUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.dataUpdated);
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
        ToolbarStore.unbind(ToolbarStore.events.data.update, this.dataUpdated);
    },
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.visible){
            var itemsFiltered = FilterStore.properties(nextState.items, nextState.filter);

            MapStore.init(document.getElementById("map"));
            MapStore.createMarkers(nextState.item, itemsFiltered);
            MapStore.setCenter(nextState.item, itemsFiltered);
        }else{
            MapStore.clear();
        }

        return false;
    },
    dataUpdated(){
        this.setState({
            items: PropertiesStore.items,
            item: PropertyStore.item,
            visible: MapStore.visible,
            sort: ToolbarStore.sort,
            filter: ToolbarStore.filter,
        });
    },
    render() {
        return (
            <div id="map" style={{display: "none"}}></div>
        );
    }
})
