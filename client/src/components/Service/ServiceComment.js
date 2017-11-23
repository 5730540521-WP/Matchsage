import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ServiceComment extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			serviceComments:[]
		};
	}

	componentDidMount(){
		// this.setState({serviceComments});
	}

	render(){
		return(
			<div>
				
			</div>
		);
	}
}

function mapStateToProps({serviceComments}){
	// return {serviceComments};
}

function mapDispatchToProps(dispatch){
	// return bindActionCreators(fetchComments,dispatch);
}

export default ServiceComment;
// export default connect(mapStateToProps, mapDispatchToProps)(ServiceComment);