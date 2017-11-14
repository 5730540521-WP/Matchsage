import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Field, reduxForm} from 'redux-form';
import Modal from './Modal';
import {userActions} from '../../actions'

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
class LoginModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'email':'',
			'password':''
		}
	}

	// onEmailChange(e){
	// 	this.setState({email: e.target.value});
	// }

	// onPasswordChange(e){
	// 	this.setState({password: e.target.value});
	// }
	onFieldChange(e){
		console.log(e.target.name);
		this.setState({[e.target.name]:e.target.value},()=>console.log(this.state));
	}

	onLoginSubmit(){
		this.props.login(
			this.state.email,
			this.state.password
		);
	}
	
	render(){
		return this.props.modalState ? (
			<Modal classID="LoginModal" onClose={this.props.onCloseLoginModal}>
				{/* <Field/> */}
				<section className="modal-card-body">
					{/* <!-- Content ... --> */}
					{/* <button className="delete is-right" aria-label="close"></button> */}
					
					{/* <div className="is-divider" data-content="หรือ"></div> */}
					
					เข้าสู่ระบบ
					{/* <Field name="username" component={this.renderField}/> */}
					{/* <Field name="password" component={this.renderField}/> */}
					
					<label className="label level-left">อีเมล์</label>

					<input className="input" name="email" type="email" placeholder=""
						onChange={ e => this.onFieldChange(e)}
					/>

					<label className="label level-left">รหัสผ่าน</label>
					<input className="input" name="password" type="password" placeholder=""
						onChange={ e => this.onFieldChange(e)}
					/>

					<a className="button is-primary"
						onClick={() => this.onLoginSubmit()}>
						เข้าสู่ระบบ
					</a>

					<div className="columns">
						<div className="column">สมัครสมาชิก</div>
						<div className="is-divider-vertical" data-content="หรือ"></div>
						<div className="column">ลืมรหัสผ่าน</div>
					</div>
				</section>
			
			</Modal>
		) : null;
	}
	
}

// function validate(values){
// 	const errors = {};
// 	return errors;
// }

// export default reduxForm({
// 	validate,
// 	form: 'LoginModal'
// })(LoginModal);
// export con

function mapDispacthToProps(dispatch){
	const login = userActions.login;
	return bindActionCreators( {login}, dispatch)
}
export default connect(null, mapDispacthToProps)(LoginModal);
// export default LoginModal;
