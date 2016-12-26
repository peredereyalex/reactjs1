import * as React from 'react';
import { Link } from 'react-router';
import OwlCarousel from 'react-owl-carousel';

import { FeaturedStore } from '../../stores/FeaturedStore.jsx';

var wNumb = require('wnumb');

export const IndexFeatured = React.createClass({
    getInitialState() {
        return {
            items: FeaturedStore.items
        };
    },
    componentDidMount() {
        this.dataUpdated();
        FeaturedStore.bind(FeaturedStore.events.items.update, this.dataUpdated);
        FeaturedStore.getList();
    },
    componentWillUnmount() {
        FeaturedStore.unbind(FeaturedStore.events.items.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: FeaturedStore.items
        });
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });
        var featured = this.state.items.map(function(item) {
            return (
                <Link to={"/property/"+item.id} className="featured-properties__item" key={item.id}>
                    <div className="featured-properties__image-wrap" style={{background: "url(http://upreal-api.develop.redlg.ru"+item.photo+")"}}>
                        <span className="featured-properties__label">Featured</span>
                        <div className="featured-properties__bottom">
                            <span className="featured-properties__price">${format.to(parseInt(item.price))}</span>
                            <div>
                                <div className="featured-properties__ico featured-properties__ico_heart">
                                    <span className="featured-properties__ico-hint">Favorite</span>
                                </div>
                                <div className="featured-properties__ico featured-properties__ico_photo">
                                    <span className="featured-properties__ico-hint">Photos({item.photos})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="featured-properties__text">
                        <span>{item.title}</span>
                        <label>{item.bed} beds • {item.bath} baths • {item.sqft} Sq Ft</label>
                    </div>
                </Link>
            );
        });

        return (
            <section className="featured-properties-wrap">
        		<div className="featured-properties content">
        			<span className="featured-properties__title">Featured Properties</span>
                    <OwlCarousel slideSpeed={300} lazyEffect items={3} baseClass="owl-carousel">
                        {featured}
                    </OwlCarousel>
        		</div>
        	</section>
        );
    }
})
