import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Field, reduxForm} from 'redux-form';
import {userActions} from 'actions';
import styled from 'styled-components';
import { Button, Modal, Input, Form, Icon} from 'antd';



const FormItem = Form.Item;




class ChangePasswordForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			password:'',
			new_password:'',
			conf_password:'',
			submited:false
		}
	}
  
  onChangePassword = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onChangePassword} className="login-form">
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input type="password" placeholder="password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('nwe password', {
            rules: [{ required: true, message: 'Please input your new Password!' }],
          })(
            <Input  type="password" placeholder="New Password" />
          )}
        </FormItem>
				<FormItem>
          {getFieldDecorator('confirm password', {
            rules: [{ required: true, message: 'Please confirm you new Password!' }],
          })(
            <Input  type="password" placeholder="Confirm Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            OK
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedChangePasswordForm = Form.create()(ChangePasswordForm);


class ChangePasswordModal extends React.Component {
	render() {
		return (
			<Modal title="เปลี่ยนรหัสผ่าน"
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
export default connect(mapStateToProps, mapDispacthToProps)(ChangePasswordModal);
// export default LoginModal;