import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Field,reduxForm} from 'redux-form';
import styled from 'styled-components';

import GuestNavbar from './GuestNavbar';
import CustomerNavbar from './CustomerNavbar'
import ServiceOwnerNavbar from './ServiceOwnerNavbar'
// import AdminNavbar from './AdminNavbar'

import {search} from '../../actions';

const NavBar = styled.nav.attrs({
	className: "navbar"
})`
	font-family: "Kanit";
`

// const Logo = styled.a.attrs({
// 	className: "navbar-item"
// })`
// 	&:hover a{
// 		display: none;
// 	}
// `;

function onSearch(keyword){
	
}


const SearchBox = ()=>{

	return(
		<div className="field has-addons">
			<div className="control">
				<input className="input" type="text" placeholder="ค้นหาบริการ"/>
			</div>
			<div className="control">
				<a className="button is-info" 
					onClick={()=>{}}
				>
					ค้นหา
				</a>
			</div>
		</div>
	);
}


class Header extends Component{
	constructor(props){
		super(props);

	}

	render(){
		// const {isLogin} = this.props;
		const {userType} = this.props;

		return(
			<NavBar>
				<div className="navbar-brand">
					<a className="navbar-item" href="/">
						{/* <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/> */}
						<h1>Matchsage</h1>
					</a>

					{/* <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="">
						<span className="icon">
							<i className="fa fa-github"></i>
						</span>
					</a> */}

					{/* {(()=>{
						switch(userType)
					})()}
					{ isLogin && <SearchBox/> } */}
				

					<div className="navbar-burger burger" data-target="navMenu">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<div id="navMenu" className="navbar-menu">
					{/* { isLogin ? null:<GuestNavbar/>} */}
					{(()=>{
						switch(userType){
							default:
								return <GuestNavbar/>;
						}
					})()}
				</div>
	
			</NavBar>
		)
	}
}	

// function validate(){
// 	const errors = {};
// 	return errors;
// }

// export default reduxForm({
// 	validate,
// 	form:'HeaderForm'
// })(Header);

// function mapStateToProps({toggleLoginModal,toggleSignupModal}){
// 	return {toggleLoginModal,toggleSignupModal};
// }

function mapStateToProps({authentication}){
	// const {isLogin} = authentication; 
	// return {isLogin};
	const {userType} = authentication;
	return {userType};
}

export default connect(mapStateToProps)(Header);
// export default Header;