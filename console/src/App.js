import React from 'react';
import './App.css';
import {  Route } from 'react-router-dom'
import router from './route/index'

function App() {
  return (
    <div className="App">
       {
         router.map((item, i) => {
           return <Route key={i} path={item.path} component={item.component}  />
         })
       }
    </div>
  );
}

export default App;
