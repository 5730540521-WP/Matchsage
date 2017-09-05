import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer.attrs({
	className: "footer"
})`
	position:absolute;
	left:0;
	bottom:0;
	right:0
`;

export default ()=>(
	<Footer>
		<div className="container">
			<div className="content has-text-centered">
				<p>
					<strong>Matchsage</strong> by <a href="http://facebook.com/chrsow">GG Hanzo</a>. 
				</p>
				<p>
					<a className="icon" href="https://github.com/jgthms/bulma">
						<i className="fa fa-github"></i>
					</a>
				</p>
			</div>
		</div>
	</Footer>
)