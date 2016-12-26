import * as React from 'react';
import Nouislider from 'react-nouislider';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

import { Select } from '../../form/Select.jsx';

var wNumb = require('wnumb');

export const Filter = React.createClass({
    getInitialState() {
        return {
            visible: false,
            filter: ToolbarStore.filter,
            data: ToolbarStore.data,
        };
    },
    componentDidMount() {
        ToolbarStore.bind(ToolbarStore.events.filter.changed, this.dataUpdated);
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.filter.changed, this.dataUpdated);
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
    },
    dataUpdated(){
        this.setState({
            filter: ToolbarStore.filter,
            data: ToolbarStore.data,
        });
    },
    hide(){
        this.setState({
            visible: false
        });
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        return (
            <div className="topbar__block-wrap" onClick={(event) => event.stopPropagation()}>
                <div className={(this.state.visible) ? "topbar__block topbar__block_prop topbar__block_prop-active topbar__block_opened" : "topbar__block topbar__block_prop"}
                     onClick={(event)=> {
                         event.stopPropagation();
                         var v = this.state.visible;
                         ToolbarStore.trigger(ToolbarStore.events.all.hide);
                         this.setState({visible: !v});
                     }}>
                    <span className="topbar__block-title">Filter</span>
                </div>
                <div className={(this.state.visible) ? "filter prop filter_opened" : "filter prop"}>
                    <div>
						<span className="prop__label">Price<br/>from ${format.to(parseInt(this.state.filter.price[0]))} to ${format.to(parseInt(this.state.filter.price[1]))}</span>
						<Nouislider
                            range={{min: this.state.data.price[0], max: this.state.data.price[1]}}
                            start={this.state.filter.price}
                            step={1}
                            onSlide={(value) => ToolbarStore.range("price", value)}
                            onEnd={(value) => ToolbarStore.trigger(ToolbarStore.events.data.update)}
                          />
                         <div className="prop__values">
  							<span>${format.to(parseInt(this.state.data.price[0]))}</span>
  							<span>${format.to(parseInt(this.state.data.price[1]))}</span>
  						 </div>
					</div>
                    <div className="prop__bedrooms">
						<span className="prop__label">Area<br/>from {format.to(parseInt(this.state.filter.sqft[0]))} to {format.to(parseInt(this.state.filter.sqft[1]))} Sq Ft</span>
						<Nouislider
                            range={{min: this.state.data.sqft[0], max: this.state.data.sqft[1]}}
                            start={this.state.filter.sqft}
                            step={1}
                            onSlide={(value) => ToolbarStore.range("sqft", value)}
                            onEnd={(value) => ToolbarStore.trigger(ToolbarStore.events.data.update)}
                          />
                         <div className="prop__values">
  							<span>{format.to(parseInt(this.state.data.sqft[0]))}</span>
  							<span>{format.to(parseInt(this.state.data.sqft[1]))}</span>
  						 </div>
					</div>
                    <div className="prop__bedrooms">
                        <span className="prop__label">Type</span>
						<Select items={this.state.data.types}
                                value={this.state.filter.type}
                                onSelect={(value) => ToolbarStore.select("type", value)}
                                autoHide={false}
                                search/>
					</div>

                    {/* <div className="prop__button">Search</div> */}
                </div>
            </div>
        );
    }
})
