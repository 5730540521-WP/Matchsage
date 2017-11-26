import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CustomerActions} from 'actions/CustomerActions';

import styled from 'styled-components';
import {Row, Col} from 'antd';
import EmployeeDetail from './EmployeeDetail';

class EmployeeList extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			selectedEmployeeIdx:-1,
			employees:[]
		};
	}

	componentDidMount(){
		// const {employees,haha,onSelectEmployee} = this.props;

		// employees.map( (employee,idx) => {
		// 	console.log(employee);
		// });
		const {service_id, date, start_time, end_time} = this.props;
		// const payload = {
		// 	service_id: this.props.service_id,

		// }
		this.props.fetchEmployees(service_id, date, start_time, end_time);
	}
	// renderEmployees = ()=>{
		
	// 	return(
			
	// 	);
	// }

	render(){
		const {employees, onSelectEmployee} = this.props;
		
		// employess[this.state.selectedEmployeeIdx]. = 1
		return(
			<div>
				<Row gutter={16}>
					<Col span={8}>
						{employees.map( (employee,idx) => {
							return ( idx%3==0 && <EmployeeDetail onClick={onSelectEmployee}
								key={employee.employee_id} employee={employee}/>);
						})}
					</Col>
					<Col span={8}>
						{employees.map( (employee,idx) => {
							return (idx%3==1 && <EmployeeDetail onClick={onSelectEmployee}
								key={employee.employee_id} employee={employee}/>);
						})}
					</Col>
					<Col span={8}>
						{employees.map( (employee,idx) => {
							return (idx%3==2 && <EmployeeDetail onClickssss={onSelectEmployee}
								key={employee.employee_id} employee={employee}/>);
						})}
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps({reservation}){
	const {service_id, date, start_time, end_time, employees} = reservation;
	return {service_id, date, start_time, end_time, employees};
}

function mapDispatchToProps(dispatch){
	const fetchEmployees = CustomerActions.fetchEmployees;
	return bindActionCreators({fetchEmployees},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);