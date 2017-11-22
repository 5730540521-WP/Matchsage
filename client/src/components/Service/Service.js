import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Mock
import { Input,Slider } from 'antd';
import ServiceItem from './ServiceItem';

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
			isServiceLoaded: false,
			word:'',
			ratingMin:0
		};
		if(this.props.match.params.filter){
			const fullFilter = this.props.match.params.filter;
			if(fullFilter.includes('word=')) {
				let filter=fullFilter.slice(fullFilter.search('word=')+5);
				if(filter.includes('&')) filter = filter.slice(0,filter.indexOf('&'));
				this.state.word = filter;
			}
			if(fullFilter.includes('rating>=')) {
				let filter = fullFilter.slice(fullFilter.search('rating>=')+8);
				if(filter.includes('&')) filter = filter.slice(0,filter.indexOf('&'));
				this.state.ratingMin = filter;
			}
		}

		this.onInputChange = this.onInputChange.bind(this);
	}	
	
	componentDidMount(){
		const {fetchServices} = this.props;
		// fetchServices(()=>{
		// 	console.log(this.props.services)
		// 	this.setState({services:this.props.services});
		// });
		fetchServices();
		//this.state.displayService = this.state.services;
		// const services = getServices();
	}

	renderServices(){
		// this.setState({services:this.props.services});
		if(!this.state.isServiceLoaded && this.props.services.length > 0) {
			this.setState({ services: this.props.services, isServiceLoaded: true},()=>this.onChange(this.state.word,this.state.ratingMin))
		}
		return <Row gutter={24}>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2===0?<ServiceItem key={service.service_id} service={service}/>:null})}
				</Col>
				<Col span={12}>{this.state.services.map( (service,index) =>{
					return index%2===1?<ServiceItem key={service.service_id} service={service}/>:null})}
				</Col>
			</Row>
			
		;
	}

	linkWithFilter(){
		let hasWord = this.state.word,
		hasRatingMin = this.state.ratingMin>0,
		newSearchURL = '/service/search',
		hasPreviousFilter = false;
		if(hasWord || hasRatingMin) newSearchURL+='/';
		if(hasWord){
			if(hasPreviousFilter)	newSearchURL+='&'; else hasPreviousFilter =true;
			newSearchURL+=`word=${this.state.word}`;
		}
		if(hasRatingMin){
			if(hasPreviousFilter)	newSearchURL+='&'; else hasPreviousFilter =true;
			newSearchURL+=`rating>=${this.state.ratingMin}`;
		}
		this.props.history.push(newSearchURL);
	}

	onInputChange(e){
		this.onChange(e.target.value,this.state.ratingMin);
	}

	onSilderChange(ratingMin){
		this.onChange(this.state.word,ratingMin);
	}

	onChange(word,ratingMin){
		const term = word.toLowerCase();
		let newlyDisplayed = _.filter(this.props.services,service =>{
			return (
				service.service_name.toLowerCase().includes(term)
				|| service.contact_number.includes(term)
			);
		});
		newlyDisplayed = newlyDisplayed.filter(service => (service.rating >= ratingMin ) );
		this.setState({services:newlyDisplayed,word:word,ratingMin:ratingMin},()=>this.linkWithFilter());
	}
	render(){
		
		return(
			<div className="columns">
				{/* <SearchBox/> */}

				{/* <SearchNavigator/> */}
				{/* Mock Search Nav */}
				<div className="column is-one-quarter">
					<nav className="panel"  style={{paddingLeft:'24px',paddingRight:'24px'}}>
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
							defaultValue={this.state.word}
							onChange={(e)=>this.onInputChange(e)}
						/>
						<p>คะแนนความพึงพอใจ</p>
						<Slider defaultValue={this.state.ratingMin} max={5}
							onChange={rate=>this.onSilderChange(rate)}
						/>
					</nav>
				</div>
				{/* <ServiceList/> */}
				{/* Mock Service List */}
				<div className="column">
					<div className="rows" style={{paddingLeft:'24px',paddingRight:'24px'}}>
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