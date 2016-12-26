import * as React from 'react';

import { MapStore } from '../../stores/MapStore.jsx';

import { IndexSlider } from './IndexSlider.jsx';
import { IndexSearch } from './IndexSearch.jsx';
import { IndexFeatured } from './IndexFeatured.jsx';

export const Index = React.createClass({
    componentDidMount() {
        MapStore.hide();
    },
    render() {
        return (
            <div>
                <section className="find-listing-wrap">
                    <IndexSlider/>
                    <IndexSearch/>
                </section>
                <IndexFeatured/>
            </div>

        );
    }
})
