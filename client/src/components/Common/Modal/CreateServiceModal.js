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
			'service_name':'',
			'price_per_hour':'',			
		}
	}

	onCreateSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {				
				const { service_name, price_per_hour } = values;
				console.log(service_name)
				console.log(this.props.owner_id)
				this.props.createService(service_name,price_per_hour);
				this.props.aftersubmit()
			} else {
				console.log(values);
			}
		})				
	}

	render () {
		const { getFieldDecorator } = this.props.form;
				
		return (
				<Form onSubmit={this.onCreateSubmit} className="login-form" style={{marginLeft:85}}>	
					<FormItem					 
					label="ชื่อบริการ"
					hasFeedback
					>
						{getFieldDecorator('service_name', {
							rules: [{ required: true, message: 'โปรดใส่ชื่อบริการ', whitespace: true }],
						})(
							<Input />
						)}
					</FormItem>
					<FormItem					 
					label="ค่าใช้จ่ายต่อชั่วโมง"
					hasFeedback
					>
						{getFieldDecorator('price_per_hour', {
							rules: [{ required: true, message: 'ค่าใช้จ่ายต่อชั่วโมง', whitespace: true }],
						})(
							<Input />
						)}
					</FormItem>											
					<Button type="primary" htmlType="submit" className="login-form-button">
							สร้างบริการใหม่
          			</Button>					
				</Form>
		)
	}
	
}

const WrappedServiceForm = Form.create()(ServiceForm);

class CreateServiceModal extends React.Component {
	render() {
		return (
			<Modal title="สร้างบริการใหม่"
				visible={this.props.modalState}
				onOk={this.hideModal}
				footer={null}
				onCancel={this.props.onCloseModal}
				onClose={this.props.onCloseModal}				
			>
				<WrappedServiceForm 					
					createService = {this.props.createService}		
					aftersubmit = {this.props.aftersubmit}			
				/>
			</Modal>
		)
	}
}
function mapDispacthToProps(dispatch){
	const createService = OwnerActions.createService;
	return bindActionCreators( {createService}, dispatch)
}
export default connect(null, mapDispacthToProps)(CreateServiceModal);

