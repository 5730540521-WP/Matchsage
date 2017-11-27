import React from 'react';
// import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import {userActions} from 'actions';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const genders = [{
	value:'male',
	label:'ชาย'
},{
	value:'female',
	label:'หญิง'
}];

const userTypes=[{
	value:'customer',
	label:'ผู้ใช้บริการ'
},{
	value:'owner',
	label:'ผู้ให้บริการ'
}];
class RegistrationForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			first_name:'',
			last_name:'',
			password:'',
			gender:'',
			user_type:null,
			gender:'',
			// For antd magic
			confirmDirty: false,
			autoCompleteResult: [],
		}
	}

	onFieldChange = (e)=>{
		e.preventDefault();
		// console.log(e.target.name);
		const {name,value} = e.target;
		this.setState({[name]:value},()=>console.log(this.state));
	}

	onRegisterSubmit = (e)=>{
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
				// console.log('Received values of form: ', values);
				const {first_name,last_name,email,password,gender,user_type} = values;
				this.props.register(first_name,last_name,email,password,gender,user_type);
      }else{
				console.log(values);
			}
    });
		
	}

	handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

	render(){
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
		
		return(
			<Form onSubmit={this.onRegisterSubmit}>
				<FormItem
          {...formItemLayout}
          label="ชื่อจริง"
          hasFeedback
        >
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'โปรดใส่ชื่อจริง', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

				<FormItem
          {...formItemLayout}  
					label="นามสกุล"
          hasFeedback
        >
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'โปรดใส่นามสกุล', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

				<FormItem
					{...formItemLayout}
					label="อีเมล์"
					hasFeedback
				>
						{getFieldDecorator('email', {
							rules: [{
								type: 'email', message: 'อีเมล์ไม่ถูกต้อง',
							}, {
								required: true, message: 'โปรดกรอกอีเมล์',
							}],
						})(
							<Input />
						)}
				</FormItem>

				<FormItem
          {...formItemLayout}
          label="รหัสผ่าน"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'โปรดกรอกรหัสผ่าน',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>

				<FormItem
          {...formItemLayout}
          label="ยืนยันรหัสผ่าน"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'โปรดยืนยันรหัสผ่าน',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

				<FormItem
          {...formItemLayout}
          label="เพศ"
        >
					{getFieldDecorator('gender', {
            initialValue: ['ชาย', 'หญิง'],
            rules: [{ type: 'array', required: true, message: 'โปรดระบุเพศ' }],
          })(
            <Cascader options={genders} />
          )}
				</FormItem>

				<FormItem
          {...formItemLayout}
          label="ประเภท"
        >
					{getFieldDecorator('user_type', {
            initialValue: ['ผู้ใช้บริการ', 'ผู้ให้บริการ'],
            rules: [{ type: 'array', required: true, message: 'โปรดเลือกประเภทของสมาชิก' }],
          })(
            <Cascader options={userTypes} />
          )}
				</FormItem>

				<FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">สมัครสมาชิก</Button>
        </FormItem>

			</Form>
		);
	}
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class SignupModal extends React.Component{
	render(){
		return (
      <Modal title="สมัครสมาชิก"
        visible={this.props.modalState}
        onOk={this.props.onCloseSignupModal}
        footer={null}
        onCancel={this.props.onCloseSignupModal}
        onClose={this.props.onCloseSignupModal}>
				<section className="modal-card-body">
					<WrappedRegistrationForm register={this.props.register}/>
				</section>
			</Modal>
    )
	}
};

// function validate(values){
// 	const errors = {};
// 	return errors;
// }

// export default reduxForm({
// 	validate,
// 	form: 'SignupModal'
// })(SignupModal);


function mapStateToProps({registration}){
	const {isRegistering} = registration;
	return {isRegistering};
}

function mapDispatchToProps(dispatch){
	const register = userActions.register;
	return bindActionCreators( {register}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);