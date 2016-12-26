import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { Frame } from './components/frame/Frame.jsx'
import { Index } from './components/index/Index.jsx';
import { About } from './components/about/About.jsx';
import { Membership } from './components/membership/Membership.jsx';
import { Contact } from './components/contact/Contact.jsx';
import { Properties } from './components/properties/Properties.jsx';
import { PropertyPage } from './components/property/Template.jsx';
import { Profile } from './components/profile/Profile.jsx';
import { User } from './components/User/user.jsx';

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ Frame }>
            <IndexRoute component={ Index } />
            <Route path='properties' component={ Properties }/>
            <Route path='property/:propertyId' component={ PropertyPage }/>

            <Route path='about' component={ About }/>
            <Route path='contact' component={ Contact }/>
            <Route path='membership' component={ Membership }/>

            <Route path='profile' component={ Profile }/>
            <Route path='user/:publicId' component={ User }/>

            <Route path="*" component={ Index } />
        </Route>
    </Router>,
    document.getElementById('app')
)
