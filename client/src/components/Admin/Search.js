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
          isOwner: false,
          isCustomer: false,
        }
      }

  onSearchButtonClick = () => {
      let user_type = ''
      if(this.isMale && !this.state.isFemale) user_type = 'male'
      else if(!this.isMale && this.state.isFemale) user_type = 'male'

      let gender = ''
      if(this.isOwner && !this.state.isCustomer) gender = 'owner'
      else if(!this.isOwner && this.state.isCustomer) gender = 'customer'

      const list = getUsers(this.state.keyword ,gender ,user_type)
      console.log(this.state)
  }

  onChangeMale = () => {
    this.setState({isMale: !this.state.isMale})
  }

  onChangeFemale = () => {
    this.setState({isFemale: !this.state.isFemale})
  }

  onChangeOwner = () => {
    this.setState({isOwner: !this.state.isOwner})
  }

  onChangeCustomer = () => {
    this.setState({isCustomer: !this.state.isCustomer})
  }

  onChangeKeyword = (e) => {
    this.setState({keyword: e.target.value})
  }

  renderSearchBar = () =>{
      return(
        <Form className="search-form">
        <h1> Admin Search </h1>
        <br/>
        <FormItem>        
            <Input
              size='large'
              prefix={<Icon type='search' style={{ fontSize: 13 }} />}
              placeholder='search user'
              onChange={this.onChangeKeyword}              
            />
            <label>User Type </label>               
            <Checkbox onChange={this.onChangeCustomer}   /> <label>Customer </label>
            <Checkbox onChange={this.onChangeOwner}/> <label>Owner </label> 
            <br/> 
            <label>Gender </label>               
            <Checkbox onChange={this.onChangeMale}/> <label>Male </label>
            <Checkbox onChange={this.onChangeFemale}/> <label>Female </label>               
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
