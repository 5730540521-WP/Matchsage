import React from 'react';
import styled from 'styled-components';

import _ from 'lodash';

export default class SearchNavigator extends React.Component{
	constructor(){
		super();
		this.state = {
			term:''
		}
	}

	onInputChage(e){
		// let newDisplayed = 
		// this.setState({});
	}

	render(){
		return(
			<div className="column is-one-quarter">
				<nav className="panel">
					<p className="panel-heading">
						ค้นหาบริการ
					</p>
					<div className="panel-block">
						<p className="control has-icons-left">
							<input className="input is-small" type="text" placeholder="ค้นหา"/>
							<span className="icon is-small is-left">
								<i className="fa fa-search"></i>
							</span>
						</p>
					</div>
				</nav>
			</div>
		);
	}
}