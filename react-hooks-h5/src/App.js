import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import router from '@/router/index'
import Index from '@/views/index/index'
function App() {
  return (
    <div className="App">
      <Route path="/" component={Index} exact />
     {
       router.map(item => {
         return (
          <Route path={item.path} component={item.component} />
         )
       })
     }
    </div>
  );
}

export default App;