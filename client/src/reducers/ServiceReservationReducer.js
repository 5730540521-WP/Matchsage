import {customerConstants} from '../constants/CustomerConstants';
const initialState = {	
	employees:[],
	price:0,
	price_per_hour:0,
	payment_accounts:[],
	employee:{},
	//Send To Server
	service_id:'',
	date:'',
	start_time:'',
	end_time:'',
	employee_id:'',
	payment_account:''
}
export function reservation(state=initialState,action){
	switch(action.type){		
		// case(customerConstants.CUSTOMER_FETCH_SERVICE):		
		// 	const service_id = action.service_id;
		// 	return {...state,service_id};	
		case(customerConstants.CUSTOMER_SELECT_SERVICE_RESERVATION):
			const {service_id, price_per_hour} = action.payload;
			return {...state,service_id,price_per_hour};	
		case(customerConstants.CUSTOMER_SELECT_DATE_TIME_RESERVATION):
			const {date, start_time, end_time} = action.payload;
			const newState = {};
			if(date) Object.assign(newState, {date});
			if(start_time) Object.assign(newState, {start_time});
			if(end_time) Object.assign(newState, {end_time});
			return Object.assign(state,newState);
		case(customerConstants.CUSTOMER_FETCH_EMPLOYEES_RESERVATION):
			const employees = action.employees;
			return {...state,employees};
		case(customerConstants.CUSTOMER_SELECT_EMPLOYEE_RESERVATION):
			const employee = action.employee;
			const employee_id = employee.employee_id;
			return {...state,employee,employee_id};
		case(customerConstants.CUSTOMER_FETCH_PAYMENT_RESERVATION):
			const payment_accounts = action.payment_accounts;
			return {...state, payment_accounts};
		case(customerConstants.CUSTOMER_SELECT_DATE_RESERVATION):
			// const date = '1';// = action.
			return {...state,date};	
		case(customerConstants.CUSTOMER_RESERVE_SUCCESS):
			return state;
		case(customerConstants.CUSTOMER_RESERVE_FAILURE):
			return initialState;
		default:
			return state;
	}
}