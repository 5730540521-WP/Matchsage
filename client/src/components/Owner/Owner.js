import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Mock
import { Input,Slider } from 'antd';
import ServiceOwnerItem from './ServiceOwnerItem';
import CreateServiceMedal from '../Common/Modal/CreateServiceMedal';
import EditServiceMedal from '../Common/Modal/EditServiceMedal';
import {OwnerActions} from '../../actions';

import {Row,Col, Button} from 'antd';
import * as JWT from 'jwt-decode';



class Owner extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			owner_id: JWT(localStorage.getItem('user')).user_id,
			isCreateServiceModalActive: false,
			isEditServiceModalActive: false,
			services: this.props.services,
			editService: [],		
			isServiceLoaded: false	
		};		
	}	

	componentDidMount(){
		const {fetchServices} = this.props;		
		fetchServices(this.state.owner_id);		
	}

	toggleCreateServiceModal(modalValue){
		this.setState({isCreateServiceModalActive: modalValue})
	}

	toggleEditServiceModal(modalValue){
		this.setState({isEditServiceModalActive: modalValue})
	}

	aftersubmit = () => {		
		this.setState({isCreateServiceModalActive: false, isEditServiceModalActive: false})	
		setTimeout(() => {window.location.reload();}, 500)	
		console.log('relode')	
	}

	deleteService = (service) =>{		
		console.log(service.owner_id)
		console.log(this.state.owner_id)
		this.props.deleteService(service.service_id)		
	}

	editService = (service) =>{
		console.log(service.price_per_hour)
		this.setState({editService: service})
		this.toggleEditServiceModal(true)
	}
	
	renderServices(){
		// this.setState({services:this.props.services});	
		if(!this.state.isServiceLoaded && this.props.services.length > 0) {
			this.setState({ services: this.props.services, isServiceLoaded: true })
		}	
		return <Row gutter={24}>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2==0?
					<ServiceOwnerItem 
					key={service.service_id} 
					service={service}
					onClickDelete={() => this.deleteService(service)}
					onClickEdit={() => this.editService(service)}
					/>:null})}
				</Col>
				<Col span={12}>{this.state.services.map( (service,index) =>{
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

		console.log(this.state.owner_id);
		
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

				<CreateServiceMedal 
					modalState={this.state.isCreateServiceModalActive} 
					onCloseModal={()=>this.toggleCreateServiceModal(false)}					
					aftersubmit = {this.aftersubmit}
				/>

				<EditServiceMedal 
					modalState={this.state.isEditServiceModalActive} 
					onCloseModal={()=>this.toggleEditServiceModal(false)}	
					editService = {this.state.editService}									
					aftersubmit = {this.aftersubmit}
				/>
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
	const deleteService = OwnerActions.deleteService;
	return bindActionCreators({
		fetchServices,
		deleteService
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
// export default Service;