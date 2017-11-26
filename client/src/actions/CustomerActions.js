import axios from 'axios';
import * as JWT from 'jwt-decode';
import {customerConstants} from '../constants/CustomerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader, history} from '../helpers';

export const CustomerActions = {
	fetchServices,
	fetchService,
	searchService,
	//START Reserve
	reserveService,
	selectServiceReservation,
	selectDateTimeReservation,
	fetchEmployees,
	fetchPaymentAccount,
	// END Reserve
	cancelReserveService,
	rateService,
	addAccountNumber,
	addCreditCard,
	informReservationHistory,
	payDeposit,
	payService,
	informBillDetail,
	downloadBillDetail,
	sendServiceComplaint,
	sendEmployeeComplaint
}

async function fetchServices(){
	const headers = authHeader();
	const services = await axios.get(API_URL + '/api/services', {headers});
	return{
		type: customerConstants.CUSTOMER_FETCH_SERVICES,
		services: services
	}
}

async function fetchService(service_id){
	const headers = authHeader();
	const service = await axios.get(API_URL + `/api/services/${service_id}`, {headers});
	const ownerDetail = await axios.get(API_URL + `/api/users/${service.data.owner_id}`,{headers});
	const employees = await axios.get(API_URL + `/api/services/${service_id}/employees` , {headers});
	return{
		type: customerConstants.CUSTOMER_FETCH_SERVICE,
		service: service,
		ownerDetail: ownerDetail,
		employees: employees
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
async function reserveService(){

	const {service_id, employee_id, start_time, end_time, date} = this.props;
	const {price} = this.state;
	const data = {
		service_id, employee_id, start_time, end_time, date, price 
	}
	const headers = authHeader();
	const res = await axios.post(`${API_URL}/api/reservations/new`, data, {headers})
		.catch(err=>{
			history.push(`/service/${service_id}`);
			return failure(err);
		});
	history.push('/reserved-resevations');
	return success();

	function success(){return{type:customerConstants.CUSTOMER_RESERVE_SUCCESS}};
	function failure(error){return{type:customerConstants.CUSTOMER_RESERVE_FAILURE,error}};
}

function selectServiceReservation(service_id, price_per_hour){
	return{
		type: customerConstants.CUSTOMER_SELECT_SERVICE_RESERVATION,
		payload:{
			service_id,
			price_per_hour
		}
	}
}	

function selectDateTimeReservation(date, start_time, end_time){
	return{
		type: customerConstants.CUSTOMER_SELECT_DATE_TIME_RESERVATION,
		payload:{
			date,start_time,end_time
		}
	}
}

async function fetchEmployees(service_id,date, start_time, end_time){
	const data = {
		date, start_time, end_time
	};
	console.log(data);
	const headers = authHeader();
	const res = await axios.post(`${API_URL}/api/services/${service_id}/avai_employees`, data, {headers});
	const employees = res.data;
	console.log(employees);
	return{
		type: customerConstants.CUSTOMER_FETCH_EMPLOYEES_RESERVATION,
		employees
	}
}

function selectEmployeeReservation(employee_id){
	return{
		// type: customerConstants.CUSTOMER_SELECT_SERVICE_RESERVATION,
		employee_id
	}
}

async function fetchPaymentAccount(){
	const user_id = JWT(localStorage.getItem('user')).user_id;
	const headers = authHeader();
	const res = await axios.get(`${API_URL}/api/users/${user_id}`, {headers});
	const user = res.data;
	const payment_accounts = user.payment_accounts;
	return{
		type: customerConstants.CUSTOMER_FETCH_PAYMENT_RESERVATION,
		payment_accounts
	}
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
async function sendServiceComplaint(service_id,topic,content){
	const data = {
		service_id,
		title:topic,
		note:content,
		complaint_type: 'service'
	}
	const headers = authHeader();
	const res = await axios.post(API_URL + '/api/complaints/new', data, {headers}).catch(error=>{
		return console.log(error);
	});
	return res;
}

async function sendEmployeeComplaint(service_id,employee_id,topic,content){
	const data = {
		service_id,
		employee_id,
		title:topic,
		note:content,
		complaint_type: 'employee'
	}
	const headers = authHeader();
	const res = await axios.post(API_URL + '/api/complaints/new', data, {headers}).catch(error=>{
		return console.log(error);
	});
	return res;
}