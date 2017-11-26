import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CustomerActions} from 'actions/CustomerActions';
import styled from 'styled-components';
import {Card} from 'antd';

const EmployeeCard = styled(Card)`
	max-width: 240px;
	max-height: 360px;
	margin-bottom: 20px;
	&:hover{
		cursor: pointer;
	}
`;

class EmployeeDetail extends React.PureComponent{

	onSelectEmployee = (employee_id)=>{
		console.log(employee_id);
		const {employees} = this.props;
		const employee = employees.find(employee=>employee.employee_id===employee_id);
		console.log('Hmm');
		console.log(employee);
		this.props.selectEmployeeReservation(employee);
	}
	
	render(){
		// const {employees} = this.props;
		const {first_name, last_name, gender, rating, employee_id} = this.props.employee;

		return(
			<EmployeeCard onClick={this.onSelectEmployee(employee_id)}>
				<div className="custom-image">
					<img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
				</div>
				<div className="custom-card">
					<h3>ชื่อ: {first_name} {last_name}</h3>
					<h3>เพศ: {gender}</h3>
					<h3>คะแนน: {rating}</h3>
				</div>
			</EmployeeCard>		
		);
	}
}

function mapStateToProps({reservation}){
	const {employees} = reservation;
	return {employees};
}

function mapDispatchToProps(dispatch){
	const selectEmployeeReservation = CustomerActions.selectEmployeeReservation;
	return bindActionCreators({selectEmployeeReservation},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);