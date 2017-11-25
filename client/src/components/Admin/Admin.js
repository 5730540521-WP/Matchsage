import React from 'react';
import { Row, Col, Button, Menu, Table, Modal} from 'antd';
import history from 'helpers/history';
import styled from 'styled-components';
import AdminSearch from './AdminSearch';

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
        if (e.key == 'back')
            history.push('/')
        else
            this.setState({
                current: e.key,
            });
    }

	render(){		
		return (			
			<div style={{color:'#402900'}}>				
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
							<Menu.Item key="back">
								<Button type="primary" >
									<span>กลับสู่หน้าหลัก</span>
								</Button>	
							</Menu.Item>													
						</Menu>													
					</Col>

					<Col span={19} > 											
						{(this.state.current == 'search') ?
						<Col>
                            <AdminSearch />
						</Col>:	<dev>inconstut</dev>}						
					</Col>					
				</Row>
			</div>			
		)
	}
}
export default (Admin);