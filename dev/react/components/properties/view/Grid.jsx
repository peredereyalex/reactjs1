import * as React from 'react';
import { Link } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';

var wNumb = require('wnumb');

export const Grid = React.createClass({
    componentDidMount() {

    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var items = "";
        items = this.props.items.map(function(item) {
            var statuses = item.statuses.map(function(status) {
                return <span key={"grid_"+item.id+"_"+status.id} className="grid__offer" style={{background: status.color}}>{status.name}</span>;
            })
            return (
                <article key={"grid_"+item.id} className="grid__item">
                    <Link to={"/property/"+item.id} className="grid__image-wrap" style={{backgroundImage: "url(http://upreal-api.develop.redlg.ru/"+item.photo+")"}}>
                        <span className="grid__label">Featured</span>
                        <div className="grid__bottom">
                            <div className="grid__prices">
                                <span className="grid__price">
                                    ${format.to(parseInt(item.price))}
                                </span>
                                <span className="grid__price grid__price_sqft">
                                    ${format.to(parseInt(item.price)/parseInt(item.sqft))}/Sqft
                                </span>
                            </div>
                            <div>
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if(!UserStore.token){
                                            PopupStore.show("auth");
                                            ToolbarStore.trigger(ToolbarStore.events.all.hide);
                                        }else{
                                            FavoriteStore.add.property_id = item.id;
                                            PopupStore.show("addtofavorite");
                                        }
                                    }}
                                    className="grid__ico grid__ico_heart">
                                    <span className="grid__ico-hint">Favorite</span>
                                </div>
                                <div className="grid__ico grid__ico_photo">
                                    <span className="grid__ico-hint">Photos({item.photos})</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div>
                        {statuses}
                    </div>
                    <Link to={"/property/"+item.id} className="grid__title">{item.title}</Link>
                    <span className="grid__address">{item.subtitle}</span>
                    <span className="grid__props">Beds: {item.bed} Bath: {item.bath} Sq Ft: {item.sqft}</span>
                    <span className="grid__type">{item.type}</span>
                    <div>
                        <span className="grid__contacts grid__contacts_author">{item.user}</span>
                        <span className="grid__contacts grid__contacts_date">{item.date}</span>
                    </div>
                </article>
            );
        })
        return (
            <div className={(this.props.type=="grid") ? "grid grid_opened" : "grid"}>
                <PerfectScrollbar>
                    {items}
                </PerfectScrollbar>
			</div>
        );
    }
})
