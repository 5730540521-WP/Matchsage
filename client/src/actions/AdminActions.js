import axios from 'axios';
import {apiUrl} from '../constants/ConfigConstants';
import {userConstants} from '../constants/UserConstants';
import withQuery from 'with-query'

const backendUrl = 'http://128.199.113.165:3001' 

let myheaders = new Headers({
	"Content-Type": "application/json"
})

function setHeaderWithAccessToken() {
	myheaders = new Headers({
		"Authorization": 'JWT ' + localStorage.getItem('admin'),
		"Content-Type": "application/json"
	})
}

async function login({ email, password }) {
	try {
		const raw = await fetch(`${backendUrl}/api/admin-auth`, {
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

async function getUsers({ keyword = '', gender, user_type }) {
	try {
		console.log(localStorage.getItem('admin'))
		const url = withQuery(`${backendUrl}/api/users`, {
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
		return res
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
	login,
	getUsers
}