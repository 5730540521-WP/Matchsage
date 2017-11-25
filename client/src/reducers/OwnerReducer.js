import {ownerConstants} from '../constants/OwnerConstants';
const initialState = {
	services:[],	
}
export default (state=initialState,action)=>{
	switch(action.type){		
		case(ownerConstants.OWNER_FETCH_SERVICES):		
		const services = action.payload.data.services;		
		return {...state,services};		
		default:
			return state;
	}
}