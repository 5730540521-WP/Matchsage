import React from 'react';
import { message,Row,Col,Button,Menu,Carousel,Avatar,Card,Modal,Input,Rate } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CustomerActions} from '../../actions';
import {history} from '../../helpers';
import NotFound from '../NotFound';
import styled from 'styled-components';
import MapComponent from './MapComponent';
import ServiceReservation from 'components/Service/Reservation/ServiceReservation';
import ReportEmployeeModal from 'components/Common/Modal/ReportEmployeeModal';

const {TextArea} = Input;

const H1 = styled.h1`
	text-align:left;
	color:#402900
`

const H2 = styled.h2`
text-align:left;
font-size: 18px;
color:#402900
`

const P = styled.p`
	text-align:left;
	text-indent:30px;
	color:#402900
`

const Lalign = styled.div`
text-align:left;
`


class ServiceDetail extends React.Component{
	state={
		current :'detail',
		current2 : 'overall',
		isReservation: false,
		//isRate: false,
		showReportEmployeeModal: false,
		selectedReportEmployee:'',
		reportEmployeeTopic:'',
		reportEmployeeContent:'',
		showServiceComplaint: false,
		sendServiceComplaintLoading:false,
		serviceComplaint_topic:'',
		serviceComplaint_content:'',
		serviceRating: 3,
		employeeRating: 0,
		//serviceCurrentRate:''
		
	}
	handleClick = (e) => {
		if(e.key === 'detail' || e.key === 'employee'){
			this.setState({
				current: e.key,
				isReservation: false
			});
		}else if(e.key === 'overall'){
			this.setState({
				current2: e.key,
			});
		}
	}
	
	handleChange = (value) => {
    this.setState({ serviceRating:value });	
	}
	
	getHalf(number){
			if(number-4 >= 0.5 ) return 4.5;
			else if(number-3 >= 0.5 && number-3 <1) return 3.5;
			else if(number-2 >= 0.5 && number-2 <1) return 2.5;
			else if(number-1 >= 0.5 && number-1 <1) return 1.5;
			else if(number >= 0.5 && number  <1) return 0.5;
			else return number;
	}

	componentDidMount(){
		this.props.loadService(this.props.match.params.id);
		// this.setState
	}

	onRatingService = (e) =>{ 
		CustomerActions.rateService(this.props.serviceState.service.service_id, this.state.serviceRating,"service")
		const modal = Modal.success({
			title: 'Rate success!',
			content: 'close this modal to proceed.'
		});
		this.setState({serviceCurrentRate:this.props.serviceState.service.rating});
		this.state.isRate=true;
<<<<<<< HEAD
		window.location.reload()	

	}

	onRatingEmployee = (e) =>{ 
		CustomerActions.rateService(this.props.serviceState.service.service_id, this.state.employeeRating,"employee")
		alert('Rating success!')
		// this.setState({serviceCurrentRate:this.props.serviceState.service.rating});
		// this.state.isRate=true;
		window.location.reload()	
				
	}


	handleEmployeeRate= (value) => {
		this.setState({ employeeRating:value });	
=======
		setTimeout(() => {
			modal.destroy()
			window.location.reload()
		}, 1000)
		
		
>>>>>>> cf4dce3cfc50970e915917b1018b711161e8d8e5
	}

	get2Dec(number){
		return parseFloat(number).toFixed(2);
	}

	onClickReservation = ()=>{
		this.props.selectServiceReservation(this.props.serviceState.service.service_id,
			this.props.serviceState.service.price_per_hour);
		this.setState({isReservation:true});
	}

	renderServiceComplaint(service_name){
		return <Modal
			visible={this.state.showServiceComplaint}
			title={'รายงาน'+service_name}
			// onOk={()=>{
			// 	this.setState({showServiceComplaint:false})
			// }}
			onCancel={()=>{
				this.setState({showServiceComplaint:false})
			}}
			footer={[
				<Button key="back" size="large" onClick={()=>{
					this.setState({ loading: false,showServiceComplaint:false});
				}}>ยกเลิก</Button>,
				<Button key="submit" type="primary" size="large" loading={this.state.sendServiceComplaintLoading} onClick={async()=>{
					this.setState({ loading: true });
					const hasError = await CustomerActions.sendServiceComplaint(this.props.serviceState
			.service.service_id,this.state.serviceComplaint_topic,this.state.serviceComplaint_content);
						if(hasError){
							message.error('Error.');
						}else {
							message.success('Sending Complaint Successful.');
						}
					this.setState({ loading: false,showServiceComplaint:false });
				}}>
					ส่ง
				</Button>,
			]}
		>
			หัวข้อ<br/>
			<Input placeholder="หัวข้อ" value={this.state.serviceComplaint_topic} onChange={(e)=>this.setState({serviceComplaint_topic:e.target.value})}/>
			รายละเอียด<br/>
			<TextArea placeholder="รายละเอียด" value={this.state.serviceComplaint_content} width="100%" autosize={{ minRows: 6}} onChange={(e)=>this.setState({serviceComplaint_content:e.target.value})}/>

		</Modal>
	}

