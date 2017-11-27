import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Field,reduxForm} from 'redux-form';
import styled from 'styled-components';
import {Icon,Affix} from 'antd';
import GuestNavbar from './GuestNavbar';
import CustomerNavbar from './CustomerNavbar'
import ServiceOwnerNavbar from './ServiceOwnerNavbar'
import history from 'helpers/history';
// import AdminNavbar from './AdminNavbar';
// import {userActions} from '../../actions';

const NavBar = styled.nav.attrs({
	className: "navbar"
})`
	font-family: "Kanit";
`;

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
		// const {userType} = this.props;
		const user = localStorage.getItem('user');
		const location = history.location.pathname
		console.log(location)
		if (location.substring(0,6) === '/admin') return null
		return(
		<Affix>
			<NavBar style={{borderBottom: '1px solid #b1b1b1'}}>
				<div className="navbar-brand">
					<a className="navbar-item" onClick={()=>history.push('/')} style={{padding:'0px',paddingLeft:'1vw'}}>
						{/* <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/> */}
						<img src="../images/Picture1.png" style={{maxHeight:'52px'}}/>
						{/* <h1>Matchsage</h1> */}
					</a>
					{/* <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="">
						<span className="icon">
							<i className="fa fa-github"></i>
						</span>
					</a> */}

					{/* { userType && <SearchBox/> } */}
				
					<div className="navbar-burger burger" data-target="navMenu">
						{/*user?
							<div className={this.state.isDropdownActive?
					'dropdown is-right is-hoverable' : 'dropdown is-right'
				}
				// TODO: optimize perf
				// bad idea for performance here with ()=>{} inline render
					onMouseEnter={()=>this.setState({isDropdownActive:true})}
					onMouseLeave={()=>this.setState({isDropdownActive:false})}
				>
					<div className="dropdown-trigger">
						<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
							<span className="icon">
								<i className="fa fa-user"></i>
							</span>
							<span className="icon is-small">
								<i className="fa fa-angle-down" aria-hidden="true"></i>
							</span>
						</button>
					</div>
					<div className="dropdown-menu" id="dropdown-menu" role="menu" style={{minWidth:'11rem'}}>
						<div className="dropdown-content" style={{textAlign:'left'}}>
							<a className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}}>
								<Icon type="exclamation-circle-o" style={{marginRight:'20px'}}/>
								   บริการที่จองไว้
							</a>
							<a href="#" className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}}>
								<Icon type="clock-circle-o" style={{marginRight:'20px'}}/>
								   ประวัติการจอง
							</a>
							<a href="#" className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}}>
								<Icon type="user" style={{marginRight:'20px'}}/>
								   แก้ไขข้อมูลส่วนตัว
							</a>
							<hr className="dropdown-divider"/>
							<a href="#" className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}}
								onClick={()=> this.onLogout()}>
								<Icon type="logout" style={{marginRight:'20px'}}/>
								ออกจากระบบ
							</a>
						</div>
					</div>
				</div>:null*/
						}
					</div>
				</div>

				<div id="navMenu" className="navbar-menu">
					
					{/* {(()=>{
						switch(user.user_type){
							case 'customer':
								return <CustomerNavbar/>
							case 'serviceOwner':
								return <ServiceOwnerNavbar/>
							default:
								return <GuestNavbar/>;
						}
					})()} */}
					{user ? <CustomerNavbar/> : <GuestNavbar/>}
					
				</div>
	
			</NavBar>
		</Affix>
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

// function mapStateToProps({authentication}){
// 	// const {isLogin} = authentication; 
// 	// return {isLogin};
// 	const {userType} = authentication;
// 	return {userType};
// }

// export default connect(mapStateToProps)(Header);
export default Header;