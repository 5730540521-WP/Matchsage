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
		this.setState({payment_accounts: this.props.payment_accounts},()=>{
			const data = [];
			this.state.payment_accounts.map((payment_account,i)=>{
				data.push({
					key: (i+1).toString(),
					card_type:(<span className="icon"><i className="fa fa-cc-visa"/></span>),
					end_num: this.markPaymentAccount(payment_account),
					exp_date: '2018/01',
					choice: <Checkbox/>
				});
			});
			// const data = [{
			// 	key:'1',
			// 	card_type:(<span className="icon"><i className="fa fa-cc-visa"/></span>),
			// 	end_num: '5555',
			// 	exp_date: '2018/01',
			// 	choice: <Checkbox/>
			// },{
			// 	key:'2',
			// 	card_type:(<span className="icon"><i className="fa fa-cc-visa"/></span>),
			// 	end_num: '6666',
			// 	exp_date: '2018/01',
			// 	choice: <Checkbox/>
			// }];
			this.setState({data});
		});
	}

	onSelectaCard(){
		this.props.onSelectaCard
	}

	markPaymentAccount(paymentAccountNumber){
		const len = paymentAccountNumber.length;
		return '*'.repeat(12) + paymentAccountNumber.slice(len-5,len-1);
	}

	render(){
		return <PaymentSelectionTable dataSource={this.state.data} columns={columns}/>;
	}
}

function mapStateToProps({reservation}){
	const {payment_accounts} = reservation;
	return {payment_accounts};
}

function mapDispatchToProps(dispatch){
	const fetchPaymentAccount = CustomerActions.fetchPaymentAccount;
	return bindActionCreators({fetchPaymentAccount} ,dispatch);
}

export default connect(null, mapDispatchToProps)(PaymentSelection);