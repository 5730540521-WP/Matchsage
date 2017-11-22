import {customerConstants} from '../constants/CustomerConstants';
import {ownerConstants} from '../constants/OwnerConstants';
const initialState = {
	services:[]
}
export function service(state=initialState,action){
	switch(action.type){
		case(customerConstants.CUSTOMER_FETCH_SERVICES):
			let services = action.payload.data.services;
			return {...state,services};
		case(ownerConstants.OWNER_FETCH_SERVICES):
			services = action.payload.data.services;			
			return {...state,services};
		case(customerConstants.CUSTOMER_FETCH_SERVICE):
			const service = action.payload.data;
			const ownerDetail = action.payload2.data;
			const employees = action.payload3.data;
			return {...state,service,ownerDetail,employees};
		case(customerConstants.CUSTOMER_SEARCH_SERVICE):
			const updatedServices = action.payload.keyword;	
			// return {...state,services:updatedServices}
			return state;
		default:
			return state;
	}
}