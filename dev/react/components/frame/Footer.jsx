import * as React from 'react';

import { NewsLetter } from './footer/NewsLetter.jsx';

export const Footer = React.createClass({
    componentDidMount() {
    },
    componentWillUnmount() {
    },
    render() {
        return (
            <div className="footer-wrap">
        		<footer className="footer content">
        			<div>
        				<div className="footer__column footer__column_1">
        					<span className="footer__title">About site</span>
        					<p className="footer__text">
        						Lorem ipsum dolor sit amet, consectetur<br/>
        						adipisicing elit, sed do eiusmod<br/>
        						tempor incididunt ut labore et dolore<br/>
        						magna aliq
        					</p>
        				</div>
        				<div className="footer__column footer__column_2">
        					<span className="footer__title">Contact us</span>
        					<div>
        						<div className="footer__contact footer__contact_location">774 NE 84th St Miami, FL 33879</div>
        						<div className="footer__contact footer__contact_phone">Call us FREE +1 (800) 990 8877</div>
        						<div className="footer__contact footer__contact_mail">info@ez.com</div>
        					</div>
        				</div>
        			</div>
        			<div className="footer__column footer__column_3">
        				<NewsLetter/>
        				<div className="follow">
        					<span className="follow__title">Follow us</span>
        					<div className="follow__social">
        						<a href="#" target="_blank" className="follow__social-ico follow__social-ico_facebook"></a>
        						<a href="#" target="_blank" className="follow__social-ico follow__social-ico_google"></a>
        					</div>
        				</div>
        			</div>
        		</footer>
        		<div className="copyright-wrap">
        			<div className="copyright content">
        				idsrealty.com - All right reserved
        				<nav className="copyright__menu">
        					<a href="#">Privacy</a>
        					<a href="#">Terms & Conditions</a>
        				</nav>
        			</div>
        		</div>
        	</div>
        );
    }
});
