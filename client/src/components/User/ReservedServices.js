import React from 'react';
import { Modal,Icon,Table,Calendar,LocaleProvider,Row,Col,Button } from 'antd';
import thTH from 'antd/lib/locale-provider/th_TH';
import './ReservedServices.css';
import {CustomerActions} from 'actions/CustomerActions';
import * as JWT from 'jwt-decode';
import {connect} from 'react-redux';
import { history } from 'helpers';

class ReservedServices extends React.Component{
  state = {
    loading: false,
    visible: false,
  }
  componentDidMount(){
    this.props.fetchReserved(JWT(localStorage.getItem('user')).user_id);
  }
  
  dateCellRender = (value)=>{
    let listData = [];
    if(this.props.customerReservations){this.props.customerReservations.map((reservation)=>{
      const reservationDate = new Date(reservation.date);
      if(reservationDate.getDate() === value.date() && reservationDate.getMonth()===value.month() && reservationDate.getFullYear()===value.year()) listData = [...listData,{
        type:'normal',
        content:'มีนัดนวด'
      }]
    })}
    
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <span className={`event-${item.type}`}>●</span>
              {item.content}
            </li>
          ))
        }
      </ul>
    );
  }
  
  monthCellRender = (value)=> {
    let num = 0;
    if(this.props.customerReservations){this.props.customerReservations.map((reservation)=>{
      const reservationDate = new Date(reservation.date);
      if(reservationDate.getMonth()===value.month() && reservationDate.getFullYear()===value.year()) num++;
    })}
    return num ? (
      <div className="notes-month">
        <span>มีนัดนวด</span>
        <section>{num}</section>
      </div>
    ) : null;
  }
  
  columns = [{
    title: 'หมายเลขการจอง',
    dataIndex: 'reserve_id',
    key: 'reserve_id'
  },{
    title: 'ชื่อร้าน',
    dataIndex: 'name',
    render: (text,record) => (
      <a onClick={()=>history.push(`/service/${record.service_id}`)}>{text}</a>
    ),
  }, {
    title: 'ประเภทบริการ',
    dataIndex: 'service_type',
  }, {
    title: 'วันที่จอง',
    dataIndex: 'date',
  },{
    title: 'เวลาที่จอง',
    dataIndex: 'time',
  }, {
    title: 'ชำระค่าบริการ',
    dataIndex: 'paid_status',
    render: (text, record) => (
      <Button type="primary" onClick={()=>this.setState({visible:true})/*this.props.payService(JWT(localStorage.getItem('user')).user_id,record.reserve_id)*/}>ชำระค่าบริการที่เหลือ</Button>
    ),
  }];

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  renderChoosePaymentAccountModal = ()=>{
    const { visible, loading } = this.state;
    return <Modal
      visible={visible}
      title="เลือกวิธีการชำระค่าบริการ"
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" size="large" onClick={this.handleCancel}>ยกเลิก</Button>,
        <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
          ชำระค่าบริการ
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  }

  render(){
    
    return <LocaleProvider locale={thTH}>
      <div style={{paddingLeft:'24px',paddingRight:'24px'}}>
        <Row gutter={24}>
          <Col span={10}>
            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
          </Col>
          <Col span={14}>
            <h1>บริการที่จองไว้</h1>
            <Table columns={this.columns} dataSource={this.props.customerReservations} />
            {this.renderChoosePaymentAccountModal()}
          </Col>
        </Row>
      </div>
    </LocaleProvider>
  }
}

function mapStateToProps(state){
	return {
		customerReservations: state.ServiceRecieverReducer.customerReservations
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchReserved: (customer_id)=>{
			dispatch(CustomerActions.fetchReservedServices(customer_id))
    },
    payService: (user_id,reserve_id)=>{
      dispatch(CustomerActions.payService(user_id,reserve_id))
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservedServices);