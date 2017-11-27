import React from 'react';
import history from 'helpers/history';

import { Row, Col, Input, Button } from 'antd';
// ตอนแรกจะทำเป็น item ของ payment แต่คุยกับเหลียงแล้วจะเปลี่ยนเป็น itemของ ช่องทางเครดิตกับช่องทางบัญชีธนาคารที่ผูก
// อันนี้กำลังจะทำของบัตรเครดิต
export default (props)=>{
	const {payment} = props;
	return(
		
		<div className="columns is-mobile" style={{color:'#402900'}}>
			<Row>
                <Col span={6}>
                    <figure className="image is-64x64">
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
					</figure>
                </Col>
                <Col span={6}>
                    {payment.}
                </Col>

            </Row>
		</div>
	);
}