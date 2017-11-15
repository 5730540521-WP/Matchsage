import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer.attrs({
	className: "footer"
})`
	clear: both;
	position: relative;
	z-index: 10;
	height: 1.5em;
	margin-top: -1.5em;
`;

export default ()=>(
	<Footer>
		<div className="container">
			<div className="content has-text-centered">
				<p>
					<strong>Matchsage</strong> by <a href="https://github.com/we-inc/Matchsage">GG Hanzo</a>. 
				</p>
				<p>
					<a className="icon" href="https://github.com/we-inc/Matchsage">
						<i className="fa fa-github"></i>
					</a>
				</p>
			</div>
		</div>
	</Footer>
)