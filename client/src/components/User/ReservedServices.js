import React from 'react';
import { Icon,Table,Calendar,LocaleProvider,Row,Col,Button } from 'antd';
import thTH from 'antd/lib/locale-provider/th_TH';
import './ReservedServices.css';
import {userActions} from 'actions/UserActions';
import * as JWT from 'jwt-decode';
import {connect} from 'react-redux';
import history from 'helpers/history';

class ReservedServices extends React.Component{
  componentDidMount(){
    this.props.fetchReserved(JWT(localStorage.getItem('user')).user_id);
  }
  getListData =(value) =>{
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'normal', content: 'This is usual event.' },
        ]; break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'normal', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ]; break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'normal', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ]; break;
      default:
    }
    return listData || [];
  }
  
  dateCellRender = (value)=>{
    const listData = this.getListData(value);
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
  
  getMonthData = (value)=> {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  monthCellRender = (value)=> {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
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
    render: text => <div onClick={()=>history.push(`/service/${text}`)}>{text}</div>,
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
      text==='fully_paid'?<Button type="primary">ชำระค่าบริการที่เหลือ</Button>:<Button type="primary" disabled>ชำระค่าบริการแล้ว</Button>
    ),
  }];

  render(){
    return <LocaleProvider locale={thTH}>
        <Row>
          <Col span={10}>
            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
          </Col>
          <Col span={14}>
            <h1>บริการที่จองไว้</h1>
            <Table columns={this.columns} dataSource={this.props.customerReservations} />
          </Col>
        </Row>
      </LocaleProvider>
  }
}

function mapStateToProps(state){
	return {
		customerReservations: state.UserReducer.customerReservations
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchReserved: (customer_id)=>{
			dispatch(userActions.fetchReservations(customer_id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservedServices);