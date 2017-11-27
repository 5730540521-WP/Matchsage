import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions, CustomerActions } from '../../actions';
import {history} from '../../helpers';
import { Row, Col, Input, Button, Menu, Card, Select, Form, Cascader, Modal } from 'antd';
import styled from 'styled-components';
import * as JWT from 'jwt-decode';
const FormItem = Form.Item
const Option = Select.Option

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
const accountMethod = [{
	value: 'credit-card',
	label: 'เครดิต'
}, {
	value: 'owner',
	label: 'บัญชีธนาคาร'
}];

class AddPaymentAccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: '',
			company: '',
			method: '',
			autoCompleteResult: [],
		}
	}

	onFieldChange = (e) => {
		e.preventDefault();
		// console.log(e.target.name);
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => console.log(this.state));
	}

	onAddPaymentSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				const { number, company, method } = values;
				this.props.addPaymentAccount({number, company, method});
				this.props.closeModal()
			} else {
				console.log(values);
			}
		});

	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 },
			},
		};

		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 9,
				},
			},
		};

		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '86',
		})(
			<Select style={{ width: 60 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
			);

		return (
			<Form onSubmit={this.onAddPaymentSubmit}>
				<FormItem
					{...formItemLayout}
					label="เลขบัตร"
					hasFeedback
				>
					{getFieldDecorator('number', {
						rules: [{ required: true, message: 'โปรดใส่เลขบัตร', whitespace: true }],
					})(
						<Input />
						)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="รหัสหลังบัตร"
					hasFeedback
				>
					{getFieldDecorator('CCV', {
						rules: [{ required: true, message: 'โปรดใส่รหัสหลังบัตร', whitespace: true }],
					})(
						<Input />
						)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="บริษัท"
					hasFeedback
				>
					{getFieldDecorator('company', {
						rules: [{ required: true, message: 'โปรดใส่บริษัทบนบัตร', whitespace: true }],
					})(
						<Input />
						)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="ที่อยู่"
					hasFeedback
				>
				<Input />
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="ประเภทบัญชี"
				>
					{getFieldDecorator('method', {
						initialValue: ['credit-card', 'bank-account'],
						rules: [{ type: 'array', required: true, message: 'โปรดเลือกประเภทของบัญชี' }],
					})(
						<Cascader options={accountMethod} />
						)}

				</FormItem>

				<FormItem {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">เพิ่มบัญชี</Button>
				</FormItem>

			</Form>
		);
	}
}

const WrappedAddPaymentAccountForm = Form.create()(AddPaymentAccountForm);

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
			visible: false,
			current: 'profile'

		};

	}

	handleClick = (e) => {
		this.setState({
			current: e.key
		});
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

	onAddPaymentButtonClick = () => {
		this.setState({ visible: true })
	}

	async componentDidMount() {
		

		const id = JWT(localStorage.getItem('user')).user_id;
		const { user } = await userActions.fetchUserProfile(id);
		this.props.fetchPaymentAccount()
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
										<Col span={4}>
										</Col>
										<Col span={4}><Aright>เบอร์โทรศัพท์</Aright></Col>
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
										<Col span={4}>
										</Col>
										<Col span={4}><Aright>ประเภทสมาชิก</Aright> </Col>
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
					<div>
						<Row style={{ textAlign: 'left' }}>
							<Button
								onClick={this.onAddPaymentButtonClick} type="primary" style={{ margin: 10 }}>
								เพิ่มบัญชีการเงิน
							</Button>
						</Row>
						<div style= {{textAlign:'left'}}>
						{
							this.props.payment_accounts ? this.props.payment_accounts.length > 0 ? this.props.payment_accounts.map((account, index) => {
								const method = account.method === 'credit-card' ? 'Credit card ends with : ' : 'Bank account ends with : '
								const title = `${account.number.slice(account.number.length - 4, account.number.length)}`
								return (
									<Card title={method+title} bordered={true} style={{ width: 300, margin: 10 }}>
										<p>ชำระผ่าน: {account.method}</p>
										<p>ช่องทางการชำระเงิน: <img src="../../images/visa.png" style={{ maxHeight: '15px' }} /></p>
									</Card>
								)
							}) : <h1>ท่านยังไม่มีบัญชีการเงินใดๆ</h1> : null
						}
						</div>
					</div>
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
				<Modal title="เพิ่มบัญชีการเงิน"
					visible={this.state.visible}
					onOk={()=>{ this.setState({ visible: false })}}
					footer={null}
					onCancel={() => { this.setState({ visible: false }) }}
					onClose={() => { this.setState({ visible: false }) }}>
					<section className="modal-card-body">
						<WrappedAddPaymentAccountForm addPaymentAccount={this.props.addPaymentAccount} closeModal={()=> this.setState({visible: false})}/>
					</section>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		payment_accounts: state.payment_accounts.payment_accounts
	}
}

function mapDispatchToProps(dispatch) {
	const fetchPaymentAccount = CustomerActions.fetchMyPaymentAccount
	const addPaymentAccount = CustomerActions.addPaymentAccount
	return bindActionCreators({ fetchPaymentAccount, addPaymentAccount }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);