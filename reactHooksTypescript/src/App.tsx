import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TodoPages from "./pages/TodosPage";
import About from "./pages/About";

//React.FC => react functional component types

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={TodoPages} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
