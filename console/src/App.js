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
      {/* <Redirect to="/login" /> */}
    </div>
  );
}

export default App;
