import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

import './App.css';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <main>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
