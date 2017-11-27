import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CustomerActions} from 'actions/CustomerActions';

import styled from 'styled-components';

import {Table, Checkbox, Radio} from 'antd';
const RadioGroup = Radio.Group;

const PaymentSelectionTable = styled(Table)`
	margin-left: 15%;
	margin-right: 15%;
`;

const columns	 =[{
	title: 'ประเภทของบัตร',
	dataIndex: 'card_type'
},{
	title: 'เลขบัญชี',
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
		console.log(this.props.payment_accounts);
	}

	// onSelectaCard(){
	// 	this.props.onSelectaCard
	// }

	markPaymentAccount(paymentAccountNumber){
		const len = paymentAccountNumber.length;
		return ('****-'.repeat(3)) + paymentAccountNumber.slice(len-5,len-1);
	}

	onCheckboxChange = (e,payment_account)=>{
		if(e.target.checked) this.props.selectPaymentAccountReservation(payment_account);
		else this.props.selectPaymentAccountReservation('');
	}

	renderCard = (method, company)=>{
		switch(method){
			case 'credit-card':
				return (
					company==='mastercard' 
					? (<span className="icon"><i className="fa fa-cc-mastercard"/></span>)
					: (<span className="icon"><i className="fa fa-cc-visa"/></span>)
				);
			case 'bank-account':
				return (<span className="icon"><i className="fa fa-bank"/></span>);
			default:
				return;
		}
	}

	render(){
		const data = [];
		// const payment_accounts = this.props.payment_accounts;		
		this.props.payment_accounts.map((payment_account,i)=>{
			const {method, company, number} = payment_account;
			console.log({method, company, number});
			data.push({
				key: (i+1).toString(),
				card_type: this.renderCard(method, company),
				end_num: this.markPaymentAccount(number),
				exp_date: '2018/01',
				choice: <Checkbox onChange={(e)=>this.onCheckboxChange(e,number)}/>
			});
		});
		// this.setState({data});
		console.log(this.props.payment_accounts);
		return <PaymentSelectionTable dataSource={data} columns={columns}/>;
	}
}

function mapStateToProps({reservation}){
	const {payment_accounts} = reservation;
	return {payment_accounts};
}

function mapDispatchToProps(dispatch){
	const fetchPaymentAccount = CustomerActions.fetchPaymentAccount;
	const selectPaymentAccountReservation = CustomerActions.selectPaymentAccountReservation;
	return bindActionCreators({fetchPaymentAccount,selectPaymentAccountReservation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSelection);