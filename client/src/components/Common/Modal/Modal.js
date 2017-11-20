import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div.attrs({
	className: "modal-background"
})`
	background-color: rgba(234,235,235,.95);
`;

export default ({children, onClose})=>(
	<div className="modal is-active">
		<ModalBackground onClick={onClose}/>
		<div className="modal-card">
			{children}
		</div>
		{/* <button className="modal-close is-large" aria-label="close" onClick={onClickClose}></button> */}
	</div>
)