import {userConstants} from '../constants/UserConstants';

const initialState = {
	complaints:[],		
	users:[],
	alreadyFetch: true
}

let alreadyFetch

export default (state=initialState,action)=>{

	switch(action.type){
		case(userConstants.ADMIN_FETCH_COMPLAINTS):
			const complaints = action.payload.data
			alreadyFetch = true
			return {...state,alreadyFetch,complaints};	
		case(userConstants.ADMIN_FETCH_USERS):
			console.log(action.payload)
			const users = action.payload
			alreadyFetch = true
			return {...state,alreadyFetch,users};
		case(userConstants.ADMIN_KILL_USER):
			alreadyFetch = false
			return {...state,alreadyFetch};
		case(userConstants.ADMIN_REVIVE_USER):
			alreadyFetch = false
			return {...state,alreadyFetch};
		default:
			return state;
	}
}