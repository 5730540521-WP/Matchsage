import React from 'react';
// import {connect} from 'react-redux';

import LoginModal from '../Modal/LoginModal';
import SignupModal from '../Modal/SignupModal';


export default class GuestNavbar extends React.Component{
	constructor(props){
		super(props);
		
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
		const {isLoggingIn} = this.props;

		return(
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
			
				<LoginModal modalState={this.state.isLoginModalActive} onCloseLoginModal={()=>this.toggleLoginModal(false)}/>
				<SignupModal modalState={this.state.isSignupModalActive} onCloseSignupModal={()=>this.toggleSignupModal(false)}/> 
	
			</div>
		);
	}
}