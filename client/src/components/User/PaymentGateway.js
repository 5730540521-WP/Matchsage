import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import {history} from '../../helpers';
import { Row, Col, Input, Button } from 'antd';
import styled from 'styled-components';
import * as JWT from 'jwt-decode';




class PaymentGateway extends React.Component {




    render() {
		return (

			<div className="columns is-multiline is-mobile">

				

			</div>
		);
	}



}




export default connect(null)(PaymentGateway);