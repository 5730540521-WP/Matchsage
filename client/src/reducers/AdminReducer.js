import {userConstants} from '../constants/UserConstants';

const initialState = {
	complaints:[],		
	users:[]
}

export default (state=initialState,action)=>{

	switch(action.type){
		case(userConstants.ADMIN_FETCH_COMPLAINTS):
			const complaints = action.payload.data
			return {...state,complaints};	
		case(userConstants.ADMIN_FETCH_USERS):
			console.log(action.payload)
			const users = action.payload
			return {...state,users};
		default:
			return state;
	}
}