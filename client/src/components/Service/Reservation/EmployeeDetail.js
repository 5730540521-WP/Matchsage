import React from 'react';
import styled from 'styled-components';
import {Card} from 'antd';

const EmployeeCard = styled(Card)`
	max-width: 240px;
`;

export default (props)=>{
	return(
		<EmployeeCard>		
			<div className="custom-image">
				<img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
			</div>
			<div className="custom-card">
				<h3>{this.props.name}</h3>
			</div>
		</EmployeeCard>		
	);
}