import React from 'react';
import { Row,Col,Button,Menu,Carousel,Avatar,Card } from 'antd';
import {connect} from 'react-redux';
import {CustomerActions} from '../../actions';
import NotFound from '../NotFound';
import styled from 'styled-components';
import MapComponent from './MapComponent';
import ServiceReservation from './Reservation/ServiceReservation';
import ReportEmployeeModal from 'components/Common/Modal/ReportEmployeeModal';

const H1 = styled.h1`
	text-align:left;
	color:#402900
`

const P = styled.p`
	text-align:left;
	text-indent:30px;
	color:#402900
`

class ServiceDetail extends React.Component{
	state={
		current :'detail',
		current2 : 'overall',
		isReservation: false,
		showReportEmployeeModal: []
	}
	handleClick = (e) => {
		console.log('click ', e);
		if(e.key === 'detail' || e.key === 'employee'){
			this.setState({
				current: e.key,
				isReservation: false
			});
		}else if(e.key === 'overall' || e.key === 'employee'){
			this.setState({
				current2: e.key,
			});
		}
  }
	async componentDidMount(){
		await this.props.loadService(this.props.match.params.id);
	}

	onClickReservation = ()=>{
		this.setState({isReservation:true});
	}

	renderServiceDetail = ()=>{
		return(
			<div>
				{this.state.current==='detail'?<div>
				<H1>ชื่อร้าน {this.props.serviceStore.service.service_name}</H1>
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
						<Menu.Item key="employee" style={{}}>
							พนักงาน
						</Menu.Item>
					</Menu>
					</Row>
					{this.state.current2==='overall'?<div>
						<H1>คำอธิบายร้าน</H1>
						<P>บลา บลา บลา</P>
						<H1>เจ้าของ</H1>
						<P>{this.props.serviceStore.ownerDetail.first_name} {this.props.serviceStore.ownerDetail.last_name}</P>
						<H1>ที่อยู่</H1>
						<P>555/555 บลา บลา บลา<br/></P>
						<P>เบอร์ {this.props.serviceStore.service.contact_number}</P>
						<P>อีเมล์ {this.props.serviceStore.ownerDetail.email}</P>
						<H1>คะแนน</H1>
						<P>{this.props.serviceStore.service.rating}</P>
					</div>
					:
					<div>
						
					</div>
					}
				</div>
				:
				<div>
					<Row >
						<Col span={12}>
							{this.props.serviceStore.employees.employees.map((employee,index)=>{return index%2===0?this.renderEmployeeCard(employee):null})}
						</Col>
						<Col span={12}>
							{this.props.serviceStore.employees.employees.map((employee,index)=>{return index%2===1?this.renderEmployeeCard(employee):null})}
						</Col>
					</Row>
				</div>
				}
			</div>
		);
	}

	renderEmployeeCard(employee){
		return <div>
		<Card style={{ width: '25.5vw',margin:'auto' }} bodyStyle={{ padding: 0 }}>
			<div>
				<img src="../images/Auteur-zonder-foto-1.png" style={{margin:'auto',display:'block',maxHeight:'25.5vw'}}/>
			</div>
			<div>
				ชื่อ {employee.first_name} {employee.last_name}
				<br/>เพศ {employee.gender==='male'?'ชาย':'หญิง'}
				<br/>คะแนน {employee.rating}
				<br/><Button icon="exclamation-circle" type="danger" onClick={()=>this.setState({showReportEmployeeModal:true})}>รายงานพนักงานคนนี้</Button>
				<ReportEmployeeModal employee={employee} visible={this.state.showReportEmployeeModal} close={()=>this.setState({showReportEmployeeModal:false})}/>
			</div>
		</Card>
	</div>
	}

	render(props){
		let loaded = this.props.serviceStore.service;
		return (
			loaded?this.props.serviceStore.service.service_id?
			<div style={{color:'#402900'}}>
				<img src="../images/banner.jpg" style={{width:'100%',height:'12vw'}}/>
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
		serviceStore: state.service
	}
}

function mapDispatchToProps(dispatch){
	return {
		loadService: (id)=>{
			dispatch(CustomerActions.fetchService(id))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetail);