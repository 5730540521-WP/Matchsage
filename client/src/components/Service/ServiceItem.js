import React from 'react';
import { Redirect } from 'react-router';
import { Link,withRouter } from 'react-router-dom';

export default withRouter((props)=>{
	console.log(props);
	const {service} = props;
	return(
		
		<div className="box" onClick={()=>props.history.push(`/service/${service.service_id}`)}>
			<article class="media">
			  <div class="media-left">
					<figure class="image is-64x64">
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
					</figure>
				</div>
				<div class="media-content">
					<div class="content">
						<p>
							<strong>{service.service_name}</strong> Rating: <small>{service.rating}</small>
							<br/>
							{service.contact_number}
						</p>
					</div>
					<nav class="level is-mobile">
						<div class="level-left">
							<a class="level-item">
								<span class="icon is-small"><i class="fa fa-reply"></i></span>
							</a>
							<a class="level-item">
								<span class="icon is-small"><i class="fa fa-retweet"></i></span>
							</a>
							<a class="level-item">
								<span class="icon is-small"><i class="fa fa-heart"></i></span>
							</a>
						</div>
					</nav>
				</div>
			</article>
		</div>
	);
})