import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {userActions} from 'actions';
import styled from 'styled-components';
import { Button, Modal, Input, Icon, Checkbox} from 'antd';

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
class RateEmployee extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			score: 0,
			// 'password':'',
			// 'submitted':false
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
    handleChange = (value) => {
        this.setState({ score:value });	
      }

	// onLoginSubmit = (e) => {
	// 	e.preventDefault();
	// 	this.props.form.validateFieldsAndScroll((err, values) => {
	// 		if (!err) {
	// 			// console.log('Received values of form: ', values);
	// 			const { email, password } = values;
	// 			this.props.login(email, password);
	// 		} else {
	// 			alert('Login Error!!')
	// 			console.log(err);
	// 		}
	// 	})
	// }
	
	render () {
		const { getFieldDecorator } = this.props.form;
		const {isLoggingIn} = this.props;
		// const {email, password, submitted} = this.state;
		return (
				<Rate allowHalf defaultValue={this.state.score} onChange={this.handleChange}/>
                <br/>
                <Button type='primary' style={{margin:'10px'}} >
                    ให้คะแนน
                    </Button>
		)
	}
	
}

const WrappedLoginForm = Form.create()(LoginForm);

class RateEmployeeModal extends React.Component {
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
