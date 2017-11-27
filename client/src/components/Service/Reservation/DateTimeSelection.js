import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {CustomerActions} from 'actions/CustomerActions';

import {Calendar,Row,Col,LocaleProvider, DatePicker, TimePicker} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment';

class DateTimeSelection extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			date:moment('2017/11/28', 'YYYY/MM/DD'),
			start_time:'',
			timeOptions:{
				timeZone: "Asia/Bangkok"
			}			
		}
	}

	onSelectDate = ({_d})=>{
		console.log(_d);
		const date = _d.toLocaleDateString('en-GB', this.state.timeOptions).split('/').reverse().join('-');//.replace(/\//g,'-');
		this.setState({date:moment(_d,'YYYY/MM/DD')})
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
				<Row>
					<Col span={12}>
						<h1>เลือกวันที่ต้องการ</h1>
						<div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4,display:'block',margin:'auto' }}>
							<Calendar fullscreen={false} value={this.state.date} defaultValue={moment('2017/11/28', dateFormat)} onSelect={this.onSelectDate}/>
						</div>
						{/* <DatePicker allowClear={false} onChange={this.onSelectDate} defaultValue={moment('2017/11/28', dateFormat)} format={dateFormat} /> */}
					</Col>
					<Col span={12}>
						<h1>เลือกเวลาที่ต้องการ</h1>
						<Row type="flex" justify="center" style={{marginTop:'16px'}}>
							<Col span={10}>
								<h3 style={{fontSize:'18px',marginBottom:'10px'}}>เวลารับบริการ</h3>
								<TimePicker allowEmpty={false} onChange={this.onSelectStartTime} defaultValue={moment('00:00', timeFormat)} format={timeFormat}/>		
							</Col>
							<Col span={10}>
								<h3 style={{fontSize:'18px',marginBottom:'10px'}}>เวลาสิ้นสุดบริการ</h3>
								<TimePicker allowEmpty={false} onChange={this.onSelectEndTime} defaultValue={moment('00:00', timeFormat)} format={timeFormat}/>			
							</Col>
						</Row>
					</Col>
				</Row>
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