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
      width="60%"
      wrapClassName="vertical-center-modal"
    >
      {this.props.billDetail?
      <div>
        <h1 style={{textAlign:'center',fontFamily:'Kanit',fontSize:'48px'}}>Receipt</h1>
        <div style={{backgroundColor:'white',padding:'100px'}}>
          <p style={{fontFamily:'"Times New Roman", Times, serif',fontSize:'36px',color:'black'}}>Receipt No. {this.props.billDetail.receipt_id}
            <br/>Value Customer: {this.props.billDetail.first_name} {this.props.billDetail.last_name}
            <br/>Reservation: {this.props.billDetail.reservation_id}
            <br/>Payment Method: {this.props.billDetail.payment_method}
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
        const isFullyPaid = reservation.paid_status==='fully-paid';
        return <Row key={index} gutter={48} style={{paddingBottom:'24px',marginLeft:'0px',marginRight:'0px'}}>
          <Col span={8}>
            <img src="/images/banner.jpg" style={{width:'100%',maxHeight:'114px'}}/>
          </Col>
          <Col span={16} style={{textAlign:'left'}}>
            <a onClick={()=>history.push(`/service/${reservation.service_id}`)} style={{display:'inline-block'}}><h1 style={{fontWeight:'bold'}}>ร้าน {reservation.service_name}</h1></a>
            <Row style={{marginTop:'12px'}}>
              <Col span={8}>
                <div style={{fontSize:20}}>
                  <div style={{marginBottom:'6px'}}>วันที่จอง: {reservation.date_created}</div>
                  ช่องทางการชำระเงิน: <img src={(()=>{
                    switch(isFullyPaid?reservation.payment_methods_of_receipts[1]:reservation.payment_methods_of_receipts[0]){
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
              <Col span={16}>
                <div style={{fontSize:20}}>
                  <div style={{marginBottom:'6px'}}>วันที่ใช้บริการ: {isFullyPaid?reservation.date_reserved:'ยังไม่ได้ไปใช้บริการ/ยังไม่ได้ชำระเงินหลังรับบริการ'}</div>
                </div>
                <Button style={{marginRight:'12px'}} onClick={()=>{
                  this.props.informReceipt(reservation.receipts_of_reservation[0]);
                  this.setState({visible:true});
                }}>ดูใบเสร็จค่ามัดจำ</Button>
                <Button style={{marginRight:'12px'}} onClick={()=>this.props.downloadReceipt(reservation.receipts_of_reservation[0])}>ดาวน์โหลดใบเสร็จค่ามัดจำ</Button>
                {reservation.receipts_of_reservation.length>1?
                <div style={{display:'inline'}}><Button style={{marginRight:'12px'}} onClick={()=>{
                  this.props.informReceipt(reservation.receipts_of_reservation[1]);
                  this.setState({visible:true});
                }}>ดูใบเสร็จ</Button>
                <Button onClick={()=>this.props.downloadReceipt(reservation.receipts_of_reservation[1])}>ดาวน์โหลดใบเสร็จ</Button></div>
                :null}
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
    informReceipt: (receipt_id)=>{
      dispatch(CustomerActions.informBillDetail(receipt_id))
    },
    downloadReceipt: (receipt_id)=>{
      dispatch(CustomerActions.downloadBillDetail(receipt_id))
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationHistory);