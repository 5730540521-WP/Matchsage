import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Field, reduxForm} from 'redux-form';
import {userActions} from 'actions';
import styled from 'styled-components';
import { Button, Modal, Input, Form, Icon, Checkbox} from 'antd';
const FormItem = Form.Item
// const renderField = (field)=>(
// 	<div className="form-group">
// 		<label>{field.label}</label>
// 		<input 
// 			className="form-control"
// 			type="text"
// 			{...field.input}
// 		/>
// 		{field.meta.errors}
// 	</div>
// )

//= ({modalState,onCloseLoginModal})=>

// const loginSubmitButtonLoading = styled.
// const loginSubmitButton = styl
class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'email':'',
			'password':'',
			'submitted':false
		}
	}

	// onEmailChange(e){
	// 	this.setState({email: e.target.value});
	// }

	// onPasswordChange(e){
	// 	this.setState({password: e.target.value});
	// }
	// onFieldChange(e){
	// 	// console.log(e.target.name);
	// 	const {name,value} = e.target;
	// 	this.setState({[name]:value});
	// }

	onLoginSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				const { email, password } = values;
				this.props.login(email, password);
			} else {
				alert('Login Error!!')
				console.log(err);
			}
		})
	}
	
	render () {
		const { getFieldDecorator } = this.props.form;
		const {isLoggingIn} = this.props;
		// const {email, password, submitted} = this.state;
		return (
				<Form onSubmit={this.onLoginSubmit} className="login-form" style={{marginLeft:85}}>
					<FormItem>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
							)}
						<a className="login-form-forgot" href="">ลืมรหัสผ่าน</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
							เข้าสู่ระบบ
          	</Button>
					</FormItem>
				</Form>
		)
	}
	
}

const WrappedLoginForm = Form.create()(LoginForm);

class LoginModal extends React.Component {
	render() {
		return (
			<Modal title="เข้าสู่ระบบ"
				visible={this.props.modalState}
				onOk={this.hideModal}
				footer={null}
				onCancel={this.props.onCloseLoginModal}
				onClose={this.props.onCloseLoginModal}
			>
				<WrappedLoginForm login={this.props.login} />
			</Modal>
		)
	}
}

function mapStateToProps({authentication}){
	const {isLoggingIn} = authentication;
	return {isLoggingIn};
}

function mapDispacthToProps(dispatch){
	const login = userActions.login;
	return bindActionCreators( {login}, dispatch)
}
export default connect(mapStateToProps, mapDispacthToProps)(LoginModal);
// export default LoginModal;
