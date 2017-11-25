import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Mock
import { Input,Slider } from 'antd';
import ServiceOwnerItem from './ServiceOwnerItem';
import CreateServiceModal from '../Common/Modal/CreateServiceModal';
import {OwnerActions} from '../../actions';

import {Row,Col, Button} from 'antd';
import * as JWT from 'jwt-decode';



class Owner extends React.Component{
	constructor(props){
		super(props);
		this.state = {			
			isCreateServiceModalActive: false,		
			editService: [],		
			isServiceLoaded: false	
		};		
	}	

	componentDidMount(){
		const {fetchServices} = this.props;		
		fetchServices();			
	}

	toggleCreateServiceModal(modalValue){
		this.setState({isCreateServiceModalActive: modalValue})
	}	

	aftersubmit = () => {		
		this.setState({isCreateServiceModalActive: false})			
	}

	 deleteService = async (service) =>{
		const res = await this.props.deleteService(service.service_id);		
		console.log(res)
		this.props.fetchServices()
	}	
	
	renderServices(){
		// this.setState({services:this.props.services});	
		if(!this.state.isServiceLoaded && this.props.services.length > 0) {
			this.setState({ services: this.props.services, isServiceLoaded: true })
		}	
		return <Row gutter={24}>
				<Col span={12}>{this.props.services.map( (service,index) =>{
					return index%2==0?
					<ServiceOwnerItem 
					key={service.service_id} 
					service={service}
					onClickDelete={() => this.deleteService(service)}
					onClickEdit={() => this.editService(service)}
					/>:null})}
				</Col>
				<Col span={12}>{this.props.services.map( (service,index) =>{
					return index%2==1?
					<ServiceOwnerItem 
					key={service.service_id} 
					service={service}
					onClickDelete={() => this.deleteService(service)}
					onClickEdit={() => this.editService(service)}
					/>:null})}
				</Col>
			</Row>
			
		;
	}	

	render(){
		
		return(
			<div className="columns">				
				<div className="column is-one-quarter">
					<Button type="primary" onClick={()=>this.toggleCreateServiceModal(true)}>
						<span>สร้างบริการใหม่</span>
					</Button>
				</div>				
				<div className="column">
					<div className="rows" style={{paddingLeft:'24px',paddingRight:'24px'}}>						
						{this.renderServices()}
					</div>
				</div>

				<CreateServiceModal 
					modalState={this.state.isCreateServiceModalActive} 
					onCloseModal={()=>this.toggleCreateServiceModal(false)}					
					aftersubmit = {this.aftersubmit}
				/>				
			</div>
		);
	}
}
function mapStateToProps({OwnerReducer}){
	const {services} = OwnerReducer;
	return {services};
}

function mapDispatchToProps(dispatch){
	const fetchServices = () => OwnerActions.fetchServices(JWT(localStorage.getItem('user')).user_id);
	const deleteService = OwnerActions.deleteService;
	return bindActionCreators({
		fetchServices,
		deleteService
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
// export default Service;