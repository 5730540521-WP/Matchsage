import React from 'react';
import styled from 'styled-components';



const Hero = styled.div.attrs({
	className:"hero is-medium is-primary is-bold"
})``;

export default ()=>(

	<section className="section">
		<Hero>
			<div className="hero-body">
				<div className="container">
					<h1 className="title">
						มานวดกัน
					</h1>
					<h2 className="subtitle">
						เออ เอาดิ
					</h2>
				</div>
			</div>
		</Hero>
		{/* <div className="">
			<h1> Welcome to Matchsage </h1>
			<img src="https://img.grouponcdn.com/deal/jDKWx7dTfeSfvVypXRgF/mw-700x420/v1/c700x420.jpg"/>
		</div> */}
	</section>
)