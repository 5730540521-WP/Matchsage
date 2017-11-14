import axios from 'axios';
import {apiUrl} from '../constants/ConfigConstants';
import {userConstants} from '../constants/UserConstants';
// import validator from 'validator';

export const userActions = {
	login,
	logout,
	register,
}

async function login(email, password){
	// function reque
	// return await axios.post('/...');
	console.log(apiUrl);
	console.log(email + " "+ password);

	const body = {
		email,
		password
	}
	const res = await axios.post(apiUrl + '/', body);
	// const user = 

	// function success(user){return {type:userConstants.LOGIN_SUCCESS,user}}
	// function failure(error){return {type:userConstants.LOGIN_FAILURE,error}}
}

function logout(){
	localStorage.removeItem('user');
}

function register(firstname, lastname, address, phoneNumber,
	email, accountNumber, userType, password, confirmedPassword){
	// if(!validator.isEmail(email)) return false;
	
}


function deleteAccount(){

}

function editProfile(){


}


function search(){
	
}