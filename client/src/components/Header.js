import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {Field,reduxForm} from 'redux-form';
import styled from 'styled-components';

import LoginModal from './Modal/LoginModal';
import SignupModal from './Modal/SignupModal';

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

class Header extends Component{
	constructor(){
		super();
		this.state = {
			isLoginModalActive: false,
			isSignupModalActive: false
		}
	}

	toggleLoginModal(modalValue){
		this.setState({isLoginModalActive: modalValue});
	}

	toggleSignupModal(modalValue){
		this.setState({isSignupModalActive: modalValue})
	}

	render(){
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

					<div className="navbar-burger burger" data-target="navMenu">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<div id="navMenu" className="navbar-menu">
					<div className="navbar-end">

						<div className="navbar-item">
								<div className="field is-grouped">
									{/* <p className="control"> */}
									<p>
										<a className="modal-button" data-target="LoginModal" 
											onClick={()=>this.toggleLoginModal(true)}>
											<span>เข้าสู่ระบบ</span>
										</a>
										
									</p>
								</div>
							</div>

						<div className="navbar-item">
							<div className="field is-grouped">
								<p className="control">
									<a className="button is-primary modal-button" data-target="SignupModal" 
										onClick={()=>this.toggleSignupModal(true)}>
										<span>สมัครสมาชิก</span>
									</a>	
								</p>
							</div>
						</div>

					</div>
				</div>

				<LoginModal modalState={this.state.isLoginModalActive} onCloseLoginModal={()=>this.toggleLoginModal(false)}/>
				<SignupModal modalState={this.state.isSignupModalActive} onCloseSignupModal={()=>this.toggleSignupModal(false)}/> 
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

// export default connect(mapStateToProps)(Header);
export default Header;