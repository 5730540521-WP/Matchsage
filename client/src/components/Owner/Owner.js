import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Mock
import { Input,Slider } from 'antd';
import ServiceOwnerItem from './ServiceOwnerItem';

import {OwnerActions} from '../../actions';

import {Row,Col} from 'antd';
import * as JWT from 'jwt-decode';

const owner_id = JWT(localStorage.getItem('user')).user_id

class Owner extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			services: this.props.services,		
			isServiceLoaded: false	
		};		
	}	

	componentDidMount(){
		const {fetchServices} = this.props;		
		fetchServices();		
	}

	
	renderServices(){
		// this.setState({services:this.props.services});	
		if(!this.state.isServiceLoaded && this.props.services.length > 0) {
			this.setState({ services: this.props.services, isServiceLoaded: true })
		}	
		return <Row gutter={24}>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2==0?<ServiceOwnerItem key={service.service_id} service={service}/>:null})}
				</Col>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2==1?<ServiceOwnerItem key={service.service_id} service={service}/>:null})}
				</Col>
			</Row>
			
		;
	}	

	render(){

		console.log(owner_id);
		
		return(
			<div className="columns">				
				<div className="column is-one-quarter">
					test
				</div>				
				<div className="column">
					<div className="rows" style={{paddingLeft:'24px',paddingRight:'24px'}}>						
						{this.renderServices()}
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({service}){
	const {services} = service;
	return {services};
}

function mapDispatchToProps(dispatch){
	const fetchServices = OwnerActions.fetchServices;
	
	return bindActionCreators({
		fetchServices
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
// export default Service;