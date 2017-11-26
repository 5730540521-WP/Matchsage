import axios from 'axios';
import {apiUrl} from '../constants/ConfigConstants';
import {userConstants} from '../constants/UserConstants';
import {API_URL} from '../constants/ConfigConstants';
import withQuery from 'with-query';

export const AdminActions = {	
	reviveUser,
	killUser,
	login,
	getUsers,
	fetchComplaints	
}

let myheaders = new Headers({
	"Content-Type": "application/json"		
});

function setHeaderWithAccessToken() {		
	myheaders = new Headers({		
		"Authorization": 'JWT ' + localStorage.getItem('admin'),		
		"Content-Type": "application/json"		
	});
}

async function login({ email, password }) {		
	try {		
		const raw = await fetch(`${API_URL}/api/admin-auth`, {		
			method: 'POST',		
			body: JSON.stringify({		
				email,		
				password		
			}),		
			headers: myheaders		
		})		
		
		const res = await raw.json()		
		if (res.error) throw Error(res.error)		
		localStorage.setItem('admin', res.token)		
		window.currentUser = res.user		
		setHeaderWithAccessToken()		
	} catch (error) {		
		alert(error)		
	}		
}

async function getUsers(params) {		
	try {
		const { keyword, gender, user_type } = params	
		const url = withQuery(`${API_URL}/api/users`, {		
			keyword,		
			gender,		
			user_type		
		})		
		const raw = await fetch(url, {		
			headers: {		
				"Authorization": 'JWT ' + localStorage.getItem('admin'),		
				"Content-Type": "application/json"		
			}		
		})		
		
		const res = await raw.json()		
		if (res.error) throw Error(res.error)				
		return{
			type: userConstants.ADMIN_FETCH_USERS,
			payload: res	
		}			
	} catch (error) {		
		alert(error)		
	}		
}

// Use case: 29
async function fetchComplaints(){	
	setHeaderWithAccessToken()
	const res = await axios.get(API_URL + '/api/complaints', {
		headers: {		
			"Authorization": 'JWT ' + localStorage.getItem('admin'),		
			"Content-Type": "application/json"		
		}
	})
	.catch(err => {
		console.log(err);	
	});	
	
	return{
		type: userConstants.ADMIN_FETCH_COMPLAINTS,
		payload: res	
	}	
}

async function killUser(id){
	const res = await axios.get(API_URL + '/api/users/'+id+'/delete', {
		headers: {		
			"Authorization": 'JWT ' + localStorage.getItem('admin'),		
			"Content-Type": "application/json"		
		}
	})
	.catch(err => {
		console.log(err);	
	});	
	
	return{		
		type: userConstants.ADMIN_KILL_USER,
		payload: res	
	}	
}

async function reviveUser(id){
	const res = await axios.get(API_URL + '/api/users/'+id+'/revive', {
		headers: {		
			"Authorization": 'JWT ' + localStorage.getItem('admin'),		
			"Content-Type": "application/json"		
		}
	})
	.catch(err => {
		console.log(err);	
	});	
	
	return{		
		type: userConstants.ADMIN_REVIVE_USER,
		payload: res	
	}	
}