import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Layout from './layout/index'
import Login from './../src/views/login/index'
function App() {
  return (
    <div className="App">
      <Route path="/" component={Login} exact />
      {/* <Redirect path="/" to={{pathname: '/login'}} /> */}
      <Route path='/login' component={Login}  />
      <Route path='/content' component={Layout}  />
    </div>
  );
}

export default App;
