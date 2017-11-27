import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import {history} from '../../helpers';
import { Row, Col, Input, Button, Menu } from 'antd';
import styled from 'styled-components';
import * as JWT from 'jwt-decode';

const Aright = styled.div`
	text-align:right;	
	font-size: 15px;
        
	padding: 8px
		
           
 `
const Aleft = styled.div`
	text-align:left;
	font-size: 15px;
    padding: 8px
       
`

const Bspace = styled.div`
	word-spacing: 60px;

`

const PadSpace = styled.div`
	padding: 5px

`

const MarginSpace = styled.div`
	margin-left: 10px;
	margin-right: 10px;

`
class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			isOwner: false,
			isCustomer: false,
			isAdmin: false,
			first_name: '',
			last_name: '',
			address: '',
			contact: '',
			// password: '',
			// new_pwd: '',
			// conf_pwd: '',
			update: '',
			current: 'profile'

		};

	}

	onInputChange(e) {
		// this.state.u
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			console.log(this.state.first_name)
		});
		// console.log(e.target.name)
		// console.log(e.target.value);
	}

	async componentDidMount() {
		

		const id = JWT(localStorage.getItem('user')).user_id;
		const { user } = await userActions.fetchUserProfile(id);
		console.log(user);
		this.setState({ user }, () => {
			console.log(userActions.fetchUserProfile(id));

			if (this.state.user.user_type === 'owner') this.setState({ isOwner: true });
			else if (this.state.user.user_type === 'customer') this.setState({ isCustomer: true });


			this.setState({ first_name: this.state.user.first_name, last_name: this.state.user.last_name })
			this.setState({ address: this.state.user.address, contact: this.state.user.contact })
		});


	}
	onEditSubmit = async (e) => {
			const update = { 
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				address: this.state.address,
				contact: this.state.contact,
				// password: this.state.password,
				// new_pwd: this.state.new_pwd,
				// conf_pwd: this.state.conf_pwd,
			}

			const id = JWT(localStorage.getItem('user')).user_id;

			const res = await userActions.editProfile(id,update);
			if( res.success ) {
				console.log('YES~ edit successs')
				alert('Edit success')
			}
	}

	renderUserProfile () {
		return (
			<div>
				{this.state.current==='profile' ?
					<div className="columns is-multiline is-mobile">
						<div className="column is-three-quarter">
							<div>
								<PadSpace>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>ชื่อ</Aright></Col>
										<Col span={8}>
											<Input name='first_name' value={this.state.first_name} style={{ fontSize: '15px' }} size="large"
												onChange={(e) => this.onInputChange(e)} />
										</Col>
									</Row>
								</PadSpace>
								<PadSpace>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>นามสกุล</Aright></Col>
										<Col span={8}>
											<Input name='last_name' value={this.state.last_name} style={{ fontSize: '15px' }} size="large"
												onChange={(e) => this.onInputChange(e)} />
										</Col>
									</Row>
								</PadSpace>
								<PadSpace>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>ที่อยู่</Aright></Col>
										<Col span={8}>
											<Input name='address' value={this.state.address} style={{ fontSize: '15px' }} size="large"
												onChange={(e) => this.onInputChange(e)} />
										</Col>
									</Row>
								</PadSpace>
								<PadSpace>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>เบอร์โทรศัพท์</Aright></Col>
										<Col span={8}>
											<Input name='contact' value={this.state.contact} style={{ fontSize: '15px' }} size="large"
												onChange={(e) => this.onInputChange(e)} />
										</Col>
									</Row>

								</PadSpace>
								<PadSpace>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>อีเมล์</Aright></Col>
										<Col span={8}>
											<Input disabled value={this.state.user ? this.state.user.email : false}
												style={{ fontSize: '15px' }} size="large" />
										</Col>
									</Row>
								</PadSpace>
								<PadSpace>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>รหัสผ่าน</Aright></Col>
										<Col span={2}>
											<Button type="button"
												onClick={(e) => history.push('/')} style={{ fontSize: '13px' }}  >
												เปลี่ยนรหัสผ่าน
												</Button>
										</Col>
									</Row>
									<Row>
										<Col span={6}>
										</Col>
										<Col span={2}><Aright>ประเภทสมาชิก</Aright> </Col>
										<Col span={6}><Bspace><Aleft>{this.state.isCustomer ? ": ผู้รับบริการ" : this.state.isOwner ? ": ผู้ให้บริการ" : ": ผู้ดูแลระบบ"}</Aleft></Bspace> </Col>
									</Row>
								</PadSpace>
								<Row>
									<Col span={10} />
									<Col span={2}>

										<Button type="button"
											onClick={(e) => this.onEditSubmit(e)} style={{ fontSize: '13px' }}>
											บันทึกข้อมูล</Button>
									</Col>
								</Row>
							</div>
						</div>
					</div> :
					<p>fuck</p>
				}
			</div>
		)
	}


	render() {
		return (
			<div style={{ color: '#402900' }}>
				
				<Row type="flex" justify="space-between" gutter={48} style={{ marginBottom: '20px', marginTop: '20px', paddingLeft: '48px', paddingRight: '48px' }}>
					<Col span={5} style={{ paddingLeft: '0px' }}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							style={{ color: '#402900' }}
						>
							<Menu.Item key="profile">
								โปรไฟล์ของฉัน
							</Menu.Item>
							<Menu.Item key="account">
								บัญชีของฉัน
							</Menu.Item>
						</Menu>
						<Button
							onClick={() => history.push('/')} type="primary" style={{ 'marginTop': '10px' }}>
							กลับหน้าแรก
						</Button>
					</Col>

					<Col span={19} style={{ backgroundColor: '#FFF8EB', padding: '20px' }}>
						{this.renderUserProfile()}
					</Col>

				</Row>
			</div>
		);
	}
}

export default connect(null)(Profile);