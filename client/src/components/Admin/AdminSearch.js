import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Icon, Input, Button, Menu, Dropdown, Checkbox, Table} from 'antd'
import { AdminActions } from '../../actions/AdminActions'
import './AdminSearch.css';
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

  onSearchButtonClick = async () => {
      let user_type = undefined
      let gender = undefined

      if(this.state.isMale && !this.state.isFemale) gender = 'male'
      if(!this.state.isMale && this.state.isFemale) gender = 'female'
     
      if(this.state.isOwner && !this.state.isCustomer) user_type = 'owner'
      if(!this.state.isOwner && this.state.isCustomer) user_type = 'customer'     

      const param = {
        keyword: this.state.keyword,
        gender: gender,
        user_type: user_type
      }
      this.props.fetchUsers(param)   
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
    console.log(this.props.users)    

    const columns = [{
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
      }, {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      }, {
        title: 'User Type',
        dataIndex: 'user_type',
        key: 'user_type',
      }, {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      }];

    return (
      <div>
        <div className="fuck">
            {this.renderSearchBar()}        
        </div>        
        {this.props.users && 
        <div>
            <Table className="tableja" dataSource={this.props.users} columns={columns} pagination={false}/>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
	return {		
		users: state.AdminReducer.users.users
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchUsers: (params)=>{
			dispatch(AdminActions.getUsers(params))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSearch);
