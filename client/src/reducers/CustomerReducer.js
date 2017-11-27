// import {userConstants} from '../constants/UserConstants';
import {customerConstants} from '../constants/CustomerConstants'

export default (state={},action)=>{
	switch(action.type){
		case(customerConstants.FETCH_CUSTOMER_RESERVATIONS):
		const customerReservations = action.customerReservations;
		const paymentAccounts = action.paymentAccounts;
		return {...state,customerReservations,paymentAccounts};
	case(customerConstants.FETCH_CUSTOMER_RESERVATION_HISTORY):
		const reservationHistory = action.reservationHistory;
		return {...state,reservationHistory};
	case(customerConstants.CUSTOMER_FETCH_BILL_DETAIL):
		const billDetail = action.billDetail;
		return {...state,billDetail};
	default:
		return state;
	}
}