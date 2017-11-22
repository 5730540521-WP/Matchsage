import React from 'react';
import styled from 'styled-components';
import { Row, Col,Button } from 'antd';
import SignupModal from './Common/Modal/SignupModal';


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
		const text = {
			textIndent:'50px',
			textAlign: 'left',
			fontSize:'30px'
		}
		const imgurl1 = './images/1150.jpg',imgurl2 = './images/1142.jpg';
		return (
			<section className="section" style={{padding:'1.5rem',backgroundColor:'#FFF8EB'}}>
				<Row>
					
					<Col span={24}>
							<img src={imgurl1} style={{display: 'block',margin:'auto',position:'relative',width:'100%',height:'40.1vw'}}/>
							<div style={{position:'absolute', bottom:'0%', width:'100%', height:'40%', 'backgroundColor':'black', opacity:.2}}></div>
							<div style={{position:'absolute', bottom:'8%' ,left:'2%',width:'70%',fontSize:'20px',textAlign: 'left'}}>
								<h1 style={{fontWeight:'bold', color:'white'}}>
									Matchsage
								</h1>					
								<h1 style={{color:'white',display:'inline-block'}}>แหล่งรวบรวมร้านนวดคุณภาพ</h1>
								<Button type="primary" style={{display:'inline-block','transform': 'translate(0%, -18%)',width:'100px',height:'50px',fontSize:'19px',marginLeft:'1.5%'}}
									onClick={()=>this.toggleSignupModal(true)}>สมัครฟรี</Button>
								 
							</div>
					</Col>
					
				</Row>
				<h1 style={{fontSize:'35px', textAlign: 'left',marginTop:'24px',marginBottom:'12px'}}>Matchsage คืออะไร...</h1>
				<Row gutter={24}>
					<Col span={12}>
						<figure>
							<img src={imgurl2} style={{borderRadius:'4%',padding:'12px'}}/>
						</figure>
					</Col>
					<Col span={12} style={text}>
						<p>Matchsage เป็นตัวกลางระหว่างร้านนวดจากทั่วประเทศและลูกค้า โดยจะเป็นระบบที่รวบรวมข้อมูลร้านนวดต่างๆทั่วประเทศมารวมกันไว้เพื่อให้สะดวกต่อการค้นหา
						</p>
						<br/>
						<p>นอกจากนี้ยังมีส่วนระบบจับคู่ผู้ต้องการใช้และผู้ให้บริการเข้าด้วยกันเพื่อให้ผู้บริการสามารถไปให้บริการได้ถึงสถานที่ที่ลูกค้าต้องการ เป็นการเพิ่มความสะดวกสบายรวมไปถึงความประทับใจให้กับลูกค้าอีกด้วย
						</p>
					</Col>
				</Row>
				{/* <div className="">
					<h1> Welcome to Matchsage </h1>
					<img src="https://img.grouponcdn.com/deal/jDKWx7dTfeSfvVypXRgF/mw-700x420/v1/c700x420.jpg"/>
				</div>*/}
				<SignupModal modalState={this.state.isSignupModalActive} onCloseSignupModal={()=>this.toggleSignupModal(false)}/>
			</section>
		);
	}
}