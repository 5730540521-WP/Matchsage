import {customerConstants} from '../constants/CustomerConstants';
const initialState = {services:[]}
export function service(state=initialState,action){
	switch(action.type){
		case(customerConstants.CUSTOMER_FETCH_SERVICES):
			return {...state,services:action.payload.data};
		default:
			return state;
	}
}