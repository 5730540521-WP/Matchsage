// import {userConstants} from '../constants/UserConstants';
import {customerConstants} from '../constants/CustomerConstants'

export default (state={},action)=>{
	switch(action.type){
		case(customerConstants.FETCH_CUSTOMER_RESERVATIONS):
		const customerReservations = action.customerReservations;
		return {...state,customerReservations};
	case(customerConstants.FETCH_CUSTOMER_RESERVATION_HISTORY):
		const reservationHistory = action.reservationHistory;
		return {...state,reservationHistory};
		default:
			return state;
	}
}