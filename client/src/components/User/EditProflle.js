import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Row, Col } from 'antd';

class EditProfile extends React.Component{
	render(){
		return(
            <div className="columns">    
                <div className="row">
                    <div>
                        <figure class="image is-64x64">
                            <img src="" alt="Image"/>
                        </figure>
                    </div>
                </div>
                <div>
                    <Row>
                        <Col span={4}>ชื่อ</Col>
                        <input size="100"/> 
                    </Row>
                    <Row>
                        <Col span={4}>นามสกุล</Col>
                        <input size="100"/>
                    </Row> 
                    <Row>
                        <Col span={4}>ที่อยู่</Col>
                        <input size="100"/>
                    </Row>
                    <Row>
                        <Col span={4}>เบอร์โทรศัพท์</Col>
                        <input size="100"/>
                    </Row> 
                    <Row>
                        <Col span={4}>เลขบัญชี</Col>
                        <input size="100"/>
                    </Row>
                    <Row>
                        <Col span={4}>อีเมล์</Col>
                        <input size="100"/>
                    </Row> 
                    <Row>
                        <Col span={4}>รหัสผ่าน</Col>
                        <input size="100"/>
                    </Row>  
                    <Row>
                        <Col span={4}> ประเภทสมาชิก </Col>
                        <Col span={16}> ผู้รับบริการ </Col>
                    </Row>
                </div>
            
                <button type="button" >บันทึกข้อมูล</button>

            </div>
			
        );
	}
}

export default connect()(EditProfile);
