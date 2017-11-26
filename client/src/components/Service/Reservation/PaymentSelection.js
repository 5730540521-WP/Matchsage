import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CustomerActions} from 'actions/CustomerActions';

import styled from 'styled-components';

import {Table, Checkbox} from 'antd';

const PaymentSelectionTable = styled(Table)`
	margin-left: 15%;
	margin-right: 15%;
`;

const columns	 =[{
	title: 'ประเภทของบัตร',
	dataIndex: 'card_type'
},{
	title: 'เลขลงท้าย',
	dataIndex: 'end_num'
},{
	title: 'วันหมดอายุ',
	dataIndex: 'exp_date'
},{
	title: 'เลือกเพื่อชำระ',
	dataIndex: 'choice'
}];

class PaymentSelection extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			columns:[],
			data:[],
			selectedCard:-1
		};
	}

	componentDidMount(){
		console.log('Yoyo');
		this.props.fetchPaymentAccount();
		const data = [{
			key:'1',
			card_type:(<span className="icon"><i className="fa fa-cc-visa"/></span>),
			end_num: '5555',
			exp_date: '2018/01',
			choice: <Checkbox/>
		},{
			key:'2',
			card_type:(<span className="icon"><i className="fa fa-cc-visa"/></span>),
			end_num: '6666',
			exp_date: '2018/01',
			choice: <Checkbox/>
		}];
		this.setState({data});
	}

	onSelectaCard(){
		this.props.onSelectaCard
	}

	render(){
		return <PaymentSelectionTable dataSource={this.state.data} columns={columns}/>;
	}
}

function mapDispatchToProps(dispatch){
	const fetchPaymentAccount = CustomerActions.fetchPaymentAccount;
	return bindActionCreators({fetchPaymentAccount} ,dispatch);
}

export default connect(null, mapDispatchToProps)(PaymentSelection);