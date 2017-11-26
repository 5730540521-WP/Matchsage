import {customerConstants} from '../constants/CustomerConstants';
const initialState = {	
	employees:[],
	price:0,
	//Send To Server
	date:'',
	employee_id:''
}
export function reservation(state=initialState,action){
	switch(action.type){		
		case(customerConstants.CUSTOMER_FETCH_SERVICE):		
			const service_id = action.service_id;
			return {...state,service_id};	
		// case(customerConstants.CUSTOMER_SELECT_SERVICE_RESERVATION):
		// 	const service_id = '1';// = action.
		// 	return {...state,service_id};	
		case(customerConstants.CUSTOMER_FETCH_EMPLOYEE_RESERVATION):
			const employees = action.employees;
			return {...state,employees};
		case(customerConstants.CUSTOMER_SELECT_DATE_RESERVATION):
			const date = '1';// = action.
			return {...state,date};	
		// case(customerConstants.CUSTOMER_SELECT_START_TIME_RESERVATION):
		// 	const start_time = '1';// = action.
		// 	return {...state,start_time};	
		// case(customerConstants.CUSTOMER_SELECT_END_TIME_RESERVATION):
		// 	const end_time = '1';// = action.
		// 	return {...state,end_time};	
		default:
			return state;
	}
}