import React from 'react';
import { Row,Col,Button,Modal } from 'antd';
import {connect} from 'react-redux';
import {CustomerActions} from 'actions/CustomerActions';
import * as JWT from 'jwt-decode';
import { history } from 'helpers';
import './ReservationHistoryModal.css';

class ReservationHistory extends React.Component{
  state = {
    visible: false
  }

  componentDidMount(){
    this.props.fetchReservationHistory(JWT(localStorage.getItem('user')).user_id);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  renderReceiptModal = ()=>{
    const { visible, loading } = this.state;
    return <Modal
      visible={visible}
      closable={false}
      onCancel={this.handleCancel}
      footer={null}
      width="70%"
      wrapClassName="vertical-center-modal"
    >
      {this.props.billDetail?
      <div>
        <h1 style={{textAlign:'center',fontFamily:'Kanit',fontSize:'48px'}}>Receipt</h1>
        <div style={{backgroundColor:'white',padding:'150px'}}>
          <p style={{fontFamily:'"Times New Roman", Times, serif',fontSize:'36px',color:'black'}}>Receipt No. {this.props.billDetail.receipt_id}
            <br/>Value Customer: {this.props.billDetail.first_name} {this.props.billDetail.last_name}
            <br/>Service: {this.props.billDetail.reservation_id}
            <br/>Payment Method: {'ยังไม่มีในบิล'}
            <br/>Price: {this.props.billDetail.price}
          </p>
        </div>
      </div>:null}
      
      
    </Modal>
  }

  render(){
    return <div style={{paddingLeft:'24px',paddingRight:'24px'}}>
      <h1 style={{marginBottom:'24px'}}>ประวัติการจอง</h1>
      {this.renderReceiptModal()}
      {this.props.reservationHistory?this.props.reservationHistory.length>0?this.props.reservationHistory.map((reservation,index)=>{
        return <Row key={index} gutter={48} style={{paddingBottom:'24px',marginLeft:'0px',marginRight:'0px'}}>
          <Col span={10}>
            <img src="/images/banner.jpg" style={{width:'100%',maxHeight:'114px'}}/>
          </Col>
          <Col span={14} style={{textAlign:'left'}}>
            <a onClick={()=>history.push(`/service/${reservation.service_id}`)} style={{display:'inline-block'}}><h1 style={{fontWeight:'bold'}}>ร้าน {reservation.service_name}</h1></a>
            <Row style={{marginTop:'12px'}}>
              <Col span={10}>
                <div style={{fontSize:20}}>
                  <div style={{marginBottom:'6px'}}>วันที่จอง: {reservation.date_created}</div>
                  ช่องทางการชำระเงิน: <img src={(()=>{
                    switch('credit-card'){
                      case('credit-card'):
                        switch('visa'){
                          case('visa'):
                            return '/images/visa.png';
                          default:
                            return null;
                        }
                      case('bank-account'):
                        switch('Krungsri'){
                          case('Krungsri'):
                            return '/images/KRUNGSRI.png';
                          case('Krungthai'):
                            return '/images/KTB.png';
                          case('Kbank'):
                            return '/images/KBANK.png';
                          case('SCB'):
                            return '/images/SCB.png';
                          case('Bangkok'):
                            return '/images/BKK.png'
                          default:
                            return null;
                        }
                      default:
                        return null;
                    }
                  })()} style={{maxHeight:'20px'}}/></div>
              </Col>
              <Col span={12}>
                <div style={{fontSize:20}}>
                  <div style={{marginBottom:'6px'}}>วันที่ใช้บริการ: {reservation.date_reserved}</div>
                </div>
                <Button style={{marginRight:'12px'}} onClick={()=>{
                  this.setState({visible:true});
                  this.props.informReceipt(reservation.reserve_id);
                }}>ดูใบเสร็จ</Button>
                <Button onClick={()=>this.props.downloadReceipt(reservation.reserve_id)}>ดาวน์โหลดใบเสร็จ</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      }):<h1>ท่านยังไม่มีประวัติการใช้บริการใดๆ</h1>:null}
    </div>
  }
}

function mapStateToProps(state){
	return {
    reservationHistory: state.CustomerReducer.reservationHistory,
    billDetail: state.CustomerReducer.billDetail
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchReservationHistory: (customer_id)=>{
      dispatch(CustomerActions.informReservationHistory(customer_id))
    },
    informReceipt: (reserve_id)=>{
      dispatch(CustomerActions.informBillDetail(reserve_id))
    },
    downloadReceipt: (reserve_id)=>{
      dispatch(CustomerActions.downloadBillDetail(reserve_id))
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationHistory);