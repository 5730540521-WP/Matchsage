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
			services: this.props.services
		};
	}	

	componentDidMount(){
		const {fetchServices} = this.props;
		// fetchServices(()=>{
		// 	console.log(this.props.services)
		// 	this.setState({services:this.props.services});
		// });
		fetchServices();
		// const services = getServices();
	}

	// componentWillReceiveProps(){
	// 	// this.setState({this.props})
	// 	console.log('Hmmm');
	// 	console.log(this.props.services);
	// 	this.setState({services:this.props.services},()=>console.log(this.state.services));
	// }

	renderServices(){
		return this.props.services.map( service =>{
			console.log(service.id);
			return(
				<ServiceItem key={service.service_id} service={service}/>
			);
		});
	}

	render(){
		return(
			<div className="column">
				<div className="rows">
					{/* {
						this.props.services.map( service =>{
							return(
								<ServiceItem key={service.id}/>
							);
						})
					} */}
					{this.renderServices()}
				</div>
			</div>
		);
	}
	
}

// Do "services" shoud be in redux really?
function mapStateToProps({service}){
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