import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {CustomerActions} from 'actions/CustomerActions';
import {authHeader, history} from 'helpers';
import {API_URL} from 'constants/ConfigConstants';

class ReservationConfirmation extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			price:0
		};
	}

	componentDidMount(){
		const {price_per_hour,start_time, end_time} = this.props;
		const price = this.computePrice(price_per_hour,start_time, end_time);
		this.setState({price});
	}

	computePrice = (price_per_hour,start_time, end_time)=>{

		console.log(start_time);
		console.log(end_time);
		// return price_per_hour*();
	}

	createReservation = async()=>{
		const {service_id, employee_id, start_time, end_time, date} = this.props;
		const {price} = this.state;
		const data = {
			service_id, employee_id, start_time, end_time, date, price 
		}
		const headers = authHeader();
		const res = await axios.post(`${API_URL}/api/reservations/new`, data, {headers})
			.catch(err=>{
				history.push(`/service/${service_id}`);
			});
		// history('/reserved-resevation');
		history('/reservedResevation');
	}

	render(){
		return(
			<div>
					เงื่อนไข & ข้อตกลง
					1. ทางผู้รับบริการจะรับผิดชอบค่าเสียหาย
					2. ทางผู้รับบริการจะรับผิดชอบค่าเสียหาย
				<div>
					ค่าบริการทั้งหมด <h3>{this.props.price}</h3>
				</div>
			</div>
		);
	}
}

function mapStateToProps({reservation}){
	const {price_per_hour, start_time, end_time, service_id, employee_id} = reservation;
	return {price_per_hour, start_time, end_time};
}	

function mapDispatchToProps(dispatch){
	const reserveService = CustomerActions.reserveService;
	return bindActionCreators({reserveService},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationConfirmation);