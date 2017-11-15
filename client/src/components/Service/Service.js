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

const SearchInput = Input.Search;

class Service extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			services: this.props.services,
			term:''
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
		return this.state.services.map( service =>{
			console.log(service.id);
			return(
				<ServiceItem key={service.service_id} service={service}/>
			);
		});
	}

	onInputChange(e){
		// let newlyDisplayed = _.filter();
	}

	onSilderChange(ratingMin){
		// console.log(e.target.value);
		console.log(ratingMin);
		let newlyDisplayed = this.props.services.filter(rating=> (rating >= ratingMin  ) );
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