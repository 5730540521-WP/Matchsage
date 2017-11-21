import React from 'react';
import { Row,Col,Button,Menu,Icon } from 'antd';
import {connect} from 'react-redux';
import {CustomerActions} from '../../actions';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import styled from 'styled-components';

const H1 = styled.h1`
	text-align:left
`

const P = styled.p`
	text-align:left;
	text-indent:50px
`

class ServiceDetail extends React.Component{
	state={
		current :'detail',
		current2 : 'overall'
	}
	handleClick = (e) => {
		console.log('click ', e);
		if(e.key == 'detail' || e.key == 'review'){
			this.setState({
				current: e.key,
			});
		}else if(e.key == 'overall' || e.key == 'employee'){
			this.setState({
				current2: e.key,
			});
		}
  }
	componentDidMount(){
		this.props.loadService(this.props.match.params.id)
	}

	render(){
		let loaded = this.props.serviceReducer.hasOwnProperty('service');
		return (
			loaded?this.props.serviceReducer.service.hasOwnProperty('service_id')?
			<div>
				<figure>
					<img src="image.jpg" style={{minHeight:'200px',maxHeight:'200px'}}/>
				</figure>
				<Row>
					<Col span={4} offset={1} style={{border:'1px solid',padding:'10px'}}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
						>
							<Menu.Item key="detail">
								ข้อมูลของร้าน
							</Menu.Item>
							<Menu.Item key="review">
								ความคิดเห็น
							</Menu.Item>
						</Menu>
						<Button type="primary" style={{'marginTop':'10px'}}>จองบริการ</Button>
					</Col>
					<Col span={17} offset={1} style={{border:'1px solid',padding:'10px'}}>
						{this.state.current=='detail'?<div>
							<H1>ร้าน {this.props.serviceReducer.service.service_name}</H1>
							<Menu
								onClick={this.handleClick}
								selectedKeys={[this.state.current2]}
								mode="horizontal"
							>
								<Menu.Item key="overall">
									ข้อมูลทั่วไป
								</Menu.Item>
								<Menu.Item key="employee">
									พนักงาน
								</Menu.Item>
							</Menu>
							{this.state.current2=='overall'?<div>
								<H1>คำอธิบายร้าน</H1>
								<P>บลา บลา บลา</P>
								<H1>เจ้าของ</H1>
								<P>{this.props.serviceReducer.service.owner_id}</P>
								<H1>ที่อยู่</H1>
								<P>555/555 บลา บลา บลา<br/></P>
								<P>เบอร์ {this.props.serviceReducer.service.contact_number}</P>
								<H1>คะแนน</H1>
								<P>{this.props.serviceReducer.service.rating}</P>
							</div>
							:
							<div>พนักงานในร้าน</div>
							}
						</div>
						:
						<div>ความคิดเห็น</div>
						}
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