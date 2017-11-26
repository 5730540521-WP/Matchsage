import {customerConstants} from '../constants/CustomerConstants';
const initialState = {	
	employees:[],
	price:0,
	//Send To Server
	service_id:'',
	date:'',
	start_time:'',
	end_time:'',
	employee_id:''
}
export function reservation(state=initialState,action){
	switch(action.type){		
		// case(customerConstants.CUSTOMER_FETCH_SERVICE):		
		// 	const service_id = action.service_id;
		// 	return {...state,service_id};	
		case(customerConstants.CUSTOMER_SELECT_SERVICE_RESERVATION):
			const service_id = action.service_id;
			return {...state,service_id};	
		case(customerConstants.CUSTOMER_SELECT_DATE_TIME_RESERVATION):
			const {date, start_time, end_time} = action.payload;
			const newState = {};
			if(date) Object.assign(newState, {date});
			if(start_time) Object.assign(newState, {start_time});
			if(end_time) Object.assign(newState, {end_time});
			console.log(Object.assign(state,newState));
			return Object.assign(state,newState);
			// return {...state, date, start_time, end_time};
		case(customerConstants.CUSTOMER_FETCH_EMPLOYEES_RESERVATION):
			const employees = action.employees;
			return {...state,employees};
		// case(customerConstants.CUSTOMER_FETCH_EMPLOYEE_RESERVATION):
		// 	const employees = action.employees;
		// 	return {...state,employees};
		case(customerConstants.CUSTOMER_SELECT_DATE_RESERVATION):
			// const date = '1';// = action.
			return {...state,date};	
		default:
			return state;
	}
}