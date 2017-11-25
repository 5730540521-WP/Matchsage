import axios from 'axios';
import {AUTH_HEADER, API_URL} from 'constants/ConfigConstants';

import {userConstants} from 'constants/UserConstants';
import { authHeader,history } from 'helpers';

// import validator from 'validator';

export const userActions = {
	login,
	logout,
	register,
	fetchUserProfile,
	fetchReservations
}

// Use case:
// Status : 
async function login(email, password){
	const data = {
		email,
		password
	}
	
	// try{
	// 	const res = await axios.post(API_URL + '/api/auth', data );
	// 	console.log(res.data);
	// }catch(err){
	// 	failure(err)
	// }
	const res = await axios.post(API_URL + '/api/auth', data )
		.catch(err => {
			console.log(err);
			return failure(err);
		});
	
	const user = res.data;
	if (user && user.token){
		localStorage.setItem('user', JSON.stringify(user));
		console.log(localStorage.getItem('user')); 
		history.push('/');
		return success(user);
	}
	// success(user)
	
	// if(res)console.log('200');
	// else console.log('401');
	// const user = res.data.token;
	// if(user){
	// 	console.log('Success :)')
	// 	// localStorage.setItem('user', res.data.token);
	// }else{
	// 	console.log('Failed')
	// }
	// return dispactch => {}
	
	// return {type:LOGIN, state:}
	// const user = 

	function request(user){return {type:userConstants.LOGIN_REQUEST,user}}
	function success(user){return {type:userConstants.LOGIN_SUCCESS,user}}
	function failure(error){return {type:userConstants.LOGIN_FAILURE,error}}
}

// Use case:
// Status: 
async function logout(){
	localStorage.removeItem('user');
	return {type: userConstants.LOGOUT};
	// return {type:}
}

// Use case:
// Status: 
// async function register(first_name, last_name, address, phoneNumber,
// 	email, accountNumber, userType, password, confirmedPassword){
async function register(first_name,last_name,email,password,
	gender,user_type) {
	
	const data = {
		first_name,last_name,email,
		password,gender,user_type
	}

	const headers = authHeader();
	const res = await axios.post(API_URL + '/api/signup', data,{headers	})
		.catch(err => {
			console.log(err);
			return failure(err);
		});
	
	const user = res.data;
	if (user && user.token){
		localStorage.setItem('user', JSON.stringify(user));
		history.push('/');
		return success(user);
	}

	function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
	function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
	function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// Use case:
// Status: 
async function deleteAccount(){

}


// Use case:
// Status:
async function fetchUserProfile(id){
	const headers = authHeader();
	const user = await axios.get(API_URL + `/api/users/${id}` , {headers} )
	
	return {
		type:userConstants.FETCH_PROFILE,
		user: user.data,
	}
	

}

async function fetchReservations(customer_id){
	const headers = authHeader();
	const resFetchReservations = await axios.get(API_URL + `/api/users/${customer_id}/reservations`,{headers});
	console.log(resFetchReservations.data);
	
	let formattedReservationsData = [];
	resFetchReservations.data.reservations.map((reservation)=>{
		formattedReservationsData = [...formattedReservationsData,{
			reserve_id: reservation.reserve_id,
			name: reservation.service_id,
			service_type: '',
			date: reservation.date,
			time: `${reservation.start_time.toString().substr(0,2)}:${reservation.start_time.toString().substr(2,2)} ถึง ${reservation.end_time.toString().substr(0,2)}:${reservation.end_time.toString().substr(0,2)}`,
			action: '',
			paid_status: reservation.paid_status+'s'
		}]
	});
	console.log(formattedReservationsData);
	return {
		type:userConstants.FETCH_USER_RESERVATIONS,
		customerReservations:formattedReservationsData
	}
}

// Use case:
// Status: 
async function editProfile(){
	
}

// Use case:
// Status: 
async function guestSearch(keyword){
	const headers = {
		// : ''
	}
	const res = await axios.get(API_URL + '/api/services/' + keyword,{ headers });
	// const service =  res.data.services; // Edit pls
	return {
		type:'USER_SEARCH',
		// service
	}
}