import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
// import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Team from './components/Team';
import Service from './components/Service/Service'
import NotFound from './components/NotFound';
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
	return(
		<Switch>
			<Route path="/team" component={Team}/>
			{ user
				? <Route path="/" component={Service}/>
				: <Route path="/" component={Home}/>
			}
			{/* <Route path="/posts/:id" component={}/> */}
			<Route component={NotFound}/>
		</Switch>
	);
}

class App extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
      <div className="App">
				{/* <Helmet title="Matchsage"/> */}
				<Header/>
				<Body userType={{}}/>
				<Footer/>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(App);