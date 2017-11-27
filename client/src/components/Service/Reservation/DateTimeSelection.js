import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {CustomerActions} from 'actions/CustomerActions';

import {LocaleProvider, DatePicker, TimePicker} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment';

class DateTimeSelection extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			date:'',
			start_time:'',
			timeOptions:{
				timeZone: "Asia/Bangkok"
			}			
		}
	}

	onSelectDate = ({_d})=>{
		console.log(_d);
		const date = _d.toLocaleDateString('en-GB', this.state.timeOptions).split('/').reverse().join('-');//.replace(/\//g,'-');
		this.props.selectDateTimeReservation(date);
	}

	onSelectStartTime = ({_d})=>{
		console.log(_d);
		// const start_time = _d.toISOString();
		const start_time = this.padTime(_d.toLocaleTimeString().split(':').slice(0,2).join(''));
		this.props.selectDateTimeReservation(null,start_time);
	}

	onSelectEndTime = ({_d})=>{
		console.log(_d);
		const end_time = this.padTime(_d.toLocaleTimeString().split(':').slice(0,2).join(''));
		this.props.selectDateTimeReservation(null, null, end_time);
	}

	// Ex: 400 => 0400
	padTime = (time)=>{
		return time.length<4 ? '0' + time : time;
	}

	render(){
		const dateFormat = 'YYYY/MM/DD';
		const timeFormat = 'HH:mm';
		return(
			<LocaleProvider locale={enUS}>
				<div>
				เลือกวันที่ต้องการ
				<DatePicker onChange={this.onSelectDate} defaultValue={moment('2017/11/28', dateFormat)} format={dateFormat} />
				<br/>
				เลือกเวลาที่ต้องการ
				<h3>เวลารับบริการ</h3>
				<TimePicker onChange={this.onSelectStartTime} defaultValue={moment('00:00', timeFormat)} format={timeFormat}/>,			
				<h3>เวลาสิ้นสุดบริการ</h3><TimePicker onChange={this.onSelectEndTime} defaultValue={moment('00:00', timeFormat)} format={timeFormat}/>,			
				</div>
			</LocaleProvider>
		);
	}
}

function mapDisPatchToProps(dispatch){
	const selectDateTimeReservation = CustomerActions.selectDateTimeReservation;
	console.log(selectDateTimeReservation);
	return bindActionCreators({selectDateTimeReservation},dispatch);
}

export default connect(null, mapDisPatchToProps)(DateTimeSelection);