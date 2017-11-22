import axios from 'axios';
import {ownerConstants} from '../constants/OwnerConstants';
import {API_URL, AUTH_HEADER} from '../constants/ConfigConstants';
import {authHeader} from '../helpers';

export const OwnerActions = {
	fetchServices,
    createService,
    deleteService,
    updateService
}

async function fetchServices(){
	const headers = authHeader();
	const res = await axios.get(API_URL + '/api/services', {headers});
	//console.log(res.data);
	return{
		type: ownerConstants.OWNER_FETCH_SERVICES,
		payload: res
	}
}

async function createService(){
	const headers = authHeader();
	
}

async function deleteService(){
	const headers = authHeader();
	
}

async function updateService(){
	const headers = authHeader();
	
}

