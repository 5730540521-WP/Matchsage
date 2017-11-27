import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {CustomerActions} from 'actions/CustomerActions';
import {authHeader, history} from 'helpers';
import {API_URL} from 'constants/ConfigConstants';

import styled from 'styled-components';
import {Button, Card, Row, Col, message} from 'antd';


const Agreement = styled.div`
	border: 2px solid grey;
	border-radius: 10px;
	margin: 0px 25px 50px 25px;
`;

const Price = styled.div`
	
`;

const EmployeeImg = styled.img`
	width:100%;
`;

const Employee = styled(Card)`
	width: 250px;
	height: 250px;
	margin-left: 100px;
	margin-top: 100px;
`;

const ReserveButton = styled(Button)`
	widht: 150px;
	height: 100px;
`;

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
		console.log(price_per_hour);
		console.log(start_time);
		console.log(end_time);
		let st_h = parseInt(start_time.slice(0,2));
		if(!st_h) st_h = 24; //midnight
		const st_m = parseInt(start_time.slice(2,4));
		let e_h = parseInt(end_time.slice(0,2));
		if(!e_h) e_h = 24;
		const e_m = parseInt(end_time.slice(2,4));
		const st_time = st_h + st_m/60;
		const e_time = e_h + e_m/60;
		console.log(st_time);
		console.log(e_time);
		console.log(price_per_hour*((e_time - st_time)%24));
		return price_per_hour*((e_time - st_time)%24);
	}

	reserveService = async()=>{
		const {service_id, employee_id, start_time, end_time, date, payment_account} = this.props;
		
		this.props.reserveService(service_id, employee_id, start_time, end_time, date, payment_account);
		// const data = {
		// 	service_id, employee_id, start_time, end_time, date_reserved:date, payment_number:payment_account
		// }
		// const headers = authHeader();
		// const res = await axios.post(`${API_URL}/api/reservations/new`, data, {headers})
		// 	.catch(err=>{
		// 		history.push(`/service/${service_id}`);
		// 	});

		// message.success('การจองบริการสำเร็จ');
		// setTimeout(()=>{
		// 	history.push('/user/reserved-services');
		// },2000);
		
	}

	render(){
		const {employee} = this.props;
		const {first_name, last_name} = employee;
		return(
			<div>
				<Agreement>
					เงื่อนไข & ข้อตกลง
					<br/>
					1. ทางผู้รับบริการจะรับผิดชอบค่าเสียหาย
					<br/>
					2. ทางผู้รับบริการจะรับผิดชอบค่าเสียหาย
				</Agreement>
				<Row gutter={16}>
					<Col span={8}>
						<Employee>
							<div className="custom-image">
								<EmployeeImg alt="example" src="http://upic.me/i/r0/yqm18.jpg"/>
							</div>
							<div className="custom-card">
								<h3>ชื่อ: {first_name} {last_name}</h3>
							</div>
						</Employee>
					</Col>
					<Col span={8}>
						<Price>
							{/* ค่าบริการทั้งหมด <h3>{this.props.price}</h3> */}
							ค่าบริการทั้งหมด: <strong><h3>{this.state.price}</h3></strong>
							<br/>
							<ReserveButton onClick={this.reserveService}> จองบริการ </ReserveButton>
						</Price>
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps({reservation}){
	const {price_per_hour, date, start_time, end_time, 
		service_id, employee_id, payment_account, employee} = reservation;
	return {price_per_hour, date, start_time, end_time, 
		service_id, employee_id, payment_account, employee};
}	

function mapDispatchToProps(dispatch){
	const reserveService = CustomerActions.reserveService;
	return bindActionCreators({reserveService},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationConfirmation);