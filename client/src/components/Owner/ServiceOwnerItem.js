import React from 'react';
import { Redirect } from 'react-router';
import { Link,withRouter } from 'react-router-dom';

export default withRouter((props)=>{	
	const {service, onClickDelete, onClickEdit} = props;
	
	return(
		
		<div className="box">
			<article className="media">
			  <div className="media-left">
					<figure className="image is-64x64" onClick={()=>props.history.push(`/service/${service.service_id}`)}>
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<p>
							<strong onClick={()=>props.history.push(`/service/${service.service_id}`)}>
								{service.service_name}
							</strong> Rating: <small>{service.rating}</small>							
							<br/>
							{service.price_per_hour}
						</p>
					</div>
					<nav className="level is-mobile">
						<div className="level-left">
							<a className="level-item" onClick={onClickEdit}>
								<span className="icon is-small"><i className="fa fa-edit"></i></span>
							</a>							
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