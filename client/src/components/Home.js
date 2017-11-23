import React from 'react';
import styled from 'styled-components';
import { Row, Col,Button, Icon, Steps } from 'antd';
import SignupModal from './Common/Modal/SignupModal';
const Step = Steps.Step;


/*const Hero = styled.div.attrs({
	className:"hero is-medium is-primary is-bold"
})``;*/


export default class Home extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {	
			isSignupModalActive: false
		}
		
	}

	toggleSignupModal(modalValue){
		this.setState({isSignupModalActive: modalValue})
	}
	
	render(){
		const imgurl1 = './images/1150.jpg',imgurl2 = './images/1142.jpg';
		return (
			<section className="section" style={{padding:'0px',backgroundColor:'#FFF8EB'}}>
				<Row>
					
					<Col span={24}>
							<img src={imgurl1} style={{display: 'block',margin:'auto',position:'relative',width:'100%',height:'40.1vw',opacity:.9}}/>
							<div style={{position:'absolute', bottom:'0%', width:'100%', height:'40%', 'backgroundColor':'black', opacity:.4}}></div>
							<div style={{position:'absolute', bottom:'8%' ,left:'4%',width:'70%',fontSize:'20px',textAlign: 'left'}}>
								<h1 style={{fontWeight:'bold', color:'white'}}>
									Matchsage
								</h1>					
								<h1 style={{color:'white',display:'inline-block'}}>แหล่งรวบรวมร้านนวดคุณภาพ</h1>
								<Button type="primary" style={{display:'inline-block','transform': 'translate(0%, -18%)',width:'100px',height:'50px',fontSize:'19px',marginLeft:'1.5%'}}
									onClick={()=>this.toggleSignupModal(true)}>สมัครฟรี</Button>
								 
							</div>
					</Col>
					
				</Row>
				<div style={{padding:'4%',color:'#402900'}}>
				<h1 style={{fontSize:'35px', textAlign: 'left'}}>Matchsage คืออะไร...</h1>
				<Row gutter={24}>
					<Col span={12}>
						<figure>
							<img src={imgurl2} style={{borderRadius:'2%',padding:'12px'}}/>
						</figure>
					</Col>
						<Col span={12} style={{
							textIndent: '50px',
							textAlign: 'left',
							fontSize: '25px',
							marginTop: 20
						}}>
						<p>Matchsage เป็นตัวกลางระหว่างร้านนวดจากทั่วประเทศและลูกค้า โดยจะเป็นระบบที่รวบรวมข้อมูลร้านนวดต่างๆทั่วประเทศมารวมกันไว้เพื่อให้สะดวกต่อการค้นหา
						</p>
						<br/>
						<p>นอกจากนี้ยังมีส่วนระบบจับคู่ผู้ต้องการใช้และผู้ให้บริการเข้าด้วยกันเพื่อให้ผู้บริการสามารถไปให้บริการได้ถึงสถานที่ที่ลูกค้าต้องการ เป็นการเพิ่มความสะดวกสบายรวมไปถึงความประทับใจให้กับลูกค้าอีกด้วย
						</p>
					</Col>
				</Row>
				
				</div>
				<div style={{backgroundColor: 'white', padding: '4%'}}>
					<h1 style={{textAlign: 'left', fontSize:35}}>จองบริการสุดง่าย</h1>
					<Row style={{padding: 50}}>
						<Col span={3}>
							<Icon type="user" style={{ fontSize: 90, color: 'orange' }} />
						</Col>
						<Col span={3}>
							<Icon type="arrow-right" style={{ fontSize: 75, color: '#08c' }} />
						</Col>
						<Col span={3}>
							<Icon type="search" style={{ fontSize: 90, color: 'orange' }} />
						</Col>
						<Col span={5}>
							<Icon type="arrow-right" style={{ fontSize: 75, color: '#08c' }} />
						</Col>
						<Col span={3}>
							<Icon type="book" style={{ fontSize: 90, color: 'orange' }} />
						</Col>
						<Col span={3}>
							<Icon type="arrow-right" style={{ fontSize: 75, color: '#08c' }} />
						</Col>
						<Col span={3}>
							<Icon type="credit-card" style={{ fontSize: 90, color: 'orange' }} />
						</Col>
					</Row>
				</div>
				{/* <div className="">
					<h1> Welcome to Matchsage </h1>
					<img src="https://img.grouponcdn.com/deal/jDKWx7dTfeSfvVypXRgF/mw-700x420/v1/c700x420.jpg"/>
				</div>*/}
				<SignupModal modalState={this.state.isSignupModalActive} onCloseSignupModal={()=>this.toggleSignupModal(false)}/>
			</section>
		);
	}
}