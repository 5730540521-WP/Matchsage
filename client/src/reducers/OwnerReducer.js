import {ownerConstants} from '../constants/OwnerConstants';
const initialState = {
	services:[],	
	History:[]
}
export default (state=initialState,action)=>{
	switch(action.type){		
		case(ownerConstants.OWNER_FETCH_SERVICES):		
		const services = action.payload.data.services;		
		return {...state,services};	
		case(ownerConstants.OWNER_FETCH_SERVICE_HISTORY):
		console.log(action)
		const History = action.payload.data.reservations;		
		return {...state,History};		
		default:
			return state;
	}
}