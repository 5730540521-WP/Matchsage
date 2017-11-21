import axios from 'axios';
import {customerConstants} from '../constants/CustomerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader} from '../helpers';

export const CustomerActions = {
	fetchServices,
	fetchService,
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

async function fetchServices(){
	const headers = authHeader();
	const res = await axios.get(API_URL + '/api/services', {headers});
	//console.log(res.data);
	return{
		type: customerConstants.CUSTOMER_FETCH_SERVICES,
		payload: res
	}
}

async function fetchService(id){
	const headers = authHeader();
	const res = await axios.get(API_URL + `/api/services/${id}`, {headers});
	const res2 = await axios.get(API_URL + `/api/users/${res.data.owner_id}`,{headers});
	const res3 = await axios.get(API_URL + `/api/services/${id}/employees` , {headers});
	console.log(res3.data);
	return{
		type: customerConstants.CUSTOMER_FETCH_SERVICE,
		payload: res,
		payload2: res2,
		payload3: res3
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
