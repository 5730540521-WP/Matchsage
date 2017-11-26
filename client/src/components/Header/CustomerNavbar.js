import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userActions} from '../../actions';
import {history} from '../../helpers';
import {Icon} from 'antd';


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
		return(
			<div className="navbar-end">
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
							<a className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}} onClick={()=>history.push('/ReservedServices')}>
								<Icon type="exclamation-circle-o" style={{marginRight:'20px'}}/>
								   บริการที่จองไว้
							</a>
							<a className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}} onClick={()=>history.push('/ReservationHistory')}>
								<Icon type="clock-circle-o" style={{marginRight:'20px'}}/>
								   ประวัติการจอง
							</a>

							<a className="dropdown-item" style={{marginLeft:'0px',paddingRight:'0px'}}
								onClick={()=> history.push('/Profile')}>
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