import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Icon, Input, Button, Menu, Dropdown, Checkbox } from 'antd'
import { getUsers } from '../../actions/AdminActions'
import './Search.css'
// import { pushRoute } from '../../helpers/router'
import { connect } from 'react-redux'
const FormItem = Form.Item

class AdminSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
          keyword: '',
          isMale: false,
          isFemale: false,
          isOwnew: false,
          isCustomer: false,
          users: []
        }
      }

  onSearchButtonClick = async () => {
      const res = await getUsers('a','','')
      this.setState({ users: res.users })
      console.log(this.state.users)
  }

  renderSearchBar = () =>{
      return(
        <Form onSubmit={this.handleSubmit} className="search-form">
        <h1> Admin Search </h1>
        <br/>
        <FormItem>        
            <Input
              size='large'
              prefix={<Icon type='search' style={{ fontSize: 13 }} />}
              placeholder='search user'              
            />
            <label>User Type </label>               
            <Checkbox/> <label>Customer </label>
            <Checkbox/> <label>Owner </label> 
            <br/> 
            <label>Gender </label>               
            <Checkbox/> <label>Male </label>
            <Checkbox/> <label>Female </label>               
            <Button
            type='primary'
            htmlType='submit'
            size='small'           
            className="search-form-button"
            onClick={this.onSearchButtonClick}            
             >
                search
            </Button>
        </FormItem>   
      </Form>
      )
  }
    
  render() {
    return (
      <div className="fuck">
        {this.renderSearchBar()}
      </div>
    )
  }
}

export default connect()(AdminSearch)
