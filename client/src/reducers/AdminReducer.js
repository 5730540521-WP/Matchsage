import {userConstants} from '../constants/UserConstants';

const initialState = {
	complaints:[],		
}

export default (state=initialState,action)=>{

	switch(action.type){
		case(userConstants.ADMIN_FETCH_COMPLAINTS):
		const complaints = action.payload.data
		return {...state,complaints};	
		default:
			return state;
	}
}