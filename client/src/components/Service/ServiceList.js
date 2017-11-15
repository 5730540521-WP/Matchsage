import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ServiceItem from './ServiceItem';

import {CustomerActions} from '../../actions';

class ServiceList extends React.Component{
	// const services = {
	// 	1:{id:1},
	// 	2:{id:2}
	// }
	constructor(props){
		super(props);
		this.state = {
			services:[
				{"name":"1","id":1},
				{"name":"2","id":2}
			],
			term:''
			// servicesDisplayed: this
		}
	}	

	componentDidMount(){
		const {fetchServices} = this.props;
		fetchServices();
		// const services = getServices();
	}

	render(){
		return(
			<div className="column">
				<div className="rows">
					{
						this.props.services.map( service =>{
							return(
								<ServiceItem key={service.id}/>
							);
						})
					}
					{/* {
						this.state.services.map( service =>{
							console.log(service.id);
							return(
								<ServiceItem key={service.id}/>
							);
						})
					} */}
				</div>
			</div>
		);
	}
	
}

// Do "services" shoud be in redux really?
function mapStateToProps({service}){
	console.log(services);
	const {services} = service;
	return {services};
}

function mapDispatchToProps(dispatch){
	const fetchServices = CustomerActions.fetchServices;
	return bindActionCreators({
		fetchServices
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
// export default ServiceList;