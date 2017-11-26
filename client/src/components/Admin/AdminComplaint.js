import React from 'react';
import { Row, Col, Button, Menu, Table, Modal} from 'antd';
import {connect} from 'react-redux';
import {AdminActions} from '../../actions';

class AdminComplaint extends React.Component{
	
		constructor(props){
			super(props);
			this.state = {			
				isComplaintModalActive: false,
				ComplaintModaldata: []
			};		
		}
		
		componentDidMount(){
			this.props.fetchComplaints()
		}	

		toggleComplaintModalModal(modalValue){
			this.setState({isComplaintModalActive: modalValue})
		}

		onComplaintClick = (record, index) => {
			console.log(record)
			this.toggleComplaintModalModal(true)
			this.setState({ComplaintModaldata: record})
		}
	
	
		render(){		
			const columns = [{
				title: 'complaint_id',
				dataIndex: 'complaint_id',
				key: 'complaint_id',
			  }, {
				title: 'customer_id',
				dataIndex: 'customer_id',
				key: 'customer_id',
			  }, {
				title: 'complaint_type',
				dataIndex: 'complaint_type',
				key: 'complaint_type',
			  }];	

			return (
				<div>			
					{this.props.complaints ?
					<Table
					dataSource={this.props.complaints}
					onRowClick={this.onComplaintClick}
					columns={columns}						  
					pagination={false}/>:<div>no reservetions for this sevice now...</div>	}

				<Modal
					title="คำร้องเรียน"
					visible={this.state.isComplaintModalActive}
					closable = {false}
					footer={[
						<Button key="OK" 
						size="large" 
						type = "primary"
						onClick = {() => this.toggleComplaintModalModal(false)}>
						OK</Button>			
					  ]}
					>	
						{JSON.stringify(this.state.ComplaintModaldata)}
				</Modal>

				</div>		
			)
		}
	}	

function mapStateToProps(state){
	return {		
		complaints: state.AdminReducer.complaints.complaint
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchComplaints: ()=>{
			dispatch(AdminActions.fetchComplaints())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComplaint);