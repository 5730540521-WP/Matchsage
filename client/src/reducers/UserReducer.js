import {userConstants} from '../constants/UserConstants';

export default (state={},action)=>{
	switch(action.type){
		case(userConstants.FETCH_PROFILE):
			return state;
		default:
			return state;
	}
}