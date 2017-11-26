import React from 'react';
import { Row, Col, Button, Menu, Table, Modal} from 'antd';
import {connect} from 'react-redux';
import {AdminActions} from '../../actions';

class AdminComplaint extends React.Component{
	
		constructor(props){
			super(props);
			this.state = {			
				isComplaintModalActive: false,
				current: 'all',
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

		handleTabClick  = (e) =>{
			this.setState({
                current: e.key,
            });
		}
	
	
		render(){		

			let data = this.props.complaints

			if(this.state.current == 'service')
				data = this.props.complaints.filter((record) => record.complaint_type === 'service')
			else if(this.state.current == 'employee')
				data = this.props.complaints.filter((record) => record.complaint_type === 'employee')
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
					<h1 style={{marginBottom:'10px', textAlign:'left'}}>คำร้องเรียน</h1>

					<Menu			
							onClick={this.handleTabClick}								
							mode="horizontal"
							selectedKeys={[this.state.current]}
							style={{color:'#402900'}}>
							<Menu.Item key="all">
								ทั้งหมด
							</Menu.Item>
							<Menu.Item key="service">
								คำร้องเรียนบริการ
							</Menu.Item>								
							<Menu.Item key="employee">
								คำร้องเรียนพนักงาน
							</Menu.Item>													
						</Menu>	

					{this.props.complaints ?
					<Table
					dataSource={data}
					onRowClick={this.onComplaintClick}
					columns={columns}						  
					pagination={false}/>:<div>no reservetions for this sevice now...</div>	}

				<Modal
					title={"คำร้องเรียนหมายเลข: " + this.state.ComplaintModaldata.complaint_id}
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
					<h2><strong>หัวข้อ </strong> {this.state.ComplaintModaldata.title}</h2>
					<br/>
					<h2><strong>ผู้รายงาน </strong> {this.state.ComplaintModaldata.customer_id}</h2>
					<br/>
					{this.state.ComplaintModaldata.complaint_type == 'service' ?
						<div>
							<h2><strong>ประเภท </strong> รายงานบริการ</h2>
							<br/>
							<h2><strong>บริการที่ถูกรายงาน </strong> {this.state.ComplaintModaldata.service_id}</h2>							
						</div> :
						<div>
							<h2><strong>ประเภท </strong> รายงานพนักงาน</h2>
							<br/>
							<h2><strong>พนักงานที่ถูกรายงาน </strong> {this.state.ComplaintModaldata.employee_id}</h2>
						</div> 
					}
					<br/>
					<h2><strong>เนื้อหา</strong>
					<br/>
					<br/>
					{this.state.ComplaintModaldata.note}</h2>
					<br/>
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