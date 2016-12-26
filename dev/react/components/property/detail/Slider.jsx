import * as React from 'react';

import OwlCarousel from 'react-owl-carousel';

import { PropertyStore } from '../../../stores/PropertyStore.jsx';

export const Slider = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.item,
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            item: PropertyStore.item
        });
    },
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (parseInt(this.state.item.id) == parseInt(nextState.item.id)) {
    //         return false;
    //     }
    //     if (nextProps.status == "images") {
    //         return true;
    //     }
    //     return false;
    // },
    render() {
        var images = this.state.item.images.map(function(image){
            return <img key={image.path} src={"http://upreal-api.develop.redlg.ru"+image.path} className="detail__image"/>;
        });

        return (
            <OwlCarousel
                slideSpeed={600}
                lazyEffect
                singleItem
                navigation
                baseClass="owl-carousel">
                {images}
            </OwlCarousel>
        );
    }
})
