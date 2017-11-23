import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userActions} from '../../actions';
import { Row, Col, Input } from 'antd';
import * as JWT from 'jwt-decode';



class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
            
		};

    }

    async componentDidMount(){
        
        const {user} = await userActions.fetchUserProfile(JWT(localStorage.getItem('user')).user_id);
        this.setState({user});
        console.log(userActions.fetchUserProfile(JWT(localStorage.getItem('user')).user_id));
	}


	render(){
		return(
            <div className="columns">    
                {/* <div className="row">
                    <div>
                        <figure class="image is-64x64">
                            <img src="" alt="Image"/>
                        </figure>
                    </div>
                </div> */}
                <div>
                <Row>
                </Row>
                <Row>
                </Row>
                <Row>
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={4}>ชื่อ</Col>
                    <Col span={8}>
                    <input size="80" value={this.state.user ? this.state.user.first_name:false} />
                    </Col> 
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={4}>นามสกุล</Col>
                    <Col span={8}>
                    <input size="80" value={this.state.user ? this.state.user.last_name:false}/>
                    </Col>
                </Row> 
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={4}>ที่อยู่</Col>
                    <Col span={8}>
                    <input size="80" value={this.state.user ? this.state.user.address:false}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={4}>เบอร์โทรศัพท์</Col>
                    <Col span={8}>
                    <input size="80" value={this.state.user ? this.state.user.contact:false}/>
                    </Col>
                </Row>
                <Row>
                <Col span={8}>
                    </Col>
                    <Col span={4}>อีเมล์</Col>
                    <Col span={8}>
                    <input size="80" disabled value={this.state.user ? this.state.user.email:false}/>
                    </Col>
                </Row> 
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={4}>รหัสผ่านเดิม</Col>
                    <Col span={8}>
                    <input size="80" type="password" value=""/>
                    </Col>
                </Row>
                <Row>
                <Col span={8}>
                    </Col>
                    <Col span={4}>รหัสผ่านใหม่</Col>
                    <Col span={8}>
                    <input size="80" type="password" value=""/>
                    </Col>
                </Row>
                <Row>
                <Col span={8}>
                    </Col>
                    <Col span={4}>ยืนยันรหัส</Col>
                    <Col span={10}>
                    <Input size="80" type="password" value=""/>
                    </Col>
                </Row>
                <Row>
                <Col span={8}>
                    </Col>
                    <Col span={4}> ประเภทสมาชิก </Col>
                    <label> : ผู้รับบริการ </label>
                </Row>
                <Row>
                </Row>
                <Row>
                </Row>
                <Row>
                <Col span={8}>
                    </Col>
                <button type="button">บันทึกข้อมูล</button>
                </Row>
            </div>
        

            </div>
			
        );
	}
}

export default connect()(EditProfile);
