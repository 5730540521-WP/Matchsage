import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CustomerActions} from 'actions/CustomerActions';

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
		console.log(start_time);
		console.log(end_time);
		// return price_per_hour*();
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

function mapStateToProps({reservation}){
	const {price_per_hour, start_time, end_time} = reservation;
	return {price_per_hour, start_time, end_time};
}	

function mapDispatchToProps(dispatch){
	const reserveService = CustomerActions.reserveService;
	return bindActionCreators({reserveService},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationConfirmation);