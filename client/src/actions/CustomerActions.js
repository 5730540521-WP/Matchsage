import axios from 'axios';
import {customerConstants} from '../constants/CustomerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';

export const CustomerActions = {
	fetchServices,
	searchService,
	reserveService,
	cancelReserveService,
	rateService,
	addAccountNumber,
	addCreditCard,
	informReservationHistory,
	payDeposit,
	payService,
	informBillDetail,
	downloadBillDetail,
	sendComplaint
}

const user = JSON.parse(localStorage.getItem('user'));
let token = '';
if(user) token = user.token;
console.log(user);

let headers ={
	[AUTH_HEADER]: 'JWT ' + token
	// 'JWT': token
}

async function fetchServices(){
	console.log(token);
	const res = await axios.get(API_URL + '/api/services', {headers});
	// console.log(res.data);
	return{
		type: customerConstants.CUSTOMER_FETCH_SERVICES,
		payload: res
	}
}

async function fetchService(id){
	console.log(token);
	const res = await axios.get(API_URL + '/api/services/{id}', {headers});
	// console.log(res.data);
	return{
		type: customerConstants.CUSTOMER_FETCH_SERVICE,
		payload: res
	}
}

async function updateService(){
	return{
		type:customerConstants.CUSTOMER_UPDATE_SERVICE,
	}
}

// Use case: 7
async function searchService(keyword){
	
	return{
		type: customerConstants.CUSTOMER_SEARCH_SERVICE,
		payload: keyword
	}
}

// Use case: 8
function reserveService(){

}

// Use case: 9
function cancelReserveService(){

}

// Use case: 10
function rateService(){

}

// Use case: 11
function addAccountNumber(){

}

// Use case: 12
function addCreditCard(){

}

// Use case: 13
function informReservationHistory(){

}

// Use case: 14
function payDeposit(){

}

// Use case: 15
function payService(){

}

// Use case: 16
function informBillDetail(){

}

// Use case: 17
function downloadBillDetail(){

}

// Use case: 18
function sendComplaint(){

}
