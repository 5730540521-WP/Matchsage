import {combineReducers} from 'redux';
// import {reducer as formReducer} from 'redux-form';
import NavBarReducer from './NavbarReducer';
import UserReducer from './UserReducer';
import ServiceProviderReducer from './ServiceProviderReducer';
import ServiceRecieverReducer from './ServiceRecieverReducer';
import AdminReducer from './AdminReducer';
import {registration} from './RegistrationReducer';
import {authentication} from './AuthenticationReducer';
import {service} from './Service';

const rootReducer = combineReducers({
	// navbarState: NavBarReducer
	UserReducer,
	ServiceProviderReducer,
	ServiceRecieverReducer,
	AdminReducer,
	registration,
	authentication,
	service
});

export default rootReducer;