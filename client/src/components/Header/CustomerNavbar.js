import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userActions} from '../../actions';

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
					<div className="dropdown-menu" id="dropdown-menu" role="menu">
						<div className="dropdown-content">
							<a className="dropdown-item">
								บริการที่จองไว้
							</a>
							<a href="#" className="dropdown-item">
								ประวัติการจอง
							</a>
							<a href="#" className="dropdown-item">
								แก้ไขข้อมูลส่วนตัว
							</a>
							<hr className="dropdown-divider"/>
							<a href="#" className="dropdown-item"
								onClick={()=> this.onLogout()}>
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