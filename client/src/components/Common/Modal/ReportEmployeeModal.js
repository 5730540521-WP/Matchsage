import React from 'react';
import { Modal, Button,Input } from 'antd';
import {sendEmployeeComplaint} from 'actions/CustomerActions';

const {TextArea} = Input

class ReportEmployeeModal extends React.Component{
  state = {
    loading: false,
    topic:'',
    content:''
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.close();
    }, 3000);
  }
  handleCancel = () => {
    this.props.close();
  }
  render(){
    return <Modal
      visible={this.props.visible}
      title={'รายงาน'+this.props.employee.first_name+' '+this.props.employee.last_name}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" size="large" onClick={this.handleCancel}>ยกเลิก</Button>,
        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
          ส่ง
        </Button>,
      ]}
    >
      หัวข้อ<br/>
      <Input placeholder="หัวข้อ" onChange={(e)=>this.setState({topic:e.target.value})}/>
      รายละเอียด<br/>
      <TextArea placeholder="รายละเอียด" autosize={{ minRows: 6}} onChange={(e)=>this.setState({content:e.target.value})}/>

    </Modal>
  }
}

function mapStateToProps(state){
	return {
		serviceReducer: state.service
	}
}

function mapDispatchToProps(dispatch){
	return {
		sendComplaint: (employee_id,topic,content)=>{
			dispatch(sendEmployeeComplaint(employee_id,topic,content));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmployeeModal);