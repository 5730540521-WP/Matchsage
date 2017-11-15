import axios from 'axios';
import {apiUrl} from '../constants/ConfigConstants';
import {userConstants} from '../constants/UserConstants';

const backendUrl = 'http://128.199.113.165:3001' 

let myheaders = ''

function setHeaderWithAccessToken() {
	myheaders = new Headers({
		Authorization: 'JWT ' + localStorage.getItem('admin')
	})
}

async function login(payload) {
	try {
		const raw = await fetch(`${backendUrl}/api/admin-auth`, {
			method: 'POST',
			body: JSON.stringify(payload)
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

// Use case: 29
function informComplaint(){

}

// Use case: 30
function restrictPrivilege(){

}

export {
	informComplaint,
	restrictPrivilege,
	login
}