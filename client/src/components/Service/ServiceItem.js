import React from 'react';
import { Redirect } from 'react-router';
import { Link,withRouter } from 'react-router-dom';

export default withRouter((props)=>{
	console.log(props);
	const {service} = props;
	return(
		
		<div className="box" onClick={()=>props.history.push(`/service/${service.service_id}`)}>
			<article className="media">
			  <div className="media-left">
					<figure className="image is-64x64">
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<p>
							<strong>{service.service_name}</strong> Rating: <small>{service.rating}</small>
							<br/>
							{service.contact_number}
						</p>
					</div>
					<nav className="level is-mobile">
						<div className="level-left">
							<a className="level-item">
								<span className="icon is-small"><i className="fa fa-reply"></i></span>
							</a>
							<a className="level-item">
								<span className="icon is-small"><i className="fa fa-retweet"></i></span>
							</a>
							<a className="level-item">
								<span className="icon is-small"><i className="fa fa-heart"></i></span>
							</a>
						</div>
					</nav>
				</div>
			</article>
		</div>
	);
})