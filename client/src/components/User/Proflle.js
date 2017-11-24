import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userActions} from '../../actions';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';
import * as JWT from 'jwt-decode';


const Aright = styled.div`
        text-align:right;
        padding: 5px
           
    `
const Aleft = styled.div`
    text-align:left;
    padding: 5px
       
`

const Bspace = styled.div`
word-spacing: 60px;

   
`


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            isOwner: false,
            isCustomer: false,
            isAdmin: false,
            first_name: '',
            last_name: '',
            address:'',
            contact:'',
            
        };

    }

    onInputChange(e){
        // this.state.u
        const {name, value} = e.target;
        this.setState({[name]:value},()=>{
            console.log(this.state.first_name)
        });
        // console.log(e.target.name)
        // console.log(e.target.value);
    }

    async componentDidMount(){
        
        const {user} = await userActions.fetchUserProfile(JWT(localStorage.getItem('user')).user_id);
        console.log(user);
        this.setState({user},()=>{
            console.log(userActions.fetchUserProfile(JWT(localStorage.getItem('user')).user_id));
            
            if(this.state.user.user_type === 'owner') this.setState({isOwner:true,first_name:user.first_name});
            else if(this.state.user.user_type === 'customer')  this.setState({isCustomer:true,first_name:this.state.user.first_name});
        });
        
       
	}


	render(){
		return(
            
            <div className="columns is-multiline is-mobile">
                
                <div className="column is-three-quarter">    
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
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>ชื่อ</Aright></Col>
                            <Col span={8}>
                            <Input name='first_name' value={this.state.first_name}
                                onChange={(e)=>this.onInputChange(e)} />
                            </Col> 
                        </Row>
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>นามสกุล</Aright></Col>
                            <Col span={8}>
                            <Input value={this.state.user ? this.state.user.last_name:''} 
                                onChange/>
                            </Col>
                        </Row> 
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>ที่อยู่</Aright></Col>
                            <Col span={8}>
                            <Input value={this.state.user ? this.state.user.address:false}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>เบอร์โทรศัพท์</Aright></Col>
                            <Col span={8}>
                            <Input value={this.state.user ? this.state.user.contact:false}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>อีเมล์</Aright></Col>
                            <Col span={8}>
                            <Input disabled value={this.state.user ? this.state.user.email:false}/>
                            </Col>
                        </Row> 
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>รหัสผ่านเดิม</Aright></Col>
                            <Col span={8}>
                            <Input type="password" value=""/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>รหัสผ่านใหม่</Aright></Col>
                            <Col span={8}>
                            <Input type="password" value=""/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>ยืนยันรหัส</Aright></Col>
                            <Col span={8}>
                            <Input type="password" value=""/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                            </Col>
                            <Col span={2}><Aright>ประเภทสมาชิก</Aright> </Col>
                            <Col span={6}><Bspace><Aleft>{this.state.isCustomer ? ": ผู้รับบริการ" : this.state.isOwner ? ": ผู้ให้บริการ" : ": ผู้ดูแลระบบ" }</Aleft></Bspace> </Col> 
                        </Row>
                        <Row>
                        </Row>
                        <Row>
                        </Row>
                        <Row>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                        <button type="button">บันทึกข้อมูล</button>
                        </Col>
                        </Row>
                    </div>
            

                </div>
                
			</div>
        );
	}
}

export default connect()(Profile);
