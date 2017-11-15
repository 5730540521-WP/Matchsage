import {userConstants} from '../constants/UserConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? 
	{userType: user.userType, user} : {userType: 'mpck'};

export function authentication(state=initialState,action){
	switch(action.type){
		case userConstants.LOGIN_FAILURE:
			return {};
		default:
			return state;
	}
}