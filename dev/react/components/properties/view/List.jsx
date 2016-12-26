import * as React from 'react';
import { Link } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';

var wNumb = require('wnumb');

export const List = React.createClass({
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
                return <span key={"list_"+item.id+"_"+status.id} className="full-list__offer" style={{background: status.color}}>{status.name}</span>;
            })
            return (
                <article key={"list_"+item.id} className="full-list__item">
                    <Link to={"/property/"+item.id} className="full-list__image-wrap" style={{backgroundImage: "url(http://upreal-api.develop.redlg.ru/"+item.photo+")"}}>
                        <span className="full-list__label">Featured</span>
                        <div className="full-list__bottom">
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
                                className="full-list__ico full-list__ico_heart">
                                <span className="full-list__ico-hint">Favorite</span>
                            </div>
                            <div className="full-list__ico full-list__ico_photo">
                                <span className="full-list__ico-hint">Photos({item.photos})</span>
                            </div>
                        </div>
                    </Link>
                    <div className="full-list__info">
                        <div>
                            {statuses}
                        </div>
                        <Link to={"/property/"+item.id} className="full-list__title">{item.title}</Link>
                        <span className="full-list__address">{item.subtitle}</span>
                        <span className="full-list__props">Beds: {item.bed} Bath: {item.bath} Sq Ft: {item.sqft}</span>
                        <span className="full-list__type">{item.type}</span>
                        <p className="full-list__text">{item.desc}</p>
                        <div>
                            <span className="full-list__contacts full-list__contacts_author">{item.user}</span>
                            <span className="full-list__contacts full-list__contacts_date">{item.date}</span>
                        </div>
                    </div>
                    <div className="full-list__prices">
                        <span className="full-list__price">
                            ${format.to(parseInt(item.price))}
                        </span>
                        <span className="full-list__price full-list__price_sqft">
                            ${format.to(parseInt(item.price)/parseInt(item.sqft))}/Sqft
                        </span>
                    </div>
                </article>
            );
        }.bind(this));
        return (
            <div className={(this.props.type=="list") ? "full-list full-list_opened" : "full-list"}>
                <PerfectScrollbar>
                    {items}
                </PerfectScrollbar>
			</div>
        );
    }
})
