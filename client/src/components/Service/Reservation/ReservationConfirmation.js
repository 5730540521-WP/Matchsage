import React from 'react';
import {connect} from 'react-redux';

class ReservationConfirmation extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {

		};
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

export default connect()(ReservationConfirmation);