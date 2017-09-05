import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
// import Helmet from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Team from './components/Team';
import './App.css';

const Body = ()=>(
	<Switch>
		<Route path="/team" component={Team}/>
		<Route path="/" component={Home}/>
		{/* <Route path="/posts/:id" component={}/> */}
	</Switch>
);

class App extends Component {
  render() {
    return (
      <div className="App">
				{/* <Helmet title="Matchsage"/> */}
				<Header/>
				<Body/>
				<Footer/>
      </div>
    );
  }
}

export default App;
