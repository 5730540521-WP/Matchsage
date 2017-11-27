import axios from 'axios';
import * as JWT from 'jwt-decode';
import {customerConstants} from '../constants/CustomerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader, history} from '../helpers';
import {message} from 'antd';

export const CustomerActions = {
	fetchServices,
	fetchService,
	searchService,
	//START Reserve
	reserveService,
	selectServiceReservation,
	selectDateTimeReservation,
	fetchEmployees,
	selectEmployeeReservation,
	fetchPaymentAccount,
	selectPaymentAccountReservation,
	fetchMyPaymentAccount,
	addPaymentAccount,
	// END Reserve
	cancelReserveService,
	rateService,
	addCreditCard,
	informReservationHistory,
	payDeposit,
	payService,
	informBillDetail,
	downloadBillDetail,
	sendServiceComplaint,
	sendEmployeeComplaint,
	fetchReservedServices
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
async function reserveService(service_id, employee_id, start_time, end_time, date_reserved, payment_number){

	const data = {
		service_id, employee_id, start_time, end_time, date_reserved, payment_number
	}
	const headers = authHeader();
	const res = await axios.post(`${API_URL}/api/reservations/new`, data, {headers})
		.catch(err=>{
			history.push(`/service/${service_id}`);
			return failure(err);
		});

	message.success('การจองบริการสำเร็จ');
	setTimeout(()=>{
		history.push('/user/reserved-services');
	},2000);
	return success();

	// const {service_id, employee_id, start_time, end_time, date} = this.props;
	// const {price} = this.state;
	// const data = {
	// 	service_id, employee_id, start_time, end_time, date, price 
	// }
	// const headers = authHeader();
	// const res = await axios.post(`${API_URL}/api/reservations/new`, data, {headers})
	// 	.catch(err=>{
	// 		history.push(`/service/${service_id}`);
	// 		return failure(err);
	// 	});
	// history.push('/reserved-resevations');
	// return success();

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

function selectEmployeeReservation(employee){
	return{
		type: customerConstants.CUSTOMER_SELECT_EMPLOYEE_RESERVATION,
		employee
	}
}

async function fetchPaymentAccount(){
	const user_id = JWT(localStorage.getItem('user')).user_id;
	const headers = authHeader();
	const res = await axios.get(`${API_URL}/api/users/${user_id}/payment_accounts`, {headers});
	// const user = res.data;
	// const payment_accounts = user.payment_accounts;
	const payment_accounts = res.data.payment_accounts;
	console.log(payment_accounts);
	return{
		type: customerConstants.CUSTOMER_FETCH_PAYMENT_RESERVATION,
		payment_accounts
	}
}

async function fetchMyPaymentAccount(){
	const user_id = JWT(localStorage.getItem('user')).user_id;
	const headers = authHeader();
	const res = await axios.get(`${API_URL}/api/users/${user_id}/payment_accounts`, { headers });
	const accounts = res.data
	return {
		type: 'FETCH_PAYMENT_ACCOUNT',
		payload: accounts
	}
}

function selectPaymentAccountReservation(payment_account){
	return{
		type: customerConstants.CUSTOMER_SELECT_PAYMENT_ACCOUNT_RESERVATION,
		payment_account
	}
}

// Use case: 9
function cancelReserveService(){

}

// Use case: 10
async function rateService(service_id,score,rating_type){
	const data ={
		score, rating_type
	};

	const headers = authHeader();
	await axios.post(`${API_URL}/api/services/${service_id}/rate`, data, {headers});
	// const service = await axios.get(API_URL + `/api/services/${service_id}`, {headers});
	// const ownerDetail = await axios.get(API_URL + `/api/users/${service.data.owner_id}`,{headers});
	// const employees = await axios.get(API_URL + `/api/services/${service_id}/employees` , {headers});
	// return{
	// 	type: customerConstants.CUSTOMER_FETCH_SERVICE,
	// 	service: service,
	// 	ownerDetail: ownerDetail,
	// 	employees: employees
	// }

}

// Use case: 11
async function addPaymentAccount({ number, method, company }){
	const user_id = JWT(localStorage.getItem('user')).user_id;
	const headers = authHeader();
	const data = {
		number, company
	}
	const methodString = method === 'credit-card' ? 'add-credit-card' : 'add-bank-account'
	await axios.post(`${API_URL}/api/users/${user_id}/${methodString}`, data, { headers });
	const accs = await axios.get(`${API_URL}/api/users/${user_id}/payment_accounts`, { headers });
	const accounts = accs.data
	return {
		type: 'FETCH_PAYMENT_ACCOUNT',
		payload: accounts
	}
}

// Use case: 12
function addCreditCard(){

}

async function fetchReservedServices(customer_id){
	const headers = authHeader();
	const resFetchReservedServices = await axios.get(API_URL + `/api/users/${customer_id}/reservations`,{headers});
	let formattedReservationsData = [];
	await Promise.all(resFetchReservedServices.data.reservations.map(async(reservation)=>{
		if(reservation.paid_status==='deposit-paid'){
			const headers = authHeader();
			const resServiceDetail = await axios.get(API_URL+`/api/services/${reservation.service_id}`,{headers});
			formattedReservationsData = [...formattedReservationsData,{
				reserve_id: reservation.reserve_id,
				name: resServiceDetail.data.service_name,
				service_type: '',
				date: reservation.date_reserved,
				time: `${reservation.start_time.toString().substr(0,2)}:${reservation.start_time.toString().substr(2,2)} ถึง ${reservation.end_time.toString().substr(0,2)}:${reservation.end_time.toString().substr(0,2)}`,
				service_id: reservation.service_id
			}]
		}
	}));
	const resPaymentAccounts = await axios.get(API_URL + `/api/users/${customer_id}/payment_accounts` , {headers} );
	let formattedPaymentAccounts = [];
	resPaymentAccounts.data.payment_accounts.map((payment_account,index)=>{
		console.log(payment_account)
		formattedPaymentAccounts = [...formattedPaymentAccounts,{
			choice : index,
			payment_method : payment_account.method,
			payment_number : payment_account.number,
			expire_date : '2018/01',
			company : payment_account.company
		}]
	})
	return {
		type:customerConstants.FETCH_CUSTOMER_RESERVATIONS,
		customerReservations:formattedReservationsData,
		paymentAccounts:formattedPaymentAccounts
	}
}

// Use case: 13
async function informReservationHistory(customer_id){
	const headers = authHeader();
	const resFetchReservedServices = await axios.get(API_URL + `/api/users/${customer_id}/reservations`,{headers});
	let reservationHistory=[];
	await Promise.all(resFetchReservedServices.data.reservations.map(async(reservation)=>{
		if(reservation.paid_status==='fully-paid'){
			const headers = authHeader();
			const resServiceDetail = await axios.get(API_URL+`/api/services/${reservation.service_id}`,{headers});
			reservationHistory = [...reservationHistory,{...reservation,service_name:resServiceDetail.data.service_name
			}]
		}
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
async function payService(payment_number,reserve_id){
	const headers = authHeader();
	const data = {
		payment_number
	}
	const res = await axios.post(API_URL + `/api/reservations/${reserve_id}/make-full-payment`,data,{headers});
	return res.data.success
}

// Use case: 16
async function informBillDetail(reserve_id){
	const headers = authHeader();
	const res = await axios.get(API_URL + `/api/receipts/${reserve_id}`,{headers});
	console.log(res.data)
	return;
}

// Use case: 17
async function downloadBillDetail(reserve_id){
	const headers = authHeader();
	let newWindow = window.open('', '_blank');
	const res = await axios.get(API_URL + `/api/receipts/${reserve_id}/download`,{headers});
	let uriContent = "data:application/pdf," + encodeURIComponent(res.data);
	//window.open(uriContent, 'neuesDokument')
	newWindow.location.href = uriContent;
	// var pom = document.createElement('a');
	// pom.setAttribute('href', 'data:application/pdf,' + encodeURIComponent(res.data));
	// pom.setAttribute('download', 'receipt.pdf');

	// if (document.createEvent) {
	// 		var event = document.createEvent('MouseEvents');
	// 		event.initEvent('click', true, true);
	// 		pom.dispatchEvent(event);
	// }
	// else {
	// 		pom.click();
	// }
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
	const res = await axios.post(API_URL + '/api/complaints/new', data,{headers}).catch(error=>{
		return console.log(error);
	});
	console.log(res)
	return res;
}