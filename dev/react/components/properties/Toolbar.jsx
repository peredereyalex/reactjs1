import * as React from 'react';

import { TypeView } from './toolbar/TypeView.jsx';
import { SortSelect } from './toolbar/SortSelect.jsx';
import { Filter } from './toolbar/Filter.jsx';
import { FavoriteList } from './toolbar/FavoriteList.jsx';
import { SavedSearch } from './toolbar/SavedSearch.jsx';
import { SearchListing } from './toolbar/SearchListing.jsx';
import { PrintButton } from './toolbar/PrintButton.jsx';

import { ToolbarStore } from '../../stores/ToolbarStore.jsx';

export const Toolbar = React.createClass({
    getInitialState() {
        return {
            type: ToolbarStore.type,
            sort: ToolbarStore.sort
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.data.update, this.dataUpdated);
        window.addEventListener('click', this.allHide, false);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.data.update, this.dataUpdated);
        window.removeEventListener('click', this.allHide, false);
    },
    allHide(){
        ToolbarStore.trigger(ToolbarStore.events.all.hide)
    },
    dataUpdated(){
        this.setState({
            type: ToolbarStore.type,
            sort: ToolbarStore.sort
        });
    },
    render() {
        return (
            <div className="topbar-wrap">
                <div className="topbar content">
                    <div>
                        <TypeView type={this.state.type}/>
                        <Filter/>
                        <SearchListing/>
                        <SortSelect sort={this.state.sort}/>
                        <SavedSearch/>
                        <FavoriteList/>
                        {/* <i className="topbar__ico topbar__ico_share"></i> */}
                        <PrintButton/>
                    </div>
                    {/* <div>
                        <i className="topbar__ico topbar__ico_bell"></i>
                        <i className="topbar__ico topbar__ico_screen"></i>
                        <div className="topbar__user">
                            <i className="topbar__ico topbar__ico_user"></i>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
})
