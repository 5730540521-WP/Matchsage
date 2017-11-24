import React from 'react';
import styled from 'styled-components';

import {Row, Col} from 'antd';
import EmployeeDetail from './EmployeeDetail';

// const Row = styled.div.attrs({class})``;

class EmployeeList extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
	
		};
	}

	renderEmployeeList = () =>{
		const {employees} = this.props;
		employees.push()
		return(
			<Row gutter={16}>
				<Col span={8}>
					{employees.map( (employee,idx) => {
						return (idx%3==0 && <EmployeeDetail key={employee.id}/>);
					})}
				</Col>
				<Col span={8}>
					{employees.map( (employee,idx) => {
						return (idx%3==1 && <EmployeeDetail key={employee.id}/>);
					})}
				</Col>
				<Col span={8}>
					{employees.map( (employee,idx) => {
						return (idx%3==2 && <EmployeeDetail key={employee.id}/>);
					})}
				</Col>
			</Row>
	
		);
	}

	render(){
		{this.renderEmployeeList()}
	}
}

export default EmployeeList;