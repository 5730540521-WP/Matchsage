import React from 'react';
import { Steps, Icon,Button, message, Calendar  } from 'antd';
import styled from 'styled-components';

const Step = Steps.Step;

//Step1: choose service
const Step1 = ()=>(
	<div/>
)

//Step2: select 
const Step2 = ()=>(
	<div/>
)

const Step3 = ()=>(
	<div/>
)

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

const steps = [{
  title: 'เลือกวันเวลา',
  content: Step1(),
}, {
  title: 'ชำระค่ามัดจำ',
  content: Step2(),
}, {
  title: 'เสร็จสิ้น',
  content: Step3(),
}];
class ServiceReservation extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			current:0
		}
	}

	next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
	}

	render(){
		const { current } = this.state;

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
					{steps[this.state.current].content}
				</StepsContent>
				{/* <div className="steps-action"> */}
				<StepsAction>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>ต่อไป</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('การจองบริการสำเร็จ')}>เสร็จสิ้นการจอง</Button>
          }
          {	
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}> ย้อนกลับ </Button>
          }
				</StepsAction>
			</div>
		);
	}
}

export default ServiceReservation;