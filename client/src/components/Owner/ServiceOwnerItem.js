import React from 'react';
import { Redirect } from 'react-router';
import { Link,withRouter } from 'react-router-dom';

export default withRouter((props)=>{	
	const {service, onClickDelete} = props;
	
	return(
		
		<div className="box">
			<article className="media">
			  <div className="media-left">
					<figure className="image is-64x64" onClick={()=>props.history.push(`/service/edit/${service.service_id}`)}
					style={{cursor: 'pointer'}}>
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<p>
							<strong onClick={()=>props.history.push(`/service/edit/${service.service_id}`)}
							style={{cursor: 'pointer'}}>
								{service.service_name}
							</strong> 
							<dev style={{ marginLeft: '5px'}}> <small> Rating: {service.rating}</small></dev>							
							<br/>
							{service.contact_number}
						</p>
					</div>
					<nav className="level is-mobile">
						<div className="level-left">														
							<a className="level-item" onClick={onClickDelete}>
								<span className="icon is-small"><i className="fa fa-trash-o"></i></span>
							</a>
						</div>
					</nav>
				</div>
			</article>
		</div>
	);
})