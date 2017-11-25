import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Field, reduxForm} from 'redux-form';
import {OwnerActions} from 'actions';
import styled from 'styled-components';
import { Button, Modal, Input, Form, Icon, Checkbox} from 'antd';
import { config } from 'recompose/setObservableConfig';
const FormItem = Form.Item

class ServiceForm extends React.Component{
	constructor(props){
		super(props);		
		this.state = {			
			'price_per_hour':'',			
		}
	}

	onEditSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {								
				const service_id = this.props.service.service_id;			
				this.props.editService(service_id, values);
				this.props.aftersubmit()
			} else {
				console.log(values);
			}
		})				
	}

	render () {
		const { getFieldDecorator } = this.props.form;
		const { service_name, address, contact_number, price_per_hour} = this.props.service;
		console.log(service_name)
				
		return (
				<Form onSubmit={this.onEditSubmit} className="login-form" style={{marginLeft:85}}>	
					<FormItem
						label="ชื่อบริการ"
						hasFeedback
					>
						{getFieldDecorator('service_name', {
							rules: [{ required: true, message: 'โปรดใส่ชื่อบริการ', whitespace: true}],
							initialValue: service_name
						})(
							<Input />
						)}
					</FormItem>
					<FormItem
						label="ที่อยู่"
						hasFeedback
					>
						{getFieldDecorator('address', {
							rules: [{ required: true, message: 'โปรดใส่ที่อยู่', whitespace: true}], 
							initialValue: address 
						})(
							<Input/>
							)}
					</FormItem>
					<FormItem
						label="เบอร์ติดต่อ"
						hasFeedback
					>
						{getFieldDecorator('contact_number', {
							rules: [{ required: false, message: 'โปรดใส่เบอร์ติดต่อ', whitespace: true}], 
							initialValue: contact_number 
						})(
							<Input/>
							)}
					</FormItem>
					<FormItem					 
					label="ค่าใช้จ่ายต่อชั่วโมง"
					hasFeedback
					>
						{getFieldDecorator('price_per_hour', {
							rules: [{ required: true, message: 'ค่าใช้จ่ายต่อชั่วโมง', whitespace: true}], 
							initialValue: price_per_hour 
						})(
							<Input/>
						)}
					</FormItem>											
					<Button type="primary" htmlType="submit" className="login-form-button">
						แก้ไขบริการ
          			</Button>					
				</Form>
		)
	}
	
}

const WrappedServiceForm = Form.create()(ServiceForm);

class EditServiceModal extends React.Component {
	render() {
		return (
			<Modal title="แก้ไขบริการ"
				visible={this.props.modalState}
				onOk={this.hideModal}
				footer={null}
				onCancel={this.props.onCloseModal}
				onClose={this.props.onCloseModal}				
			>
				<WrappedServiceForm 					
					editService = {this.props.updateService}		
					aftersubmit = {this.props.aftersubmit}	
					service = {this.props.editService}			
				/>
			</Modal>
		)
	}
}
function mapDispacthToProps(dispatch){
	const updateService = OwnerActions.updateService;
	return bindActionCreators( {updateService}, dispatch)
}
export default connect(null, mapDispacthToProps)(EditServiceModal);

