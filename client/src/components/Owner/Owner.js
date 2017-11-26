import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Mock
import { Input,Slider } from 'antd';
import ServiceOwnerItem from './ServiceOwnerItem';
import CreateServiceModal from '../Common/Modal/CreateServiceModal';
import {OwnerActions} from '../../actions';
import {Row, Col, Button, Menu} from 'antd';
import * as JWT from 'jwt-decode';

class Owner extends React.Component{
	constructor(props){
		super(props);
		this.state = {			
			isCreateServiceModalActive: false,		
			editService: []
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

	handleSidebarClick = (e) => {
        this.toggleCreateServiceModal(true)
    }

	render(){

		if(! this.props.alreadyFetch) this.props.fetchServices();
		
		return(	
			<Row type="flex" justify="space-between" gutter={48} style={{marginBottom:'20px',marginTop:'20px',paddingLeft:'48px',paddingRight:'48px'}}>
				<Col span={5} style={{paddingLeft:'0px'}}>
					<Menu onClick={this.handleSidebarClick}	>
					<Button type="primary">
						<span>สร้างบริการใหม่</span>
					</Button>
					</Menu>
				</Col>				
				<Col span={19} > 	
				<h1 style={{marginBottom:'10px', textAlign:'left'}}>บริการของฉัน</h1>
				<div className="rows" style={{paddingLeft:'24px',paddingRight:'24px'}}>						
						{this.renderServices()}
					</div>
				</Col>

				<CreateServiceModal 
					modalState={this.state.isCreateServiceModalActive} 
					onCloseModal={()=>this.toggleCreateServiceModal(false)}					
					aftersubmit = {this.aftersubmit}
				/>							
			</Row>			
		);
	}
}
function mapStateToProps({OwnerReducer}){
	const {services, alreadyFetch} = OwnerReducer;
	return {services, alreadyFetch};
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