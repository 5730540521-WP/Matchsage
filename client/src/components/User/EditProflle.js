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
                    <input size="100" value={user.first_name}/> 
                </Row>
                <Row>
                    <Col span={4}>นามสกุล</Col>
                    <input size="100" value={user.last_name}/>
                </Row> 
                <Row>
                    <Col span={4}>ที่อยู่</Col>
                    <input size="100" value={user.address}/>
                </Row>
                <Row>
                    <Col span={4}>เบอร์โทรศัพท์</Col>
                    <input size="100" value={user.contract}/>
                </Row>
                <Row>
                    <Col span={4}>อีเมล์</Col>
                    <input size="100" disabled value={user.email}/>
                </Row> 
                <Row>
                    <Col span={4}>รหัสผ่านเดิม</Col>
                    <input size="100" id=""type="password" value=""/>
                </Row>
                <Row>
                    <Col span={4}>รหัสผ่านใหม่</Col>
                    <input size="100" type="password" value=""/>
                </Row>
                <Row>
                    <Col span={4}>ยืนยันรหัส</Col>
                    <input size="100" type="password" value=""/>
                </Row>
                <Row>
                    <Col span={4}> ประเภทสมาชิก </Col>
                    <Col span={16}> ผู้รับบริการ </Col>
                </Row>
            </div>
        
            <button type="button">บันทึกข้อมูล</button>

            </div>
			
        );
	}
}

export default connect()(EditProfile);
