import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Icon, Input, Button, Menu, Dropdown } from 'antd'
import { login } from '../../actions/AdminActions'
import './Login.css'
// import { pushRoute } from '../../helpers/router'
import { connect } from 'react-redux'
const FormItem = Form.Item
class NormalLoginForm extends React.Component {

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
            console.log('fuck')
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
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1> Admin Login </h1>
        <br/>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username.' }]
          })(
            <Input
              size='large'
              prefix={<Icon type='user' style={{ fontSize: 13 }} />}
              placeholder='Username'
              disabled={this.state.loginState}
            />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password.' }]
          })(
            <Input
              size='large'
              prefix={<Icon type='lock' />}
              style={{ fontSize: 13 }}
              type='password'
              placeholder='Password'
              disabled={this.state.loginState}
            />
            )}
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className="login-form-button"
            onClick={this.onLoginButtonClick}
            loading={this.state.loginState}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({})(NormalLoginForm)

class AdminLogin extends Component {
  render() {
    return (
      <div className="fuck">
        <WrappedNormalLoginForm />
      </div>
    )
  }
}

export default connect()(AdminLogin)
