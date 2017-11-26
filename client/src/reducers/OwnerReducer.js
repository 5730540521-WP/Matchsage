import {ownerConstants} from '../constants/OwnerConstants';
const initialState = {
	services:[],	
	History:[],
	alreadyFetch: false
}

let alreadyFetch

export default (state=initialState,action)=>{
	switch(action.type){		
		case(ownerConstants.OWNER_FETCH_SERVICES):		
			const services = action.payload.data.services;	
			alreadyFetch = true	
			return {...state,alreadyFetch,services};	
		case(ownerConstants.OWNER_FETCH_SERVICE_HISTORY):		
			const History = action.payload.data.reservations;		
			return {...state,History};		
		case(ownerConstants.OWNER_CREATE_SERVICE):
			alreadyFetch = false
			return {...state,alreadyFetch};
		default:
			return state;
	}
}