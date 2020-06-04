import React from 'react';
import './App.css';
import {  Route, Redirect  } from 'react-router-dom'
import Layout from './layout/index'
import Login from './../src/views/login/index'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login}  />
      <Route path='/login' component={Login}  />
      <Route path='/content' component={Layout}  />
      <Route path="/" component={Login} exact />
    </div>
  );
}

export default App;
