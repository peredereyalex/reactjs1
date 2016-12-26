import * as React from 'react';
import { Link } from 'react-router';

import { UserStore } from '../../stores/UserStore.jsx';
import { PopupStore } from '../../stores/PopupStore.jsx';

export const Header = React.createClass({
    getInitialState() {
        return {
            username: UserStore.username
        };
    },
    componentDidMount() {
        this.dataUpdated();
        UserStore.bind(UserStore.events.data.update, this.dataUpdated);
    },
    componentWillUnmount() {
        UserStore.unbind(UserStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            username: UserStore.username
        });
    },
    popupShow(){
        PopupStore.show("auth");
    },
    render() {
        var btn = "";
        if(!this.state.username){
            btn = <div className="login" onClick={this.popupShow}>Login/Register</div>;
        }else{
            btn = <Link to="/profile" className="login">{this.state.username}</Link>;
        }
        return (
            <div className="header-wrap">
        		<header className="header content">
        			<Link to="/" className="logo" title="National Investment Development Service"></Link>
        			<nav className="menu">
        				<Link to="/" className="menu__item">Home</Link>
                        <Link to="/membership" className="menu__item">Membership</Link>
                        <Link to="/about" className="menu__item">About us</Link>
                        <Link to="/contact" className="menu__item">Contact us</Link>
        			</nav>
        			{btn}
        		</header>
        	</div>
        );
    }
});
