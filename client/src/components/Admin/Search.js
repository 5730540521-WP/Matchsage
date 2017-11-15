import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Icon, Input, Button, Menu, Dropdown, Checkbox } from 'antd'
import { login } from '../../actions/AdminActions'
import './Search.css'
// import { pushRoute } from '../../helpers/router'
import { connect } from 'react-redux'
const FormItem = Form.Item
class NormalSearchForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loginState: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loginState: true })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login({ email: values.userName, password: values.password })
          .then(() => {
            // pushRoute('/users')
            this.setState({ loginState: false })
          })
          .catch(e => {
            this.setState({ loginState: false })
          })
      } else {
        this.setState({ loginState: false })
      }
    })
  }

  render() {
    
    return (
      <Form onSubmit={this.handleSubmit} className="search-form">
        <h1> Admin Search </h1>
        <br/>
        <FormItem>        
            <Input
              size='large'
              prefix={<Icon type='search' style={{ fontSize: 13 }} />}
              placeholder='search user'              
            />               
            <Checkbox/> <span>Customer </span>
            <Checkbox/> <span>Owner </span>
            <Checkbox/> <span>Admin </span>   
            <Button
            type='primary'
            htmlType='submit'
            size='small'           
            className="search-form-button"            
             >
                search
            </Button>
        </FormItem>   
      </Form>
    )
  }
}

const WrappedNormalSearchForm = Form.create({})(NormalSearchForm)

class AdminSearch extends Component {
  render() {
    return (
      <div className="fuck">
        <WrappedNormalSearchForm />
      </div>
    )
  }
}

export default connect()(AdminSearch)
