import React from 'react';
import history from 'helpers/history';

export default (props)=>{
	const {service} = props;
	return(
		
		<div className="box" style={{color:'#402900'}} onClick={()=>history.push(`/service/${service.service_id}`)}>
			<article className="media">
			  <div className="media-left">
					<figure className="image is-64x64">
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<p>
							<strong style={{color:'#402900'}}>{service.service_name}</strong> Rating: <small>{parseFloat(service.rating).toFixed(2)}</small>
							<br/>
							{service.contact_number}
							<br/>
							{service.address}
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
}