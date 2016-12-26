import * as React from 'react';
import { browserHistory } from 'react-router';

import { SearchStore } from '../../stores/SearchStore.jsx';
import { PropertiesStore } from '../../stores/PropertiesStore.jsx';

export const IndexSearch = React.createClass({
    getInitialState() {
        return {
            dropdown: false,
            search: "",
            type: 'all',
            types: {
                all: 'All',
                commercial: 'Commercial',
                residential: 'Residential'
            },
            load: false
        };
    },
    componentDidMount() {
        this.setState({
            dropdown: false,
            load: false
        });
        window.addEventListener('click', this.dropdownHide, false);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.searchFinish);
        SearchStore.getData();
    },
    componentWillUnmount() {
        window.removeEventListener('click', this.dropdownHide, false);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.searchFinish);
    },
    searchFinish(){
        browserHistory.push("/properties");
    },
    dropdownHide(){
        this.setState({
            dropdown: false
        });
    },
    handleSelect(type){
        this.setState({
            type: type,
            dropdown:false
        });
    },
    dropdownToggle(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dropdown: !this.state.dropdown
        });
    },
    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            load: true
        });
        PropertiesStore.getList(this.state.search);
    },
    render() {
        return (
            <form className="index-search" onSubmit={this.handleSubmit}>
                <div className="index-search__container">
                    <div className="index-search__select">
                        <div className="index-search__filter" onClick={this.dropdownToggle}>{this.state.types[this.state.type]}</div>
                        <div className="index-search__list" style={{display: (this.state.dropdown) ? "block" : "none"}}>
                            <div className="index-search__item" onClick={ (e) => this.handleSelect("all") }>All</div>
                            <div className="index-search__item" onClick={ (e) => this.handleSelect("residential") }>Residential</div>
                            <div className="index-search__item" onClick={ (e) => this.handleSelect("commercial") }>Commercial</div>
                        </div>
                    </div>
                    <input
                        placeholder="City, Neighborhood, Development, etc"
                        className="index-search__input"
                        type="text"
                        onChange={ (e) => this.setState({search: e.target.value}) }
                        value={this.state.search}/>
                    <button
                        type="submit"
                        className={(this.state.load) ? "index-search__btn index-search__btn_load" : "index-search__btn"}>
                    </button>
                </div>
            </form>
        );
    }
})
