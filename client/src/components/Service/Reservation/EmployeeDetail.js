import React from 'react';
import styled from 'styled-components';
import {Card} from 'antd';

const EmployeeCard = styled(Card)`
	max-width: 240px;
	max-height: 360px;
	margin-bottom: 20px;
`;

export default ({employee, onSelectEmployee})=>{
	const {first_name, last_name, gender, rating} = employee;
	return(
		<EmployeeCard>		
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