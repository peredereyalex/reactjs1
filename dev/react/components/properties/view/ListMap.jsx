import * as React from 'react';
import { Link } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';

var wNumb = require('wnumb');

export const ListMap = React.createClass({
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
                return <span key={"listmap_"+item.id+"_"+status.id} className="list__offer" style={{background: status.color}}>{status.name}</span>;
            })
            return (
                <article key={"listmap_"+item.id}className="list__item">
                    <Link to={"/property/"+item.id} className="list__image-wrap" style={{backgroundImage: "url(http://upreal-api.develop.redlg.ru/"+item.photo+")"}}>
                        <span className="list__label">Featured</span>
                        <div className="list__bottom">
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
                                className="list__ico list__ico_heart">
                                <span className="list__ico-hint">Favorite</span>
                            </div>
                            <div className="list__ico list__ico_photo">
                                <span className="list__ico-hint">Photos({item.photos})</span>
                            </div>
                        </div>
                    </Link>
                    <div className="list__info">
                        {statuses}
                        <Link to={"/property/"+item.id} className="list__title">{item.title}</Link>
                        <span className="list__address">{item.subtitle}</span>
                        <span className="list__props">Beds: {item.bed} Bath: {item.bath} Sq Ft: {item.sqft}</span>
                        <span className="list__type">{item.type}</span>
                        <span className="list__contacts list__contacts_author">{item.user}</span>
                        <span className="list__contacts list__contacts_date">{item.date}</span>
                    </div>
                    <div className="list__prices">
                        <span className="list__price">${format.to(parseInt(item.price))}</span>
                        <span className="list__price list__price_sqft">${format.to(parseInt(item.price)/parseInt(item.sqft))}/Sqft</span>
                    </div>
                </article>
            );
        })
        return (
            <div className={(this.props.type=="list_map") ? "list list_opened" : "list"}>
                <PerfectScrollbar>
    				{items}
                </PerfectScrollbar>
			</div>
        );
    }
})
