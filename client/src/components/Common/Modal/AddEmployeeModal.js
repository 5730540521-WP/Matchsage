import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Field, reduxForm} from 'redux-form';
import {OwnerActions} from 'actions';
import styled from 'styled-components';
import { Button, Modal, Input, Form, Icon, Checkbox, Cascader} from 'antd';
const FormItem = Form.Item

const genders = [{
	value:'male',
	label:'ชาย'
},{
	value:'female',
	label:'หญิง'
}];

class ServiceForm extends React.Component{
	constructor(props){
		super(props);		
		this.state = {			
			'first_name':'',	
			'last_name':'',		
			'gender':'',		
		}
	}

	onEditSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {				
				const { first_name, last_name, gender} = values;	
				const service_id = this.props.service.service_id;					
				this.props.addServiceEmployee(service_id,  { first_name, last_name, gender});
				this.props.aftersubmit()
			} else {
				console.log(values);
			}
		})				
	}

	render () {
		const { getFieldDecorator } = this.props.form;
		const { service_name, price_per_hour} = this.props.service;
				
		return (
				<Form onSubmit={this.onEditSubmit} className="login-form" style={{marginLeft:85}}>	
					<FormItem	label="ชื่อจริง">
						{getFieldDecorator('first_name', {
							rules: [{ required: true, message: 'โปรดใส่ชื่อจริง', whitespace: true }],
						})(
							<Input />
						)}
					</FormItem>	
					<FormItem	label="นามสกุล">
						{getFieldDecorator('last_name', {
							rules: [{ required: true, message: 'โปรดใส่นามสกุล', whitespace: true }],
						})(
							<Input />
						)}
					</FormItem>	
					<FormItem label="เพศ" >
						{getFieldDecorator('gender', {
							initialValue: ['ชาย', 'หญิง'],
							rules: [{ type: 'array', required: true, message: 'โปรดระบุเพศ' }],
						})(
							<Cascader options={genders} />
						)}
					</FormItem>								
					<Button type="primary" htmlType="submit" className="login-form-button">
						เพิ่ม
          			</Button>					
				</Form>
		)
	}
	
}

const WrappedServiceForm = Form.create()(ServiceForm);

class AddEmployeeModal extends React.Component {
	render() {
		return (
			<Modal title="เพิ่มพนักงาน"
				visible={this.props.modalState}
				onOk={this.hideModal}
				footer={null}
				onCancel={this.props.onCloseModal}
				onClose={this.props.onCloseModal}				
			>
				<WrappedServiceForm 					
					addServiceEmployee = {this.props.addServiceEmployee}		
					aftersubmit = {this.props.aftersubmit}	
					service = {this.props.editService}			
				/>
			</Modal>
		)
	}
}
function mapDispacthToProps(dispatch){
	const addServiceEmployee = OwnerActions.addServiceEmployee;	
	return bindActionCreators( {addServiceEmployee}, dispatch)
}
export default connect(null, mapDispacthToProps)(AddEmployeeModal);

