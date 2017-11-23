import axios from 'axios';
import {ownerConstants} from '../constants/OwnerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader, history} from '../helpers';

export const OwnerActions = {
	fetchServices,
    createService,
    deleteService,
    updateService
}

async function fetchServices(owner_id){
	const headers = authHeader();
	const res = await axios.get(API_URL + '/api/services?owner_id=' + owner_id, {headers});
	//console.log(res.data);
	return{
		type: ownerConstants.OWNER_FETCH_SERVICES,
		payload: res
	}
}

async function createService(service_name, price_per_hour){
	const headers = authHeader();

	const data = {
		service_name,price_per_hour
	}
	console.log(data)
	const res = await axios.post(API_URL + '/api/services/new', data,{headers	})
	.catch(err => {
		console.log(err);		
	});	
}

async function deleteService(service_id){
	const headers = authHeader();	
	console.log(service_id)
	const res = await axios.get(API_URL + '/api/services/'+service_id+'/delete',null,{headers})
	.catch(err => {
		console.log(err);		
	});	
	
}

async function updateService(service_id,data){
	const headers = authHeader();	
	const res = await axios.post(API_URL + '/api/services/'+service_id+'/update',data,{headers})
	.catch(err => {
		console.log(err);		
	});	
}

