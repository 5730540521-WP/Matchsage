import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userActions} from '../../actions';
import {history} from '../../helpers';
import {Icon} from 'antd';
import styled from 'styled-components';
import { locale } from 'moment';
import * as JWT from 'jwt-decode';

const ImageProfile = styled.img`
	border-radius: 50%;
`;

class CustomerNavbar extends React.Component{
	constructor(){
		super();
		this.state = {
			isDropdownActive: false
		}
	}

	onLogout(){
		this.props.logout();
	}

	render(){
		const userType = JWT(localStorage.getItem('user')).user_type
		return(
			<div className="navbar-end">
				<div className={this.state.isDropdownActive?
					'navbar-item has-dropdown is-hoverable' : 'navbar-item has-dropdown'
				}
				// TODO: optimize perf
				// bad idea for performance here with ()=>{} inline render
					onMouseEnter={()=>this.setState({isDropdownActive:true})}
					onMouseLeave={()=>this.setState({isDropdownActive:false})}
				>
					{/* <div className="dropdown-trigger">
						<button className="button" aria-controls="dropdown-menu">
							<span className="icon">
								<i className="fa fa-user"></i>
							</span>
							<span className="icon is-small">
								<i className="fa fa-angle-down" aria-hidden="true"></i>
							</span>
							<ImageProfile src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.0-1/p160x160/14479824_10209394693778025_1174620813941335866_n.jpg?oh=3401e7d0bfe9c905972513ac72eccc06&oe=5A9A110F"/>
						</button>
					</div> */}
					<div style={{ margin: 'auto'}}>
					<h2><strong>ประเภทผู้ใช้งาน:</strong> {userType == 'customer'? 'ลูกค้า':'ผู้ให้บริการ'}</h2>
					</div>
					<a className="navbar-link">
						<ImageProfile src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.0-1/p160x160/14479824_10209394693778025_1174620813941335866_n.jpg?oh=3401e7d0bfe9c905972513ac72eccc06&oe=5A9A110F"/>
					</a>
					
					<div className="navbar-dropdown is-boxed is-right">
						{ userType == 'customer' ?
						<div>
						<a className="navbar-item" onClick={()=>history.push('/user/reserved-services')}>
							<Icon type="exclamation-circle-o" style={{marginRight:'20px'}}/>
									บริการที่จองไว้
						</a>
						<a className="navbar-item" onClick={()=>history.push('/user/reservation-history')}>
							<Icon type="clock-circle-o" style={{marginRight:'20px'}}/>
									ประวัติการจอง
						</a>
						</div>:
						<a className="navbar-item" onClick={()=>history.push('/owner')}>
						<Icon type="appstore-o" style={{marginRight:'20px'}}/>
								บริการของฉัน
						</a>
						}
						<a className="navbar-item" style={{marginLeft:'0px',paddingRight:'0px'}}
							onClick={()=> history.push('/user/profile')}>
							<Icon type="user" style={{marginRight:'20px'}}/>
									แก้ไขข้อมูลส่วนตัว

						</a>						
						<hr className="dropdown-divider"/>
						<a href="#" className="navbar-item" style={{marginLeft:'0px',paddingRight:'0px'}}
							onClick={()=> this.onLogout()}>
							<Icon type="logout" style={{marginRight:'20px'}}/>
							ออกจากระบบ
						</a>

					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	const logout = userActions.logout;
	return bindActionCreators( {logout}, dispatch)
}

export default connect(null, mapDispatchToProps)(CustomerNavbar);