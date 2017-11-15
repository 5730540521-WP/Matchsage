import {userConstants} from '../constants/UserConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? 
	{isLogin: true, user} : {isLogin: false};

export function authentication(state=initialState,action){
	switch(action.type){
		default:
			return state;
	}
}