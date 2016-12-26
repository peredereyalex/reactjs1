import * as React from 'react';

import { PropertyStore } from '../../../stores/PropertyStore.jsx';

export const Panorama = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.item,
            container: null
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);

        this.setState({
            container: $('#panorama')
        });
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            item: PropertyStore.item
        });
    },
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status == "street") {
            if( parseFloat(this.state.item.coord_x) == parseFloat(nextState.item.coord_x) &&
                parseFloat(this.state.item.coord_y) == parseFloat(nextState.item.coord_y) &&
                this.props.status == "street")
                    return false;

            return true;
        }
        return false;
    },
    render() {
        if(this.state.container != null){
            var container = document.getElementById('panorama');
            var panorama = new google.maps.StreetViewPanorama(
                container, {
                    zoom: 1
                });
            panorama.setPosition( {lat:parseFloat(this.state.item.coord_x), lng: parseFloat(this.state.item.coord_y)});
        }

        return <div id="panorama"></div>;
    }
})
