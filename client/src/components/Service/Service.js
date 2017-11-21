import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Mock
import { Input,Slider } from 'antd';
import ServiceItem from './ServiceItem';

import SearchNavigator from './SearchNavigator';
import ServiceList from './ServiceList';

import {CustomerActions} from '../../actions';

import _ from 'lodash';
import {Row,Col} from 'antd';

const SearchInput = Input.Search;

class Service extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			services: this.props.services,
			term:'',
			isServiceLoaded: false
		};

		this.onInputChange = this.onInputChange.bind(this);
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

	
	renderServices(){
		// this.setState({services:this.props.services});
		if(!this.state.isServiceLoaded && this.props.services.length > 0) {
			this.setState({ services: this.props.services, isServiceLoaded: true })
		}
		return <Row gutter={20}>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2==0?<ServiceItem key={service.service_id} service={service}/>:null})}
				</Col>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2==1?<ServiceItem key={service.service_id} service={service}/>:null})}
				</Col>
			</Row>
			
		;
	}

	

	onInputChange(e){
		const term = e.target.value.toLowerCase();
		let newlyDisplayed = _.filter(this.props.services,service =>{
			console.log(term);
			return (
				service.service_name.toLowerCase().includes(term)
				|| service.contact_number.includes(term)
			);
		});
		this.setState({services:newlyDisplayed});

	}

	onSilderChange(ratingMin){
		// console.log(e.target.value);
		console.log(ratingMin);
		let newlyDisplayed = this.props.services.filter(service => (service.rating >= ratingMin ) );
		console.log(this.props.services);
		this.setState({services:newlyDisplayed});
	}

	render(){
		
		return(
			<div className="columns">
				{/* <SearchBox/> */}

				{/* <SearchNavigator/> */}
				{/* Mock Search Nav */}
				<div className="column is-one-quarter">
					<nav className="panel">
						<p className="panel-heading">
							ค้นหาบริการ
						</p>
						{/* <div className="panel-block">
							<p className="control has-icons-left">
								<input className="input is-small" type="text" placeholder="ค้นหา"/>
								<span className="icon is-small is-left">
									<i className="fa fa-search"></i>
								</span>
							</p>
						</div> */}
						<SearchInput
							placeholder="ค้นหา"
							onChange={(e)=>this.onInputChange(e)}
						/>
						<p>คะแนนความพึงพอใจ</p>
						<Slider defaultValue={0} max={5}
							onChange={rate=>this.onSilderChange(rate)}
						/>
					</nav>
				</div>
				{/* <ServiceList/> */}
				{/* Mock Service List */}
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
			</div>
		);
	}
}
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

export default connect(mapStateToProps, mapDispatchToProps)(Service);
// export default Service;