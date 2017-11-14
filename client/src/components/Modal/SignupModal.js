import React from 'react';
// import {Field, reduxForm} from 'redux-form';
import Modal from './Modal';

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

//({modalState, onCloseSignupModal})=>
class SignupModal extends React.Component{
	render(){
		return this.props.modalState ? (
			<Modal classID="SingupModal" onClose={this.props.onCloseSignupModal}>
				{/* <Field/> */}
				<section className="modal-card-body">
					<p>ลงทะเบียน</p>
					{/* <Field/> */}
				</section>
			</Modal>
		) : null;
	}
	
}

function validate(values){
	const errors = {};
	return errors;
}

// export default reduxForm({
// 	validate,
// 	form: 'SignupModal'
// })(SignupModal);

export default SignupModal;