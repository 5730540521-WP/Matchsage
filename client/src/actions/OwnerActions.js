import axios from 'axios';
import {ownerConstants} from '../constants/OwnerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader, history} from '../helpers';

export const OwnerActions = {
	fetchServices,
    createService,
    deleteService,
	updateService,
	addServiceEmployee,
	fetchServiceHistory
}

async function fetchServices(owner_id){
	const headers = authHeader();
	const res = await axios.get(API_URL + '/api/services?owner_id=' + owner_id, {headers});	
	return{
		type: ownerConstants.OWNER_FETCH_SERVICES,
		payload: res
	}
}

async function createService(data){
	const headers = authHeader();		
	const res = await axios.post(API_URL + '/api/services/new', data,{headers})
	.catch(err => {
		console.log(err);	
	});	

	return{
		type: ownerConstants.OWNER_CREATE_SERVICE,
		payload: res	
	}	

}

async function deleteService(service_id){
	const headers = authHeader();		
	const res = await axios.get(API_URL + '/api/services/'+service_id+'/delete',{headers})
	.catch(err => {
		console.log(err);		
	});	
	console.log(res)	
	return{
		type: ownerConstants.OWNER_DELETE_SERVICE,
		payload: res	
	}	
}

async function updateService(service_id,data){
	const headers = authHeader();	
	const res = await axios.post(API_URL + '/api/services/'+service_id+'/update',data,{headers})
	.catch(err => {
		console.log(err);		
	});	
	console.log(res)	
	return{
		type: ownerConstants.OWNER_UPDATE_SERVICE,
		payload: res
	}
}

async function addServiceEmployee(service_id, data){
	const headers = authHeader();	
	const res = await axios.post(API_URL + '/api/services/'+service_id+'/add_employee', data,{headers})
	.catch(err => {
		console.log(err);	
	});	

	return{
		type: ownerConstants.OWNER_ADD_EMPlOYEE_SERVICE,
		payload: res	
	}	
}

async function fetchServiceHistory(service_id){
	const headers = authHeader();	
	const res = await axios.get(API_URL + '/api/services/'+service_id+'/reservations', {headers})
	.catch(err => {
		console.log(err);	
	});	
	console.log(res)
	return{
		type: ownerConstants.OWNER_FETCH_SERVICE_HISTORY,
		payload: res	
	}	
}


