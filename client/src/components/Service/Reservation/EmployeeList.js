import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {Row, Col} from 'antd';
import EmployeeDetail from './EmployeeDetail';

// const Row = styled.div.attrs({class})``;

class EmployeeList extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			selectedEmployeeIdx:-1
		};
	}

	componentDidMount(){
		// const {employees,haha,onSelectEmployee} = this.props;

		// employees.map( (employee,idx) => {
		// 	console.log(employee);
		// });
		const {service_id, date, start_time, end_time} = this.state;
		const payload = {
			service_id: this.props.service_id,

		}
		this.props.fetchEmployees();
	}
	// renderEmployees = ()=>{
		
	// 	return(
			
	// 	);
	// }

	render(){
		const {employees,haha,onSelectEmployee} = this.props;
		// employess[this.state.selectedEmployeeIdx]. = 1
		return(
			<div>
				<Row gutter={16}>
					<Col span={8}>
						{employees.map( (employee,idx) => {
							return ( idx%3==0 && <EmployeeDetail onSelectEmployee={onSelectEmployee}
								key={employee.employee_id} employee={employee}/>);
						})}
					</Col>
					<Col span={8}>
						{employees.map( (employee,idx) => {
							return (idx%3==1 && <EmployeeDetail onSelectEmployee={onSelectEmployee}
								key={employee.employee_id} employee={employee}/>);
						})}
					</Col>
					<Col span={8}>
						{employees.map( (employee,idx) => {
							return (idx%3==2 && <EmployeeDetail onSelectEmployee={onSelectEmployee}
								key={employee.employee_id} employee={employee}/>);
						})}
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps({reservation}){
	const {employees} = reservation;
	return {employees};
}

export default connect(mapStateToProps)(EmployeeList);