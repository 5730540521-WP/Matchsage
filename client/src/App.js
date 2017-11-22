import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { Redirect, Router } from 'react-router';
import browserHistory from './helpers/history'
import logo from './logo.svg';
// import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Team from './components/Team';
import AdminLogin from './components/Admin/AdminLogin';
import Owner from './components/Owner/Owner';
import AdminSearch from './components/Admin/AdminSearch';
import Service from './components/Service/Service';
import ServiceDetail from './components/Service/ServiceDetail';
import NotFound from './components/NotFound';
import './theme.css';
import './App.css';

const GuestRoute = ()=>(
	<Switch>
	</Switch>
)

const CustomerRoute = ()=>(
	<Switch>
	</Switch>
)

const ServiceOwnerRoute = ()=>(
	<Switch>
	</Switch>
)

const AdminRoute = ()=>(
	<Switch>
	</Switch>
)

const Body = ({userType})=>{
	const user = localStorage.getItem('user');	
	const admin = localStorage.getItem('admin');
	return(
		<Router history={browserHistory}>
			<Switch>
				<Route exact path="/" component={user ? Service : Home }/>
				<Route exact path="/owner" component={Owner}/>
				<Route exact path='/admin/login' render={() => {
					if (localStorage.admin) {
						return (<Redirect to='/admin/users/search' />)
					} else {
						return (<AdminLogin />)
					}
				}} />
				<Route exact path="/admin/users/search" render={() => {
					if (!localStorage.admin) {
						return (<Redirect to='/admin/login'/>)
					} else {
						return (<AdminSearch />)
					}
				}}/>
				<Route exact path="/team" component={Team}/>
				
				
				<Route exact path="/service/:id" component={user?ServiceDetail:()=>{return <Redirect to='/'/>}}/>
				
				{/* <Route path="/posts/:id" component={}/> */}
				<Route component={NotFound}/>
				
			</Switch>
		</Router>
	);
}

class App extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
      <div className="App" style={{fontFamily:'Kanit'}}>
				{/* <Helmet title="Matchsage"/> */}
				<Header/>
				<Body userType={{}}/>
				{/* <Footer/> */}
      </div>
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(App);