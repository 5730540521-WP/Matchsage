import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CustomerActions} from 'actions/CustomerActions';
import styled from 'styled-components';
import {Card, Icon} from 'antd';

const EmployeeCard = styled(Card)`
	max-width: 240px;
	max-height: 360px;
	margin-bottom: 20px;
	&:hover{
		cursor: pointer;
	}
`;

const IconChecked = styled(Icon).attrs({
	type: 'check-circle'
})`
	color: #08c;
`;


class EmployeeDetail extends React.PureComponent{

	onSelectEmployee = ()=>{
		const {employee_id} = this.props.employee;
		
		// console.log('Selected: ' + selected_employee);
		console.log('Hmm1');
		console.log(employee_id);
		const {employees} = this.props;
		const employee = employees.find(employee=>employee.employee_id===employee_id);
		console.log('Hmm2');
		console.log(employee);
		this.props.selectEmployeeReservation(employee);
	}
	
	render(){
		// const {employees} = this.props;
		const {first_name, last_name, gender, rating, employee_id} = this.props.employee;
		const selected_employee = this.props.employee_id;
		return(
			<EmployeeCard onClick={this.onSelectEmployee} >
				<div className="custom-image">
					<img alt="example" src="http://upic.me/i/r0/yqm18.jpg" />
				</div>
				<div className="custom-card">
					<h3>ชื่อ: {first_name} {last_name}</h3>
					<h3>เพศ: {gender}</h3>
					<h3>คะแนน: {rating}</h3> {selected_employee===employee_id && <IconChecked/>}
				</div>
			</EmployeeCard>		
		);
	}
}

function mapStateToProps({reservation}){
	const {employees, employee_id} = reservation;
	return {employees,employee_id};
}

function mapDispatchToProps(dispatch){
	const selectEmployeeReservation = CustomerActions.selectEmployeeReservation;
	return bindActionCreators({selectEmployeeReservation},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);