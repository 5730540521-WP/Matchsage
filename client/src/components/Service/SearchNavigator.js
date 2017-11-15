import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Input,Slider } from 'antd';

import _ from 'lodash';

const SearchInput = Input.Search;

class SearchNavigator extends React.Component{
	constructor(){
		super();
		this.state = {
			term:''
		}
	}

	onInputChange(e){
		// let newDisplayed = 
		// this.setState({});
		console.log(e.target.value);
		// let newlyDisplayed = _.filter(this.props.services)
		// this.props.updateService(newlyDisplayed);

		// this.setState({term:e.target.value});
	}

	render(){
		return(
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
					<Slider defaultValue={0} max={5}/>
				</nav>
			</div>
		);
	}
}

function mapStateToProps({service}){
	const {services} = service;
	// const {displayed_services} = service;
	return {services}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		// searchService	
	},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchNavigator);