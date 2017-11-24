import React from 'react';
import { Row,Col,Button,Menu } from 'antd';
import {connect} from 'react-redux';
import {CustomerActions} from '../../actions';
import NotFound from '../NotFound';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { Avatar } from 'antd';
import MapComponent from './MapComponent';
import ServiceReservation from './ServiceReservation';

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
		isReservation: false
	}
	handleClick = (e) => {
		console.log('click ', e);
		if(e.key === 'detail' || e.key === 'review'){
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
	componentDidMount(){
		this.props.loadService(this.props.match.params.id);
	}

	onClickReservation = ()=>{
		this.setState({isReservation:true});
	}

	renderServiceDetail = ()=>{
		return(
			<div>
				{this.state.current==='detail'?<div>
				<H1>ชื่อร้าน {this.props.serviceReducer.service.service_name}</H1>
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
						<P>{this.props.serviceReducer.ownerDetail.first_name} {this.props.serviceReducer.ownerDetail.last_name}</P>
						<H1>ที่อยู่</H1>
						<P>555/555 บลา บลา บลา<br/></P>
						<P>เบอร์ {this.props.serviceReducer.service.contact_number}</P>
						<P>อีเมล์ {this.props.serviceReducer.ownerDetail.email}</P>
						<H1>คะแนน</H1>
						<P>{this.props.serviceReducer.service.rating}</P>
					</div>
					:
					<div>
						<Row >
							<Col span={12}>
								{this.props.serviceReducer.employees.employees.map((employee,index)=>{return index%2===0?<div><div><Avatar shape="square" size="large" icon="user" /></div>ชื่อ {employee.first_name} {employee.last_name}<br/>คะแนน {employee.rating}</div>:null})}
							</Col>
							<Col span={12}>
								{this.props.serviceReducer.employees.employees.map((employee,index)=>{return index%2===1?<div><div><Avatar shape="square" size="large" icon="user" /></div>ชื่อ {employee.first_name} {employee.last_name}<br/>คะแนน {employee.rating}</div>:null})}
							</Col>
						</Row>
					</div>
					}
				</div>
				:
				<div>ความคิดเห็น</div>
				}
			</div>
		);
	}

	render(props){
		let loaded = this.props.serviceReducer.service;
		return (
			loaded?this.props.serviceReducer.service.service_id?
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
							<Menu.Item key="review">
								ความคิดเห็น
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
		serviceReducer: state.service
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