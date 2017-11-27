import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CustomerActions} from 'actions/CustomerActions';
import {Card} from 'antd';
import styled from 'styled-components';

const EmployeeRandomCard = styled(Card)`

`;

class EmployeeRandom extends React.Component{
	onSelectEmployee = ()=>{
		const {employee_id} = this.props.employee;
		
		console.log(employee_id);
		const {employees} = this.props;
		const employee = employees.find(employee=>employee.employee_id===employee_id);
		console.log('Hmm2');
		console.log(employee);
		this.props.selectEmployeeReservation(employee);
	}

	render(){
		<EmployeeRandomCard>
			
		</EmployeeRandomCard>
	}
}

function mapDispatchToProps(dispatch){
	const selectEmployeeReservation = CustomerActions.selectEmployeeReservation;
	return bindActionCreators({selectEmployeeReservation},dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeRandom);