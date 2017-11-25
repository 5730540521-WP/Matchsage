import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CustomerActions} from 'actions';

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
				<article class="media">
					<div class="media-content">
						<div class="field">
							<p class="control">
								<textarea class="textarea" placeholder="Add a comment..."></textarea>
							</p>
						</div>
						<nav class="level">
							<div class="level-left">
								<div class="level-item">
									<a class="button is-info">Submit</a>
								</div>
							</div>
							
						</nav>
					</div>
				</article>
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