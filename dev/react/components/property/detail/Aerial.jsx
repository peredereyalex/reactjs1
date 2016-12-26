import * as React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

import { PropertyStore } from '../../../stores/PropertyStore.jsx';

export const Aerial = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.property,
            container: null,
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);

        this.setState({
            container: $('#aerial')
        });
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
    },
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status == "aerial") {
            if( parseFloat(this.state.item.coord_x) == parseFloat(nextState.item.coord_x) &&
                parseFloat(this.state.item.coord_y) == parseFloat(nextState.item.coord_y) &&
                this.props.status == "aerial")
                    return false;

            return true;
        }
        return false;
    },
    dataUpdated(){
        this.setState({
            item: PropertyStore.item
        });
    },
    render() {
        if(this.state.container != null){
            var location = {lat:parseFloat(this.state.item.coord_x), lng: parseFloat(this.state.item.coord_y)};
            var container = document.getElementById('aerial');
            var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];
            var mapOptions = {
                zoom: 18,
                center: location,
                scrollwheel: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                styles : styles
            };
            var map = new google.maps.Map(document.getElementById("aerial"), mapOptions);
            var markerIco = '/app/i/min/map-marker.png';
            var marker = new google.maps.Marker({
                position:location,
                map: map,
                icon: "/assets/i/origin/map-marker.png"
            });
        }

        return <div id="aerial"></div>;
    }
})
