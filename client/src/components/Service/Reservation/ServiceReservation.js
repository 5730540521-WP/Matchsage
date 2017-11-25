import React from 'react';
import axios from 'axios';
import {API_URL} from 'constants/ConfigConstants';
import {authHeader} from 'helpers';
import { Steps, Icon,Button, message, DatePicker, TimePicker} from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const Step = Steps.Step;

const loader = styled.div.attrs({
	className: 'is-loading'
})``;

const StepsContent = styled.div.attrs({
	className: 'steps-content'
})`
	margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
`;

const StepsAction = styled.div.attrs({
	className: 'steps-action'
})`
	margin-top: 24px;
`;
class ServiceReservation extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			current:0,
			steps: [],
			isStepsLoaded: false,
			employees:[],
			isEmployeesLoaded: false,
			// for checking already selected 
			isSelectDate: false,
			isSelectTime: false,
			isSelectEmployee: false,
			isSelectPaymentAccount: false,
			isConfirmAgreement: false,
			// for send to server
			service_id:'',
			date:'',
			start_time:'',
			end_time:'',
			employee_id:''
		}
	}

	componentDidMount(){
		const steps = [{
			title: 'เลือกวันเวลา',
			content: this.renderSelectDateAndTime(),
		}, {
			title: 'เลือกผู้ให้บริการ',
			content: this.renderSelectEmployee(),
		}, {
			title: 'เลือกช่องทางการชำระค่าบริการ',
			content: this.renderSelectPaymentAccount(),
		},{
			title: 'ยอมรับเงื่อนไขการให้บริการ',
			content: 'eiei'
		}];
		this.setState({steps, isStepsLoaded:true,service_id:this.props.service_id})
	}

	next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
	}

	// ===== START Step1: choose day =====
	renderSelectDateAndTime = ()=>{
		const dateFormat = 'YYYY/MM/DD';
		return(
			<div>
				เลือกวันที่ต้องการ
				<DatePicker onChange={this.onSelectDate} defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
				เลือกเวลาที่ต้องการ
				<TimePicker onChange={this.onSelectTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,			
			</div>
		);
	}

	onSelectDate = ({_d}='')=>{
		// console.log(_d);
		// const date = _d ....
		// this.setState({date});
		this.setState({date:_d, isSelectDate: true});
	}

	onSelectTime = (t)=>{
		console.log(t);
		this.setState({isSelectTime: true});
	}
	// ===== END Step1: choose day =====

	// ===== START Step2: choose employee =====
	renderSelectEmployee = ()=>{
		<div>
			{this.state.isEmployeesLoaded? loader : loader}
		</div>
	}

	fetchEmployees = async ()=>{
		const data = {
			
		};
		const headers = authHeader();
		const res = await axios.post(`${API_URL}/api/services/${this.state.service_id}/avai_employees`, data, {headers});
		// const employess = 
		// this.setState({employees, isEmployeesL	oaded: true});
		this.setState({isEmployeesLoaded: true});		
	}

	onSelectEmployee = (employee)=>{
		// this.setState({employee, isSelectEmployee: true});
		this.setState({isSelectEmployee: true});
	}
	// ===== END Step2: choose employee =====

	// ===== Step3: choose payment account =====
	renderSelectPaymentAccount = ()=>{
		return(
			<div/>
		);
	}

	onSelectPaymentAccount = ()=>{
		this.setState({isSelectPaymentAccount:true});
	}
	// ===== END Step3: payment account =====

	// ===== START Step4: confirm reservation =====
	onConfirmReservation = async () =>{
		const data = {
			service_id: this.props.service_id ,
			employee_id: this.state.employee_id, 
			start_time: this.state.start_time, 
			end_time: this.state.end_time, 
			date: this.state.date
		}
		const headers = authHeader();
		const res = await axios.post(`${API_URL}/api/reservation/new`, data, {headers});

		this.setState({isConfirmAgreement:true});
	}
	// ===== END Step4: confirm reservation =====
	
	render(){
		const { isStepsLoaded, steps, current, isSelectDate, isSelectTime, 
			isSelectEmployee, isSelectPaymentAccount, isConfirmAgreement } = this.state;

		return(
			<div>
				<Steps current={current}>
					{/* <Step status="finish" title="เลือกบริการ" icon={<Icon type="user" />} />
					<Step status="finish" title="ยืนยันอีเมล์" icon={<Icon type="solution" />} />
					<Step status="process" title="จำระค่ามัดจำ" icon={<Icon type="credit-card" />} />
					<Step status="wait" title="เสร็จสิ้นการจอง" icon={<Icon type="smile-o" />} /> */}
					{steps.map(item => <Step key={item.title} title={item.title} />)}
				</Steps>
				{/* <div className="steps-content"></div> */}
				<StepsContent>
					{isStepsLoaded && steps[this.state.current].content}
				</StepsContent>
				{/* <div className="steps-action"> */}
				<StepsAction>
					{	
            this.state.current > 0
            &&
            <Button onClick={() => this.prev()}> ย้อนกลับ </Button>
          }
          {
            this.state.current < steps.length - 1
            &&
            <Button style={{ marginLeft: 8 }} type='primary' onClick={() => this.next()}>ต่อไป</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button style={{ marginLeft: 8 }} type="primary" 
							disabled={!(isSelectDate && isSelectTime && 
								isSelectEmployee && isSelectPaymentAccount && isConfirmAgreement)}
							onClick={() => message.success('การจองบริการสำเร็จ')}
						> 
							เสร็จสิ้นการจอง
						</Button>
          }
          
				</StepsAction>
			</div>
		);
	}
}

export default ServiceReservation;