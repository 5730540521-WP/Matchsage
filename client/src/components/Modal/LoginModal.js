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

const LoginModal = ({modalState,onCloseLoginModal})=>{
	return modalState ? (
		<Modal classID="LoginModal" onClose={onCloseLoginModal}>
			{/* <Field/> */}
			<section className="modal-card-body">
				{/* <!-- Content ... --> */}
				{/* <button className="delete is-right" aria-label="close"></button> */}
				เข้าสู่ระบบด้วย Facebook
				<div className="is-divider" data-content="หรือ"></div>
				เข้าสู่ระบบ
				{/* <Field name="username" component={this.renderField}/> */}
				{/* <Field name="password" component={this.renderField}/> */}
				
				<div className="columns">
					<div className="column">สมัครสมาชิก</div>
					<div className="is-divider-vertical" data-content="หรือ"></div>
					<div className="column">ลืมรหัสผ่าน</div>
				</div>
			</section>
		
		</Modal>
	) : null;
}

function validate(values){
	const errors = {};
	return errors;
}

export default LoginModal;
// export default reduxForm({
// 	validate,
// 	form: 'LoginModal'
// })(LoginModal);