	renderRateEmployeeModal(){
		return
			<Modal title="ให้คะแนนพนักงาน"
				visible={this.props.modalState}
				onOk={this.hideModal}
				footer={null}
				onCancel={this.props.onCloseLoginModal}
				onClose={this.props.onCloseLoginModal}
			>
				<Rate allowHalf defaultValue={this.state.employeeRating} onChange={this.handleChange} style={{margin:'10px'}} />
				<br/>
				<Button type='primary' style={{margin:'10px'}} 
					onClick={(e) => this.onRatingEmployee(e)}>
					ให้คะแนน
				</Button>
			</Modal>

		

	}


	renderServiceDetail = ()=>{
		return(
			<div>
				{this.state.current==='detail'?<div>
					<Row>
						<H1 style={{display:'inline',float:'left'}}>ชื่อบริการ {this.props.serviceState
				.service.service_name}</H1>
						<Button icon="exclamation-circle" type="danger" onClick={()=>this.setState({showServiceComplaint:true,serviceComplaint_topic:'',serviceComplaint_content:''})}
						style={{display:'inline',float:'right'}}>รายงานบริการนี้</Button>
						{this.renderServiceComplaint(this.props.serviceState
				.service.service_name)}
					</Row>
				<Row gutter={16} style={{marginBottom:'10px'}}>
					<Col span={12}>
						<Carousel autoplay>
							<div><h1 style={{color:'white'}}>Pic1</h1></div>
							<div><h1 style={{color:'white'}}>Pic2</h1></div>
							<div><h1 style={{color:'white'}}>Pic3</h1></div>
							<div><h1 style={{color:'white'}}>Pic4</h1></div>
						</Carousel>
					</Col>
					<Col span={12}>
						<MapComponent isMarkerShown
						/>
					</Col>
				
				</Row>
				
				<Row>
					<Menu
						onClick={this.handleClick}
						selectedKeys={[this.state.current2]}
						mode="horizontal"
						style={{marginBottom:'10px',display:'inline-block',float:'left',color:'#402900'}}
					>
						<Menu.Item key="overall">
							ข้อมูลทั่วไป
						</Menu.Item>
					</Menu>
					</Row>
					{this.state.current2==='overall'?
					<div>
					<Col span={12}>					
						
							<H1>คำอธิบายบริการ</H1>
							<P>บริการนี้สามารถลดหย่อนภาษีได้ ตามนโยบายของภาครัฐ</P>
							<H1>เจ้าของบริการ</H1>
							<P>{this.props.serviceState
					.ownerDetail.first_name} {this.props.serviceState
					.ownerDetail.last_name}</P>
							<H1>ที่อยู่</H1>
							<P>555/555 เขต รัชดา กทม<br/></P>
							<P>เบอร์ {this.props.serviceState
					.service.contact_number}</P>
							<P>อีเมล์ {this.props.serviceState
					.ownerDetail.email}</P>
							<H1>คะแนน</H1>
							<P>{this.get2Dec(this.props.serviceState
					.service.rating)}</P>
						
				</Col>
				<Col span={12}>
					
							<H1>คะแนนความพึงพอใจ</H1>
							
							<H2>คะแนนบริการ</H2>
							<Lalign>
								{/* {Service Rate} */}
<<<<<<< HEAD
							<Rate disabled  allowHalf defaultValue={this.getHalf( this.props.serviceState.service.rating )} style={{backgroundColor : '#eeeeee'}} />
=======
									<Rate disabled defaultValue={this.props.serviceState.service.rating} style={{}} />
>>>>>>> cf4dce3cfc50970e915917b1018b711161e8d8e5
							</Lalign>


							<H2 style={{marginLeft:'20px',marginTop:'15px', fontSize:'15px'}}>ให้คะแนนบริการนี้</H2>
							<Lalign>
							<Rate allowHalf defaultValue={this.state.serviceRating} onChange={this.handleChange} style={{marginLeft:'20px',marginTop:'5px',marginBottom:'5px' }}/>
							<Button type='primary' 
								onClick={(e) => this.onRatingService(e)} style={{fontSize:'13px',marginLeft:'10px'}}>>
								ส่ง</Button>
							
							</Lalign>

							{/* <H1>ที่อยู่</H1>
							<P>555/555 บลา บลา บลา<br/></P>
							<P>เบอร์ {this.props.serviceState.service.contact_number}</P>
							<P>อีเมล์ {this.props.serviceState.ownerDetail.email}</P>
							<H1>คะแนน</H1>
							<P>{this.props.serviceState.service.rating}</P> */}
						
				</Col>
				</div>	
					:
					<div>
						
					</div>
					}
				</div>
				:
				<div>
					<Row >
						<Col span={8}>
							{this.props.serviceState
					.employees.employees.map((employee,index)=>{return index%3===0?this.renderEmployeeCard(employee,index):null})}
						</Col>
						<Col span={8}>
							{this.props.serviceState
					.employees.employees.map((employee,index)=>{return index%3===1?this.renderEmployeeCard(employee,index):null})}
						</Col>
						<Col span={8}>
							{this.props.serviceState
					.employees.employees.map((employee,index)=>{return index%3===2?this.renderEmployeeCard(employee,index):null})}
						</Col>
					</Row>
					<ReportEmployeeModal changeTopic={(topic)=>this.setState({reportEmployeeTopic:topic})} changeContent={(content)=>this.setState({reportEmployeeContent:content})} topic={this.state.reportEmployeeTopic} content={this.state.reportEmployeeContent} employee={this.state.selectedReportEmployee} visible={this.state.showReportEmployeeModal} close={()=>this.setState({showReportEmployeeModal:false})}/>
				</div>
				}
			</div>
		);
	}

