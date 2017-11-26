import axios from 'axios';
import {customerConstants} from '../constants/CustomerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader} from '../helpers';

export const CustomerActions = {
	fetchServices,
	fetchService,
	searchService,
	//START Reserve
	reserveService,
	selectServiceReservation,
	selectDateTimeReservation,
	fetchEmployees,
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
	sendEmployeeComplaint,
	fetchReservedServices,
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
function reserveService(){
	
}

function selectServiceReservation(service_id){
	console.log('In action: ' + service_id);
	return{
		type: customerConstants.CUSTOMER_SELECT_SERVICE_RESERVATION,
		service_id
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

async function fetchReservedServices(customer_id){
	const headers = authHeader();
	const resFetchReservedServices = await axios.get(API_URL + `/api/users/${customer_id}/reservations`,{headers});
	let formattedReservationsData = [];
	await Promise.all(resFetchReservedServices.data.reservations.map(async(reservation)=>{
		const headers = authHeader();
		const resServiceDetail = await axios.get(API_URL+`/api/services/${reservation.service_id}`,{headers});
		formattedReservationsData = [...formattedReservationsData,{
			reserve_id: reservation.reserve_id,
			name: resServiceDetail.data.service_name,
			service_type: '',
			date: reservation.date_reserved,
			time: `${reservation.start_time.toString().substr(0,2)}:${reservation.start_time.toString().substr(2,2)} ถึง ${reservation.end_time.toString().substr(0,2)}:${reservation.end_time.toString().substr(0,2)}`,
			paid_status: reservation.paid_status,
			service_id: reservation.service_id
		}]
	}));
	return {
		type:customerConstants.FETCH_CUSTOMER_RESERVATIONS,
		customerReservations:formattedReservationsData
	}
}

// Use case: 13
async function informReservationHistory(customer_id){
	const headers = authHeader();
	const resFetchReservedServices = await axios.get(API_URL + `/api/users/${customer_id}/reservations`,{headers});
	let reservationHistory=[];
	await Promise.all(resFetchReservedServices.data.reservations.map(async(reservation)=>{
		const headers = authHeader();
		const resServiceDetail = await axios.get(API_URL+`/api/services/${reservation.service_id}`,{headers});
		reservationHistory = [...reservationHistory,{...reservation,service_name:resServiceDetail.data.service_name
		}]
	}));
	return {
		type:customerConstants.FETCH_CUSTOMER_RESERVATION_HISTORY,
		reservationHistory:reservationHistory
	}
}

// Use case: 14
function payDeposit(){

}

// Use case: 15
function payService(){

}

// Use case: 16
async function informBillDetail(reserve_id){
	const headers = authHeader();
	const res = await axios.get(API_URL + `/api/receipts/${reserve_id}`,{headers});
	console.log(res)
	return;
}

// Use case: 17
async function downloadBillDetail(reserve_id){
	const headers = authHeader();
	const res = await axios.get(API_URL + `/api/receipts/${reserve_id}/download`,{headers});
	console.log(res)
	return;
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