import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Field, reduxForm} from 'redux-form';
import {OwnerActions} from 'actions';
import styled from 'styled-components';
import { Button, Modal, Input, Form, Icon, Checkbox} from 'antd';
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
		const { service_name, price_per_hour} = this.props.service;
				
		return (
				<Form onSubmit={this.onEditSubmit} className="login-form" style={{marginLeft:85}}>					
					<strong>{service_name}</strong>	
					<FormItem					 
					label="ค่าใช้จ่ายต่อชั่วโมง"
					hasFeedback
					>
						{getFieldDecorator('price_per_hour', {
							rules: [{ 
								required: true, 
								message: 'ค่าใช้จ่ายต่อชั่วโมง',
								whitespace: true,
								setFieldsValu: price_per_hour}],
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

