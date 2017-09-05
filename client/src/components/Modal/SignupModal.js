import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from './Modal';

const renderField = (field)=>(
	<div className="form-group">
		<label>{field.label}</label>
		<input 
			className="form-control"
			type="text"
			{...field.input}
		/>
		{field.meta.errors}
	</div>
)

const SignupModal = ({modalState, onCloseSignupModal})=>{
	return modalState ? (
		<Modal classID="SingupModal" onClose={onCloseSignupModal}>
			{/* <Field/> */}
			<form>
				<p>Signup</p>
				{/* <Field/> */}
			</form>
		</Modal>
	) : null;
}

function validate(values){
	const errors = {};
	return errors;
}

export default reduxForm({
	validate,
	form: 'SignupModal'
})(SignupModal);