	renderEmployeeCard(employee,index){
		

		return <div style={{paddingBottom:'2vw'}}>
		<Card style={{ width: '22vw',margin:'auto' }} bodyStyle={{ padding: 0 }}>
			<div>
				<img src="/images/Auteur-zonder-foto-1.png" style={{margin:'auto',display:'block',maxHeight:'22vw'}}/>
			</div>
			<div>
				ชื่อ {employee.first_name} {employee.last_name}
				<br/>เพศ {employee.gender==='male'?'ชาย':'หญิง'}
				<br/>คะแนน {employee.rating}
				<br/><Rate disabled allowHalf value={this.getHalf( employee.rating) } />


				

				<br/> <Button type='primary' style={{marginBottom:'10px'}}
					onClick={(e)=>this.renderRateEmployeeModal(employee)}>
								ให้คะแนนพนักงาน
					</Button>	





				<br/><Button icon="exclamation-circle" type="danger" style={{marginBottom:'10px'}} onClick={()=>{
					this.setState({showReportEmployeeModal:true,selectedReportEmployee:employee,reportEmployeeTopic:'',reportEmployeeContent:''})
				}}>รายงานพนักงานคนนี้</Button>
			</div>
		</Card>
	</div>
	}

	render(props){
		let loaded = this.props.serviceState.service;
		return (
			loaded?this.props.serviceState
.service.service_id?
			<div style={{color:'#402900'}}>
				<img src="/images/banner.jpg" style={{width:'100%',height:400}}/>
				<Row type="flex" justify="space-between" gutter={48} style={{marginBottom:'20px',marginTop:'20px',paddingLeft:'48px',paddingRight:'48px'}}>
					<Col span={5} style={{paddingLeft:'0px'}}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							style={{color:'#402900'}}
						>
							<Menu.Item key="detail">
								ข้อมูลของร้าน
							</Menu.Item>
							<Menu.Item key="employee">
								พนักงานในร้าน
							</Menu.Item>
						</Menu>
						<Button type="primary" style={{'marginTop':'10px'}}
							onClick={this.onClickReservation}
						>
							จองบริการ
						</Button>
					</Col>

					<Col span={19} style={{backgroundColor:'#FFF8EB',padding:'20px'}}>
						{ this.state.isReservation? <ServiceReservation service_id={this.props.match.params.id}/> :this.renderServiceDetail()}
					</Col>
					
				</Row>
			</div>:<NotFound/>
			:null
		)
	}
}

function mapStateToProps(state){
	return {
		serviceState: state.service
	}
}

function mapDispatchToProps(dispatch){
	// return {
	// 	loadService: (id)=>{
	// 		dispatch(CustomerActions.fetchService(id))
	// 	},
	// 	sendComplaint:(service_id,topic,content)=>{
	// 		dispatch(CustomerActions.sendServiceComplaint(service_id,topic,content))
	// 	},

	// }
	const loadService = CustomerActions.fetchService;
	const selectServiceReservation = CustomerActions.selectServiceReservation;
	return bindActionCreators({loadService,selectServiceReservation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetail);
