import React from 'react';
import { Row, Col, Button, Menu, Table, Modal} from 'antd';
import history from 'helpers/history';
import styled from 'styled-components';
import AdminSearch from './AdminSearch';
import AdminComplaint from './AdminComplaint';

const H1 = styled.h1`
	text-align:left;
	color:#402900
`

const P = styled.p`
	text-align:left;
	text-indent:30px;
	color:#402900
`

class Admin extends React.Component{

	constructor(props){
		super(props);
		this.state = {			
			current : 'search',			
		};		
	}
	
	componentDidMount(){
		
    }	
    
    handleSidebarClick = (e) => {
        if (e.key == 'logout'){
			localStorage.removeItem('admin');
			history.push('/admin')
		}			
        else
            this.setState({
                current: e.key,
            });
    }

	render(){		
		return (			
			<div style={{color:'#402900'}}>
				<img src="/images/admin.jpg" style={{ width: '100%'}} />
				<Row type="flex" justify="space-between" gutter={48} style={{marginBottom:'20px',marginTop:'20px',paddingLeft:'48px',paddingRight:'48px'}}>
					<Col span={5} style={{paddingLeft:'0px'}}>
						<Menu			
							onClick={this.handleSidebarClick}								
							mode="inline"
							selectedKeys={[this.state.current]}
							style={{color:'#402900'}}>
							<Menu.Item key="search">
								ค้นหาผู้ใช้งาน
							</Menu.Item>
							<Menu.Item key="compaint">
								คำร้องเรียน
							</Menu.Item>								
							<Menu.Item key="logout">
								<Button type="primary" >
									<span>ออกจากระบบ</span>
								</Button>	
							</Menu.Item>													
						</Menu>													
					</Col>

					<Col span={19} > 	
						<Col>
                            {(this.state.current == 'search') ?
                            <AdminSearch />:<AdminComplaint/>}
						</Col>						
					</Col>					
				</Row>
			</div>			
		)
	}
}
export default (Admin);