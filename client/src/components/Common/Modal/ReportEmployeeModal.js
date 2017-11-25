import React from 'react';
import { Modal, Button,Input } from 'antd';
import {CustomerActions} from '../../../actions/CustomerActions';
import {connect} from 'react-redux';

const {TextArea} = Input

class ReportEmployeeModal extends React.Component{
  state = {
    loading: false,
  }
  handleOk = async () => {
    this.setState({ loading: true });
    await this.props.sendComplaint(this.props.serviceStore.service_id,this.props.employee.employee_id,this.props.topic,this.props.content);
    this.setState({loading:false});
    this.props.close();
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
      <Input placeholder="หัวข้อ" value={this.props.topic} onChange={(e)=>this.props.changeTopic(e.target.value)}/>
      รายละเอียด<br/>
      <TextArea placeholder="รายละเอียด" value={this.props.content} width="100%" autosize={{ minRows: 6}} onChange={(e)=>this.props.changeContent(e.target.value)}/>

    </Modal>
  }
}

function mapStateToProps(state){
	return {
		serviceStore: state.service
	}
}

function mapDispatchToProps(dispatch){
	return {
		sendComplaint: (service_id,employee_id,topic,content)=>{
			dispatch(CustomerActions.sendEmployeeComplaint(service_id,employee_id,topic,content));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmployeeModal);