import {userConstants} from '../constants/UserConstants';

export default (state={},action)=>{
	switch(action.type){
		case(userConstants.FETCH_PROFILE):
			return state;
		case(userConstants.FETCH_USER_RESERVATIONS):
			const customerReservations = action.customerReservations;
			return {...state,customerReservations};
		default:
			return state;
	}
}